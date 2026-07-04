"use client";

import { createContext, useContext, ReactNode } from "react";
import { DEFAULT_CONTACT, type SiteContact } from "@/lib/site-contact";

/**
 * Site contact info (phone / email / WhatsApp) provided from the root layout so
 * client components like the navbar, footer and floating CTA can read the
 * admin-editable values without prop-drilling.
 */
const SettingsContext = createContext<SiteContact>(DEFAULT_CONTACT);

export function SettingsProvider({
  value,
  children,
}: {
  value: SiteContact;
  children: ReactNode;
}) {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

/** Read the current site contact info inside any client component. */
export function useSiteContact(): SiteContact {
  return useContext(SettingsContext);
}
