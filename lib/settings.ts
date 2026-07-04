import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_CONTACT_RAW,
  decorateContact,
  type SiteContact,
  type SiteContactRaw,
} from "@/lib/site-contact";

/** Single row that holds all editable site settings. */
export const SITE_SETTINGS_ID = "singleton";
/** Cache tag busted whenever settings are saved from the admin panel. */
export const SITE_SETTINGS_TAG = "site-settings";

/**
 * Cached DB read. Result is a plain, JSON-serializable object so it stays
 * static across requests until `revalidateTag(SITE_SETTINGS_TAG)` is called
 * (see `updateSiteSettingsAction`).
 */
const loadRawSettings = unstable_cache(
  async (): Promise<SiteContactRaw> => {
    const row = await prisma.siteSetting.findUnique({
      where: { id: SITE_SETTINGS_ID },
    });
    if (!row) return DEFAULT_CONTACT_RAW;
    return { phone: row.phone, email: row.email, whatsapp: row.whatsapp };
  },
  ["site-settings"],
  { tags: [SITE_SETTINGS_TAG] }
);

/**
 * Get the site contact settings (phone / email / WhatsApp) with derived hrefs.
 * Falls back to defaults if the row is missing or the DB is unreachable so the
 * site never breaks on a settings read.
 */
export async function getSiteSettings(): Promise<SiteContact> {
  try {
    return decorateContact(await loadRawSettings());
  } catch (error) {
    console.error("getSiteSettings failed; using defaults", error);
    return decorateContact(DEFAULT_CONTACT_RAW);
  }
}
