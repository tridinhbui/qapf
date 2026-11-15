import { useEffect, useRef, useState } from 'react'
import { profile, education, experience, leadership, skills } from './data.js'

// Simulated résumé assistant: keyword matching over data.js, no network calls.
const strip = s => s.replace(/\*\*/g, '')
const roleText = r => `**${r.company}** — ${r.role} (${r.when.replace(' · ', ', ')}${r.sub ? ', ' + r.sub : ''}):\n` + r.bullets.map(b => '• ' + strip(b)).join('\n')

const INTENTS = [
  { k: ['hi', 'hello', 'hey', 'xin chào', 'chào'], a: () => `Hi! I'm Anh's résumé assistant. Ask me about her experience, education, skills, or how to reach her.` },
  { k: ['ey', 'ernst', 'audit', 'assurance', 'big four', 'big 4'], a: () => roleText(experience[0]) },
  { k: ['project destined', 'real estate', 'private equity', 'pe ', 'multifamily', 'irr', 'pro forma', 'underwrit'], a: () => roleText(experience[1]) },
  { k: ['finbud', 'fp&a', 'fpa', 'analyst intern', 'fintech', 'automat'], a: () => roleText(experience[2]) },
  { k: ['bidv', 'treasury', 'bank', 'liquidity', 'cash'], a: () => roleText(experience[3]) },
  { k: ['portfolio', 'equity research', 'stock', 'investment rec', 'valuation'], a: () => roleText(leadership.find(l => l.company.includes('Portfolio'))) },
  { k: ['beta gamma', 'honor', 'award'], a: () => `Anh is a member of **Beta Gamma Sigma** (since 2026), the honor society for top business students at AACSB-accredited schools. She's also on the Dean's List with a 3.90 GPA.` },
  { k: ['gpa', 'grade', 'education', 'school', 'uic', 'university', 'study', 'major', 'degree', 'graduat'], a: () => `Anh studies **Finance (B.S.)** at the ${education.school}, ${education.degree.split(' · ')[1]}. GPA **${education.gpa}/4.00**, Dean's List, Beta Gamma Sigma.` },
  { k: ['course', 'class'], a: () => `Relevant coursework: ${education.coursework.join(', ')}.` },
  { k: ['certif', 'bloomberg', 'ibm'], a: () => `Certifications: ${education.certifications.join(' and ')}.` },
  { k: ['excel', 'sql', 'tool', 'power bi', 'tableau', 'anaplan', 'software', 'tech'], a: () => `Tools: ${skills[2].items.join(', ')}.` },
  { k: ['skill', 'strength', 'good at', 'model'], a: () => skills.map(g => `**${g.title}:** ${g.items.join(', ')}`).join('\n') },
  { k: ['experience', 'intern', 'work', 'job', 'background', 'resume', 'résumé', 'cv'], a: () => `Anh has completed 4 finance internships:\n` + experience.map(r => `• **${r.company}** — ${r.role} (${r.when})`).join('\n') + `\nAsk about any of them for details.` },
  { k: ['looking', 'seeking', 'available', 'summer', '2027', 'opportunit', 'hire', 'hiring', 'role'], a: () => `Anh is exploring **Summer 2027** opportunities in corporate finance, FP&A, financial analysis, finance strategy, and investment roles.` },
  { k: ['contact', 'email', 'reach', 'phone', 'linkedin', 'connect'], a: () => `You can reach Anh at **${profile.email}** or ${profile.phone}, or connect on LinkedIn: ${profile.linkedin}` },
  { k: ['who', 'about', 'yourself', 'introduce', 'summary'], a: () => `${profile.fullName} is a Finance junior at UIC (3.90 GPA) with experience at EY, FinBud AI, BIDV Bank, and Project Destined. She focuses on financial modeling, variance analysis, and decision-ready reporting.` },
  { k: ['why', 'fit', 'should we'], a: () => `In short: hands-on experience across audit, FP&A, treasury and real estate PE; proven impact (20+ hours saved per reporting cycle, 25% faster reporting); strong academics (3.90 GPA, Beta Gamma Sigma).` },
  { k: ['thank', 'thanks', 'cảm ơn'], a: () => `You're welcome! Feel free to email Anh at ${profile.email}.` },
]

const SUGGESTIONS = ['Tell me about Anh', 'What did she do at EY?', 'Key skills?', 'Is she available for Summer 2027?', 'How can I contact her?']

function answer(q) {
  const t = ' ' + q.toLowerCase() + ' '
  let best = null, score = 0
  for (const it of INTENTS) {
    const s = it.k.reduce((n, k) => n + (t.includes(k) ? k.length : 0), 0)
    if (s > score) { score = s; best = it }
  }
  return best ? best.a() : `I'm not sure about that one. Try asking about Anh's experience, education, skills, availability, or contact info — or email her at ${profile.email}.`
}

const Rich = ({ text }) => text.split('\n').map((line, i) =>
  <p key={i}>{line.split(/\*\*(.+?)\*\*/g).map((s, j) => j % 2 ? <strong key={j}>{s}</strong> : s)}</p>)

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: `Hi! I'm a résumé assistant for **${profile.fullName}**. What would you like to know?` }])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const body = useRef(null)
  useEffect(() => { body.current && (body.current.scrollTop = body.current.scrollHeight) }, [msgs, typing, open])

  const ask = q => {
    if (!q.trim() || typing) return
    setMsgs(m => [...m, { from: 'me', text: q }]); setInput(''); setTyping(true)
    const a = answer(q)
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { from: 'bot', text: a }]) }, 500 + Math.min(a.length * 6, 1200))
  }

  return <>
    <button className={`chat-fab ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)} aria-label={open ? 'Close chat' : 'Ask about my résumé'}>
      {open ? '×' : <><span className="pulse" />Ask about my résumé</>}
    </button>
    <div className={`chat ${open ? 'show' : ''}`} role="dialog" aria-label="Résumé assistant">
      <header>
        <img src={import.meta.env.BASE_URL + profile.photo} alt="" />
        <div><b>Résumé Assistant</b><span><i className="online" />Answers from Anh's résumé</span></div>
      </header>
      <div className="chat-body" ref={body}>
        {msgs.map((m, i) => <div key={i} className={`msg ${m.from}`}><Rich text={m.text} /></div>)}
        {typing && <div className="msg bot typing"><span /><span /><span /></div>}
      </div>
      <div className="chips">{SUGGESTIONS.map(s => <button key={s} onClick={() => ask(s)}>{s}</button>)}</div>
      <form onSubmit={e => { e.preventDefault(); ask(input) }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about experience, skills…" aria-label="Your question" />
        <button type="submit" aria-label="Send">↑</button>
      </form>
    </div>
  </>
}
