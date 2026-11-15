import { useEffect, useRef, useState } from 'react'
import Chat from './Chat.jsx'
import { profile, stats, about, education, experience, leadership, skills } from './data.js'

const NAV = [['about', 'About'], ['experience', 'Experience'], ['leadership', 'Leadership'], ['skills', 'Skills'], ['contact', 'Contact']]

// Render **bold** segments
const Rich = ({ text }) =>
  text.split(/\*\*(.+?)\*\*/g).map((s, i) => (i % 2 ? <strong key={i}>{s}</strong> : s))

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: 0.15 })
    ref.current && io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}

function CountUp({ end, dec = 0, run }) {
  const [v, setV] = useState(end)
  useEffect(() => {
    if (!run) return
    const t0 = performance.now(); let id
    const step = t => { const p = Math.min((t - t0) / 1200, 1); setV(end * (1 - (1 - p) ** 3)); if (p < 1) id = requestAnimationFrame(step) }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [run, end])
  return v.toFixed(dec)
}

function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight) * 100)
      setScrolled(h.scrollTop > 10)
      let cur = ''
      NAV.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 160) cur = id })
      setActive(cur)
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  const toggleTheme = () => {
    const root = document.documentElement
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
    root.dataset.theme = dark ? 'light' : 'dark'
    try { localStorage.setItem('theme', root.dataset.theme) } catch {}
  }
  return <>
    <div id="progress" style={{ width: progress + '%' }} />
    <nav className={scrolled ? 'scrolled' : ''}><div className="wrap">
      <a className="brand" href="#top">{profile.name}<i>.</i></a>
      <div className="links">
        {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}
        <button className="theme" onClick={toggleTheme} aria-label="Toggle dark mode">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        </button>
      </div>
    </div></nav>
  </>
}

function SplitTitle() {
  const [ref, inView] = useInView()
  const words = [['Turning'], ['numbers'], ['into'], ['decisions.', true]]
  return <h1 ref={ref} className={`split ${inView ? 'in' : ''}`}>
    {words.map(([w, em], i) => <span className="w" key={i}>
      <span style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>{em ? <em>{w}</em> : w}</span>{' '}
    </span>)}
  </h1>
}

function HeroChart() {
  return <svg className="hero-chart" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--gold)" stopOpacity=".18" /><stop offset="1" stopColor="var(--gold)" stopOpacity="0" /></linearGradient></defs>
    {[100, 200, 300].map(y => <line key={y} x1="0" x2="1200" y1={y} y2={y} />)}
    <path className="area" d="M0 330 L120 300 L220 312 L330 250 L430 270 L540 200 L650 222 L760 160 L860 180 L980 110 L1080 128 L1200 60 L1200 400 L0 400Z" />
    <path className="line" d="M0 330 L120 300 L220 312 L330 250 L430 270 L540 200 L650 222 L760 160 L860 180 L980 110 L1080 128 L1200 60" />
  </svg>
}

function Portrait({ children }) {
  const [ref, inView] = useInView()
  const move = e => {
    if (matchMedia('(hover: none)').matches) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }
  const leave = () => { ref.current.style.transform = '' }
  return <figure ref={ref} onMouseMove={move} onMouseLeave={leave} className={`portrait reveal ${inView ? 'in' : ''}`}>{children}</figure>
}

function Marquee() {
  const items = ['Ernst & Young', 'Project Destined', 'FinBud AI', 'BIDV Bank', 'Beta Gamma Sigma', 'University of Illinois Chicago', 'Bloomberg Certified']
  return <div className="marquee" aria-hidden="true"><div className="track">
    {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
  </div></div>
}

function Timeline({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const on = () => {
      const r = ref.current.getBoundingClientRect()
      const p = Math.min(Math.max((innerHeight * .6 - r.top) / r.height, 0), 1)
      ref.current.style.setProperty('--p', p * 100 + '%')
    }
    addEventListener('scroll', on, { passive: true }); on()
    return () => removeEventListener('scroll', on)
  }, [])
  return <div className="timeline" ref={ref}><span className="fill" />{children}</div>
}

