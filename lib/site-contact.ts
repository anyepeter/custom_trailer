/**
 * Pure, dependency-free contact-info helpers.
 *
 * This module must NOT import Prisma or any server-only code so it can be used
 * from both client components (via the settings context) and server code
 * (emails, PDFs, server components).
 */

/** The raw values stored in the database / editable from the admin panel. */
export interface SiteContactRaw {
  /** Display phone number, e.g. "+1 662 400-0864". */
  phone: string;
  /** Contact email, e.g. "sales@customtrailerspro.com". */
  email: string;
  /** WhatsApp number for wa.me links, e.g. "16624000864". */
  whatsapp: string;
}

/** Decorated contact info with ready-to-use hrefs. */
export interface SiteContact extends SiteContactRaw {
  /** Digits only, e.g. "16624000864". */
  phoneDigits: string;
  /** `tel:` href, e.g. "tel:+16624000864". */
  phoneHref: string;
  /** WhatsApp digits only, e.g. "16624000864". */
  whatsappDigits: string;
  /** WhatsApp href, e.g. "https://wa.me/16624000864". */
  whatsappHref: string;
  /** `mailto:` href, e.g. "mailto:sales@customtrailerspro.com". */
  emailHref: string;
}

/** Fallback used when the database has no row yet or a read fails. */
export const DEFAULT_CONTACT_RAW: SiteContactRaw = {
  phone: "+1 662 400-0864",
  email: "sales@customtrailerspro.com",
  whatsapp: "16624000864",
};

/** Build the derived hrefs from raw values so every call site stays in sync. */
export function decorateContact(raw: SiteContactRaw): SiteContact {
  const phoneDigits = (raw.phone || "").replace(/\D/g, "");
  const whatsappDigits = (raw.whatsapp || "").replace(/\D/g, "");
  return {
    phone: raw.phone,
    email: raw.email,
    whatsapp: raw.whatsapp,
    phoneDigits,
    phoneHref: `tel:+${phoneDigits}`,
    whatsappDigits,
    whatsappHref: `https://wa.me/${whatsappDigits}`,
    emailHref: `mailto:${raw.email}`,
  };
}

/** Decorated defaults, safe to use anywhere as a static fallback. */
export const DEFAULT_CONTACT: SiteContact = decorateContact(DEFAULT_CONTACT_RAW);
