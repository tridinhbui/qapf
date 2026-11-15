import { useEffect, useRef, useState } from 'react'
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

function Hero() {
  const [ref, inView] = useInView()
  return <header className="hero wrap" id="top">
    <Reveal className="kicker"><span className="dot" />{profile.kicker}</Reveal>
    <Reveal as="h1">Turning numbers into <em>decisions</em>.</Reveal>
    <Reveal as="p" className="lead">{profile.lead}</Reveal>
    <Reveal className="cta">
      <a className="btn solid" href={`mailto:${profile.email}`}>Get in touch →</a>
      <a className="btn line" href="#experience">View experience</a>
    </Reveal>
    <div ref={ref} className={`stats reveal ${inView ? 'in' : ''}`}>
      {stats.map(s => <div className="stat" key={s.tag}>
        <span className="mono">{s.tag}</span>
        <b><CountUp end={s.value} dec={s.dec} run={inView} />{s.suffix}</b>
        <span>{s.label}</span>
      </div>)}
    </div>
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
      {experience.map(r => <Role key={r.company} r={r} />)}
    </div></section>

    <section id="leadership"><div className="wrap">
      <SecHead n="03" label="LEADERSHIP" title="Beyond the internship." />
      {leadership.map(r => <Role key={r.company} r={r} />)}
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
    <footer className="wrap"><span>© 2026 {profile.name}</span><span>{profile.location}</span></footer>
  </>
}
