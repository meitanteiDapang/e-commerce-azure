import { useEffect, useState } from 'react'
import dapang1 from './assets/dapang1.jpg'
import dapang2 from './assets/dapang2.jpg'
import dapang3 from './assets/dapang3.jpg'
import dapang4 from './assets/dapang4.jpg'
import './App.css'

const gallery = [
  { src: dapang1, title: 'Lounge hour', desc: 'Dapang surveys the neon lobby kingdom.' },
  { src: dapang2, title: 'Golden nap', desc: 'Sunstruck corners for perfect cat naps.' },
  { src: dapang3, title: 'Night prowl', desc: 'After-dark patrols of the rooftop deck.' },
  { src: dapang4, title: 'Suite life', desc: 'Velvet cushions, velvet attitude.' },
]

function App() {
  const [apiInfo, setApiInfo] = useState({ loading: true, data: null, error: null })
  const [dataTest, setDataTest] = useState({ loading: true, data: [], error: null })

  useEffect(() => {
    const controller = new AbortController()

    const fetchInfo = async () => {
      try {
        const res = await fetch('/api/info', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setApiInfo({ loading: false, data, error: null })
      } catch (err) {
        if (err.name === 'AbortError') return
        setApiInfo({ loading: false, data: null, error: err })
      }
    }

    fetchInfo()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const res = await fetch('/api/datatest', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setDataTest({ loading: false, data, error: null })
      } catch (err) {
        if (err.name === 'AbortError') return
        setDataTest({ loading: false, data: [], error: err })
      }
    }

    fetchData()

    return () => controller.abort()
  }, [])

  const statusText = (() => {
    if (apiInfo.loading) return 'Checking connection...'
    if (apiInfo.error) return 'API unreachable'
    return 'API online'
  })()

  const versionText = (() => {
    if (apiInfo.loading) return 'Fetching version...'
    if (apiInfo.error) return apiInfo.error.message
    return `Version ${apiInfo.data?.version ?? 'unknown'}`
  })()

  return (
    <div className="page bright">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <header className="hero hero-bright">
        <div className="nav">
          <div className="logo">Dapang motel</div>
          <div className="nav-actions">
            <span className="pill loud">Dapang is a cat. The motel is his.</span>
            <span className="pill">Check-in 24/7 · Ocean breeze</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-left">
            <span
              className={`status-dot ${
                apiInfo.loading ? 'status-dot-pending' : apiInfo.error ? 'status-dot-error' : 'status-dot-ok'
              }`}
            />
            <div>
              <p className="label">api/info</p>
              <p className="value">{statusText}</p>
            </div>
          </div>
          <div className="status-right">
            <p className="eyebrow">Service</p>
            <p className="value">
              {apiInfo.loading && 'Loading...'}
              {apiInfo.error && 'Unknown'}
              {!apiInfo.loading && !apiInfo.error && apiInfo.data?.service}
            </p>
            <p className="subtext">{versionText}</p>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Boutique cat motel · Auckland shoreline</p>
            <h1>
              A louder, brighter, cozier stay—curated by <span>Dapang</span>, resident king
              of naps and neon.
            </h1>
            <p className="lede">
              Think pastel mornings, citrus sunsets, chrome accents, and a cat who owns the
              lobby. Rooms glow, vinyl hums, and the concierge knows where Dapang hides the
              best sunbeams.
            </p>
            <div className="meta meta-bright">
              <div>
                <strong>4.9</strong> Guest rating
              </div>
              <div>
                <strong>12</strong> Suites blessed by Dapang
              </div>
              <div>
                <strong>08</strong> Steps to sunrise walk
              </div>
            </div>
          </div>

          <div className="hero-card hero-card-bright">
            <div className="card-top">
              <div className="chip loud">Sunrise candy</div>
              <div className="chip dark">Dapang-approved</div>
            </div>
            <div className="hero-visual hero-visual-bright">
              <div className="hero-frame bright-frame">
                <div className="frame-inner">
                  <img src={dapang3} alt="Dapang exploring the deck" className="frame-img" />
                  <div className="frame-overlay">
                    <div className="frame-text">After-dark patrols</div>
                    <div className="frame-stats">
                      <span>Neon lamps</span>
                      <span>Ocean hush</span>
                      <span>Soft paws</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-caption">Chrome, candy glass, and cat-approved corners.</div>
            </div>
          </div>
        </div>
      </header>

      <section className="section highlights">
        <div className="section-header">
          <p className="eyebrow">Dapang manifesto</p>
          <h2>Everything is plush, bright, and unapologetically cozy.</h2>
          <p className="subtext">
            Cushions like clouds, citrus mist in the hallways, records spinning in the lounge,
            and sunbeams reserved for the feline founder.
          </p>
        </div>
        <div className="grid three">
          {gallery.map((item) => (
            <div className="highlight-card bright-card" key={item.title}>
              <div className="img-wrap">
                <img src={item.src} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section data-section">
        <div className="section-header">
          <p className="eyebrow">API data</p>
          <h2>Seeded users served from /api/datatest</h2>
          <p className="subtext">
            Pulled straight from Postgres via the new API route—handy for smoke tests and
            connectivity checks.
          </p>
        </div>

        <div className="data-card">
          {dataTest.loading && <p className="subtext">Loading seeded users...</p>}
          {dataTest.error && (
            <p className="subtext error-text">Failed to load users: {dataTest.error.message}</p>
          )}
          {!dataTest.loading && !dataTest.error && (
            <div className="data-list">
              <div className="data-row data-head">
                <span>ID</span>
                <span>Name</span>
                <span>Email</span>
              </div>
              {dataTest.data.length === 0 && (
                <div className="data-row">
                  <span>—</span>
                  <span>No users found</span>
                  <span>—</span>
                </div>
              )}
              {dataTest.data.map((user) => (
                <div className="data-row" key={user.id}>
                  <span>{user.id}</span>
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section contact contact-bright">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Location</p>
            <h2>Dapang motel · 21 Coastline Road, Auckland</h2>
            <p className="subtext">
              Follow the neon pawprints. Bright lobbies, ocean air, and a cat waiting to show
              you his favorite chair.
            </p>
          </div>
          <div className="contact-meta">
            <div>
              <p className="label">Phone</p>
              <p className="value">+64 9 555 4321</p>
            </div>
            <div>
              <p className="label">Email</p>
              <p className="value">stay@dapangmotel.com</p>
            </div>
            <div>
              <p className="label">Mascot</p>
              <p className="value">Dapang the cat</p>
            </div>
            <div>
              <p className="label">Vibe</p>
              <p className="value">Neon plush</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
