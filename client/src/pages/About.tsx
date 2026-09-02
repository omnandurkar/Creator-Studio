/**
 * Pastel Afterimage Archive visual reminder: About is the Green-Room Collage—
 * pistachio and cream cut-paper layers, photographed-memory slots, and a human
 * scale that introduces Om without inventing personal history or hobbies.
 */
import { ArrowUpRight, Camera, CircleDot, HeartHandshake, Sparkles, Star, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedHobbies, studioProfile } from "@/lib/content";

export default function About() {
  const [isArchiveNoteOpen, setIsArchiveNoteOpen] = useState(false);
  return (
    <SiteShell pageTheme="about">
      <section className="about-hero">
        <div className="about-hero__paper-lines" aria-hidden="true" />
        <div className="about-hero__copy"><p className="about-hero__kicker"><UserRound size={14} /> green-room collage / vol. 08</p><h1>Hello,<br />I’m <em>Om.</em></h1><p>{studioProfile.aboutIntro}</p><a className="about-hero__jump" href="#about-story">a little more about the work <ArrowUpRight size={16} /></a></div>
        <div className="about-hero__portrait-slot" aria-label="Reserved space for Om’s portrait image"><div className="portrait-slot__frame"><Camera size={36} /><span>portrait<br />off-frame</span><i /><i /><i /></div><div className="portrait-slot__sun" /><div className="portrait-slot__note">a face behind<br />the archive.</div><button aria-expanded={isArchiveNoteOpen} aria-label="Reveal an archive note" className="portrait-slot__tag" onClick={() => setIsArchiveNoteOpen((open) => !open)} type="button">{isArchiveNoteOpen ? <>not a bio.<br />a beginning.</> : <>Om<br />Nandurkar</>}</button></div>
        <div className="about-hero__shape about-hero__shape--one" aria-hidden="true" /><div className="about-hero__shape about-hero__shape--two" aria-hidden="true" />
      </section>

      <section className="about-story" id="about-story"><div className="about-story__aside"><span>the person<br />inside the<br />pages</span><Star size={20} /></div><div className="about-story__statement"><p className="section-kicker"><CircleDot size={14} /> beyond the release</p><h2>Sound. Words.<br />Frames. <em>Days.</em></h2><p>{studioProfile.aboutNote}</p><p>This is intentionally the one place that will grow more personal over time. It can hold an honest bio, the road into music, old photographs, an unfinished list of interests, a few things you make room for, and the small details that feel like you.</p></div><div className="about-story__stamp" aria-hidden="true"><span>made of</span><strong>small<br />things</strong><i>✳</i></div></section>

      <section className="hobbies-section" aria-labelledby="hobbies-title"><div className="hobbies-section__heading"><div><p className="section-kicker"><Sparkles size={14} /> off the clock</p><h2 id="hobbies-title">The parts of life<br />that feed <em>the work.</em></h2></div><p>Three open pockets for rituals, places, small obsessions and off-stage details—the material that makes a personal archive feel like someone’s actual desk.</p></div><div className="hobby-card-grid">{publishedHobbies.map((hobby, index) => <article className={`hobby-card hobby-card--${hobby.color}`} key={hobby.id}><span className="hobby-card__clip" aria-hidden="true" /><div className="hobby-card__top"><span>0{index + 1}</span><span>{hobby.icon}</span></div>{hobby.isTemplate && <span className="illustrative-label">personal fragment · held open</span>}<h3>{hobby.title}</h3><p>{hobby.description}</p><div className="hobby-card__bottom"><span>catalogued for later</span><ArrowUpRight size={16} /></div></article>)}</div></section>

      <section className="about-collaborate"><div className="about-collaborate__objects" aria-hidden="true"><div className="collaborate-star">✳</div><div className="collaborate-circle"><i /></div><div className="collaborate-arrow">↗</div><span /></div><div className="about-collaborate__copy"><p className="section-kicker"><HeartHandshake size={14} /> a door left open</p><h2>Good work likes<br />company <em>sometimes.</em></h2><p>{studioProfile.availability}. If a project needs a song, an idea, a voice, a line, or a generous creative conversation, the contact room is ready.</p><Link className="text-arrow-link" href="/contact">step into the closing credits <ArrowUpRight size={17} /></Link></div></section>
    </SiteShell>
  );
}
