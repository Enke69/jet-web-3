import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/pages/about.module.css";

export const metadata = {
  title: "About Us — JET Institute",
  description:
    "JET Institute is Mongolia's leading English language school and official IELTS test centre, established in 1995 and an official British Council partner since 2015.",
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "About Us" },
];

const glance = [
  "Founded in 1995",
  "10,000+ IELTS candidates tested",
  "Official British Council Partner",
  "Computer-delivered IELTS since 2019",
  "Located at Max Centre, Ulaanbaatar",
];

const milestones = [
  { year: "1995", title: "Founded", body: "JET Institute established as Mongolia's first private English language school." },
  { year: "2005", title: "Expansion", body: "Expanded curriculum to include IELTS preparation courses and business English." },
  { year: "2015", title: "British Council Partnership", body: "Became an official British Council partner for IELTS testing in Mongolia." },
  { year: "2019", title: "Computer-Delivered IELTS", body: "Launched as Mongolia's first computer-delivered IELTS test centre." },
  { year: "2024", title: "10,000 Candidates", body: "Reached the milestone of 10,000+ IELTS candidates tested." },
];

const values = [
  { icon: "🎯", title: "Excellence", body: "We maintain the highest standards in English language education and testing." },
  { icon: "🤝", title: "Trust", body: "As an official British Council partner, we uphold international standards of integrity and quality." },
  { icon: "🌟", title: "Student Success", body: "Every decision we make is guided by our commitment to helping students achieve their goals." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb={breadcrumb}
          title="About JET Institute"
          lead="Mongolia's leading English language school and official IELTS test centre since 1995."
        />

        <section className={styles.section}>
          <div className="container">
            <SectionHeader title="Our Story" />
            <Reveal className={styles.twoCol}>
              <div className={styles.contentCard}>
                <p>
                  JET Institute was established in 1995 as Mongolia&apos;s first
                  private English language school. Over nearly three decades,
                  we have grown to become the country&apos;s most trusted
                  language education provider.
                </p>
                <p>
                  In 2019, JET Institute was appointed as Mongolia&apos;s first
                  computer-delivered IELTS test centre by the British Council,
                  marking a significant milestone in our mission to bring
                  world-class English language testing to Mongolia.
                </p>
              </div>
              <div className={styles.infoBox}>
                <h4>At a Glance</h4>
                <ul>
                  {glance.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Our Journey" title="Milestones" />
            <Reveal className={styles.timeline}>
              {milestones.map((m) => (
                <div key={m.year} className={styles.timelineItem}>
                  <span className={styles.year}>{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Our Values" title="What We Stand For" />
            <Reveal className={styles.valuesGrid}>
              {values.map((v, idx) => (
                <div
                  key={v.title}
                  className={styles.valueCard}
                  style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
                >
                  <div className={styles.icon}>{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="contact" className={styles.cta}>
          <div className="container">
            <h2>Join Our Community</h2>
            <p>Experience world-class English education at JET Institute.</p>
            <a
              className={styles.ctaPrimary}
              href="https://ieltsregistration.britishcouncil.org/?organisation=JET"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book IELTS
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
