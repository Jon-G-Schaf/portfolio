import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SandField from "@/components/SandField";
import { site } from "@/lib/content";

export const metadata = {
  title: "Crosstown - case study",
  description:
    "Case study on designing and building Crosstown, a live map and reliability record for every COTA bus in Columbus: TypeScript, Postgres, Next.js, and a 24/7 data pipeline on a $5 budget.",
};

/* ---------------------------------------------------------------------------
   Local building blocks for the case-study layout
--------------------------------------------------------------------------- */

function StudySection({ id, eyebrow, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10"
    >
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-label text-muted">
          <span aria-hidden="true" className="accent-bar h-px w-8" />
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="font-display text-3xl font-semibold tracking-tight"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-6 space-y-6 text-base leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

function Decision({ title, children }) {
  return (
    <div className="border-l border-line pl-6">
      <h3 className="font-display text-xl font-medium tracking-tight text-fog">
        {title}
      </h3>
      <div className="mt-3 space-y-4">{children}</div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-line bg-panel/60 p-6">
      <p className="accent-text font-display text-3xl font-semibold">{value}</p>
      <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{label}</p>
    </div>
  );
}

/* A desktop screenshot in a slim browser frame. All exports are 1440px wide;
   pass each image's real height so next/image keeps the aspect ratio. */
function BrowserShot({ src, alt, h = 900, label, priority = false, className = "" }) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-line bg-[#171310] shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </span>
        {label && (
          <figcaption className="ml-2 font-mono text-xs text-muted">{label}</figcaption>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={h}
        priority={priority}
        className="w-full"
      />
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */

export default function CrosstownCaseStudy() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Header */}
        <header className="relative overflow-hidden border-b border-line">
          <SandField />
          <div
            aria-hidden="true"
            className="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-ember/15 blur-[140px]"
          />

          <div className="relative mx-auto w-full max-w-page px-6 pb-20 pt-16 sm:px-10 md:pb-28 md:pt-24">
            <Reveal>
              <Link
                href="/#work"
                className="link-quiet font-mono text-xs uppercase tracking-label text-muted hover:text-fog"
              >
                &larr; Back to work
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-label text-muted">
                <span aria-hidden="true" className="accent-bar h-px w-8" />
                Case study
              </p>
              <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                Crosstown
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-snug text-fog/90">
                Every COTA bus, live.{" "}
                <span className="accent-text">Every arrival, on the record.</span>
              </p>
              <a
                href="https://crosstown.jongschaf.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-fog"
              >
                <span className="link-quiet">crosstown.jongschaf.com</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </Reveal>

            {/* Meta row */}
            <Reveal delay={0.16}>
              <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 font-mono text-xs sm:grid-cols-4">
                {[
                  ["Role", "Design + build, solo"],
                  ["Context", "Personal project \u00b7 live product"],
                  ["Timeline", "June 2026 - running 24/7 since"],
                  ["Stack", "TypeScript \u00b7 Postgres \u00b7 Next.js"],
                ].map(([term, detail]) => (
                  <div key={term}>
                    <dt className="uppercase tracking-label text-muted">{term}</dt>
                    <dd className="mt-2 text-fog/90">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* Hero visual - the live map */}
        <div className="mx-auto w-full max-w-page px-6 pt-16 sm:px-10">
          <Reveal>
            <BrowserShot
              src="/images/crosstown-map.jpg"
              alt="Crosstown's live map at night: every COTA bus as a glowing directional marker over a dark map of Columbus, route strands faintly lit beneath them, with a stats panel, a service-tier legend, and a ticker of recent arrivals"
              h={900}
              label="The live map \u00b7 one marker per bus, updating in real time"
              priority
            />
          </Reveal>
        </div>

        {/* Overview */}
        <StudySection id="overview" eyebrow="01 \u00b7 Overview" title="What Crosstown is">
          <Reveal>
            <p>
              Crosstown answers one question: how reliable is each Columbus bus route,
              actually? The schedule is a promise. Crosstown records what really
              happens, permanently, and turns it into numbers you can act on. The
              live map is the front door, but the real product is the record: every
              arrival the system has ever observed, rolled up into per-route,
              per-time-of-day reliability stats.
            </p>
          </Reveal>
          <Reveal>
            <p>
              It is deliberately a <span className="text-fog">measurement</span>{" "}
              product, not an arrival predictor. COTA already tells you when the next
              bus is coming. Nobody tells you whether the 5:15 on your route is the
              kind of bus that shows up. That answer needs months of receipts, so
              Crosstown's job is to keep them: it has run around the clock since the
              day it shipped, and its dataset gets more valuable every week without
              another line of code.
            </p>
          </Reveal>
        </StudySection>

        {/* Problem */}
        <StudySection
          id="problem"
          eyebrow="02 \u00b7 Problem"
          title="The schedule is a promise nobody checks"
        >
          <Reveal>
            <p>
              Transit reliability data mostly evaporates the moment it exists. The
              arrival screens at bus stops show a prediction, the bus comes or it
              doesn't, and the prediction is gone. If you want to know whether a
              route is dependable at rush hour (the thing that decides whether you
              can rely on it for a job), there is nothing to look up.
            </p>
          </Reveal>
          <Reveal>
            <p>
              That gave the project its brief: ingest the city's realtime transit
              feeds continuously, score every arrival against the published
              schedule, keep the results forever, and present them honestly. The
              interesting engineering all falls out of the words{" "}
              <span className="text-fog">continuously</span> and{" "}
              <span className="text-fog">honestly</span>.
            </p>
          </Reveal>
        </StudySection>

        {/* System */}
        <StudySection
          id="system"
          eyebrow="03 \u00b7 The system"
          title="A 24/7 pipeline on a $5 budget"
        >
          <Reveal>
            <p>
              One Node.js service does three jobs: it polls COTA's GTFS-realtime
              protobuf feeds (positions every 15 seconds, arrival predictions every
              30, matched to the feed's own measured regeneration cycle, with
              conditional requests so an unchanged feed costs nothing), it writes to
              Postgres, and it serves the API. Positions push to the browser over
              server-sent events; the map interpolates motion client-side between
              updates, so the buses glide instead of teleporting.
            </p>
          </Reveal>
          <Reveal>
            <p>The parts worth digging into:</p>
          </Reveal>
          <Reveal>
            <ul className="space-y-3">
              <li className="border-l border-line pl-5">
                <span className="text-fog">The feed publishes no delays.</span>{" "}
                COTA's feed carries predicted arrival times but leaves the delay
                field empty, and protobuf decoders return 0 for missing numbers, so
                naive code records every bus as perfectly on time forever. Crosstown
                computes each delay itself, in SQL, by joining every prediction
                against the 365,000-row published schedule (service days start at
                noon minus 12 hours, so past-midnight trips and daylight-saving
                switches need real care; that math has its own integration tests).
              </li>
              <li className="border-l border-line pl-5">
                <span className="text-fog">"Row exists" is not "event happened."</span>{" "}
                Predictions are upserted until the bus passes the stop, so at any
                moment a quarter of the table is still forecasts. Every statistic
                filters to observed arrivals with an explicit predicate, which a
                data audit proved necessary: before it, the live numbers counted the
                future and flattered the system by two points.
              </li>
              <li className="border-l border-line pl-5">
                <span className="text-fog">History is pre-aggregated.</span> Raw
                positions live 48 hours, arrival records 90 days, and nightly
                rollups live forever, so the charts stay instant as the dataset
                grows and the database stays inside a $5 hosting plan. The rollup
                job is idempotent and runs hourly; whichever run happens after
                midnight finalizes the day, no precise scheduler needed.
              </li>
              <li className="border-l border-line pl-5">
                <span className="text-fog">Failure means a gap, not a crash.</span>{" "}
                Every poll is isolated; a feed outage leaves a hole in the data and
                nothing else. Deploys reload the schedule automatically, so the
                static and realtime datasets can't quietly drift apart (the
                well-known public copy of COTA's schedule is a full schedule period
                stale, which cost me an evening once).
              </li>
            </ul>
          </Reveal>
          <Reveal>
            <div className="pt-2">
              <BrowserShot
                src="/images/crosstown-map-route.jpg"
                alt="The live map with one route selected: its strand lit bright across the city while the rest of the network recedes, the camera framed to the route"
                h={900}
                label="Selecting a route: its strand lights, the city recedes, the camera frames it"
              />
            </div>
          </Reveal>
        </StudySection>

        {/* Design */}
        <StudySection
          id="design"
          eyebrow="04 \u00b7 Design"
          title="Night service: a control room, not a dashboard"
        >
          <Reveal>
            <p>
              The design concept is a transit control room at night: the city is
              dark, the data glows. Deep ink surfaces, translucent glass panels,
              hairline rules, Archivo for UI and IBM Plex Mono for every number. The
              discipline that holds it together is that{" "}
              <span className="text-fog">color always means something</span>: route
              colors are COTA's own brand colors (lightness-floored so they survive
              a dark map), and the only other saturated colors are the three status
              colors that score reliability. Nothing is tinted for decoration.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Motion carries information too. Buses interpolate between GPS pings
              with comet trails, faint pulses drift along every route strand in the
              actual direction of travel, arrivals tick across a live feed as the
              system observes them, and the whole map boots with a camera flight
              while the network fades up. All of it, every animation on the site,
              collapses to a static render under{" "}
              <code className="rounded bg-panel px-1.5 py-0.5 text-sm text-fog/90">
                prefers-reduced-motion
              </code>
              .
            </p>
          </Reveal>
          <Reveal>
            <div className="pt-2">
              <BrowserShot
                src="/images/crosstown-rankings.jpg"
                alt="The reliability rankings page: a hero band with the system's on-time percentage glowing in its status color beside an hourly pulse chart, above a ranked list of routes with per-time-of-day heat strips and status-colored bars"
                h={1480}
                label="The rankings: the system's day at the top, every route scored below"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="pt-2">
              <BrowserShot
                src="/images/crosstown-detail.jpg"
                alt="A route detail page for the system's busiest route: its line drawn on a mini map, an on-time stat band, daily and time-of-day charts, and a breakdown table"
                h={1400}
                label="One route's record: 9,000 arrivals into when it keeps its promise and when it doesn't"
              />
            </div>
          </Reveal>
        </StudySection>

        {/* Decisions */}
        <StudySection
          id="decisions"
          eyebrow="05 \u00b7 Decisions"
          title="The calls that shaped it"
        >
          <div className="space-y-12 pt-2">
            <Reveal>
              <Decision title="Measure, don't predict">
                <p>
                  The honest version of this product records what happened; the
                  flashy version guesses what will. Prediction is a losing game
                  against the agency's own arrival screens, and it expires every 30
                  seconds. A record compounds. Positioning Crosstown as measurement
                  decided everything downstream, from the about page's methodology
                  notes to what counts as an observation.
                </p>
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="SSE over WebSockets">
                <p>
                  The realtime data flows one way, so the map uses server-sent
                  events: plain HTTP, no upgrade dance for proxies to fumble, and
                  the browser reconnects by itself. The connection status is surfaced
                  in the UI as a breathing live dot that turns amber while
                  reconnecting. Boring technology, deliberately chosen.
                </p>
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="One process, one database, five dollars">
                <p>
                  The worker and the API share a process, retention windows bound
                  every table, and reads come from rollups or in-memory caches. At
                  real scale you'd split the worker from the API so a slow query can
                  never delay polling; at this scale the tradeoff buys an
                  always-on data product for the price of a coffee, and the README
                  says so out loud.
                </p>
              </Decision>
            </Reveal>
          </div>
        </StudySection>

        {/* Outcome */}
        <StudySection
          id="outcome"
          eyebrow="06 \u00b7 Outcome"
          title="Live, recording, and compounding"
        >
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric value="42 routes" label="Every COTA route, scored continuously" />
              <Metric value="90k+" label="Arrivals on the record in the first two days" />
              <Metric value="$5/mo" label="Total infrastructure, bounded by design" />
            </div>
          </Reveal>
          <Reveal>
            <p>
              Crosstown went from first commit to live product in two days, and the
              dataset has been growing every minute since. It already settles real
              questions (one crosstown route runs a +4 minute average delay across
              9,000 recorded arrivals; another keeps 96% of its promises), and the
              longer it runs, the better its answers get. It is also the project
              where I got to own every layer at once: the ingestion math, the
              database design, the API, and a design system with opinions, all
              pointed at the same goal.
            </p>
          </Reveal>
        </StudySection>

        {/* CTA */}
        <section
          aria-label="Get in touch"
          className="mx-auto w-full max-w-3xl px-6 pb-28 pt-10 sm:px-10"
        >
          <Reveal>
            <div className="rounded-2xl border border-line bg-panel/60 p-10">
              <p className="font-mono text-xs uppercase tracking-label text-muted">
                Thanks for reading
              </p>
              <p className="mt-4 font-display text-2xl font-medium tracking-tight">
                Go watch the buses, or talk to me about the pipeline.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <a
                  href="https://crosstown.jongschaf.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-bar rounded-full px-6 py-3 text-sm font-medium text-ink shadow-[0_0_28px_-6px_rgba(255,122,26,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_38px_-6px_rgba(255,122,26,0.65)] active:scale-[0.98]"
                >
                  Open the live map
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="link-quiet text-sm text-muted hover:text-fog"
                >
                  Email me
                </a>
                <Link href="/#projects" className="link-quiet text-sm text-muted hover:text-fog">
                  More work &rarr;
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
