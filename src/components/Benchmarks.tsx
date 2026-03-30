import { useState } from 'react'

type BenchEntry = {
  label: string
  value: string
  time: number // normalized for bar width
  highlight?: boolean
}

type BenchTab = {
  name: string
  title: string
  subtitle: string
  entries: BenchEntry[]
  link: string
}

const tabs: BenchTab[] = [
  {
    name: 'Valid',
    title: 'validate(obj) — Valid Data',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_mitata.js',
    entries: [
      { label: 'ata', value: '8.5 ns', time: 8.5, highlight: true },
      { label: 'ajv', value: '37 ns', time: 37 },
      { label: 'typebox', value: '49 ns', time: 49 },
      { label: 'valibot', value: '314 ns', time: 314 },
      { label: 'zod', value: '360 ns', time: 360 },
    ],
  },
  {
    name: 'Invalid',
    title: 'validate(obj) — Invalid Data',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_mitata.js',
    entries: [
      { label: 'typebox', value: '3.5 ns', time: 3.5 },
      { label: 'ata', value: '62 ns', time: 62, highlight: true },
      { label: 'ajv', value: '101 ns', time: 101 },
      { label: 'valibot', value: '839 ns', time: 839 },
      { label: 'zod', value: '11,500 ns', time: 11500 },
    ],
  },
  {
    name: 'Cold Start',
    title: 'First Validation (compile + validate)',
    subtitle: 'Time per cold start, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_mitata.js',
    entries: [
      { label: 'ata', value: '1.3 us', time: 1.3, highlight: true },
      { label: 'typebox', value: '51.7 us', time: 51.7 },
      { label: 'ajv', value: '1,060 us', time: 1060 },
    ],
  },
  {
    name: 'Compilation',
    title: 'Schema Compilation',
    subtitle: 'Time per compilation, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_mitata.js',
    entries: [
      { label: 'ata', value: '467 ns', time: 467, highlight: true },
      { label: 'typebox', value: '50,930 ns', time: 50930 },
      { label: 'ajv', value: '1,140,000 ns', time: 1140000 },
    ],
  },
  {
    name: 'Security',
    title: 'ReDoS Pattern: ^(a+)+$',
    subtitle: 'Execution time in milliseconds (lower is better)',
    link: 'https://github.com/ata-core/ata-validator',
    entries: [
      { label: 'ata (RE2)', value: '0.3 ms', time: 0.3, highlight: true },
      { label: 'ajv (regex)', value: '765 ms', time: 765 },
    ],
  },
]

export function Benchmarks() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  const maxTime = Math.max(...tab.entries.map(e => e.time))

  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon. Process-isolated with <a href="https://github.com/evanwashere/mitata" target="_blank">mitata</a>.
      </p>

      <div className="bench-chart">
        <div className="bench-tabs">
          {tabs.map((t, i) => (
            <button
              key={t.name}
              className={`bench-tab ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="bench-chart-body">
          <h3 className="bench-chart-title">{tab.title}</h3>
          <p className="bench-chart-subtitle">{tab.subtitle}</p>

          <div className="bench-chart-bars">
            {tab.entries.map((entry) => (
              <div key={entry.label} className="bench-chart-row">
                <div className="bench-chart-label">
                  <strong>{entry.label}</strong>
                </div>
                <div className="bench-chart-bar-wrap">
                  <div
                    className={`bench-chart-bar ${entry.highlight ? 'highlight' : ''}`}
                    style={{ width: `${Math.max((entry.time / maxTime) * 100, 2)}%` }}
                  />
                </div>
                <div className="bench-chart-value">{entry.value}</div>
              </div>
            ))}
          </div>
        </div>

        <a href={tab.link} target="_blank" className="bench-chart-link">
          View benchmark →
        </a>
      </div>
    </section>
  )
}
