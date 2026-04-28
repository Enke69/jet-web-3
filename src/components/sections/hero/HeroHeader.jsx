"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import styles from "@/styles/sections/heroHeader.module.css";
import HeroRegisterButton from "./HeroRegisterButton";

const defaultMenus = [
  { label: "Home", href: "#", active: true },
  { label: "Book IELTS", href: "#" },
  { label: "About the test", href: "#" },
  { label: "Preparation", href: "#" },
  { label: "About us", href: "#" },
];

const headerEase = [0.25, 0.1, 0.25, 1];

const navListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -6, filter: "blur(1.5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: headerEase },
  },
};

const actionVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: headerEase, delay: 0.38 },
  },
};

/**
 * @param {object} props
 * @param {string} [props.logoSrc]
 * @param {string} [props.logoAlt]
 * @param {Array<{ label: string, href: string, active?: boolean }>} [props.menus]
 * @param {string} [props.activeMenuLabel] - active эсэхийг label-аар override (optional)
 * @param {{ href: string, label: string }} [props.register]
 */
export default function HeroHeader({
  logoSrc = "/images/logo.svg",
  logoAlt = "Logo",
  menus = defaultMenus,
  activeMenuLabel,
  register = { href: "#", label: "Register now" },
}) {
  const list = menus && menus.length > 0 ? menus : defaultMenus;
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
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 22, mass: 1 },
    });
  }, [logoDropControls, prefersReducedMotion]);

  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.inner}>
          <motion.div
            ref={brandRef}
            className={styles.brand}
            initial={{ y: 0, opacity: 0 }}
            animate={logoDropControls}
          >
            <Link href="/" className="d-inline-block">
              <Image
                className={styles.logo}
                src={logoSrc}
                alt={logoAlt}
                width={80}
                height={160}
                priority
                sizes="80px"
              />
            </Link>
          </motion.div>
          <nav
            className={styles.nav}
            aria-label="Үндсэн цэс"
          >
            <motion.ul
              className={styles.navList}
              initial={prefersReducedMotion ? false : "hidden"}
              animate={prefersReducedMotion ? false : "show"}
              variants={navListVariants}
            >
              {list.map((item) => {
                const isActive = activeMenuLabel
                  ? item.label === activeMenuLabel
                  : item.active;
                return (
                  <motion.li
                    key={`${item.label}-${item.href}`}
                    variants={navItemVariants}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  >
                    <Link
                      className={isActive ? styles.navLinkActive : styles.navLink}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>
          <motion.div
            className={styles.actions}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? false : "show"}
            variants={actionVariants}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
          >
            <HeroRegisterButton
              href={register.href}
              label={register.label}
              className={`btn ${styles.register} rounded-pill text-white fw-medium`}
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
