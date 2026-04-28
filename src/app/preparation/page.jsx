import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/pages/preparation.module.css";

export const metadata = {
  title: "IELTS Preparation — JET Institute",
  description:
    "Prepare for IELTS with expert courses, study tips, and recommended resources from JET Institute — Mongolia's official IELTS test centre since 1995.",
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Preparation" },
];

const courses = [
  {
    title: "Intensive IELTS Course",
    body:
      "8-week comprehensive program covering all four skills. Small class sizes with personalised feedback. Ideal for students aiming for Band 6.5+.",
  },
  {
    title: "Weekend IELTS Workshop",
    body:
      "Saturday workshops focusing on test strategies and practice. Perfect for working professionals. Covers key techniques for each section.",
  },
  {
    title: "One-on-One Coaching",
    body:
      "Private sessions tailored to your specific needs. Flexible scheduling. Focused improvement on your weakest areas.",
  },
];

const tips = [
  { icon: "🎧", title: "Listening Tips", body: "Practice with English podcasts and news daily. Focus on understanding accents from the UK, Australia, and North America." },
  { icon: "📖", title: "Reading Tips", body: "Read academic journals and newspapers regularly. Practice skimming and scanning techniques to improve speed." },
  { icon: "✍️", title: "Writing Tips", body: "Practice writing Task 1 and Task 2 essays regularly. Focus on structure, coherence, and vocabulary range." },
  { icon: "🗣️", title: "Speaking Tips", body: "Record yourself speaking and review. Practice discussing a wide range of topics fluently and naturally." },
  { icon: "📚", title: "Vocabulary", body: "Build academic vocabulary systematically. Learn words in context rather than memorising lists." },
  { icon: "⏱️", title: "Time Management", body: "Practice under timed conditions. Learn to allocate your time effectively across all sections." },
];

const officialResources = [
  "Cambridge IELTS Practice Tests (Books 1–18)",
  "British Council IELTS preparation materials",
  "IELTS.org free practice tests",
];

const onlineResources = [
  "British Council LearnEnglish website",
  "IELTS Liz (free video lessons)",
  "BBC Learning English",
];

const COURSE_REGISTRATION_URL =
  "https://forms.office.com/pages/responsepage.aspx?id=ZOb9MWzftUqBu69JcjxzKM_X4Jba9dRAoPu_Q1Rwah9UNUVBNjBENTlSWjc2Mk9QOVhaNzJDRlNXUC4u&origin=lprLink&route=shorturl";

export default function PreparationPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb={breadcrumb}
          title="IELTS Preparation"
          lead="Expert courses and resources to help you achieve your target band score."
        />

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Our Courses" title="Preparation Courses" />
            <Reveal className={styles.threeCol}>
              {courses.map((c, idx) => (
                <div
                  key={c.title}
                  className={styles.contentCard}
                  style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
                >
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Study Tips" title="Preparation Tips" />
            <Reveal className={styles.tipsGrid}>
              {tips.map((tip, idx) => (
                <div
                  key={tip.title}
                  className={styles.tipCard}
                  style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
                >
                  <div className={styles.icon}>{tip.icon}</div>
                  <h3>{tip.title}</h3>
                  <p>{tip.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader title="Recommended Resources" />
            <Reveal className={styles.twoCol}>
              <div className={styles.infoBox}>
                <h4>Official Resources</h4>
                <ul>
                  {officialResources.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
              <div className={styles.infoBox}>
                <h4>Online Tools</h4>
                <ul>
                  {onlineResources.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader
              badge="Preparation Course"
              title="Register for Our IELTS Preparation Course"
            />
            <Reveal className={styles.regWrap}>
              <p>
                Enroll in our structured IELTS preparation course designed to
                help you achieve your target score. Get guidance from
                experienced instructors and practice with real exam materials.
              </p>
              <a
                className={styles.regButton}
                href={COURSE_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register for Course
              </a>
            </Reveal>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <h2>Start Preparing Today</h2>
            <p>Join thousands of successful IELTS candidates at JET Institute.</p>
            <div className={styles.ctaButtons}>
              <a
                className={styles.ctaPrimary}
                href="https://ieltsregistration.britishcouncil.org/?organisation=JET"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book IELTS
              </a>
              <a className={styles.ctaSecondary} href="mailto:ielts@jet-english.mn">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
