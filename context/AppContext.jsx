"use client";

import React, { createContext, useContext, useState } from "react";

/**
 * AppContext — GCSA Consulting
 *
 * Lightweight global app context. Extend with auth state, locale,
 * theme, or any cross-cutting concerns as the site grows.
 */

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [locale, setLocale] = useState("en-GB");

  const value = {
    locale,
    setLocale,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return ctx;
};

export default AppContext;