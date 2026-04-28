"use client";

import { useEffect } from "react";

/**
 * Client-side only: Bootstrap-ийн JavaScript (dropdown, modal, tooltip г.м).
 */
export default function BootstrapClient() {
  useEffect(() => {
    void import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
