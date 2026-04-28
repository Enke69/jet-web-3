import Link from "next/link";
import styles from "@/styles/ui/pageHero.module.css";

export default function PageHero({ breadcrumb, title, lead }) {
  return (
    <section className={styles.root} aria-labelledby="page-hero-title">
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumb.map((item, idx) => (
              <span key={`${item.label}-${idx}`} className={styles.crumb}>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
                {idx < breadcrumb.length - 1 ? (
                  <span className={styles.crumbSep} aria-hidden="true">→</span>
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}
        <h1 id="page-hero-title" className={styles.title}>
          {title}
        </h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
    </section>
  );
}
