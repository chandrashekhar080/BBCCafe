import { Link } from 'react-router-dom'
import { contact, hours, navLinks, socials, venue } from '../data/site'
import Icon from './Icon'
import { Rule } from './ui'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brass/15 bg-ink">
      <div className="light-pool absolute inset-x-0 top-0 h-64" style={{ '--px': '18%' }} aria-hidden="true" />

      <div className="shell relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <p className="font-script text-6xl leading-none text-brass">BBC</p>
            <p className="mt-3 text-xs uppercase tracking-widest2 text-boneDim">
              {venue.fullName} · Est. {venue.since}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-boneDim">
              {venue.tagline} Snooker, parties and a kitchen that stays open, in {venue.city}.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/25 text-boneDim transition duration-300 hover:-translate-y-0.5 hover:border-brass hover:text-brass"
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.68rem] uppercase tracking-widest2 text-brass">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-sm text-boneDim transition-colors hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.68rem] uppercase tracking-widest2 text-brass">Hours</h2>
            <ul className="mt-5 space-y-4">
              {hours.map((h) => (
                <li key={h.days} className="text-sm">
                  <p className="text-bone">{h.days}</p>
                  <p className="text-boneDim">{h.time}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.68rem] uppercase tracking-widest2 text-brass">Find us</h2>
            <address className="mt-5 not-italic text-sm leading-relaxed text-boneDim">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-5 space-y-2 text-sm">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="text-boneDim transition-colors hover:text-brass">
                    {p}
                  </a>
                </li>
              ))}
              {contact.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="text-boneDim transition-colors hover:text-brass">
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule className="mt-14" />

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 text-xs text-boneDim sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {venue.fullName}, Indore. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-ballRed" aria-hidden="true" />
            Tables available tonight
          </p>
        </div>
      </div>
    </footer>
  )
}
