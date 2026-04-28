"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import styles from "@/styles/pages/bookIelts.module.css";

const months = [
  {
    label: "April 2026",
    year: 2026,
    monthIndex: 3,
    leading: [30, 31],
    days: 30,
  },
  {
    label: "May 2026",
    year: 2026,
    monthIndex: 4,
    leading: [27, 28, 29, 30],
    days: 31,
  },
  {
    label: "June 2026",
    year: 2026,
    monthIndex: 5,
    leading: [],
    days: 30,
  },
];

const isHighlightDay = (jsDay) => jsDay === 5 || jsDay === 6 || jsDay === 0;

const buildCells = (m) => {
  const cells = [];
  m.leading.forEach((n) => cells.push({ kind: "other", n }));
  for (let day = 1; day <= m.days; day++) {
    cells.push({
      kind: "day",
      n: day,
      iso: `${m.year}-${String(m.monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      jsDay: new Date(m.year, m.monthIndex, day).getDay(),
    });
  }
  while (cells.length % 7 !== 0) cells.push({ kind: "blank" });
  return cells;
};

const computeState = (cell, today) => {
  if (cell.kind !== "day") return cell.kind;
  const date = new Date(cell.iso);
  date.setHours(0, 0, 0, 0);

  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (cell.iso === todayIso) return "today";

  if (isHighlightDay(cell.jsDay)) {
    const daysBack = cell.jsDay === 5 ? 1 : cell.jsDay === 6 ? 2 : 3;
    const thursday = new Date(date);
    thursday.setDate(date.getDate() - daysBack);
    thursday.setHours(0, 0, 0, 0);
    if (thursday <= today) return "passed";
    return "highlight";
  }
  if (date < today) return "passed";
  return "day";
};

export default function TestDateCalendar() {
  const [today, setToday] = useState(null);

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
  }, []);

  const monthsWithCells = useMemo(
    () => months.map((m) => ({ ...m, cells: buildCells(m) })),
    []
  );

  return (
    <>
      <Reveal className={styles.calLegend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendHighlight}`} />
          <span>Test Day (Fri / Sat / Sun)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendToday}`} />
          <span>Today</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendPassed}`} />
          <span>Date Passed</span>
        </div>
      </Reveal>

      <Reveal className={styles.calMonths}>
        {monthsWithCells.map((m) => (
          <div key={m.label} className={styles.calMonth}>
            <div className={styles.calMonthTitle}>{m.label}</div>
            <div className={styles.calWeekHeaders}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className={styles.calCells}>
              {m.cells.map((cell, idx) => {
                if (cell.kind === "blank") return <span key={idx} />;
                if (cell.kind === "other")
                  return (
                    <span key={idx} className={styles.calOther}>
                      {cell.n}
                    </span>
                  );
                const state = today
                  ? computeState(cell, today)
                  : isHighlightDay(cell.jsDay)
                  ? "highlight"
                  : "day";
                const cls =
                  state === "highlight"
                    ? styles.calHighlight
                    : state === "today"
                    ? styles.calToday
                    : state === "passed"
                    ? styles.calPassed
                    : "";
                return (
                  <span key={idx} className={cls}>
                    {cell.n}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </Reveal>
    </>
  );
}
