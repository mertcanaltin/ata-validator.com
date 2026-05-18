import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import codes from './error-codes.json'
import './ErrorCodePage.css'

type Entry = {
  code: string
  headline: string
  keyword: string | null
  format: string | null
  cause: string
  fix: string
}

const REGISTRY = codes as Record<string, Entry>

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    return <span key={i}>{part}</span>
  })
}

function githubAnchor(entry: Entry) {
  const slug = `${entry.code} ${entry.headline}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
  return `https://github.com/ata-core/ata-validator/blob/master/docs/error-codes.md#${slug}`
}

export default function ErrorCodePage() {
  const { code } = useParams<{ code: string }>()
  const normalized = (code || '').toUpperCase()
  const entry = REGISTRY[normalized]

  useEffect(() => {
    if (entry) {
      document.title = `${entry.code} ${entry.headline} | ata-validator`
    } else if (normalized) {
      document.title = `Unknown error code ${normalized} | ata-validator`
    } else {
      document.title = `Error codes | ata-validator`
    }
  }, [entry, normalized])

  if (!entry) {
    const all = Object.keys(REGISTRY).sort()
    const isIndex = !normalized
    return (
      <>
        <nav className="err-nav">
          <Link to="/" className="err-back">← Back to home</Link>
          <span className="err-title">ata-validator errors</span>
        </nav>
        <article className="err-article">
          <h1 className="err-heading">
            {isIndex ? 'Error code registry' : `Unknown code: ${normalized}`}
          </h1>
          <p className="err-body" style={{ marginBottom: 32 }}>
            {isIndex
              ? `ata-validator emits ${all.length} stable error codes. Click any to read its cause and fix.`
              : `ata-validator does not emit this code. The full registry of ${all.length} stable codes is below.`}
          </p>
          <ul className="err-index-grid">
            {all.map((c) => (
              <li key={c}>
                <Link to={`/e/${c}`}>
                  <code>{c}</code>
                  {REGISTRY[c].headline}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </>
    )
  }

  return (
    <>
      <nav className="err-nav">
        <Link to="/" className="err-back">← Back to home</Link>
        <span className="err-title">ata-validator errors</span>
      </nav>
      <article className="err-article">
        <p className="err-breadcrumb">
          <Link to="/e/">All error codes</Link>
          <span className="err-breadcrumb-sep">/</span>
          <span>{entry.code}</span>
        </p>

        <h1 className="err-heading">
          <span className="err-code">{entry.code}</span>
          {entry.headline}
        </h1>

        <p className="err-meta">
          Keyword <code>{entry.keyword}</code>
          {entry.format && (
            <>
              {' '}· Format <code>{entry.format}</code>
            </>
          )}
        </p>

        <h2>Cause</h2>
        <p className="err-body">{renderInline(entry.cause)}</p>

        <h2>Fix</h2>
        <p className="err-body">{renderInline(entry.fix)}</p>

        <footer className="err-footer">
          <p>
            Canonical URL of this page: <code>https://ata-validator.com/e/{entry.code}</code>.
            Referenced from <code>docUrl</code> on every <code>{entry.code}</code> error emitted by ata-validator.
          </p>
          <p>
            <a href={githubAnchor(entry)} target="_blank" rel="noopener noreferrer">
              Edit this page on GitHub →
            </a>
          </p>
        </footer>
      </article>
    </>
  )
}
