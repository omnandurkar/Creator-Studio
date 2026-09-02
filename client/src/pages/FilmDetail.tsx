import { ArrowLeft, ChevronDown, ChevronUp, Clapperboard, ExternalLink, Film, Lock, Music2, Play, ShieldAlert, Ticket, Volume2, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findFilm, findSongById } from "@/lib/content";

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`;
  }
  return null;
}

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const film = findFilm(slug);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  if (!film) {
    return (
      <SiteShell pageTheme="cinephile">
        <section className="film-reading film-reading--missing">
          <p className="section-kicker">screening not found</p>
          <h1>This ticket<br />leads nowhere.</h1>
          <p>The note may be a draft, or the address may have changed.</p>
          <Link className="ink-button" href="/cinephile"><ArrowLeft size={16} /> Back to Cinephile</Link>
        </section>
      </SiteShell>
    );
  }

  const nearbyTracks = (film.relatedSongIds ?? [])
    .map((id) => findSongById(id))
    .filter((song): song is NonNullable<typeof song> => Boolean(song));

  const playTrack = (id: string, title: string, source?: string) => {
    if (source) window.dispatchEvent(new CustomEvent("creator-studio:play-release", { detail: { id, title, source, label: "screening mix" } }));
  };

  const paragraphs = film.review.split("\n\n");
  const embedUrl = getYouTubeEmbedUrl(film.trailerUrl);

  return (
    <SiteShell pageTheme="cinephile">
      <article className="film-reading">
        <Link className="film-reading__back" href="/cinephile">
          <ArrowLeft size={16} /> back to the screening shelf
        </Link>

        <header className="film-reading__header">
          <p className="section-kicker"><Film size={14} /> personal film journal</p>
          {film.isTemplate && <p className="illustrative-label illustrative-label--inline">screening folder · held open</p>}
          <h1>{film.title}</h1>
          <p className="film-reading__metadata">
            <span>{film.director}</span>
            <span>{film.year}</span>
            <span>Watched: {film.watchedOn}</span>
          </p>

          {film.trailerUrl && (
            <div className="film-reading__actions">
              <button
                className="trailer-link-btn trailer-link-btn--play"
                onClick={() => setIsTrailerOpen((prev) => !prev)}
                type="button"
              >
                <Play size={15} fill="currentColor" /> {isTrailerOpen ? "Close Trailer" : "Play Trailer in Studio"}
              </button>

              <a
                className="trailer-link-btn trailer-link-btn--ext"
                href={film.trailerUrl}
                rel="noreferrer"
                target="_blank"
              >
                Watch on YouTube <ExternalLink size={14} />
              </a>
            </div>
          )}
        </header>

        {isTrailerOpen && embedUrl && (
          <div className="inline-trailer-container animate-slide-down">
            <div className="inline-trailer-header">
              <span>🎬 {film.title} — Official Teaser / Trailer</span>
              <button onClick={() => setIsTrailerOpen(false)} type="button"><X size={16} /> Close</button>
            </div>
            <div className="inline-trailer-responsive">
              <iframe
                src={embedUrl}
                title={`${film.title} Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="film-reading__poster-slot">
          {film.posterImage ? (
            <img alt={`${film.title} official poster`} className="film-reading__poster-img" src={film.posterImage} />
          ) : (
            <>
              <div className="film-reading__sprockets" aria-hidden="true" />
              <span>{film.title}<br />screening note</span>
              <b>no. 01</b>
            </>
          )}
        </div>

        <section className="film-reading__body">
          <aside>
            <Ticket size={27} />
            <span>personal<br />screening<br />note</span>
          </aside>
          <div>
            <div className="film-reading__section">
              <p className="film-reading__label">what stayed with me</p>
              <h2>{film.whatStayedWithMe}</h2>
            </div>

            <div className="film-reading__section">
              <p className="film-reading__label">my review</p>
              <div className="film-review-text">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="film-reading__section film-reading__section--scene">
              <Clapperboard size={21} />
              <p className="film-reading__label">scene to remember</p>
              <p>{film.sceneToRemember}</p>
            </div>

            {/* ── Spoiler Vault ── */}
            {film.spoilerSections && film.spoilerSections.length > 0 && (
              <div className="spoiler-vault-container">
                <button
                  aria-expanded={showSpoilers}
                  className={`spoiler-vault-toggle ${showSpoilers ? "is-open" : ""}`}
                  onClick={() => setShowSpoilers((prev) => !prev)}
                  type="button"
                >
                  <span className="spoiler-vault-icon">
                    {showSpoilers ? <Lock size={16} /> : <ShieldAlert size={16} />}
                  </span>
                  <span>
                    {showSpoilers ? "Hide Spoiler Vault" : "🚨 SPOILER VAULT — Click to Reveal Plot Twists & Ending"}
                  </span>
                  <span className="spoiler-vault-chevron">
                    {showSpoilers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {showSpoilers && (
                  <div className="spoiler-vault-content animate-slide-down" aria-live="polite">
                    <div className="spoiler-vault-banner">
                      <ShieldAlert size={18} />
                      <strong>Full Plot Summary &amp; Ending Spoilers (Includes Rocky &amp; Climax)</strong>
                    </div>
                    <div className="spoiler-vault-grid">
                      {film.spoilerSections.map((sec, i) => (
                        <div className="spoiler-card" key={i}>
                          <h3>{sec.title}</h3>
                          <p>{sec.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="film-reading__tags">
              {film.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </section>

        {nearbyTracks.length > 0 && (
          <section className="film-reading__crossfade">
            <p className="section-kicker"><Music2 size={14} /> soundtrack crossfade</p>
            <h2>A sound kept<br /><em>near the folder.</em></h2>
            <p>{film.crossfadeNote}</p>
            <div>
              {nearbyTracks.map((track) => (
                <button key={track.id} onClick={() => playTrack(track.id, track.title, track.audioPreview)} type="button">
                  <Volume2 size={16} /> {track.title}
                </button>
              ))}
            </div>
          </section>
        )}
      </article>
    </SiteShell>
  );
}
