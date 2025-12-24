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
