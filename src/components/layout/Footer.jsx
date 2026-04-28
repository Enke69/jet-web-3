import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/layout/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLink}>
              <Image
                src="/images/newlogo.png"
                alt="JET Institute logo"
                width={36}
                height={36}
                className={styles.logo}
              />
              <span>JET Institute</span>
            </Link>
            <p className={styles.tagline}>
              Mongolia&apos;s official IELTS test centre. Trusted since 1995.
            </p>
          </div>
          <div className={styles.column}>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/book-ielts">Book IELTS</Link></li>
              <li><Link href="/about-test">About the Test</Link></li>
              <li><Link href="/preparation">Preparation</Link></li>
              <li>
                <a
                  href="https://ielts.org/legal/complaints-procedure"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Complaints
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about#contact">Contact</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Contact</h4>
            <ul>
              <li>📞 (+976) 7711-8899 (2)</li>
              <li>✉️ ielts@jet-english.mn</li>
              <li>📍 Max Centre 5th Floor, Sukhbaatar District, Ulaanbaatar</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 JET Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
