import { Link } from 'react-router-dom'
import { navLinks } from '../data/site'
import { Eyebrow, LinkButton, Rule } from '../components/ui'

export default function NotFound() {
  return (
    <div className="baize-surface grain relative flex min-h-screen items-center overflow-hidden">
      <div className="shell relative py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="mt-6 font-display text-6xl leading-[0.85] tracking-tightest text-bone sm:text-8xl lg:text-9xl">
              You&rsquo;ve
              <br />
              scratched.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-bone/75">
              The cue ball went down the pocket and this page went with it. Nothing lives at that
              address — take a free ball and pick a table below.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <LinkButton to="/">Back to the room</LinkButton>
              <LinkButton to="/snooker" variant="ghost">
                See the tables
              </LinkButton>
            </div>

            <Rule className="mt-14" tone="red" />
            <nav aria-label="Site" className="mt-8">
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="link-underline text-sm text-bone/70 transition-colors hover:text-brass"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Cue ball in the pocket */}
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div
              className="absolute inset-0 rounded-full bg-ink/85 shadow-[inset_0_18px_45px_rgba(0,0,0,0.9)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 rounded-full border-[6px] border-brass/70"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff,#cfc9ba_55%,#5c584d)] shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              aria-hidden="true"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-7xl text-brass/25 sm:text-8xl">
              404
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
