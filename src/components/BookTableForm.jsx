import { useEffect, useMemo, useState } from 'react'
import { bookingTypes, contact } from '../data/site'
import Icon from './Icon'
import { Button, Rule, cx } from './ui'

const STORE_KEY = 'bbc.bookings.v1'

/* localStorage is best-effort: a private window or blocked storage must never
   break the page, so both reads and writes are wrapped. */
function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.slice(0, 3) : []
  } catch {
    return []
  }
}

function writeStore(entries) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(entries.slice(0, 3)))
    return true
  } catch {
    return false
  }
}

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const prettyDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

const EMPTY = { name: '', phone: '', email: '', type: '', date: '', guests: '2', note: '' }

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  if (!name) errors.name = 'Tell us who the table is for.'
  else if (name.length < 2) errors.name = 'That looks a little short.'

  const digits = values.phone.replace(/[^\d]/g, '')
  if (!values.phone.trim()) errors.phone = 'We call to confirm, so we need a number.'
  else if (digits.length < 10 || digits.length > 13) errors.phone = 'Enter a 10-digit Indian mobile number.'

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'That email address does not look right.'

  if (!values.type) errors.type = 'Pick what the booking is for.'

  if (!values.date) errors.date = 'Choose a date.'
  else if (values.date < todayISO()) errors.date = 'That date has already passed.'

  const guests = Number(values.guests)
  if (!values.guests || Number.isNaN(guests) || guests < 1 || guests > 60)
    errors.guests = 'Between 1 and 60 guests.'

  return errors
}

/* ------------------------------------------------------------------ */

function Field({ label, hint, error, id, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.68rem] uppercase tracking-widest2 text-brass">
          {label}
        </label>
        {hint && <span className="text-[0.68rem] text-boneDim">{hint}</span>}
      </div>
      <div className="mt-2">{children}</div>
      <p
        id={`${id}-error`}
        role={error ? 'alert' : undefined}
        className={cx(
          'mt-2 flex items-center gap-1.5 text-xs text-ballRed transition-opacity duration-200',
          error ? 'opacity-100' : 'h-0 opacity-0',
        )}
      >
        {error && (
          <>
            <Icon name="alert" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {error}
          </>
        )}
      </p>
    </div>
  )
}

const control =
  'w-full rounded-xl border bg-ink/50 px-4 py-3 text-sm text-bone placeholder:text-boneDim/75 transition duration-300 focus:bg-ink/80 focus:outline-none'
const ok = 'border-brass/20 hover:border-brass/45 focus:border-brass'
const bad = 'border-ballRed/70 focus:border-ballRed'