function Hero() {
  const [ref, inView] = useInView()
  return <header className="hero wrap" id="top">
    <HeroChart />
    <div className="hero-grid">
      <div>
        <Reveal className="kicker"><span className="dot" />{profile.kicker}</Reveal>
        <SplitTitle />
        <Reveal as="p" className="lead">{profile.lead}</Reveal>
        <Reveal className="cta">
          <a className="btn solid" href={`mailto:${profile.email}`}>Get in touch →</a>
          <a className="btn line" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
        </Reveal>
      </div>
      <Portrait>
        <img src={import.meta.env.BASE_URL + profile.photo} alt={`Portrait of ${profile.fullName}`} width="400" height="400" />
        <figcaption>
          <b>{profile.fullName}</b>
          <span>{profile.headline}</span>
          <span className="badge"><span className="dot" />{profile.seeking}</span>
        </figcaption>
      </Portrait>
    </div>
    <div ref={ref} className={`stats reveal ${inView ? 'in' : ''}`}>
      {stats.map(s => <div className="stat" key={s.tag}>
        <span className="mono">{s.tag}</span>
        <b><CountUp end={s.value} dec={s.dec} run={inView} />{s.suffix}</b>
        <span>{s.label}</span>
      </div>)}
    </div>
    <Marquee />
  </header>
}

const SecHead = ({ n, label, title }) =>
  <Reveal className="sec-head"><span className="mono">{n} / {label}</span><h2>{title}</h2></Reveal>

const Role = ({ r }) =>
  <Reveal as="article" className="role">
    <div className="when"><span className="mono">{r.when}</span>{r.sub}</div>
    <div>
      <div className="role-top"><h3>{r.company}</h3><span className="pill">{r.role}</span></div>
      <ul>{r.bullets.map((b, i) => <li key={i}><Rich text={b} /></li>)}</ul>
    </div>
  </Reveal>

export default function App() {
  return <>
    <Nav />
    <Hero />

    <section id="about"><div className="wrap">
      <SecHead n="01" label="ABOUT" title="A detail-driven analyst in the making." />
      <div className="about">
        <div className="spacer" />
        <Reveal className="text">{about.map((p, i) => <p key={i}>{p}</p>)}</Reveal>
        <Reveal as="aside" className="card">
          <h3>{education.school}</h3>
          <div className="meta">{education.degree}</div>
          <div className="gpa"><b>{education.gpa}</b><span className="meta">/ 4.00 · Dean's List</span></div>
          <div className="label">Coursework</div>
          <div className="tags">{education.coursework.map(c => <span className="tag" key={c}>{c}</span>)}</div>
          <div className="label">Certifications</div>
          <div className="tags">{education.certifications.map(c => <span className="tag" key={c}>{c}</span>)}</div>
        </Reveal>
      </div>
    </div></section>

    <section id="experience" style={{ background: 'var(--paper-2)' }}><div className="wrap">
      <SecHead n="02" label="EXPERIENCE" title="Where I've done the work." />
      <Timeline>{experience.map(r => <Role key={r.company} r={r} />)}</Timeline>
    </div></section>

    <section id="leadership"><div className="wrap">
      <SecHead n="03" label="LEADERSHIP" title="Beyond the internship." />
      <Timeline>{leadership.map(r => <Role key={r.company} r={r} />)}</Timeline>
    </div></section>

    <section id="skills" style={{ paddingTop: 0 }}><div className="wrap">
      <SecHead n="04" label="SKILLS" title="The toolkit." />
      <div className="skills">
        {skills.map((g, i) => <Reveal className="card" key={g.title}>
          <span className="num">{'ABC'[i]}.</span><h3>{g.title}</h3>
          <ul>{g.items.map(it => <li key={it}>{it}</li>)}</ul>
        </Reveal>)}
      </div>
    </div></section>

    <Reveal className="contact" id="contact">
      <h2>Let's build the <em>next model</em> together.</h2>
      <p>Open to finance internship and full-time opportunities in audit, FP&amp;A, treasury and investments.</p>
      <div className="cta">
        <a className="btn solid" href={`mailto:${profile.email}`}>{profile.email}</a>
        <a className="btn line" href={`tel:+1${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
        <a className="btn line" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </Reveal>
    <Chat />
    <footer className="wrap"><span>© 2026 {profile.name}</span><span>{profile.location}</span></footer>
  </>
}
