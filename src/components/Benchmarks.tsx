import { BenchCard } from './BenchCard'

const STATS = [
  {
    headline: '246x',
    caption: 'faster schema compile',
    detail: (
      <>
        <strong>6 µs</strong> in ata vs <strong>1.5 ms</strong> in AJV. A 10-route
        Fastify app boots in <strong>0.5 ms</strong> instead of <strong>12 ms</strong>.
      </>
    ),
  },
  {
    headline: '7 ns',
    caption: 'per validate on the valid path',
    detail: (
      <>
        <code>validate(obj)</code> on hot data. <strong>5x faster</strong> than the
        next non-ata validator.
      </>
    ),
  },
  {
    headline: '0.93 ns',
    caption: 'first-fail on invalid data',
    detail: (
      <>
        <code>isValid(obj)</code> short-circuits at the first failed keyword.
        Subnanosecond, fastest in class.
      </>
    ),
  },
  {
    headline: '56x',
    caption: 'smaller browser bundle',
    detail: (
      <>
        <strong>955 B</strong> AOT-compiled validator gzipped vs{' '}
        <strong>52.7 KB</strong> for the AJV runtime. Tree-shakeable, zero
        dependency in the output.
      </>
    ),
  },
]

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

      <div className="bench-stat-grid">
        {STATS.map((s) => (
          <div key={s.headline} className="bench-stat-card">
            <div className="bench-stat-value">{s.headline}</div>
            <div className="bench-stat-caption">{s.caption}</div>
            <p className="bench-stat-detail">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="bench-card-wrap">
        <BenchCard />
      </div>
    </section>
  )
}
