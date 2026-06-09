import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import QuorumMock from "@/components/QuorumMock";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { site } from "@/lib/content";

export const metadata = {
  title: "Quorum — case study",
  description:
    "Case study: designing and building Quorum, a Flutter and Firebase event-scheduling app, as a Computer Science capstone at Ohio University.",
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
          <div aria-hidden="true" className="grid-lines absolute inset-0" />
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
                ← Back to work
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
                Group scheduling that finds the time —{" "}
                <span className="accent-text">not another poll.</span>
              </p>
            </Reveal>

            {/* Meta row */}
            <Reveal delay={0.16}>
              <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 font-mono text-xs sm:grid-cols-4">
                {[
                  ["Role", "UI/UX design · Frontend"],
                  ["Context", "CS capstone, Ohio University"],
                  ["Timeline", "[Aug 2025 – May 2026]"],
                  ["Stack", "Flutter · Dart · Firebase"],
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

        {/* Hero visual */}
        <div className="mx-auto w-full max-w-page px-6 pt-16 sm:px-10">
          <Reveal>
            <ImagePlaceholder
              aspect="aspect-[16/9]"
              label="[HERO IMAGE — a wide shot of Quorum's main screens, e.g. three phone frames side by side. Drop the file in /public/images/ and swap this placeholder for a next/image — see README.]"
            />
          </Reveal>
        </div>

        {/* Overview */}
        <StudySection id="overview" eyebrow="01 · Overview" title="What Quorum is">
          <Reveal>
            <p>
              Quorum is a mobile app for finding a meeting time that actually works
              for a group. Instead of sending people a form and tallying responses,
              it shows everyone's availability as a single glanceable heatmap and
              surfaces one recommended time — the moment the group reaches
              "quorum." It was my senior capstone in Computer Science at Ohio
              University, built with Flutter and Firebase.
            </p>
          </Reveal>
          <Reveal>
            <p>
              [REPLACE WITH SPECIFICS: team size and your exact scope — e.g. "I
              worked in a team of N; I owned the UI/UX end to end and built the
              majority of the Flutter front end."]
            </p>
          </Reveal>
        </StudySection>

        {/* Problem */}
        <StudySection id="problem" eyebrow="02 · Problem" title="Scheduling dies in the group chat">
          <Reveal>
            <p>
              Picking a time for six people usually goes one of two ways: a long
              message thread where the answer gets buried, or a polling link that
              half the group never opens. The existing tools treat scheduling as a
              data-collection problem — fill out this grid — when for the user it's
              a decision problem: just tell me when we're meeting.
            </p>
          </Reveal>
          <Reveal>
            <p>
              That framing became the product's one-sentence brief: collect as
              little as possible, decide as much as possible.
            </p>
          </Reveal>
        </StudySection>

        {/* Role & process */}
        <StudySection id="process" eyebrow="03 · Role & process" title="From sticky notes to a shipped app">
          <Reveal>
            <p>
              I led design from the first sketches: informal interviews with
              [N students/club organizers] about how they schedule now, paper
              wireframes to test the core flow cheaply, then high-fidelity screens
              and a clickable prototype in Figma. Once the flow held up in hallway
              usability tests, I moved into Flutter and treated the prototype as
              the spec.
            </p>
          </Reveal>
          <Reveal>
            <p>
              The most useful habit from the process: every screen had to answer
              "what is the user deciding here?" If a screen had no decision, it got
              merged into one that did. That single rule cut the app from
              [X] screens in early wireframes to [Y] in the shipped version.
            </p>
          </Reveal>
          <Reveal>
            <ImagePlaceholder label="[PROCESS IMAGE — early wireframes or the Figma board next to the final screens. A messy-to-clean progression photographs well here.]" />
          </Reveal>
        </StudySection>

        {/* Design decisions */}
        <StudySection
          id="design"
          eyebrow="04 · Design decisions"
          title="The calls that shaped the product"
        >
          <div className="space-y-12 pt-2">
            <Reveal>
              <Decision title="Availability is a heatmap, not a form">
                <p>
                  Polls ask each person to do data entry. Quorum shows the group's
                  combined availability as a color-weighted week grid, so adding
                  your own availability feels like painting onto a shared picture
                  rather than filling out a survey. Completion is the whole game in
                  a scheduling tool, and lowering that effort was the highest-
                  leverage design decision in the project.
                </p>
                <div className="pt-2">
                  <QuorumMock />
                </div>
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="One recommended time, on top">
                <p>
                  Showing raw availability still makes the organizer do math.
                  Quorum ranks candidate slots and pins the best one — with a
                  plain-language reason ("5 of 6 available") — at the top of the
                  screen. Users can override it, but they shouldn't have to think
                  unless they want to.
                </p>
                <ImagePlaceholder label="[SCREENSHOT — the recommendation card / results screen.]" />
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="Joining works before signing up">
                <p>
                  The person creating the event is motivated; the five people
                  invited are not. Invites open straight into marking availability
                  — no account required — and signup is offered only after someone
                  has already gotten value from the app. [ADJUST IF YOUR AUTH FLOW
                  DIFFERED.]
                </p>
                <ImagePlaceholder label="[SCREENSHOT — the invite / join flow.]" />
              </Decision>
            </Reveal>

            <Reveal>
              <Decision title="Feedback in the small moments">
                <p>
                  Marking availability animates the heatmap recalculating in real
                  time, so cause and effect are visible: your input changes the
                  group's answer. It's a small touch, but it's the moment testers
                  consistently reacted to — the app feels alive in your hands.
                </p>
              </Decision>
            </Reveal>
          </div>
        </StudySection>

        {/* Tech */}
        <StudySection id="tech" eyebrow="05 · Tech" title="Flutter + Firebase, and why">
          <Reveal>
            <p>
              Flutter let one codebase target iOS and Android with full control
              over the UI layer — important, because the design <em>was</em> the
              product. Firebase covered auth and data: Firestore's realtime
              listeners are what make the live-updating heatmap possible without
              building sync infrastructure from scratch.
            </p>
          </Reveal>
          <Reveal>
            <p>
              The hard parts were the unglamorous ones: modeling availability so
              concurrent edits merge cleanly, getting time zones right for groups
              that span them, and keeping widget rebuilds cheap while the heatmap
              updates live. [ADD OR ADJUST — name the actual hardest problem you
              solved; this is a favorite interview question.]
            </p>
          </Reveal>
        </StudySection>

        {/* Outcome */}
        <StudySection id="outcome" eyebrow="06 · Outcome" title="What happened, and what I took from it">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric value="[N]" label="[testers / pilot users during evaluation]" />
              <Metric value="[X%]" label="[task completion or success rate in usability testing]" />
              <Metric value="[A]" label="[grade, award, or showcase result — or delete this card]" />
            </div>
          </Reveal>
          <Reveal>
            <p>
              The biggest lesson wasn't technical. It was that the design work
              done before code — the interviews, the paper tests, the "what is
              the user deciding here?" rule — is what made the build go fast,
              because almost nothing had to be redesigned mid-implementation.
              That's the way I want to keep working: design first, then build
              exactly that.
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
                  className="accent-bar rounded-full px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Email me
                </a>
                <Link href="/#projects" className="link-quiet text-sm text-muted hover:text-fog">
                  More work →
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
