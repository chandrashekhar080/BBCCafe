import { cafeGallery, partyTables, restaurantMeals, snookerTables } from '../data/site'
import Icon from '../components/Icon'
import {
  Eyebrow,
  Figure,
  LinkButton,
  Numeral,
  PageHero,
  Price,
  Reveal,
  Rule,
  SectionHead,
} from '../components/ui'

/* 01 — the day, as a timeline rather than three matching cards. */
function MealsOfTheDay() {
  const drop = ['lg:mt-0', 'lg:mt-20', 'lg:mt-8']
  return (
    <section className="shell relative py-24 lg:py-32">
      <SectionHead
        index="01"
        eyebrow="Kitchen hours"
        title={
          <>
            Three plates,
            <br />
            morning to last call
          </>
        }
        lede="The kitchen changes gear three times a day. Prices are per head and include a drink at breakfast."
      />

      <div className="relative mt-16">
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {restaurantMeals.map((m, i) => (
            <Reveal as="li" key={m.category} delay={i * 120} className={drop[i]}>
              <div className="hidden items-center gap-3 lg:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-brass ring-4 ring-room" />
                <span className="h-px flex-1 bg-brass/25" />
              </div>
              <div className="lg:mt-8">
                <p className="text-[0.68rem] uppercase tracking-widest2 text-brass">
                  {String(i + 1).padStart(2, '0')} · {m.category}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight tracking-tightest text-bone sm:text-4xl">
                  {m.title}
                </h3>
                <Figure
                  src={m.img}
                  alt={m.alt}
                  className="mt-6 aspect-[4/3] w-full rounded-2xl border border-brass/15"
                  imgClassName="transition-transform duration-[1.2s] hover:scale-105"
                />
                <p className="mt-6 text-sm leading-relaxed text-boneDim">{m.body}</p>
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-brass/15 pt-5">
                  <Price value={m.price} unit="per head" />
                  <span className="pb-1 text-xs uppercase tracking-widest2 text-boneDim">
                    {m.category}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 02 — party tiers as big alternating rows. */
function PartyTables() {
  return (
    <section
      id="party"
      className="relative scroll-mt-24 overflow-hidden border-y border-brass/15 bg-ink py-24 lg:py-32"
    >
      <div className="light-pool absolute inset-x-0 top-0 h-72" style={{ '--px': '70%' }} aria-hidden="true" />
      <div className="shell relative">
        <SectionHead
          index="02"
          eyebrow="Party bookings"
          title="Take the floor for the night"
          lede="Three tiers, from a corner booth to the whole back room. Every tier holds an adjacent snooker table at no extra cost."
        />

        <div className="mt-16 space-y-8 lg:space-y-6">
          {partyTables.map((t, i) => (
            <Reveal key={t.title} delay={i * 90}>
              <article
                className={`group grid overflow-hidden rounded-2xl border border-brass/15 bg-surface transition duration-500 hover:border-brass/40 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${
                  i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <Figure
                  src={t.img}
                  alt={t.alt}
                  className="aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:min-h-[19rem]"
                  imgClassName="transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <h3 className="font-display text-3xl leading-tight tracking-tightest text-bone sm:text-4xl">
                        {t.title}
                      </h3>
                      <span className="rounded-full border border-brass/30 px-3 py-1 text-[0.68rem] uppercase tracking-widest2 text-brass">
                        {t.seats}
                      </span>
                    </div>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-boneDim">{t.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-boneDim">
                          <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={2.2} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-5 border-t border-brass/15 pt-6">
                    <Price value={`₹${t.price}`} unit="per table / hour" />
                    <LinkButton to="/#book" variant="ghost">
                      Reserve this
                    </LinkButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 03 — snooker tiers as a tight price list, not big rows. */
function SnookerTiers() {
  return (
    <section id="tables" className="shell scroll-mt-24 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-4">
          <Numeral className="pointer-events-none absolute -top-16 right-0 opacity-55 lg:-top-24">
            03
          </Numeral>
          <div className="relative">
            <Eyebrow>Snooker tables</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-tightest text-bone sm:text-5xl">
              By the hour, cues on the house
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-boneDim">
              Twelve tables on the floor; these three take bookings in advance. The rest are
              first-come and rarely all busy before seven.
            </p>
            <LinkButton to="/snooker" variant="ghost" className="mt-8">
              All twelve tables
            </LinkButton>
          </div>
        </div>

        <ul className="border-b border-brass/15 lg:col-span-8">
          {snookerTables.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 90}>
              <div className="group flex flex-col gap-6 border-t border-brass/15 py-8 sm:flex-row sm:items-center">
                <Figure
                  src={t.img}
                  alt={t.alt}
                  className="aspect-[16/9] w-full shrink-0 rounded-xl sm:aspect-square sm:w-28"
                  imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-bone">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-boneDim">{t.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-brass/20 px-3 py-1 text-[0.7rem] text-boneDim"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 sm:text-right">
                  <Price value={`₹${t.price}`} unit="/ hour" />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 04 — cafe gallery, irregular grid. */
function CafeGallery() {
  // Four tiles filling a 4x2 block: the real venue photograph anchors the left
  // half, the counter shot spans the top right, two drinks sit under it.
  const spans = ['sm:col-span-2 sm:row-span-2', 'sm:col-span-2', '', '']
  return (
    <section
      id="cafe"
      className="relative scroll-mt-24 overflow-hidden border-t border-brass/15 bg-ink py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHead
          index="04"
          eyebrow="The cafe"
          title="Warm light, cold drinks, no rush"
          lede="Between the tables and the kitchen there is a counter that runs all day. Nobody will ask you to give the table back."
        />
        <div className="mt-14 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[13rem]">
          {cafeGallery.map((g, i) => (
            <Reveal key={g.img} delay={i * 70} className={`${spans[i]} min-h-0`}>
              <Figure
                src={g.img}
                alt={g.alt}
                className="h-full w-full rounded-xl border border-brass/10"
                imgClassName="transition-transform duration-[1.4s] hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
        <Rule className="mt-16" />
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-display text-2xl leading-snug tracking-tight text-bone sm:text-3xl">
            Know what you want? Hold a table now.
          </p>
          <LinkButton to="/#book">Book a table</LinkButton>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        img="/assets/cafe-02.jpg"
        alt="Backlit bottles along the BBC cafe counter"
        eyebrow="What we do"
        title={
          <>
            Everything the
            <br />
            room offers
          </>
        }
        lede="Meals through the day, party floors by the hour and snooker tables you can hold in advance — all priced in plain rupees."
        meta={['Kitchen till last call', 'No cover charge', 'Walk-ins welcome']}
      />
      <MealsOfTheDay />
      <PartyTables />
      <SnookerTiers />
      <CafeGallery />
    </>
  )
}
