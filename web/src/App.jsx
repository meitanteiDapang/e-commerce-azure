import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [roomTypes, setRoomTypes] = useState({ loading: true, data: [], error: null })

  useEffect(() => {
    const controller = new AbortController()

    const fetchRoomTypes = async () => {
      try {
        const res = await fetch('/api/room-types', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setRoomTypes({ loading: false, data, error: null })
      } catch (err) {
        if (err.name === 'AbortError') return
        setRoomTypes({ loading: false, data: [], error: err })
      }
    }

    fetchRoomTypes()

    return () => controller.abort()
  }, [])

  const heroImage = roomTypes.data[2]?.imageUrl || roomTypes.data[0]?.imageUrl || ''

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
                  {heroImage ? (
                    <img src={heroImage} alt="Featured room" className="frame-img" />
                  ) : (
                    <div className="frame-img frame-fallback">Loading room...</div>
                  )}
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
        {roomTypes.loading && <p className="subtext">Loading room types...</p>}
        {roomTypes.error && (
          <p className="subtext error-text">Failed to load room types: {roomTypes.error.message}</p>
        )}
        {!roomTypes.loading && !roomTypes.error && (
          <div className="grid three">
            {roomTypes.data.slice(0, 4).map((room) => (
              <div className="highlight-card bright-card" key={room.id}>
                <div className="img-wrap">
                  <img src={room.imageUrl} alt={room.typeName} />
                </div>
                <h3>{room.typeName}</h3>
                <p>
                  {room.bedNumber} beds · ${room.price}
                </p>
              </div>
            ))}
          </div>
        )}
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
