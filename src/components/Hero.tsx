import { useState } from "react";

const heroTabs = [
  {
    name: "Validation",
    title: "validate(obj) — Valid Data",
    entries: [
      { label: "ata", value: "8.5 ns", time: 8.5, highlight: true },
      { label: "ajv", value: "37 ns", time: 37 },
      { label: "typebox", value: "49 ns", time: 49 },
      { label: "valibot", value: "314 ns", time: 314 },
      { label: "zod", value: "360 ns", time: 360 },
    ],
  },
  {
    name: "Invalid",
    title: "validate(obj) — Invalid Data",
    entries: [
      { label: "typebox", value: "3.5 ns", time: 3.5, highlight: false },
      { label: "ata", value: "62 ns", time: 62, highlight: true },
      { label: "ajv", value: "101 ns", time: 101 },
      { label: "valibot", value: "839 ns", time: 839 },
      { label: "zod", value: "11,500 ns", time: 11500 },
    ],
  },
  {
    name: "Cold Start",
    title: "First Validation (compile + validate)",
    entries: [
      { label: "ata", value: "1.3 us", time: 1.3, highlight: true },
      { label: "typebox", value: "51.7 us", time: 51.7 },
      { label: "ajv", value: "1,060 us", time: 1060 },
    ],
  },
  {
    name: "Compilation",
    title: "Schema Compilation",
    entries: [
      { label: "ata", value: "467 ns", time: 467, highlight: true },
      { label: "typebox", value: "50,930 ns", time: 50930 },
      { label: "ajv", value: "1,140,000 ns", time: 1140000 },
    ],
  },
  {
    name: "Security",
    title: "ReDoS Pattern: ^(a+)+$",
    entries: [
      { label: "ata (RE2)", value: "0.3 ms", time: 0.3, highlight: true },
      { label: "ajv (regex)", value: "765 ms", time: 765 },
    ],
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const tab = heroTabs[active];
  const maxTime = Math.max(...tab.entries.map((e) => e.time));

  return (
    <section className="hero">
      <div className="hero-glow" />
      <div>
        <div className="hero-badge">Powered by simdjson & RE2</div>
        <h1>
          Ultra-fast JSON Schema <span className="accent">Validator</span>
        </h1>
        <p className="hero-desc">
          Native C++ validator built on <strong>simdjson</strong> and{" "}
          <strong>RE2</strong>. Hybrid JS codegen with V8 TurboFan
          optimizations, 4.3x faster validation, 2,443x faster
          compilation, 812x faster cold start.
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">
            Get Started
          </a>
          <a
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            className="btn btn-secondary"
          >
            Star on GitHub
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">4.3x</span>
            <span className="stat-label">Faster Validation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2,443x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2391x</span>
            <span className="stat-label">ReDoS Immune</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.6%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
      <div>
        <div className="hero-chart">
          <div className="hero-chart-tabs">
            {heroTabs.map((t, i) => (
              <button
                key={t.name}
                className={`hero-chart-tab ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="hero-chart-body">
            <h3 className="hero-chart-title">{tab.title}</h3>
            <div className="hero-chart-bars">
              {tab.entries.map((entry) => (
                <div key={entry.label} className="hero-chart-row">
                  <div className="hero-chart-label">
                    <strong>{entry.label}</strong>
                  </div>
                  <div className="hero-chart-bar-wrap">
                    <div
                      className={`hero-chart-bar ${entry.highlight ? "highlight" : ""}`}
                      style={{
                        width: `${Math.max((entry.time / maxTime) * 100, 2)}%`,
                      }}
                    />
                  </div>
                  <div className="hero-chart-value">{entry.value}</div>
                </div>
              ))}
            </div>
          </div>
          <a
            href="https://github.com/ata-core/ata-validator/tree/master/benchmark"
            target="_blank"
            className="hero-chart-link"
          >
            View benchmark →
          </a>
        </div>
      </div>
    </section>
  );
}
