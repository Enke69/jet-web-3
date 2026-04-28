import styles from "@/styles/layout/topBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.contact}>
          <span>📞 (+976) 7711-8899 (2)</span>
          <span>✉️ ielts@jet-english.mn</span>
          <span>🕐 8:40 AM – 5:40 PM Mon–Fri</span>
        </div>
        <div className={styles.social}>
          <a
            href="https://www.facebook.com/Jettestcenter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/ieltsofficial_jet/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
