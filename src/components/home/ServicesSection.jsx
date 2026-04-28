import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import LavaBalls from "@/components/home/LavaBalls";
import styles from "@/styles/home/servicesSection.module.css";

const services = [
  {
    href: "/book-ielts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: "Book IELTS",
    description: "Register for your IELTS exam",
  },
  {
    href: "/about-test",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "About The IELTS",
    description: "Learn about IELTS format and scoring",
  },
  {
    href: "/preparation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "IELTS Preparation",
    description: "Courses to boost your score",
  },
  {
    href: "/about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "About Us",
    description: "Learn about JET Institute",
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.root}>
      <LavaBalls />
      {/* Arc pattern overlay */}
      <div className={styles.pattern} aria-hidden="true" />
      {/* Blurred dark blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob2}`} aria-hidden="true" />

      <div className={`container ${styles.container}`}>
        <Reveal className={styles.header}>
          <h2 className={styles.title}>OUR SERVICES</h2>
          <p className={styles.subtitle}>WHAT WE OFFER</p>
        </Reveal>

        <Reveal className={styles.grid}>
          {services.map((service, idx) => (
            <Link
              key={service.href}
              href={service.href}
              className={styles.card}
              style={{ transitionDelay: `${(idx + 1) * 0.1}s` }}
            >
              <p className={styles.cardDesc}>{service.description}</p>
              <div className={styles.iconWrap} aria-hidden="true">
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <span className={styles.cardLink}>Learn more &rsaquo;</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
