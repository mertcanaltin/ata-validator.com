import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BenchCard } from './BenchCard'

const INSTALL_CMD = 'npm install ata-validator'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable; ignore silently */
    }
  }

  return (
    <section id="benchmarks" className="hero">
      <div className="hero-grid" aria-hidden />

      <div className="hero-content">
        <div className="hero-badge badge-ocean">Powered by simdjson &amp; RE2</div>

        <h1 className="hero-title">
          <span className="gradient-text">
            First-class TypeScript.<br />
            Zero-cost validation.<br />
            Compiled JSON Schema.
          </span>
        </h1>

        <p className="hero-desc">
          Generic <strong>Validator&lt;T&gt;</strong> composes with TypeBox, Zod-from-JSON-Schema, and Valibot.
          AOT compile your schemas to per-schema ESM modules with zero validator dependency in your bundle.
          Optional runtime API for dynamic schemas.
        </p>

        <div className="hero-buttons">
          <a href="#quickstart" className="btn-gradient">Get Started</a>
          <a
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            ★ Star on GitHub
          </a>
          <Link to="/docs" className="btn btn-secondary btn-mobile-only">Docs</Link>
        </div>

        <div className="hero-install-block">
          <div className="hero-install-label">Install ata-validator</div>
          <div className="hero-install">
            <span className="hero-install-prompt" aria-hidden>$</span>
            <code className="hero-install-cmd">{INSTALL_CMD}</code>
            <button
              type="button"
              className="hero-install-copy"
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy install command'}
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="hero-card">
        <BenchCard />
      </div>
    </section>
  )
}
