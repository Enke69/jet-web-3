import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/pages/aboutTest.module.css";

export const metadata = {
  title: "About the Test — JET Institute",
  description:
    "Learn about the IELTS test format, band scores, and the difference between Academic and General Training. Everything you need to know before taking IELTS in Mongolia.",
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "About the Test" },
];

const facts = [
  "Accepted by 11,000+ organisations worldwide",
  "Available in 140+ countries",
  "Two versions: Academic and General Training",
  "Valid for 2 years from test date",
  "Band score from 1 (lowest) to 9 (highest)",
];

const formatSections = [
  {
    icon: "🎧",
    title: "Listening",
    body:
      "30 minutes. 4 sections, 40 questions. You'll hear recordings of native English speakers and answer questions on a computer.",
  },
  {
    icon: "📖",
    title: "Reading",
    body:
      "60 minutes. 3 sections, 40 questions. Academic: texts from books, journals, newspapers. General Training: texts from everyday sources.",
  },
  {
    icon: "✍️",
    title: "Writing",
    body:
      "60 minutes. 2 tasks. Task 1: 150 words minimum (describe data/letter). Task 2: 250 words minimum (essay).",
  },
  {
    icon: "🗣️",
    title: "Speaking",
    body:
      "11–14 minutes. 3 parts. Face-to-face interview with an examiner. Part 1: Introduction, Part 2: Long turn, Part 3: Discussion.",
  },
];

const bands = [
  ["9", "Expert", "Full command of the language"],
  ["8", "Very Good", "Fully operational command with occasional inaccuracies"],
  ["7", "Good", "Operational command with occasional inaccuracies"],
  ["6", "Competent", "Generally effective command despite some inaccuracies"],
  ["5", "Modest", "Partial command, coping with overall meaning"],
];

export default function AboutTestPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb={breadcrumb}
          title="Understanding IELTS"
          lead="Everything you need to know about the International English Language Testing System."
        />

        <section className={styles.section}>
          <div className="container">
            <SectionHeader title="What is IELTS?" />
            <Reveal className={styles.twoCol}>
              <div>
                <p>
                  The International English Language Testing System (IELTS) is
                  the world&apos;s most popular English language proficiency
                  test for higher education and global migration. IELTS is
                  accepted by more than 11,000 organisations in over 140
                  countries, including universities, employers, immigration
                  authorities, and professional bodies.
                </p>
              </div>
              <div className={styles.infoBox}>
                <h4>Key Facts</h4>
                <ul>
                  {facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Test Structure" title="IELTS Test Format" />
            <Reveal className={styles.formatGrid}>
              {formatSections.map((s, idx) => (
                <div
                  key={s.title}
                  className={styles.formatCard}
                  style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
                >
                  <div className={styles.icon}>{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Scoring" title="IELTS Band Scores" />
            <Reveal>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Band Score</th>
                    <th>Skill Level</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map(([score, level, desc]) => (
                    <tr key={score}>
                      <td>{score}</td>
                      <td>{level}</td>
                      <td>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.infoBox}>
                <p>
                  Most universities require a minimum band score of 6.0–7.0 for
                  admission. Immigration programs typically require 6.0 or
                  above overall.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader title="Academic vs General Training" />
            <Reveal className={styles.twoCol}>
              <div className={styles.compareCard}>
                <h3>IELTS Academic</h3>
                <p>
                  For people applying to study at undergraduate or postgraduate
                  level, or seeking professional registration. The test
                  assesses whether you are ready to begin studying or training
                  in English.
                </p>
              </div>
              <div className={styles.compareCard}>
                <h3>IELTS General Training</h3>
                <p>
                  For people migrating to Australia, Canada, New Zealand, and
                  the UK, or applying for secondary education, training
                  programs, or work experience. The test focuses on basic
                  survival skills in a social and workplace context.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <h2>Ready to Take IELTS?</h2>
            <p>Book your test today at Mongolia&apos;s official IELTS centre.</p>
            <div className={styles.ctaButtons}>
              <a
                className={styles.ctaPrimary}
                href="https://ieltsregistration.britishcouncil.org/?organisation=JET"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </a>
              <a className={styles.ctaSecondary} href="/preparation">
                Preparation Tips
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
