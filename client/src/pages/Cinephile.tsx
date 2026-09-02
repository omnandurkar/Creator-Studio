/**
 * Pastel Afterimage Archive visual reminder: Cinephile is the Projector Daydream
 * room—lavender, cinema teal, pale apricot, charcoal ink, film perforations,
 * ticket stubs and a projector beam. It holds Om’s future film thoughts without
 * inventing any favourites, reviews, reactions, or ratings.
 */
import { ArrowDown, ArrowUpRight, CalendarDays, Clapperboard, Film, Lightbulb, ListFilter, Plus, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedFilms, publishedWatchlist, type FilmNote } from "@/lib/content";

const ticketColors = ["film-card--peach", "film-card--teal", "film-card--butter"];
function FilmFrame({ index }: { index: number }) { return <div className={`film-frame film-frame--${index % 3}`} aria-hidden="true"><span className="film-frame__sprockets film-frame__sprockets--left" /><span className="film-frame__sprockets film-frame__sprockets--right" /><div className="film-frame__circle"><i /></div><div className="film-frame__beam" /><span className="film-frame__star">✳</span></div>; }
function FilmCard({ film, index }: { film: FilmNote; index: number }) {
  return (
    <Link className={`film-card ${ticketColors[index % ticketColors.length]}`} href={`/cinephile/${film.slug}`}>
      <div className="film-card__ticket-cut" aria-hidden="true" />
      <div className="film-card__topline">
        <span>screening / {String(index + 1).padStart(2, "0")}</span>
        <Ticket size={15} />
      </div>
      {film.posterImage ? (
        <div className="film-card__poster-wrap">
          <img alt={`${film.title} poster`} className="film-card__poster-img" src={film.posterImage} />
        </div>
      ) : (
        <FilmFrame index={index} />
      )}
      <div className="film-card__copy">
        {film.isTemplate && <span className="illustrative-label illustrative-label--inline">screening folder · held open</span>}
        <h2>{film.title}</h2>
        <p>{film.director} · {film.year}</p>
      </div>
      <div className="film-card__bottom">
        <span>open journal page</span>
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}

export default function Cinephile() {
  const [isDirectorCutOpen, setIsDirectorCutOpen] = useState(false);
  const [sortMode, setSortMode] = useState<"watch" | "title">("watch");
  const [activeMotif, setActiveMotif] = useState<string | null>(null);
  const featured = publishedFilms.find((film) => film.featured) ?? publishedFilms[0];
  const motifs = useMemo(() => Array.from(new Set(publishedFilms.flatMap((film) => film.motifs ?? film.tags))), []);
  const visibleFilms = useMemo(() => {
    const filtered = activeMotif ? publishedFilms.filter((film) => (film.motifs ?? film.tags).includes(activeMotif)) : publishedFilms;
    return [...filtered].sort((a, b) => sortMode === "title" ? a.title.localeCompare(b.title) : a.watchedOn.localeCompare(b.watchedOn));
  }, [activeMotif, sortMode]);
  return <SiteShell pageTheme="cinephile"><section className="cinephile-hero"><div className="cinephile-hero__perforations" aria-hidden="true" /><div className="cinephile-hero__copy"><p className="cinephile-hero__kicker"><Film size={14} /> projector daydream / vol. 07</p><h1>For the frames<br />that followed<br />you <em>home.</em></h1><p>A personal movie journal for what you watched, what you felt, and the strange small details that stayed after the credits.</p><a className="cinephile-hero__jump" href="#screening-room"><ArrowDown size={17} /> enter the screening room</a></div><div className="cinephile-hero__projection" aria-label="Abstract projector and ticket-stub illustration"><div className="projection-ticket projection-ticket--back"><span>admit one</span><i /><i /><i /></div><div className="projection-ticket projection-ticket--front"><span>film notes</span><strong>✳</strong><small>for the frames<br />that stayed.</small></div><div className="projection-reel"><i /><i /><i /><i /><b /></div><div className="projection-beam" /><div className="projection-clap"><span>scene</span><i /><i /><i /><b /></div><button aria-expanded={isDirectorCutOpen} aria-label="Reveal the director’s cut note" className={`director-cut ${isDirectorCutOpen ? "is-open" : ""}`} onClick={() => setIsDirectorCutOpen((open) => !open)} type="button"><Clapperboard size={19} /><span>{isDirectorCutOpen ? "cut open" : "director’s cut"}</span></button>{isDirectorCutOpen && <p className="director-cut__note">Your best film notes don’t have to explain the whole story—just write the part that would not leave you alone.</p>}</div><p className="cinephile-hero__caption">click the clapperboard<br />for a small note.</p></section>
    <section className="cinephile-intro" id="screening-room"><div className="cinephile-intro__statement"><p className="section-kicker"><Lightbulb size={14} /> a place for your own take</p><h2>Not a rating.<br />A <em>remembering.</em></h2><p>This journal is intentionally built around personal detail, not a score. Add the scene, sound, color, question or feeling you want to keep—and let your own voice do the rest.</p></div><div className="cinephile-intro__ticket"><span className="ticket-hole ticket-hole--top" /><span className="ticket-hole ticket-hole--bottom" /><p>Om’s cinema<br />journal</p><i>01</i><small>title / director<br />year / watch date<br />one frame kept</small><b>your<br />own take ↗</b></div><div className="cinephile-intro__guide"><span>01</span><p>A title and image find their place.</p><span>02</span><p>Keep what stayed with you.</p><span>03</span><p>Return to one scene.</p></div></section>
    <section className="film-library" aria-labelledby="film-library-title"><div className="film-library__heading"><div><p className="section-kicker"><Ticket size={14} /> the watch diary</p><h2 id="film-library-title">Leave the lights<br /><em>on a little longer.</em></h2></div><p>Screening folders sit in the order they are filed. When a film stays with Om, it can return with a title, a memory, and a page of its own.</p></div><div className="film-library__controls"><span><ListFilter size={15} /> arrange the shelf</span><button aria-pressed={sortMode === "watch"} className={sortMode === "watch" ? "is-active" : ""} onClick={() => setSortMode("watch")} type="button">filing order</button><button aria-pressed={sortMode === "title"} className={sortMode === "title" ? "is-active" : ""} onClick={() => setSortMode("title")} type="button">title</button>{motifs.map((motif) => <button aria-pressed={activeMotif === motif} className={activeMotif === motif ? "is-active" : ""} key={motif} onClick={() => setActiveMotif((current) => current === motif ? null : motif)} type="button">{motif}</button>)}</div><div className="film-library__strip" aria-hidden="true"><span>✦</span><span>cinema is a way of noticing</span><span>✦</span><span>cinema is a way of noticing</span></div><div className="film-card-grid">{visibleFilms.map((film, index) => <FilmCard film={film} index={index} key={film.id} />)}</div></section>
    <section className="scene-index"><div><p className="section-kicker"><Clapperboard size={14} /> scene index</p><h2>One frame can<br /><em>keep a whole film.</em></h2><p>Every real journal entry can contribute a scene, sound, color, or gesture here. This index stays intentionally open until Om writes those notes.</p></div><div>{publishedFilms.map((film, index) => <Link href={`/cinephile/${film.slug}`} key={film.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{film.sceneToRemember}</strong><small>{film.title}</small></Link>)}</div></section>
    <section className="watchlist"><div className="watchlist__heading"><p className="section-kicker"><CalendarDays size={14} /> unfiled watchlist</p><h2>Tickets still<br /><em>in the pocket.</em></h2><p>A list of future screenings has no review attached to it. It only holds space for what might be watched next.</p></div><div className="watchlist__tickets">{publishedWatchlist.map((item, index) => <article key={item.id}><span>0{index + 1} / unfiled</span><strong>{item.title}</strong><p>{item.format}</p><small>{item.reason}</small></article>)}</div></section>
    {featured && <section className="cinephile-callout"><div className="cinephile-callout__frame" aria-hidden="true"><span>SCENE<br />TO<br />REMEMBER</span><i /><i /><i /><b /></div><div className="cinephile-callout__copy"><p className="section-kicker"><Plus size={14} /> an open folder</p><h2>A future note can begin with <em>one frame.</em></h2><p>Open a screening folder to find room for a title, a poster, the date, a lingering thought, a longer reflection, and the scene that still knows your name.</p><Link className="text-arrow-link" href={`/cinephile/${featured.slug}`}>open the screening folder <ArrowUpRight size={17} /></Link></div></section>}</SiteShell>;
}
