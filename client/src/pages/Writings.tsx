/**
 * Pastel Afterimage Archive visual reminder: Writings is the Mint-Margin Journal
 * room—sage and off-white paper, bottle-green ink, ruled margins, bookmark tabs,
 * page clips, and calm long-form space for reflective content.
 */
import { ArrowDown, ArrowUpRight, Bookmark, BookOpenText, Paperclip, PenLine } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedWritings, type Writing } from "@/lib/content";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

const categoryColors = ["writing-card--sage", "writing-card--peach", "writing-card--blue"];

function WritingCard({ entry, index }: { entry: Writing; index: number }) {
  return (
    <Link className={`writing-card ${categoryColors[index % categoryColors.length]}`} href={`/writings/${entry.slug}`}>
      <div className="writing-card__tape" aria-hidden="true" />
      <div className="writing-card__meta"><span>{entry.category}</span><span>{formatDate(entry.date)}</span></div>
      {entry.isIllustrative && <span className="illustrative-label">margin draft</span>}
      <h2>{entry.title}</h2>
      <p>{entry.excerpt}</p>
      <div className="writing-card__footer"><span>{entry.tags.slice(0, 2).join(" / ")}</span><ArrowUpRight size={17} /></div>
      <span aria-hidden="true" className="writing-card__pageno">0{index + 1}</span>
    </Link>
  );
}

export default function Writings() {
  const categories = ["All", ...Array.from(new Set(publishedWritings.map((entry) => entry.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const visibleWritings = useMemo(
    () => activeCategory === "All" ? publishedWritings : publishedWritings.filter((entry) => entry.category === activeCategory),
    [activeCategory],
  );
  const featured = publishedWritings.find((entry) => entry.featured) ?? publishedWritings[0];

  return (
    <SiteShell pageTheme="writings">
      <section className="writings-hero">
        <div className="writings-hero__ruled-lines" aria-hidden="true" />
        <div className="writings-hero__copy">
          <p className="writings-hero__kicker"><BookOpenText size={14} /> mint-margin journal / vol. 04</p>
          <h1>For thoughts<br />that deserve<br /><em>more time.</em></h1>
          <p>Reflections, process notes, small essays, half-stories and the gentle work of paying attention.</p>
          <a className="writings-hero__jump" href="#writing-shelf"><ArrowDown size={17} /> turn the page</a>
        </div>
        <div className="writings-hero__book" aria-label="Illustrated open journal and bookmark">
          <div className="hero-book__shadow" />
          <div className="hero-book__page hero-book__page--left"><span>01</span><i /><i /><i /><i /><i /></div>
          <div className="hero-book__page hero-book__page--right"><span>keep what<br />you notice</span><i /><i /><i /></div>
          <div className="hero-book__spine" /><button aria-expanded={isBookmarkOpen} aria-label="Reveal a margin note" className={`hero-book__bookmark ${isBookmarkOpen ? "is-open" : ""}`} onClick={() => setIsBookmarkOpen((open) => !open)} type="button"><Bookmark size={20} fill="currentColor" /></button>{isBookmarkOpen && <p className="hero-book__secret">Keep the sentence<br />that felt too small.</p>}<div className="hero-book__clip"><Paperclip size={50} /></div>
        </div>
        <p className="writings-hero__margin-note">there is no hurry<br />to say it perfectly.</p>
      </section>

      {featured && (
        <section className="featured-writing">
          <div className="featured-writing__label"><PenLine size={17} /><span>open<br />entry</span></div>
          <article className="featured-writing__article">
            <div className="featured-writing__image-slot"><span>your photo<br />or artwork<br />can live here</span><div className="featured-writing__sun" /></div>
            <div className="featured-writing__copy">
              {featured.isIllustrative && <p className="illustrative-label illustrative-label--inline">an open margin · first draft</p>}
              <p className="featured-writing__meta">{featured.category} · {formatDate(featured.date)}</p>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Link className="text-arrow-link" href={`/writings/${featured.slug}`}>read the full entry <ArrowUpRight size={17} /></Link>
            </div>
          </article>
          <div aria-hidden="true" className="featured-writing__scribble">take your time.</div>
        </section>
      )}

      <section className="writing-archive" id="writing-shelf" aria-labelledby="writing-archive-title">
        <div className="writing-archive__heading">
          <div><p className="section-kicker"><Bookmark size={14} /> the paper trail</p><h2 id="writing-archive-title">Read it<br /><em>slowly.</em></h2></div>
          <p>Use this space for anything that needs more room than a caption: a process note, a memory, a road story, a record sleeve, or a thought that resisted being brief.</p>
        </div>
        <div className="writing-filters" aria-label="Filter writings by type">
          {categories.map((category) => <button aria-pressed={activeCategory === category} className={activeCategory === category ? "is-active" : ""} key={category} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
        </div>
        <div className="writing-card-grid">{visibleWritings.map((entry, index) => <WritingCard entry={entry} index={index} key={entry.id} />)}</div>
      </section>

      <section className="writing-invitation">
        <div className="writing-invitation__stamps" aria-hidden="true"><span>✳</span><span>✎</span><span>☞</span></div>
        <div className="writing-invitation__copy"><p className="section-kicker"><PenLine size={14} /> built around your process</p><h2>One thought can be<br /><em>a whole world.</em></h2><p>You decide how much to share: a paragraph, an entire essay, a track annotation or a photograph with one good sentence beneath it. The archive will make room.</p><Link className="text-arrow-link" href="/shayari">visit the letter press <ArrowUpRight size={17} /></Link></div>
        <div className="writing-invitation__paper" aria-hidden="true"><span>draft</span><i /><i /><i /><div>Om’s<br />archive</div></div>
      </section>
    </SiteShell>
  );
}