export default function BookTableForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done
  const [confirmed, setConfirmed] = useState(null)
  const [recent, setRecent] = useState([])
  const [storageBlocked, setStorageBlocked] = useState(false)

  useEffect(() => setRecent(readStore()), [])

  const min = useMemo(todayISO, [])

  const set = (key) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (touched[key]) {
      setErrors((prev) => {
        const next = validate({ ...values, [key]: value })
        return { ...prev, [key]: next[key] }
      })
    }
  }

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validate(values)[key] }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])))

    const order = Object.keys(EMPTY)
    const firstBad = order.find((k) => next[k])
    if (firstBad) {
      const el = document.getElementById(`bk-${firstBad}`)
      el?.focus()
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    setStatus('submitting')
    // No backend by design — this is a short local confirmation beat.
    window.setTimeout(() => {
      const entry = {
        id: `BBC-${Date.now().toString(36).toUpperCase().slice(-6)}`,
        ...values,
        guests: Number(values.guests),
        savedAt: new Date().toISOString(),
      }
      const list = [entry, ...recent].slice(0, 3)
      setRecent(list)
      setStorageBlocked(!writeStore(list))
      setConfirmed(entry)
      setStatus('done')
    }, 700)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setConfirmed(null)
    setStatus('idle')
  }

  /* ---------------- success card ---------------- */
  if (status === 'done' && confirmed) {
    return (
      <div className="rounded-3xl border border-brass/30 bg-ink/70 p-7 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass text-ink">
            <Icon name="check" className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-[0.68rem] uppercase tracking-widest2 text-brass">Request noted</p>
            <p className="font-display text-2xl leading-tight text-bone">Table held, pending a call</p>
          </div>
        </div>

        <dl className="mt-8 divide-y divide-brass/15 border-y border-brass/15 text-sm">
          {[
            ['Reference', confirmed.id],
            ['Name', confirmed.name],
            ['Booking for', confirmed.type],
            ['Date', prettyDate(confirmed.date)],
            ['Guests', String(confirmed.guests)],
            ['Phone', confirmed.phone],
            confirmed.email ? ['Email', confirmed.email] : null,
            confirmed.note ? ['Note', confirmed.note] : null,
          ]
            .filter(Boolean)
            .map(([k, v]) => (
              <div key={k} className="flex gap-6 py-3">
                <dt className="w-28 shrink-0 text-boneDim">{k}</dt>
                <dd className="text-bone">{v}</dd>
              </div>
            ))}
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-boneDim">
          Nothing has been sent anywhere — this page has no server. Ring{' '}
          <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`} className="text-brass link-underline">
            {contact.phones[0]}
          </a>{' '}
          and quote <span className="text-bone">{confirmed.id}</span> to lock the table in.
        </p>
        {storageBlocked && (
          <p className="mt-3 text-xs text-boneDim">
            Your browser is blocking local storage, so this summary will disappear when you leave the page.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-brass px-6 py-3 text-sm font-medium text-ink transition hover:bg-brassLit"
          >
            <Icon name="phone" className="h-4 w-4" />
            Call to confirm
          </a>
          <Button variant="ghost" onClick={reset} arrow>
            Book another table
          </Button>
        </div>
      </div>
    )
  }

  /* ---------------- form ---------------- */
  const invalid = (k) => Boolean(touched[k] && errors[k])
  const fieldProps = (k) => ({
    id: `bk-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': invalid(k) ? 'true' : 'false',
    'aria-describedby': invalid(k) ? `bk-${k}-error` : undefined,
    className: cx(control, invalid(k) ? bad : ok),
  })

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form

      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-brass/20 bg-ink/60 p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" id="bk-name" error={invalid('name') ? errors.name : ''}>
          <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Aditya Rane" />
        </Field>

        <Field label="Phone" id="bk-phone" error={invalid('phone') ? errors.phone : ''}>
          <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
        </Field>

        <Field label="Email" id="bk-email" hint="optional" error={invalid('email') ? errors.email : ''}>
          <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>

        <Field label="Booking for" id="bk-type" error={invalid('type') ? errors.type : ''}>
          <select {...fieldProps('type')}>
            <option value="">Choose one…</option>
            {bookingTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date" id="bk-date" hint="today onward" error={invalid('date') ? errors.date : ''}>
          <input {...fieldProps('date')} type="date" min={min} />
        </Field>

        <Field label="Guests" id="bk-guests" error={invalid('guests') ? errors.guests : ''}>
          <input {...fieldProps('guests')} type="number" min="1" max="60" inputMode="numeric" />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Anything else" id="bk-note" hint="optional">
            <textarea
              {...fieldProps('note')}
              rows={3}
              placeholder="Cake at 9, and we'd like the corner table if it's free."
              className={cx(control, ok, 'resize-y')}
            />
          </Field>
        </div>
      </div>

      {errorCount > 0 && (
        <p role="status" className="mt-2 text-xs text-boneDim">
          {errorCount} {errorCount === 1 ? 'field needs' : 'fields need'} a look before you can send this.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === 'submitting'} arrow={status !== 'submitting'}>
          {status === 'submitting' ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
              />
              Holding your table…
            </>
          ) : (
            'Request this table'
          )}
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-boneDim">
          We ring back within the hour to confirm. No deposit, no cancellation fee.
        </p>
      </div>

      {recent.length > 0 && (
        <div className="mt-9">
          <Rule tone="yellow" />
          <p className="mt-6 text-[0.68rem] uppercase tracking-widest2 text-brass">Your recent enquiries</p>
          <ul className="mt-4 space-y-2 text-sm">
            {recent.map((r) => (
              <li key={r.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-boneDim">
                <span className="font-medium text-bone">{r.id}</span>
                <span>{r.type}</span>
                <span className="text-brass">{prettyDate(r.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
}
