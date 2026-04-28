import Link from "next/link";
import styles from "@/styles/sections/heroHeader.module.css";

/**
 * Hover эффектгүй, зөвхөн shiny text хөдөлгөөнтэй CTA.
 */
export default function HeroRegisterButton({ href, label, className }) {
  return (
    <div className={styles.registerWrap}>
      <Link className={className} href={href}>
        <span className={styles.registerInner}>
          <span className={styles.registerLabel}>{label}</span>
        </span>
      </Link>
    </div>
  );
}
