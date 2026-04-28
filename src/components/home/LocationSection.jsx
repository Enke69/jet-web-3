import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/home/locationSection.module.css";

export default function LocationSection() {
  return (
    <section className={styles.root}>
      <div className="container">
        <SectionHeader badge="Find Us" title="Visit Our Centre" />
        <Reveal className={styles.wrapper}>
          <div className={styles.info}>
            <h3>JET Institute</h3>
            <p>📍 Max Centre 5th Floor, Sukhbaatar District, 8th Khoroo, Ulaanbaatar-211238</p>
            <p>📞 (+976) 7711-8899 (2)</p>
            <p>✉️ ielts@jet-english.mn</p>
            <p>🕐 8:40 AM – 5:40 PM Mon–Fri</p>
          </div>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d673.6!2d106.925142!3d47.9183666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693001af90d91%3A0xc7d1c8880bf1b4db!2sJET+Test+Center!5e0!3m2!1sen!2smn!4v1699000000000!5m2!1sen!2smn"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JET Institute location — Max Centre 5th Floor, Sukhbaatar District, Ulaanbaatar"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
