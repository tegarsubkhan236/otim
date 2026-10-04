"use client";

import { createContext, useContext, useState } from "react";

export type Business = "cellular" | "retail";
type BusinessContextValue = { business: Business; setBusiness: (business: Business) => void };
const BusinessContext = createContext<BusinessContextValue | null>(null);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [business, setBusinessState] = useState<Business>(() => {
    if (typeof window === "undefined") return "cellular";
    const saved = window.sessionStorage.getItem("otim-active-business");
    return saved === "cellular" || saved === "retail" ? saved : "cellular";
  });

  function setBusiness(nextBusiness: Business) {
    setBusinessState(nextBusiness);
    sessionStorage.setItem("otim-active-business", nextBusiness);
  }

  return <BusinessContext.Provider value={{ business, setBusiness }}>{children}</BusinessContext.Provider>;
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) throw new Error("useBusiness must be used within BusinessProvider");
  return context;
}
