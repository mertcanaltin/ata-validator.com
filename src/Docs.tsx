import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Docs.css'

export default function Docs() {
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    setTocOpen(mq.matches)
    const handler = (e: MediaQueryListEvent) => setTocOpen(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <nav className="docs-nav">
        <Link to="/" className="docs-back">← Back to home</Link>
        <span className="docs-title">ata-validator docs</span>
      </nav>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <details className="docs-toc" open={tocOpen}>
            <summary>Contents</summary>
            <ul>
              <li><a href="#quick-start">Quick start</a></li>
              <li><a href="#what">What is ata</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#install">Installation</a></li>
              <li><a href="#api">API reference</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#compliance">Compliance</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </details>
        </aside>

        <main className="docs-content">
          <section id="quick-start" className="quick-start">
            <h1>Quick start</h1>
            <p>Install and validate your first schema.</p>

            <h3>Install</h3>
            <pre className="docs-code">{`npm install ata-validator`}</pre>

            <h3>Validate</h3>
            <pre className="docs-code">{`import { Validator } from 'ata-validator'

const v = new Validator({
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'integer' } }
})

const result = v.validate({ id: 42 })
// { valid: true, errors: [] }`}</pre>

            <p className="quick-note">
              Works without a native addon. Install takes care of prebuilt binaries when available, falls back to pure JS otherwise.
            </p>
          </section>

          <section id="what">
            <h2>What is ata</h2>
            <p>
              ata-validator is a JSON Schema validator for Draft 2020-12 and Draft 7. It
              compiles schemas into V8-optimized JavaScript, uses simdjson for JSON parsing
              and RE2 for pattern keywords, and falls back to a pure-JS engine when the
              native addon is unavailable.
            </p>
            <p>
              The goal is to be a drop-in, predictable validator for HTTP pipelines (Fastify),
              configuration files (Node.js core, <code>node.config.json</code>), and any
              Standard Schema V1 consumer. Correctness first, speed as a consequence.
            </p>
          </section>

          <section id="how">
            <h2>How it works</h2>
            <p>Two phases: compile once, validate many times.</p>
            <pre className="docs-code">{`Schema  ──compile──▶  Validator  ──validate(input)──▶  { valid, errors }`}</pre>
            <p>Where the speed comes from:</p>
            <ul>
              <li><strong>V8 codegen.</strong> Compiled validators are plain functions that V8 JITs like any other hot code.</li>
              <li><strong>simdjson.</strong> JSON parsing is offloaded to SIMD-accelerated C++ when a buffer is passed.</li>
              <li><strong>RE2.</strong> Pattern keywords run on a linear-time regex engine, immune to catastrophic backtracking.</li>
              <li><strong>Precompiled Validator.</strong> Reusing a single <code>Validator</code> instance across requests avoids compile overhead on the hot path.</li>
            </ul>
          </section>

          <section id="features">
            <h2>Features</h2>
            <p>Supported JSON Schema drafts, keywords, and formats.</p>

            <table className="docs-table">
              <thead>
                <tr><th>Area</th><th>Supported</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Drafts</strong></td>
                  <td>Draft 2020-12, Draft 7</td>
                </tr>
                <tr>
                  <td><strong>Keywords</strong></td>
                  <td>
                    type, properties, items, prefixItems, $ref, $dynamicRef, $anchor,
                    oneOf, anyOf, allOf, not, if/then/else, dependencies,
                    patternProperties, additionalProperties, contains, minContains,
                    maxContains, unevaluatedProperties, unevaluatedItems,
                    minLength, maxLength, minimum, maximum, multipleOf, enum, const
                  </td>
                </tr>
                <tr>
                  <td><strong>Formats</strong></td>
                  <td>date, date-time, time, email, uri, uri-reference, uuid, ipv4, ipv6, regex (RE2), hostname</td>
                </tr>
                <tr>
                  <td><strong>Extras</strong></td>
                  <td>Cross-schema $ref, recursion depth guard for circular refs, Standard Schema V1 compatibility, <code>__proto__</code>-safe const/enum comparison</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  )
}
