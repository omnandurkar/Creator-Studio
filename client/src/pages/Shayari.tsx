/**
 * Pastel Afterimage Archive visual reminder: Shayari is the Rose-Letter Press
 * room—blush paper, pressed botanical shapes, faded crimson ink, wax seals,
 * moon vectors, and deliberately spacious reading surfaces.
 */
import { ArrowDown, ArrowUpRight, ChevronDown, ChevronUp, Feather, Flower2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedShayari, type Shayari as ShayariItem } from "@/lib/content";

const pageDecor = ["shayari-card--rose", "shayari-card--cream", "shayari-card--plum", "shayari-card--blush"];

function LeafyFlourish() {
  return (
    <svg aria-hidden="true" className="leafy-flourish" fill="none" viewBox="0 0 350 150">
      <path d="M8 142C88 96 71 22 150 53s86 89 192-43" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
      <path d="M86 87c-32-41-52-21-38 1 13 21 37 3 38-1Zm52-27c-27-37 1-49 14-25 12 23-9 30-14 25Zm77 33c-33-36-51-10-34 10 16 18 36-5 34-10Zm62-34c-13-42 20-46 25-18 4 27-19 25-25 18Z" fill="currentColor" opacity=".93" />
    </svg>
  );
}

function ShayariCard({ entry, index }: { entry: ShayariItem; index: number }) {
  return (
    <Link className={`shayari-card ${pageDecor[index % pageDecor.length]}`} href={`/shayari/${entry.slug}`}>
      <div className="shayari-card__topline"><span>{String(index + 1).padStart(2, "0")}</span><span>{entry.tags[0]}</span></div>
      {entry.isIllustrative && <span className="illustrative-label">pressed note · draft</span>}
      <p className="shayari-card__quote">“</p>
      <blockquote>{entry.text}</blockquote>
      <div className="shayari-card__bottom"><span>{entry.language}</span><ArrowUpRight size={16} /></div>
      <div aria-hidden="true" className="shayari-card__corner">☾</div>
    </Link>
  );
}

const SHAYARI_LIMIT = 4;

export default function Shayari() {
  const [isSealOpen, setIsSealOpen] = useState(false);
  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);
  const featured = publishedShayari.find((entry) => entry.featured) ?? publishedShayari[0];

  const visibleShayari = isArchiveExpanded ? publishedShayari : publishedShayari.slice(0, SHAYARI_LIMIT);

  return (
    <SiteShell pageTheme="shayari">
      <section className="shayari-hero">
        <div className="shayari-hero__petals" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="shayari-hero__copy">
          <p className="shayari-hero__kicker"><Flower2 size={14} /> rose-letter press / vol. 03</p>
          <h1>Small lines<br />for <em>large</em><br />feelings.</h1>
          <p>Moments of silence, love, memory and whatever else refuses to stay unspoken.</p>
          <a className="shayari-hero__jump" href="#shayari-archive"><ArrowDown size={17} /> read the lines</a>
        </div>
        <div className="shayari-hero__paper-stack" aria-label="Layered paper and letterpress illustration">
          <div className="shayari-paper shayari-paper--back" />
          <div className="shayari-paper shayari-paper--middle" />
          <div className="shayari-paper shayari-paper--front">
            <span className="shayari-paper__top">for a quiet hour</span>
            <LeafyFlourish />
            <span className="shayari-paper__moon">☾</span>
            <i /><i /><i />
          </div>
          <div aria-hidden="true" className="shayari-hero__postmark">words<br />kept</div>
          <div aria-hidden="true" className="shayari-hero__ink-sun" />
        </div>
        <span aria-hidden="true" className="shayari-hero__word one">dil</span>
        <span aria-hidden="true" className="shayari-hero__word two">khamoshi</span>
      </section>

      {featured && (
        <section className="shayari-feature" aria-labelledby="featured-shayari-title">
          <div className="shayari-feature__marker"><Feather size={20} /><span>featured<br />line</span></div>
          <article className="shayari-feature__card">
            {featured.isIllustrative && <p className="illustrative-label illustrative-label--wide">first proof · held in the letterpress</p>}
            <p className="shayari-feature__title" id="featured-shayari-title">{featured.title}</p>
            <blockquote>“{featured.text}”</blockquote>
            {featured.romanizedText && <p className="shayari-feature__romanized">{featured.romanizedText}</p>}
            <button className={`wax-seal ${isSealOpen ? "is-open" : ""}`} onClick={() => setIsSealOpen((open) => !open)} type="button" aria-expanded={isSealOpen}>
              <span>{isSealOpen ? "open" : "press"}</span><i>O</i>
            </button>
            <div className={`shayari-feature__hidden-line ${isSealOpen ? "is-visible" : ""}`} aria-live="polite">
              {featured.hiddenLine}
            </div>
          </article>
          <p className="shayari-feature__hint">press the wax seal to read the line tucked inside</p>
          <div className="shayari-feature__stems" aria-hidden="true"><LeafyFlourish /></div>
        </section>
      )}

      <section className="shayari-archive" id="shayari-archive" aria-labelledby="shayari-archive-title">
        <div className="shayari-archive__heading">
          <p className="section-kicker"><Sparkles size={14} /> the letterbox</p>
          <h2 id="shayari-archive-title">A place where<br /><em>words can stay.</em></h2>
          <p>Each card opens into a quiet reading page. Your original shayaris can appear in Hindi, Urdu, Romanized script, English—or all of them together.</p>
        </div>
        <div className="shayari-card-grid">
          {visibleShayari.map((entry, index) => <ShayariCard entry={entry} index={index} key={entry.id} />)}
        </div>
        {publishedShayari.length > SHAYARI_LIMIT && (
          <div className="section-more-wrapper">
            <button className="section-more-btn" onClick={() => setIsArchiveExpanded((prev) => !prev)} type="button">
              {isArchiveExpanded ? (
                <>Show Less <ChevronUp size={16} /></>
              ) : (
                <>View More Shayaris ({publishedShayari.length - SHAYARI_LIMIT} more) <ChevronDown size={16} /></>
              )}
            </button>
          </div>
        )}
      </section>

      <section className="shayari-workspace">
        <div className="shayari-workspace__art" aria-hidden="true">
          <div className="workspace-moon">☾</div><div className="workspace-ink" /><div className="workspace-line workspace-line--one" /><div className="workspace-line workspace-line--two" /><div className="workspace-flower">✳</div>
        </div>
        <div className="shayari-workspace__copy">
          <p className="section-kicker"><Feather size={14} /> your words, your way</p>
          <h2>The poetry has<br /><em>its own page.</em></h2>
          <p>Original text, Romanized text, translation, dates, tags and a hidden second line can all sit together here—like folded pages in the same letterbox.</p>
          <Link className="text-arrow-link" href="/music">go to the music room <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </SiteShell>
  );
}
