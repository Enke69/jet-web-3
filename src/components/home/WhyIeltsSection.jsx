import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/home/whyIeltsSection.module.css";

const reasons = [
  {
    icon: "🌍",
    title: "Study Abroad",
    body:
      "Open doors to universities worldwide with IELTS scores accepted across the globe.",
  },
  {
    icon: "✈️",
    title: "Global Migration",
    body:
      "IELTS is the trusted test for immigration to Australia, Canada, New Zealand, and the UK.",
  },
  {
    icon: "💼",
    title: "Career Growth",
    body:
      "Boost your career prospects with internationally recognised English proficiency.",
  },
];

export default function WhyIeltsSection() {
  return (
    <section className={styles.root}>
      <div className="container">
        <SectionHeader
          badge="Why Choose IELTS"
          title="Accepted Worldwide"
          subtitle="Trusted by 11,000+ organisations in 140+ countries"
        />
        <Reveal className={styles.grid}>
          {reasons.map((reason, idx) => (
            <div
              key={reason.title}
              className={styles.card}
              style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
            >
              <div className={styles.icon} aria-hidden="true">
                {reason.icon}
              </div>
              <h3 className={styles.title}>{reason.title}</h3>
              <p className={styles.body}>{reason.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
