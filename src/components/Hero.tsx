import { CodeWindow } from "./CodeWindow";

export function Hero() {
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
          optimizations, 793x faster first validation, 2,067x faster compilation.
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
            <span className="stat-value">2,067x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">793x</span>
            <span className="stat-label">Faster First Validation</span>
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
        <CodeWindow title="bench.txt (mitata)">{`=== ata vs ajv (process-isolated) ===

isValidObject (boolean check):
  ata      27.8 ns/iter   36.0M ops/sec
  ajv     105.9 ns/iter    9.4M ops/sec
  ata is 3.8x faster

First Validation (compile + validate):
  ata      1.63 us/iter    614K ops/sec
  ajv      1.29 ms/iter      775 ops/sec
  ata is 793x faster

Schema Compilation:
  ata     617.5 ns/iter   1.62M ops/sec
  ajv      1.28 ms/iter      781 ops/sec
  ata is 2,067x faster`}</CodeWindow>
      </div>
    </section>
  );
}
