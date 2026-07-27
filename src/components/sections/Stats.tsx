"use client";

import { stats } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";

export default function Stats() {
  return (
    <section className="border-b border-line px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        {/* Translucent surfaces so the Lattice reads through — Section 2. */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden bg-line/50 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-panel/55 px-6 py-10 text-center backdrop-blur-[10px] sm:py-12"
            >
              <dd className="font-mono text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
              <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
