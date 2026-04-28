"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, registerCta } from "@/data/nav";
import styles from "@/styles/layout/navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`${styles.root} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={close}>
          <Image
            src="/images/newlogo.png"
            alt="JET Institute logo"
            width={32}
            height={32}
            className={styles.logo}
          />
          <span>JET Institute</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.linkList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive(link.href) ? styles.linkActive : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={registerCta.href} className={styles.cta}>
          {registerCta.label}
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <ul className={styles.mobileList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ""}`}
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={registerCta.href}
          className={styles.mobileCta}
          onClick={close}
        >
          {registerCta.label}
        </Link>
      </div>
    </header>
  );
}
