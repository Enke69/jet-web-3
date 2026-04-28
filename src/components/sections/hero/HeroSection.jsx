"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "@/styles/sections/hero.module.css";
import HeroHeader from "./HeroHeader";
import HeroPatternBackdrop from "./HeroPatternBackdrop";

const variantByKey = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  dark: styles.variantDark,
};

// Илүү зөөлөн гарч ирэх: бага offset, blur-г багасгасан, урт duration, зөөлөн ease-out
const smoothEase = [0.25, 0.1, 0.25, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(1.5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.05,
      ease: smoothEase,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 28, y: 12, scale: 0.985 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.15,
      ease: smoothEase,
      delay: 0.22,
    },
  },
};

/**
 * @param {object} props
 * @param {string} [props.kicker]
 * @param {string} props.title
 * @param {string} [props.lead]
 * @param {{ label: string, href: string }} [props.primaryCta]
 * @param {{ label: string, href: string }} [props.secondaryCta]
 * @param {"default"|"primary"|"dark"} [props.variant]
 * @param {object} [props.header] - logoSrc, logoAlt, menus, register, activeMenuLabel
 */
const defaultHeader = {
  logoSrc: "/images/logo.svg",
  logoAlt: "IELTS Test Center",
  register: { href: "#", label: "Register now" },
  activeMenuLabel: "Home",
  menus: [
    { label: "Home", href: "#", active: true },
    { label: "Book IELTS", href: "#" },
    { label: "About the test", href: "#" },
    { label: "Preparation", href: "#" },
    { label: "About us", href: "#" },
  ],
};

export default function HeroSection({
  kicker,
  title,
  lead,
  primaryCta,
  secondaryCta,
  variant = "default",
  header: headerFromData,
}) {
  const prefersReducedMotion = useReducedMotion();
  const variantClass = variantByKey[variant] ?? variantByKey.default;
  const rootClass = `${styles.root} ${variantClass}`.trim();
  const header = { ...defaultHeader, ...(headerFromData ?? {}) };
  const {
    activeMenuLabel,
    menus,
    register,
    logoSrc,
    logoAlt,
  } = header;

  return (
    <section
      id="hero"
      className={rootClass}
      aria-labelledby="hero-title"
    >
      <HeroPatternBackdrop />
      <div className={styles.content}>
        <HeroHeader
          logoSrc={logoSrc}
          logoAlt={logoAlt}
          menus={menus}
          register={register}
          activeMenuLabel={activeMenuLabel}
        />
        <div className={`${styles.bodyColumn} container`}>
          <motion.div
            className={styles.heroImageWrap}
            aria-hidden="true"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? false : "show"}
            variants={imageVariants}
          >
            <Image
              src="/images/banner-image.png"
              alt=""
              width={960}
              height={860}
              className={styles.heroImage}
              priority
            />
          </motion.div>
          <div className={styles.inner}>
            <motion.div
              className={styles.copy}
              initial={prefersReducedMotion ? false : "hidden"}
              animate={prefersReducedMotion ? false : "show"}
              variants={containerVariants}
            >
              {kicker ? (
                <motion.p className={styles.kicker} variants={itemVariants}>
                  {kicker}
                </motion.p>
              ) : null}
              <motion.h1
                id="hero-title"
                className={styles.title}
                variants={itemVariants}
              >
                {title}
              </motion.h1>
              {lead ? (
                <motion.p className={styles.lead} variants={itemVariants}>
                  {lead}
                </motion.p>
              ) : null}
              <motion.div className={styles.rowCta} variants={itemVariants}>
                {primaryCta ? (
                  <motion.div
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  >
                  <Link
                    className={`btn rounded-pill text-white fw-medium ${styles.cPrimary}`}
                    href={primaryCta.href}
                  >
                    {primaryCta.label}
                  </Link>
                  </motion.div>
                ) : null}
                {secondaryCta ? (
                  <motion.div
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  >
                  <Link
                    className={`btn btn-lg rounded-pill ${styles.cSecondary}`}
                    href={secondaryCta.href}
                  >
                    {secondaryCta.label}
                  </Link>
                  </motion.div>
                ) : null}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
