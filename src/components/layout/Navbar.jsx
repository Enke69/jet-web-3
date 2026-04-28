"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { navLinks, registerCta } from "@/data/nav";
import styles from "@/styles/layout/navbar.module.css";

const navListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -6, filter: "blur(1.5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] } },
};

const actionVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.95, ease: [0.25, 0.1, 0.25, 1], delay: 0.38 } },
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const brandRef = useRef(null);
  const logoDropControls = useAnimationControls();

  useEffect(() => {
    if (prefersReducedMotion) {
      logoDropControls.set({ y: 0, opacity: 1 });
      return;
    }
    const brandEl = brandRef.current;
    const logoHeight = brandEl?.offsetHeight ?? 0;
    const startY = logoHeight > 0 ? -logoHeight : 0;
    logoDropControls.set({ y: startY, opacity: 0 });
    logoDropControls.start({
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 22, mass: 1 },
    });
  }, [logoDropControls, prefersReducedMotion]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(prev => {
        if (!prev && y > 80) return true;
        if (prev && y === 0) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`${styles.root} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo — drops from above */}
        <motion.div
          ref={brandRef}
          className={styles.brand}
          initial={{ y: 0, opacity: 0 }}
          animate={logoDropControls}
        >
          <Link href="/" onClick={close}>
            <Image
              src="/images/logo.svg"
              alt="JET Institute"
              width={80}
              height={120}
              className={styles.logo}
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary">
          <motion.ul
            className={styles.linkList}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? false : "show"}
            variants={navListVariants}
          >
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={navItemVariants}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive(link.href) ? styles.linkActive : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Register CTA */}
        <motion.div
          className={styles.actions}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? false : "show"}
          variants={actionVariants}
        >
          <Link href={registerCta.href} className={styles.cta}>
            <span className={styles.ctaInner}>
              <span>{registerCta.label}</span>
            </span>
          </Link>
        </motion.div>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
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
        <Link href={registerCta.href} className={styles.mobileCta} onClick={close}>
          {registerCta.label}
        </Link>
      </div>
    </header>
  );
}
