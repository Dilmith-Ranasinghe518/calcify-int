'use client';

import { useCountUp } from '@/hooks/useCountUp';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const { count, ref } = useCountUp(value, 2500);

  return (
    <div className="text-center px-4" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
        <span className="gradient-text">{count}</span>
        <span className="text-[var(--color-primary)]">{suffix}</span>
      </div>
      <p className="text-sm text-[var(--text-muted)] font-medium tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: 500, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'Countries Served' },
    { value: 99, suffix: '.9%', label: 'Client Satisfaction' },
    { value: 200, suffix: '+', label: 'Expert Engineers' },
  ];

  return (
    <section id="stats-bar" className="relative py-20 bg-radial-glow">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass rounded-2xl py-12 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
