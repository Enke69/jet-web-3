import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import TestDateCalendar from "./TestDateCalendar";
import styles from "@/styles/pages/bookIelts.module.css";

export const metadata = {
  title: "Book IELTS — JET Institute",
  description:
    "Book your IELTS test at JET Institute — Mongolia's official British Council IELTS test centre. View test dates, fees, and step-by-step booking process.",
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Book IELTS" },
];

const steps = [
  {
    n: 1,
    title: "Register Online",
    body: (
      <>
        Visit{" "}
        <a
          href="https://ieltsregistration.britishcouncil.org/?organisation=JET"
          target="_blank"
          rel="noopener noreferrer"
        >
          ieltsregistration.britishcouncil.org
        </a>{" "}
        and create your account. Select your preferred test date and type
        (Academic or General Training).
      </>
    ),
  },
  {
    n: 2,
    title: "Make Payment",
    body:
      "Transfer 899,000 MNT to Jettrack/ЖЭТТРАКК ХХК — TDB Account: 499 232 558 or Khaan Bank: 503 127 2734",
  },
  {
    n: 3,
    title: "Send Confirmation",
    body:
      "Email your payment proof and registration reference number to ielts@jet-english.mn within 24 hours.",
  },
  {
    n: 4,
    title: "Receive Confirmation",
    body:
      "You will receive a confirmation email with your test date, time, and venue details.",
  },
];

const fees = [
  ["IELTS Test Fee", "899,000"],
  ["Re-marking (Enquiry on Results)", "472,000"],
  ["Cancellation Fee", "230,000"],
  ["Transfer Fee", "230,000"],
  ["Extra TRF (Test Report Form)", "40,000"],
];

const importantInfo = [
  {
    title: "Required Documents",
    body:
      "Valid passport or national ID (original required on test day), recent passport-sized photo, registration confirmation email",
  },
  {
    title: "Test Formats",
    body:
      "Computer-delivered IELTS: Listening, Reading, and Writing are completed on a computer. Speaking is face-to-face with an examiner.",
  },
  {
    title: "Results",
    body:
      "Results are available 1-5 days after your test for computer-delivered IELTS. You can view them online through your British Council account.",
  },
  {
    title: "Cancellation Policy",
    body:
      "You can cancel or transfer your test up to the deadline shown in your confirmation email. Cancellation fee: 230,000 MNT.",
  },
];

export default function BookIeltsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb={breadcrumb}
          title="Book Your IELTS Test"
          lead="Register for computer-delivered IELTS at Mongolia's official British Council test centre."
        />

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="How to Book" title="Booking Process" />
            <Reveal className={styles.steps}>
              {steps.map((step, idx) => (
                <div
                  key={step.n}
                  className={styles.stepCard}
                  style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
                >
                  <div className={styles.stepNumber}>{step.n}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Test Dates" title="Available Test Dates" />
            <TestDateCalendar />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Fees" title="IELTS Test Fees" />
            <Reveal>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Fee (MNT)</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map(([service, fee]) => (
                    <tr key={service}>
                      <td>{service}</td>
                      <td>{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.infoBox}>
                <p>
                  Payment must be made within 24 hours of registration. Late
                  payments may result in cancellation of your booking.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader badge="Important" title="Before You Book" />
            <Reveal className={styles.contentGrid}>
              {importantInfo.map((info, idx) => (
                <div
                  key={info.title}
                  className={styles.contentCard}
                  style={{ transitionDelay: `${(idx + 1) * 0.08}s` }}
                >
                  <h3>{info.title}</h3>
                  <p>{info.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <h2>Ready to Book?</h2>
            <p>Register now and take the first step towards your goals.</p>
            <a
              className={styles.ctaButton}
              href="https://ieltsregistration.britishcouncil.org/?organisation=JET"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
