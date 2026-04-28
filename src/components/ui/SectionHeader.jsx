import Reveal from "./Reveal";
import styles from "@/styles/ui/sectionHeader.module.css";

export default function SectionHeader({ badge, title, subtitle, align = "center" }) {
  return (
    <Reveal className={`${styles.root} ${styles[align]}`}>
      {badge ? <span className={styles.badge}>{badge}</span> : null}
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.line} aria-hidden="true" />
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </Reveal>
  );
}
