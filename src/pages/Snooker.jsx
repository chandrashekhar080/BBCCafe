import { snookerLineup, stats, venueImages } from '../data/site'
import Icon from '../components/Icon'
import {
  Eyebrow,
  Figure,
  LinkButton,
  PageHero,
  Price,
  Rail,
  Reveal,
  Rule,
  SectionHead,
} from '../components/ui'

const included = [
  ['Cues, rests and chalk', 'Sitting at every table. Bring nothing.'],
  ['Re-clothed each season', 'Nap brushed and ironed before opening.'],
  ['Scoring at the rail', 'Beads on the wire, the way it should be.'],
  ['Table-side service', 'Order chai or a plate without racking down.'],
]

function Lineup() {
  return (
    <section className="shell relative py-24 lg:py-32">
      <SectionHead
        index="01"
        eyebrow="The lineup"
        title={
          <>
            Twelve tables.
            <br />
            Six you can book.
          </>
        }
        lede="Hourly rates, billed to the minute after the first hour. Weekday afternoons run at the lowest rate on the floor."
      />

      <div className="mt-16">
        <Rail label="Snooker tables you can book">
          {snookerLineup.map((t, i) => (
            <li key={t.title} className="w-[17rem] shrink-0 sm:w-[21rem]">
              <Reveal delay={i * 70} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-brass/15 bg-surface transition duration-500 hover:-translate-y-1 hover:border-brass/45">
                  <div className="relative">
                    <Figure
                      src={t.img}
                      alt={t.alt}
                      className="aspect-[4/3] w-full"
                      imgClassName="transition-transform duration-[1.3s] group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-display text-sm text-brass backdrop-blur-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="font-display text-2xl leading-tight tracking-tight text-bone">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-[0.68rem] uppercase tracking-widest2 text-brass">
                      {t.subtitle}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-boneDim">{t.body}</p>
                    <div className="mt-6 flex items-end justify-between gap-4 border-t border-brass/15 pt-5">
                      <Price value={t.price} unit={t.unit} />
                      <Icon
                        name="arrowRight"
                        className="mb-1.5 h-4 w-4 text-brass transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </Rail>
      </div>
      <p className="mt-2 text-xs text-boneDim lg:hidden">Swipe for more tables →</p>
    </section>
  )
}

function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-brass/20">
      <div className="baize-surface grain absolute inset-0" aria-hidden="true" />
      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="text-center sm:text-left">
              <p className="font-display text-6xl leading-none text-bone lg:text-7xl">{s.value}</p>
              <p className="mt-3 text-[0.68rem] uppercase tracking-widest2 text-bone/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Included() {
  return (
    <section className="shell py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>House standard</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-tightest text-bone sm:text-5xl">
            What comes with the table
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-boneDim">
            No equipment deposit, no per-frame charge, no hovering. You pay for the hour and the
            hour is yours.
          </p>
          <Rule className="mt-10" tone="yellow" />
          <LinkButton to="/#book" className="mt-10">
            Hold a table
          </LinkButton>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-brass/15 bg-brass/15 sm:grid-cols-2 lg:col-span-7">
          {included.map(([title, body], i) => (
            <Reveal as="li" key={title} delay={i * 80} className="bg-surface p-7 sm:p-8">
              <span className="font-display text-sm text-brass">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl leading-snug text-bone">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-boneDim">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Snooker() {
  return (
    <>
      <PageHero
        img={venueImages.snooker.img}
        alt={venueImages.snooker.alt}
        eyebrow="The snooker club"
        title={
          <>
            Good light.
            <br />
            True baize.
          </>
        }
        lede="Full-size tables under brass pendants, kept the way people who actually play expect them to be kept."
        meta={['From ₹99 an hour', 'Cues included', 'Open till 1:30 am Fri–Sun']}
      />
      <Lineup />
      <StatsBand />
      <Included />
    </>
  )
}
