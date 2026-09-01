import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const cx = (...c) => c.filter(Boolean).join(' ')

/* ------------------------------------------------------------------ */
/* Reveal-on-scroll. Falls back to visible when IO is unavailable and  */
/* is neutralised by prefers-reduced-motion in index.css.              */
/* ------------------------------------------------------------------ */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ '--d': `${delay}ms` }}
      className={cx('reveal', seen && 'is-in', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Small brass label above a heading. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-widest2 text-brass',
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ballRed" />
      {children}
    </span>
  )
}

/* Thin yellow rule interrupted by a ball marker. */
export function Rule({ tone = 'yellow', className = '' }) {
  const dot = tone === 'red' ? 'bg-ballRed' : 'bg-brass'
  return (
    <div className={cx('flex items-center gap-3', className)} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brass/45 to-brass/45" />
      <span className={cx('h-2 w-2 rounded-full', dot)} />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-brass/45 to-brass/45" />
    </div>
  )
}

/* Oversized ghosted running numeral used as a section index. */
export function Numeral({ children, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={cx('numeral select-none text-[5.5rem] sm:text-[8rem] lg:text-[11rem]', className)}
    >
      {children}
    </span>
  )
}

/* Section header: numeral + eyebrow + display heading + optional lede. */
export function SectionHead({ index, eyebrow, title, lede, align = 'left', className = '' }) {
  return (
    <header
      className={cx(
        'relative',
        align === 'center' ? 'text-center' : '',
        className,
      )}
    >
      {index && (
        <Numeral
          className={cx(
            'pointer-events-none absolute -top-10 -z-0 opacity-70 sm:-top-14 lg:-top-20',
            align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0',
          )}
        >
          {index}
        </Numeral>
      )}
      <div className="relative z-10">
        {eyebrow && <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest text-bone sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {lede && (
          <p
            className={cx(
              'mt-5 max-w-2xl text-base leading-relaxed text-boneDim sm:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {lede}
          </p>
        )}
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Buttons — one brass CTA, one ghost. Hover, focus, active, disabled. */
/* ------------------------------------------------------------------ */
const btnBase =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition duration-300 disabled:cursor-not-allowed disabled:opacity-45'

const variants = {
  primary:
    'bg-brass text-ink shadow-[0_10px_30px_-12px_rgba(217,162,74,0.9)] hover:bg-brassLit hover:shadow-[0_16px_40px_-14px_rgba(240,200,126,0.95)] active:translate-y-px',
  ghost:
    'border border-brass/40 text-bone hover:border-brass hover:bg-brass/10 active:translate-y-px',
  quiet: 'text-boneDim hover:text-brass',
}

export function Button({ variant = 'primary', className = '', children, arrow = false, ...rest }) {
  return (
    <button className={cx(btnBase, variants[variant], className)} {...rest}>
      {children}
      {arrow && (
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  )
}

export function LinkButton({ to, href, variant = 'primary', className = '', children, arrow = true, ...rest }) {
  const content = (
    <>
      {children}
      {arrow && (
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  )
  const cls = cx(btnBase, variants[variant], className)
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {content}
    </Link>
  )
}

/* Image that fades up once decoded, so the dark page never flashes white. */
export function Figure({ src, alt, className = '', imgClassName = '', priority = false, children }) {
  const [ready, setReady] = useState(false)
  const imgRef = useRef(null)

  // A cached image can finish decoding before React attaches onLoad, which
  // would otherwise leave it stuck at opacity 0.
  useEffect(() => {
    if (imgRef.current?.complete) setReady(true)
  }, [src])

  return (
    <figure className={cx('relative overflow-hidden bg-surface', className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : undefined}
        onLoad={() => setReady(true)}
        className={cx(
          'h-full w-full object-cover transition-[opacity,transform] duration-700',
          ready ? 'opacity-100' : 'opacity-0 scale-[1.03]',
          imgClassName,
        )}
      />
      {children}
    </figure>
  )
}

/* Compact page banner: full-bleed photograph, heavy scrim, type set low-left. */
export function PageHero({ img, alt, eyebrow, title, lede, meta = [] }) {
  return (
    <section className="grain relative isolate flex min-h-[58svh] items-end overflow-hidden pb-14 pt-36 sm:min-h-[62svh] lg:pb-20 lg:pt-44">
      <div className="absolute inset-0 -z-20">
        <Figure src={img} alt={alt} priority className="h-full w-full" />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-room via-room/80 to-room/45"
        aria-hidden="true"
      />
      <div
        className="light-pool absolute inset-0 -z-10"
        style={{ '--px': '22%', '--py': '10%' }}
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.88] tracking-tightest text-bone sm:text-6xl lg:text-8xl">
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-boneDim sm:text-lg">{lede}</p>
          </Reveal>
        )}
        {meta.length > 0 && (
          <Reveal delay={220}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-brass/20 pt-6 text-xs uppercase tracking-widest2 text-boneDim">
              {meta.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/* Horizontally scrolling, snap-aligned rail with keyboard-reachable
   nudge buttons. Used for the menu, the table lineup and the gallery. */
export function Rail({ label, children, className = '', gap = 'gap-5' }) {
  const ref = useRef(null)

  const nudge = (dir) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: 'smooth' })
  }

  return (
    <div className={cx('relative', className)}>
      <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 lg:flex">
        {[
          ['Scroll left', -1, 'rotate-180'],
          ['Scroll right', 1, ''],
        ].map(([title, dir, rot]) => (
          <button
            key={title}
            type="button"
            onClick={() => nudge(dir)}
            aria-label={title}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-brass/30 text-boneDim transition duration-300 hover:border-brass hover:bg-brass/10 hover:text-brass active:translate-y-px"
          >
            <Icon name="arrowRight" className={cx('h-4 w-4', rot)} />
          </button>
        ))}
      </div>
      <ul
        ref={ref}
        aria-label={label}
        className={cx(
          'rail -mx-5 flex snap-x overflow-x-auto px-5 pb-6 md:-mx-10 md:px-10',
          gap,
        )}
      >
        {children}
      </ul>
    </div>
  )
}

/* Price tag, used across services / menu. */
export function Price({ value, unit, className = '' }) {
  return (
    <p className={cx('font-display text-3xl leading-none text-brass sm:text-4xl', className)}>
      {value}
      {unit && <span className="ml-1 font-sans text-xs font-light tracking-wide text-boneDim">{unit}</span>}
    </p>
  )
}

export { cx }
