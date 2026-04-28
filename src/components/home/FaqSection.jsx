"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/home/faqSection.module.css";

const faqItems = [
  {
    q: "How do I book my IELTS test?",
    a: (
      <p>
        Register at{" "}
        <a
          href="https://ieltsregistration.britishcouncil.org/?organisation=JET"
          target="_blank"
          rel="noopener noreferrer"
        >
          ieltsregistration.britishcouncil.org
        </a>
        , then transfer 899,000 MNT to:{" "}
        <strong>Jettrack/ЖЭТТРАКК ХХК</strong> — TDB Account: 499 232 558 or
        Khaan Bank: 503 127 2734. Send payment proof + reference number to
        ielts@jet-english.mn within 24 hours.
      </p>
    ),
  },
  {
    q: "What are the IELTS fees?",
    a: (
      <ul>
        <li>Test Fee: 899,000 MNT</li>
        <li>Re-marking: 472,000 MNT</li>
        <li>Cancellation: 230,000 MNT</li>
        <li>Transfer: 230,000 MNT</li>
        <li>Extra TRF: 40,000 MNT</li>
      </ul>
    ),
  },
  {
    q: "What happens on test day?",
    a: (
      <p>
        The test has four sections: Listening (30 min), Reading (1 hour),
        Writing (1 hour), and Speaking (15 min). Arrive at least 30 minutes
        before your scheduled time.
      </p>
    ),
  },
  {
    q: "How can I contact JET Institute?",
    a: (
      <p>
        Phone: (+976) 7711-8899 (2) | Email: ielts@jet-english.mn | Hours: 8:40
        AM – 5:40 PM Mon–Fri | Address: Max Centre 5th Floor, Sukhbaatar
        District, 8th Khoroo, Ulaanbaatar-211238
      </p>
    ),
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(-1);

  const toggle = (idx) => {
    setOpenIdx((current) => (current === idx ? -1 : idx));
  };

  return (
    <section id="faq" className={styles.root}>
      <div className="container">
        <SectionHeader badge="Common Questions" title="Frequently Asked Questions" />
        <Reveal className={styles.list}>
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className={styles.answer} hidden={!isOpen}>
                  <div className={styles.answerInner}>{item.a}</div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
