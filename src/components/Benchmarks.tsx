import { BenchCard } from './BenchCard'

export function Benchmarks() {
  return (
    <section id="benchmarks-section" className="benchmarks">
      <div className="bench-header">
        <div className="section-kicker">Performance</div>
        <h2 className="section-title-xl gradient-text">Fast where it matters.</h2>
        <p className="section-sub">
          Every number below is reproducible with{' '}
          <a
            href="https://github.com/ata-core/ata-validator/tree/master/benchmark"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>npm run bench</code>
          </a>{' '}
          on the same machine, same Node version. Hand-picked schemas covering
          cold start, valid path, invalid path, and a complex composition case.
        </p>
      </div>

      <div className="bench-layout">
        <div className="bench-stats">
          <div>
            <div className="bench-stat-value">246x</div>
            <div className="bench-stat-label">
              faster schema compile. <strong>6 µs</strong> in ata vs <strong>1.5 ms</strong> in AJV.
              A 10-route Fastify app boots in <strong>0.5 ms</strong> instead of <strong>12 ms</strong>.
            </div>
          </div>
          <div>
            <div className="bench-stat-value">7 ns</div>
            <div className="bench-stat-label">
              per <code>validate(obj)</code> on the valid path. 5x faster than the
              next non-ata validator.
            </div>
          </div>
          <div>
            <div className="bench-stat-value">0.93 ns</div>
            <div className="bench-stat-label">
              per <code>isValid(obj)</code> first-fail on invalid data. Subnanosecond,
              fastest in class.
            </div>
          </div>
          <div>
            <div className="bench-stat-value">56x</div>
            <div className="bench-stat-label">
              smaller bundle. <strong>955 B</strong> AOT-compiled validator gzipped
              vs <strong>52.7 KB</strong> for the AJV runtime. Tree-shakeable, zero
              dependency in the output.
            </div>
          </div>
        </div>

        <BenchCard />
      </div>
    </section>
  )
}
