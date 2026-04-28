import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/home/servicesSection.module.css";

const services = [
  {
    href: "/book-ielts",
    icon: "📝",
    title: "Book IELTS",
    description: "Register for your IELTS exam",
  },
  {
    href: "/about-test",
    icon: "📖",
    title: "About the Test",
    description: "Learn about IELTS format and scoring",
  },
  {
    href: "/preparation",
    icon: "🎓",
    title: "IELTS Preparation",
    description: "Courses to boost your score",
  },
  {
    href: "/about",
    icon: "🏫",
    title: "About Us",
    description: "Learn about JET Institute",
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.root}>
      <div className="container">
        <SectionHeader badge="What We Offer" title="Our Services" />
        <Reveal className={styles.grid}>
          {services.map((service, idx) => (
            <Link
              key={service.href}
              href={service.href}
              className={styles.card}
              style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
            >
              <div className={styles.icon} aria-hidden="true">
                {service.icon}
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
              <span className={styles.link}>Learn More →</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
