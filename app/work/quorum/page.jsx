import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SandField from "@/components/SandField";
import { site } from "@/lib/content";

export const metadata = {
  title: "Quorum - case study",
  description:
    "Case study on designing and building Quorum, a Flutter and Firebase app for finding and organizing local events, as a Computer Science capstone at Ohio University.",
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

/* A phone screenshot in a slim device bezel. All exports are 1440px wide;
   pass each image's real height so next/image renders the correct aspect
   ratio (no distortion). Extra classes (tilts, hovers) land on the frame. */
function Shot({ src, alt, h = 3020, className = "" }) {
  return (
    <div
      className={`w-full max-w-[260px] rounded-[2rem] border border-line bg-[#171310] p-2 shadow-2xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={h}
        className="w-full rounded-[1.5rem]"
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */

export default function QuorumCaseStudy() {
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
                Quorum
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-snug text-fog/90">
                Find events near you, fill the open spots,{" "}
                <span className="accent-text">and actually show up.</span>
              </p>
            </Reveal>

            {/* Meta row */}
            <Reveal delay={0.16}>
              <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 font-mono text-xs sm:grid-cols-4">
                {[
                  ["Role", "UI/UX lead \u00b7 Full-stack build"],
                  ["Context", "CS capstone, Ohio University"],
                  ["Timeline", "Aug 2025 - May 2026"],
                  ["Stack", "Flutter \u00b7 Dart \u00b7 Firebase"],
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

        {/* Hero visual - the signature Discover screen, in both themes */}
        <div className="mx-auto w-full max-w-page px-6 pt-16 sm:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <Shot
                src="/images/quorum-discover-dark.jpg"
                alt="Quorum's Discover feed in dark mode: nearby events with category, time, distance, and Join buttons"
                h={3023}
                className="will-change-transform transition-transform duration-500 sm:-rotate-2 sm:hover:rotate-0"
              />
              <Shot
                src="/images/quorum-discover-light.jpg"
                alt="The same Discover feed in light mode, showing Quorum's light/dark design system"
                h={2994}
                className="will-change-transform transition-transform duration-500 sm:rotate-2 sm:hover:rotate-0"
              />
            </div>
          </Reveal>
        </div>

        {/* Overview */}
        <StudySection id="overview" eyebrow="01 \u00b7 Overview" title="What Quorum is">
          <Reveal>
            <p>
              Quorum is a mobile app for finding events near you and getting people
              to actually show up to them: pickup games, club meetups, study
              sessions, anything with a time, a place, and room for more. Open it and
              you see a feed of what's happening nearby, with the still-open spots and
              the details right on each card. Tap{" "}
              <span className="text-fog">Join</span>, and you land in a shared chat
              with everyone else going. It started as &ldquo;Player Needed&rdquo; for
              pickup sports and grew into a general events app with groups, profiles,
              and messaging.
            </p>
          </Reveal>
          <Reveal>
            <p>
              It was my senior capstone in Computer Science at Ohio University, built
              in Flutter and Firebase by a five-person team. I led the UI/UX end to
              end, from Figma flows to a Material 3 design system. I also took on a
              large share of the engineering, building much of the Flutter front end
              and the Firebase back end behind it.
            </p>
          </Reveal>
        </StudySection>

        {/* Problem */}
        <StudySection
          id="problem"
          eyebrow="02 \u00b7 Problem"
          title="The plan only works if people show"
        >
          <Reveal>
            <p>
              Events run into a chicken-and-egg problem, whether it's a pickup game
              or a club's first meetup: the people who'd come can't find them, and
              the ones that need people can't find the people. The coordination that
              does happen scatters across group chats, stories, and word of mouth,
              where a half-formed plan quietly dies because nobody could tell if it
              was actually happening.
            </p>
          </Reveal>
          <Reveal>
            <p>
              That gave the product its one-sentence brief: put the nearby events in
              one place, make the open spots obvious, and keep the people who join
              talking in the same app, so &ldquo;we need a few more&rdquo; reaches
              someone who can actually fill it.
            </p>
          </Reveal>
        </StudySection>

        {/* Role & process */}
        <StudySection
          id="process"
          eyebrow="03 \u00b7 Role & process"
          title="From Figma flows to a shipped design system"
        >
          <Reveal>
            <p>
              I owned the design from the first sketches, mapping the core flows
              (registration, discovery, event creation, chat) as clickable
              prototypes in Figma before any of it hit code. Testing those flows
              cheaply meant we settled the hard navigation questions on the
              whiteboard instead of mid-build.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Those prototypes became a real design system in Flutter: a Material 3
              theme with custom light and dark color schemes, an{" "}
              <span className="text-fog">Outfit</span> type scale, and shared
              components so every screen felt like one app. A{" "}
              <code className="rounded bg-panel px-1.5 py-0.5 text-sm text-fog/90">
                ThemeController
              </code>{" "}
              swaps light and dark at runtime. The whole UI was built against
              tokens, not hard-coded colors, from day one.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex justify-center pt-2">
              <Shot
                src="/images/quorum-register.jpg"
                alt="Quorum's registration screen, part of the onboarding flow designed in Figma"
                h={3027}
              />
            </div>
          </Reveal>
        </StudySection>

        {/* Product & design decisions */}
        <StudySection
          id="design"
          eyebrow="04 \u00b7 Product decisions"
          title="The calls that shaped the app"
        >
          <div className="space-y-12 pt-2">
            <Reveal>
              <Decision title="Discovery is location-first">
                <p>
                  The home screen isn't a calendar. It's a feed of what's near you{" "}
                  <em>now</em>, sorted by distance and time, with category chips to
                  filter by what you're into. Events carry a real{" "}
                  <code className="rounded bg-panel px-1.5 py-0.5 text-sm text-fog/90">
                    GeoPoint
                  </code>
                  , so distance is computed from your actual location, and a map view
                  plots them. Picking a place when you create an event uses Google
                  Places autocomplete, so locations are real and consistent.
                </p>
                <div className="flex justify-center pt-2">
                  <Shot
                    src="/images/quorum-discover-map.jpg"
                    alt="Quorum's Discover map view, plotting nearby events by location"
                    h={2999}
                  />
                </div>
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="Open spots are the whole point">
                <p>
                  Every event tracks how many people it needs and who's already in,
                  so a card can say &ldquo;needs 2 more&rdquo; at a glance. Open one
                  and you get the full picture (who's hosting, who's coming, the
                  exact spot on the map) behind a single{" "}
                  <span className="text-fog">Join</span> that drops you straight into
                  the group. For a pickup game that includes skill level and
                  who-can-join; for other events those fields just fall away.
                </p>
                <div className="flex justify-center pt-2">
                  <Shot
                    src="/images/quorum-event-detail.jpg"
                    alt="A Quorum event detail screen showing the host, attendees, location, open spots, and a Join button"
                    h={3023}
                  />
                </div>
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="Coordination lives in the app">
                <p>
                  Joining an event drops you straight into its group chat, so plans
                  don't scatter back out to a dozen separate threads. The chat is a
                  full real-time system: direct and group conversations, read
                  receipts, emoji reactions, photo sharing, and the ability to share
                  an event as a rich card right in the conversation.
                </p>
                <div className="flex justify-center pt-2">
                  <Shot
                    src="/images/quorum-chat.jpg"
                    alt="A Quorum chat conversation with message bubbles, a shared location card, and a composer with attach and emoji controls"
                    h={3025}
                  />
                </div>
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="Light and dark, by design">
                <p>
                  Both themes were designed together, not bolted on. Custom Material
                  color schemes, a consistent type scale, and tabular figures for
                  the numbers that matter (distances, counts) keep the app legible
                  and calm in either mode. The two Discover screens at the top are
                  the same screen, same code, different theme.
                </p>
              </Decision>
            </Reveal>
          </div>
        </StudySection>

        {/* More of the app - gallery of the remaining real screens */}
        <div className="mx-auto w-full max-w-page px-6 py-8 sm:px-10">
          <Reveal>
            <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-label text-muted">
              <span aria-hidden="true" className="accent-bar h-px w-8" />
              More of the app
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["/images/quorum-event-create-1.jpg", "Creating an event", 3025],
                ["/images/quorum-event-create-2.jpg", "Setting the details", 3024],
                ["/images/quorum-group.jpg", "Group dashboard", 3019],
                ["/images/quorum-profile.jpg", "Your profile", 3007],
              ].map(([src, cap, h]) => (
                <figure key={src} className="flex flex-col items-center gap-3">
                  <div className="w-full max-w-[190px]">
                    <Shot src={src} alt={`Quorum: ${cap}`} h={h} />
                  </div>
                  <figcaption className="font-mono text-xs text-muted">
                    {cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Engineering */}
        <StudySection
          id="engineering"
          eyebrow="05 \u00b7 Engineering"
          title="Flutter + Firebase, and the hard parts"
        >
          <Reveal>
            <p>
              The back end is Firebase (Auth, Firestore, Storage, and Cloud
              Messaging), with a feature-first Flutter architecture that splits each
              feature into its data layer and its UI. I designed the Firestore data
              model: collections for users, events, groups, chat rooms and their
              messages, plus per-user notifications, all driven by realtime
              listeners so the UI updates the instant data changes.
            </p>
          </Reveal>
          <Reveal>
            <p>The interesting problems were the ones you don't see:</p>
          </Reveal>
          <Reveal>
            <ul className="space-y-3">
              <li className="border-l border-line pl-5">
                <span className="text-fog">Joining can't oversell an event.</span>{" "}
                Limited-spot events use Firestore transactions to add or remove a
                person, so two people tapping Join at once can't both claim the last
                slot.
              </li>
              <li className="border-l border-line pl-5">
                <span className="text-fog">Derived state stays in sync.</span> An
                event's group chat is kept in lockstep with who's actually joined:
                membership changes sync to the chat room automatically, and
                participant names are denormalized in so the list renders without
                extra reads.
              </li>
              <li className="border-l border-line pl-5">
                <span className="text-fog">Unread, done cheaply.</span> Read state
                comes from per-user timestamp maps; marking a thread read batches its
                updates and caps the work to recent messages, so opening a busy chat
                doesn't fan out into hundreds of writes.
              </li>
              <li className="border-l border-line pl-5">
                <span className="text-fog">The feed stays fresh.</span> Events that
                are past get archived to a separate collection, so Discover only ever
                queries what's still worth showing.
              </li>
            </ul>
          </Reveal>
        </StudySection>

        {/* Outcome */}
        <StudySection
          id="outcome"
          eyebrow="06 \u00b7 Outcome"
          title="What shipped, and what I took from it"
        >
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric value="5" label="Person capstone team I shared the build with" />
              <Metric value="Android" label="Shipped from a single Flutter codebase" />
              <Metric value="2 semesters" label="From first Figma flow to a working app" />
            </div>
          </Reveal>
          <Reveal>
            <p>
              Quorum is the project where design and engineering stopped being two
              jobs for me. Owning both meant the Figma decisions and the Firestore
              decisions answered to the same goal, and the up-front design work (the
              flows, the prototypes, the design system) is exactly what let the
              build move fast, because the structure was settled before the code
              started. That's how I want to keep working: understand the problem,
              design the solution, then build the whole thing, front end and back, to
              match.
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
                Want to talk through any of these decisions?
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <a
                  href={`mailto:${site.email}`}
                  className="accent-bar rounded-full px-6 py-3 text-sm font-medium text-ink shadow-[0_0_28px_-6px_rgba(255,122,26,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_38px_-6px_rgba(255,122,26,0.65)] active:scale-[0.98]"
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
