/**
 * Pastel Afterimage Archive visual reminder: About is the Green-Room Collage—
 * pistachio and cream cut-paper layers, real portrait photo, and a human
 * scale that introduces Om and the philosophy behind Creator Studio.
 */
import { ArrowUpRight, CircleDot, HeartHandshake, Sparkles, Star, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedHobbies, studioProfile } from "@/lib/content";

export default function About() {
  const [isArchiveNoteOpen, setIsArchiveNoteOpen] = useState(false);

  return (
    <SiteShell pageTheme="about">
      {/* ── Hero Section ── */}
      <section className="about-hero">
        <div className="about-hero__paper-lines" aria-hidden="true" />
        <div className="about-hero__copy">
          <p className="about-hero__kicker">
            <UserRound size={14} /> green-room collage / vol. 08
          </p>
          <h1>
            Hello,<br />I’m <em>Om.</em>
          </h1>
          <p>{studioProfile.aboutIntro}</p>
          <div className="about-hero__nerd-quote-row">
            <div className="tony-stark-quote-badge">
              <span className="tony-stark-quote-badge__nerd-tag">🤓 certified late-night nerd</span>
              <span>⚡ “When did you become an expert?”</span>
              <strong>“…Last night.”</strong>
              <small>— Tony Stark, The Avengers (2012)</small>
            </div>
            <a className="about-hero__jump" href="#about-story">
              a little more about the work <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="about-hero__portrait-slot" aria-label="Om's portrait image">
          <div className="portrait-slot__frame portrait-slot__frame--real">
            <img alt="Om Nandurkar" className="portrait-slot__img" src={studioProfile.portraitImage || "/assets/om-cozy-portrait.jpg"} />
            <div className="portrait-slot__overlay-label">Om Nandurkar</div>
          </div>
          <div className="portrait-slot__sun" />
          <div className="portrait-slot__note">a face behind<br />the archive.</div>
          <button
            aria-expanded={isArchiveNoteOpen}
            aria-label="Reveal an archive note"
            className="portrait-slot__tag"
            onClick={() => setIsArchiveNoteOpen((open) => !open)}
            type="button"
          >
            {isArchiveNoteOpen ? <>not a bio.<br />a beginning.</> : <>Om<br />Nandurkar</>}
          </button>
        </div>

        <div aria-hidden="true" className="about-hero__shape about-hero__shape--one" />
        <div aria-hidden="true" className="about-hero__shape about-hero__shape--two" />
      </section>

      {/* ── Curiosity & Philosophy Section (Overview) ── */}
      <section className="about-story" id="about-story">
        <div className="about-story__aside">
          <span>why this<br />sanctuary<br />exists</span>
          <Star size={20} />
        </div>
        <div className="about-story__statement">
          <p className="section-kicker"><CircleDot size={14} /> the philosophy</p>
          <h2>Curiosity is not a straight line—<br /><em>it’s a living constellation.</em></h2>
          <p>
            Society often tells you to pick one lane: be just a musician, just a programmer, or just an academic. But curiosity doesn't operate in a straight line. It moves in sudden, intense waves of inspiration and hyperfocus.
          </p>
          <p>
            Creator Studio was built as a <strong>constructive sanctuary</strong>—a place where songs, stories, books, research papers, theories, film notes, and passing thoughts can all live side-by-side without competing.
          </p>
          <p>
            This archive is proof that a varied mind doesn't have to become a scattered one. Given structure, care, and room to breathe, every small fascination can contribute to one unified body of work.
          </p>
        </div>
        <div aria-hidden="true" className="about-story__stamp">
          <span>built of</span><strong>many<br />sparks</strong><i>✳</i>
        </div>
      </section>

      {/* ── Hobbies / Off The Clock Section ── */}
      <section className="hobbies-section" aria-labelledby="hobbies-title">
        <div className="hobbies-section__heading">
          <div>
            <p className="section-kicker"><Sparkles size={14} /> off the clock</p>
            <h2 id="hobbies-title">The parts of life<br />that feed <em>the work.</em></h2>
          </div>
          <p>Three open pockets for rituals, places, small obsessions and off-stage details—the material that makes a personal archive feel like someone’s actual desk.</p>
        </div>
        <div className="hobby-card-grid">
          {publishedHobbies.map((hobby, index) => (
            <Link className={`hobby-card hobby-card--${hobby.color}`} href={hobby.route || "/music"} key={hobby.id}>
              <span className="hobby-card__clip" aria-hidden="true" />
              <div className="hobby-card__top">
                <span>0{index + 1}</span>
                <span>{hobby.icon}</span>
              </div>
              {hobby.isTemplate && <span className="illustrative-label">personal fragment · held open</span>}
              <h3>{hobby.title}</h3>
              <p>{hobby.description}</p>
              <div className="hobby-card__bottom">
                <span>open in archive</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Collaborate Door ── */}
      <section className="about-collaborate">
        <div aria-hidden="true" className="about-collaborate__objects">
          <div className="collaborate-star">✳</div>
          <div className="collaborate-circle"><i /></div>
          <div className="collaborate-arrow">↗</div>
          <span />
        </div>
        <div className="about-collaborate__copy">
          <p className="section-kicker"><HeartHandshake size={14} /> a door left open</p>
          <h2>Good work likes<br />company <em>sometimes.</em></h2>
          <p>{studioProfile.availability}. If a project needs a song, an idea, a voice, a line, or a generous creative conversation, the contact room is ready.</p>
          <Link className="text-arrow-link" href="/contact">step into the contact room <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </SiteShell>
  );
}
