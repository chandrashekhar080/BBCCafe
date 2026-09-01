import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, contact } from '../data/site'
import Icon from './Icon'
import { cx } from './ui'

function Monogram({ className = '' }) {
  return (
    <Link
      to="/"
      className={cx('group flex items-baseline gap-2.5', className)}
      aria-label="BBC Billiards Bar Cafe — home"
    >
      <span className="font-script text-4xl leading-none text-brass transition-colors duration-300 group-hover:text-brassLit">
        BBC
      </span>
      <span className="hidden text-[0.6rem] uppercase leading-tight tracking-widest2 text-boneDim sm:block">
        Billiards
        <br />
        Bar Cafe
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isHashLink = (to) => to.includes('#')

  const linkClass = ({ isActive }) =>
    cx(
      'link-underline text-sm tracking-wide transition-colors duration-300',
      isActive ? 'text-brass' : 'text-boneDim hover:text-bone',
    )

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-brass/15 bg-room/90 py-3 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-ink/85 via-ink/45 to-transparent py-5',
      )}
    >
      <nav className="shell flex items-center justify-between gap-6" aria-label="Primary">
        <Monogram />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) =>
            isHashLink(l.to) ? (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-sm tracking-wide text-boneDim transition-colors duration-300 hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
            className="hidden items-center gap-2 text-sm text-boneDim transition-colors hover:text-brass md:inline-flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {contact.phones[0]}
          </a>
          <Link
            to="/#book"
            className="hidden rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink transition duration-300 hover:bg-brassLit active:translate-y-px sm:inline-block"
          >
            Book a table
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="rounded-full border border-brass/30 p-2.5 text-bone transition hover:border-brass hover:bg-brass/10 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cx(
          'grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 lg:hidden',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0">
          <ul className="shell flex flex-col gap-1 border-t border-brass/15 bg-room/95 py-6 backdrop-blur-md">
            {navLinks.map((l, i) => (
              <li key={l.to} style={{ transitionDelay: `${i * 40}ms` }}>
                <Link
                  to={l.to}
                  className="flex items-baseline gap-4 py-3 font-display text-3xl tracking-tightest text-bone transition-colors hover:text-brass"
                >
                  <span className="font-sans text-[0.65rem] tracking-widest2 text-brass/75">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <Link
                to="/#book"
                className="inline-flex w-full items-center justify-center rounded-full bg-brass px-6 py-3.5 text-sm font-medium text-ink"
              >
                Book a table
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
