"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

const items = [
  { label: "Global Partners", value: 45 },
  { label: "Countries Reached", value: 120 },
  { label: "Initiatives", value: 28 },
  { label: "Publications", value: 160 },
];

function CountUp({
  end,
  start = 0,
  duration = 1.6,
  inView = false,
}: {
  end: number;
  start?: number;
  duration?: number;
  inView: boolean;
}) {
  const mv = useMotionValue(start);
  const [val, setVal] = useState(start);

  useEffect(() => {
    const controls = mv.on("change", (v) => setVal(Math.round(v)));
    return () => controls();
  }, [mv]);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, end, { duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, end, duration, mv]);

  return <span>{val}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center"
    >
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08 }}
        >
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            <CountUp end={it.value} inView={inView} />+
          </div>
          <div className="mt-1 text-sm font-medium text-white/70">
            {it.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
