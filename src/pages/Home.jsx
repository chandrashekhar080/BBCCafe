import { Link } from 'react-router-dom'
import {
  about,
  contact,
  highlights,
  hours,
  pillars,
  reviews,
  stats,
  topMenu,
  venue,
  venueImages,
} from '../data/site'
import BookTableForm from '../components/BookTableForm'
import Icon from '../components/Icon'
import {
  Eyebrow,
  Figure,
  LinkButton,
  Numeral,
  Price,
  Rail,
  Reveal,
  Rule,
  SectionHead,
} from '../components/ui'

/* ------------------------------------------------------------------ */
/* Hero — asymmetric: editorial type left, venue photograph bleeding    */
/* off the right edge, warm light pooling between them.                 */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[92svh] lg:pb-24 lg:pt-40">
      {/* Desktop bleed image sits underneath the light pool so the two blend. */}
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-[54%] lg:block xl:w-[52%]">
        <Figure
          src={venueImages.hero.img}
          alt={venueImages.hero.alt}
          priority
          className="h-full w-full"
          imgClassName="object-center"
        />
      </div>

      {/* One scrim across the whole section, so the photograph has no visible
          left edge — it simply emerges out of the dark. */}
      <div
        className="absolute inset-0 -z-10 hidden lg:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(90deg,#0C0B09 0%,#0C0B09 40%,rgba(12,11,9,.97) 50%,rgba(12,11,9,.72) 63%,rgba(12,11,9,.3) 82%,rgba(12,11,9,.12) 100%)',
        }}
      />

      <div
        className="light-pool absolute inset-0 -z-10"
        style={{ '--px': '58%', '--py': '4%' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-room to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative lg:pr-[48%]">
        <Reveal>
          <Eyebrow>
            {venue.city} · since {venue.since}
          </Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 font-display text-[3.25rem] leading-[0.86] tracking-tightest text-bone sm:text-7xl lg:text-[5.75rem] xl:text-[6.5rem]">
            The room
            <br />
            where Indore
            <br />
            <em className="not-italic text-brass">stays late.</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-boneDim sm:text-lg">
            Twelve full-size snooker tables, a party floor you can take over for the night, and a
            kitchen that keeps cooking long after the rest of Vijay Nagar has shut.
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10 flex flex-wrap items-center gap-3">
          <LinkButton to="/#book">Book a table</LinkButton>
          <LinkButton to="/snooker" variant="ghost">
            See the tables
          </LinkButton>
        </Reveal>

        {/* Mobile / tablet image */}
        <Reveal delay={120} className="mt-12 lg:hidden">
          <div className="relative">
            <Figure
              src={venueImages.hero.img}
              alt={venueImages.hero.alt}
              priority
              className="aspect-[5/4] w-full rounded-2xl sm:aspect-[16/10]"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-brass/25"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        <Reveal delay={280} className="mt-14 border-t border-brass/15 pt-8">
          <dl className="grid grid-cols-3 gap-x-4 gap-y-8 sm:flex sm:flex-wrap sm:gap-x-12">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0 sm:min-w-[7rem]">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="font-display text-3xl leading-none text-bone sm:text-5xl">{s.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-widest2 text-boneDim">
                    {s.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Full-bleed marquee band                                              */
/* ------------------------------------------------------------------ */
function Marquee() {
  const row = (hidden) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {highlights.map((h) => (
        <li key={h.title} className="flex items-center gap-10 whitespace-nowrap sm:gap-14">
          <span className="font-display text-xl tracking-tight text-bone sm:text-2xl">{h.title}</span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-ballRed" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="border-y border-brass/15 bg-surface/70 py-5" role="region" aria-label="What we do">
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 01 — three things, deliberately unequal panels                       */
/* ------------------------------------------------------------------ */
function Pillars() {
  const [lead, ...rest] = pillars

  const Panel = ({ p, tall }) => (
    // `lg:h-full` is what lets the lead panel fill the grid row: the Reveal
    // wrapper is a stretched grid item, so without it the figure's own
    // `lg:h-full` has no definite height to resolve against and the panel
    // ends short of the column beside it.
    <Link
      to={p.to}
      className={`group relative block overflow-hidden rounded-2xl border border-brass/15 bg-surface transition duration-500 hover:-translate-y-1 hover:border-brass/45 ${
        tall ? 'lg:h-full' : ''
      }`}
    >
      <Figure
        src={p.img}
        alt={p.alt}
        className={tall ? 'aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-auto lg:h-full' : 'aspect-[16/9] w-full sm:aspect-[2/1] lg:aspect-[21/9]'}
        imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5"
        aria-hidden="true"
      />
      <div className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-8 ${tall ? 'lg:p-10' : ''}`}>
        <p className="text-[0.68rem] uppercase tracking-widest2 text-brass">
          {p.index} — {p.kicker}
        </p>
        <h3
          className={`mt-3 font-display tracking-tightest text-bone ${
            tall ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          {p.title}
        </h3>
        <p className={`mt-4 max-w-md text-sm leading-relaxed text-boneDim ${tall ? '' : 'hidden sm:block'}`}>
          {p.body}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-brass/20 pt-5">
          <span className="text-sm text-brass">{p.price}</span>
          <span className="flex items-center gap-2 text-sm text-bone">
            {p.cta}
            <Icon
              name="arrowRight"
              className="h-4 w-4 text-brass transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  )

  return (
    <section className="shell relative py-24 lg:py-32">
      <SectionHead
        index="01"
        eyebrow="Three things, one roof"
        title={
          <>
            Come for the frame.
            <br />
            Stay for everything else.
          </>
        }
        lede="Most nights start at a table and end at a plate. The room is built so you never have to leave to do either."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <Reveal className="lg:min-h-[36rem]">
          <Panel p={lead} tall />
        </Reveal>
        <div className="grid gap-5 lg:gap-6">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={120 + i * 110}>
              <Panel p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 02 — kitchen rail                                                    */
/* ------------------------------------------------------------------ */
function Kitchen() {
  return (
    <section className="relative overflow-hidden border-y border-brass/15 bg-ink py-24 lg:py-32">
      <div className="light-pool absolute inset-x-0 top-0 h-72" style={{ '--px': '30%' }} aria-hidden="true" />
      <div className="shell relative">
        <SectionHead
          index="02"
          eyebrow="From the kitchen"
          title="Signatures, plated late"
          lede="The six plates that leave the pass most often. Full menu runs to thirty-odd more."
        />

        <div className="mt-14">
          <Rail label="Signature dishes">
            {topMenu.map((d, i) => (
              <li key={d.name} className="w-[17rem] shrink-0 sm:w-[20rem]">
                <Reveal delay={i * 70} className="h-full">
                  <article className="group h-full overflow-hidden rounded-2xl border border-brass/15 bg-surface transition duration-500 hover:-translate-y-1 hover:border-brass/45">
                    <Figure
                      src={d.img}
                      alt={d.alt}
                      className="aspect-[4/3] w-full"
                      imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="p-6">
                      <p className="text-[0.68rem] uppercase tracking-widest2 text-brass">{d.sub}</p>
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <h3 className="font-display text-2xl leading-tight tracking-tight text-bone">
                          {d.name}
                        </h3>
                        <Price value={d.price} className="shrink-0 text-2xl sm:text-2xl" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-boneDim">{d.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </Rail>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <LinkButton to="/restaurant" variant="ghost">
            The whole menu
          </LinkButton>
          <p className="text-xs text-boneDim lg:hidden">Swipe for more →</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 03 — who we are, tight two-column                                    */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="about" className="shell scroll-mt-28 py-24 lg:py-32">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative max-w-[17rem]">
            <Figure
              src={about.img}
              alt={about.alt}
              className="aspect-[4/3] w-full rounded-xl"
              imgClassName="saturate-[.6] contrast-[1.12] brightness-[.66]"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-ink/70 via-brass/10 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full rounded-xl border border-brass/35"
              aria-hidden="true"
            />
          </div>

          <dl className="mt-12 space-y-4 border-t border-brass/15 pt-6">
            {about.facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 text-sm">
                <dt className="text-boneDim">{k}</dt>
                <dd className="font-display text-lg text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="relative lg:col-span-7">
          <Numeral className="pointer-events-none absolute -top-16 right-0 opacity-55 lg:-top-28">
            03
          </Numeral>
          <Reveal delay={80} className="relative">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-tightest text-bone sm:text-5xl lg:text-[3.5rem]">
              {about.title}
            </h2>
            {about.body.map((p, i) => (
              <p key={i} className="mt-6 text-base leading-relaxed text-boneDim sm:text-lg">
                {p}
              </p>
            ))}
            <Rule className="mt-10" tone="red" />
            <p className="mt-8 font-display text-2xl italic leading-snug text-brass sm:text-3xl">
              “{venue.tagline}”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Reviews — staggered, not a grid                                      */
/* ------------------------------------------------------------------ */
function Reviews() {
  const offsets = ['lg:mt-0', 'lg:mt-14', 'lg:mt-7']
  return (
    <section className="relative overflow-hidden border-y border-brass/15 bg-ink py-24 lg:py-32">
      <div className="shell">
        <SectionHead eyebrow="Regulars" title="What the room says" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 110} className={offsets[i]}>
              <figure className="flex h-full flex-col rounded-2xl border border-brass/15 bg-surface p-7 transition duration-500 hover:-translate-y-1 hover:border-brass/40 sm:p-8">
                <span
                  aria-hidden="true"
                  className="-mb-4 block font-display text-8xl leading-none text-brass/40"
                >
                  “
                </span>
                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-boneDim">
                  {r.body}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-brass/15 pt-6">
                  <img
                    src={r.avatar}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="48"
                    height="48"
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-brass/35"
                  />
                  <div>
                    <p className="text-sm text-bone">{r.name}</p>
                    <p className="text-xs text-boneDim">{r.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 04 — booking, on a felt surface                                      */
/* ------------------------------------------------------------------ */
function Booking() {
  return (
    <section id="book" className="shell scroll-mt-24 py-24 lg:py-32">
      <div className="baize-surface grain relative overflow-hidden rounded-3xl border border-brass/25 p-6 sm:p-10 lg:p-14">
        <Numeral className="pointer-events-none absolute right-6 top-2 opacity-40 lg:right-14">
          04
        </Numeral>

        <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow>Book a table</Eyebrow>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-[0.95] tracking-tightest text-bone sm:text-5xl">
              Hold a table for tonight
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/75 sm:text-base">
              Snooker, a birthday or the whole back floor — tell us which and we will call back to
              confirm within the hour.
            </p>
            <div className="mt-9">
              <BookTableForm />
            </div>
          </div>

          <aside className="self-start rounded-3xl border border-brass/20 bg-ink/60 p-7 sm:p-9">
            <h3 className="text-[0.68rem] uppercase tracking-widest2 text-brass">Or just turn up</h3>
            <p className="mt-4 text-sm leading-relaxed text-boneDim">
              Walk-ins get whatever is free. Between six and ten on a weekend that is usually a
              twenty-minute wait — worth calling ahead.
            </p>

            <ul className="mt-8 space-y-5 border-t border-brass/15 pt-7">
              {hours.map((h) => (
                <li key={h.days} className="flex items-start gap-3 text-sm">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span>
                    <span className="block text-bone">{h.days}</span>
                    <span className="block text-boneDim">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-8 space-y-4 border-t border-brass/15 pt-7 text-sm">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-boneDim transition-colors hover:text-brass"
                  >
                    <Icon name="phone" className="h-4 w-4 shrink-0 text-brass" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-boneDim transition-colors hover:text-brass"
                >
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span>{contact.addressLine}</span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Contact strip                                                        */
/* ------------------------------------------------------------------ */
function ContactStrip() {
  const items = [
    {
      icon: 'pin',
      label: 'Find us',
      lines: contact.address,
      href: contact.mapUrl,
      external: true,
    },
    {
      icon: 'phone',
      label: 'Call us',
      lines: contact.phones,
      href: `tel:${contact.phones[0].replace(/\s/g, '')}`,
    },
    {
      icon: 'mail',
      label: 'Write to us',
      lines: contact.emails,
      href: `mailto:${contact.emails[0]}`,
    },
  ]

  return (
    <section id="contact" className="scroll-mt-24 border-t border-brass/15 bg-ink">
      <div className="shell grid divide-y divide-brass/15 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 90} className="py-12 lg:px-10 lg:first:pl-0 lg:last:pr-0">
            <a
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noreferrer' : undefined}
              className="group flex items-start gap-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brass/30 text-brass transition duration-300 group-hover:border-brass group-hover:bg-brass/10">
                <Icon name={it.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.68rem] uppercase tracking-widest2 text-brass">
                  {it.label}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-boneDim transition-colors group-hover:text-bone">
                  {it.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Pillars />
      <Kitchen />
      <About />
      <Reviews />
      <Booking />
      <ContactStrip />
    </>
  )
}
