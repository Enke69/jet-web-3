import styles from "@/styles/sections/heroArcs.module.css";

/**
 * Зүүн доодоосоо толигдох нимгэн дугуй нум — зурган дэвсгэрийн нэг хэсэг.
 */
const RADII = [80, 150, 220, 300, 390, 500, 620, 750, 900, 1100, 1300, 1500, 1700, 2000];

export default function HeroArcs() {
  return (
    <div className={styles.wrap} aria-hidden>
      <svg
        className={styles.svg}
        viewBox="0 0 2000 1400"
        preserveAspectRatio="xMinYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Дэвсгэр</title>
        <g
          fill="none"
          stroke="var(--app-arc-stroke, rgba(180, 155, 160, 0.35))"
          strokeWidth="1.15"
        >
          {RADII.map((r) => (
            <path
              key={r}
              d={`M 0 ${1400 - r} A ${r} ${r} 0 0 1 ${r} 1400`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
