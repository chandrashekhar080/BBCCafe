import { useMemo, useState } from 'react'
import { fullMenu, menuCategories, topMenu } from '../data/site'
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
  cx,
} from '../components/ui'

function TopPicks() {
  return (
    <section className="shell relative py-24 lg:py-32">
      <SectionHead
        index="01"
        eyebrow="Top picks"
        title="What leaves the pass most"
        lede="Ordered by the counter, not by us. These six account for over half of everything the kitchen sends out."
      />
      <div className="mt-16">
        <Rail label="Most ordered dishes">
          {topMenu.map((d, i) => (
            <li key={d.name} className="w-[16rem] shrink-0 sm:w-[19rem]">
              <Reveal delay={i * 70} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brass/15 bg-surface transition duration-500 hover:-translate-y-1 hover:border-brass/45">
                  <Figure
                    src={d.img}
                    alt={d.alt}
                    className="aspect-square w-full"
                    imgClassName="transition-transform duration-[1.3s] group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.68rem] uppercase tracking-widest2 text-brass">{d.sub}</p>
                    <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight text-bone">
                      {d.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-boneDim">{d.body}</p>
                    <div className="mt-6 border-t border-brass/15 pt-5">
                      <Price value={d.price} />
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </Rail>
      </div>
      <p className="mt-2 text-xs text-boneDim lg:hidden">Swipe for more →</p>
    </section>
  )
}

function FullMenu() {
  const [active, setActive] = useState('All')

  const shown = useMemo(
    () => (active === 'All' ? fullMenu : fullMenu.filter((d) => d.category === active)),
    [active],
  )

  const counts = useMemo(
    () =>
      Object.fromEntries(
        menuCategories.map((c) => [
          c,
          c === 'All' ? fullMenu.length : fullMenu.filter((d) => d.category === c).length,
        ]),
      ),
    [],
  )

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 overflow-hidden border-y border-brass/15 bg-ink py-24 lg:py-32"
    >
      <div className="light-pool absolute inset-x-0 top-0 h-80" style={{ '--px': '48%' }} aria-hidden="true" />
      <div className="shell relative">
        <SectionHead
          index="02"
          eyebrow="The full card"
          title="Everything, with the price on it"
          lede="No service charge and no separate drinks minimum. What you see is what lands on the bill."
        />

        <div className="mt-12 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter menu by course">
          {menuCategories.map((c) => {
            const on = active === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={on}
                className={cx(
                  'rounded-full border px-5 py-2.5 text-sm tracking-wide transition duration-300 active:translate-y-px',
                  on
                    ? 'border-brass bg-brass text-ink'
                    : 'border-brass/25 text-boneDim hover:border-brass/60 hover:text-bone',
                )}
              >
                {c}
                <span className={cx('ml-2 text-xs', on ? 'text-ink/80' : 'text-boneDim')}>
                  {counts[c]}
                </span>
              </button>
            )
          })}
        </div>

        {shown.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-brass/25 px-6 py-20 text-center">
            <Icon name="alert" className="mx-auto h-8 w-8 text-brass/70" />
            <p className="mt-5 font-display text-2xl text-bone">Nothing on the card for that course</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-boneDim">
              The kitchen rotates this section. Ask at the counter, or look at everything we are
              serving today.
            </p>
            <button
              type="button"
              onClick={() => setActive('All')}
              className="mt-7 rounded-full border border-brass/40 px-6 py-3 text-sm text-bone transition hover:border-brass hover:bg-brass/10"
            >
              Show the whole menu
            </button>
          </div>
        ) : (
          <ul className="mt-14 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {shown.map((d, i) => (
              <Reveal as="li" key={d.name} delay={(i % 4) * 70}>
                <article className="group flex items-center gap-5 border-b border-brass/10 py-5 transition-colors duration-500 hover:border-brass/40">
                  <Figure
                    src={d.img}
                    alt={d.alt}
                    className="h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.66rem] uppercase tracking-widest2 text-brass">{d.category}</p>
                    <h3 className="mt-1.5 font-display text-xl leading-snug tracking-tight text-bone">
                      {d.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-boneDim">{d.body}</p>
                  </div>
                  <p className="shrink-0 self-start pt-6 font-display text-2xl text-brass">{d.price}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        <Rule className="mt-16" tone="red" />
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Eat at the table</Eyebrow>
            <p className="mt-4 max-w-md font-display text-2xl leading-snug tracking-tight text-bone sm:text-3xl">
              Order mid-frame. We bring it to the rail.
            </p>
          </div>
          <LinkButton to="/#book">Book a table</LinkButton>
        </div>
      </div>
    </section>
  )
}

export default function Restaurant() {
  return (
    <>
      <PageHero
        img="/assets/dish-biryani.jpg"
        alt="Biryani served in a copper handi"
        eyebrow="The kitchen"
        title={
          <>
            Chai at four.
            <br />
            Biryani at eleven.
          </>
        }
        lede="A short menu cooked properly, running as late as the tables do. Everything below is priced in rupees, all in."
        meta={['Kitchen open till last call', 'Veg & non-veg', 'No service charge']}
      />
      <TopPicks />
      <FullMenu />
    </>
  )
}
