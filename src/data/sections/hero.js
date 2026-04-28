import { navLinks, registerCta } from "@/data/nav";

export const heroContent = {
  kicker: "The first",
  title: "Computer-Delivered IELTS Test Center in Mongolia",
  lead:
    "Mongolia's leading English language school since 1995. Over 10,000 candidates tested since 2019 with the British Council.",
  primaryCta: { label: "Book IELTS now", href: "/book-ielts" },
  secondaryCta: { label: "Learn about IELTS", href: "/about-test" },
  variant: "default",
  header: {
    logoSrc: "/images/logo.svg",
    logoAlt: "JET Institute",
    activeMenuLabel: "Home",
    menus: navLinks,
    register: registerCta,
  },
};
