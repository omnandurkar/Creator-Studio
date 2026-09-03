/**
 * The Rec Room — Om's Curated Shelf & Public Notebook.
 * High-vibrancy, tactile, interactive design system featuring rich vector illustrations,
 * matchbox specimen cards, interactive Curator's Spotlight Deck, background 01/02/03 watermarks, and scrapbook modal.
 */
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Clapperboard,
  Compass,
  Film,
  Globe,
  Headphones,
  Link2,
  MapPin,
  Sparkles,
  Tv,
  X,
  Youtube,
  Bookmark,
  Radio,
  Flame,
  Shuffle,
  Quote,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import {
  publishedRecs,
  publishedBlogEntries,
  type RecommendationCategory,
  type RecommendationPick,
} from "@/lib/content";

/* ── Custom Vector Illustrations ── */

function FilmStripVector() {
  return (
    <svg className="vector-art-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="60" height="50" rx="4" fill="#144d53" stroke="#20252F" strokeWidth="2.5" />
      <rect x="16" y="21" width="48" height="38" rx="2" fill="#e8f7f5" />
      <circle cx="24" cy="30" r="4" fill="#144d53" />
      <circle cx="56" cy="30" r="4" fill="#144d53" />
      <path d="M24 48 C30 40, 50 40, 56 48" stroke="#144d53" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12" y="17" width="3" height="5" fill="#e8f7f5" />
      <rect x="12" y="58" width="3" height="5" fill="#e8f7f5" />
      <rect x="65" y="17" width="3" height="5" fill="#e8f7f5" />
      <rect x="65" y="58" width="3" height="5" fill="#e8f7f5" />
    </svg>
  );
}

function YoutubeVector() {
  return (
    <svg className="vector-art-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="64" height="40" rx="8" fill="#a82323" stroke="#20252F" strokeWidth="2.5" />
      <polygon points="34,30 34,50 52,40" fill="#fff0f0" stroke="#20252F" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="62" cy="18" r="6" fill="#ffd166" stroke="#20252F" strokeWidth="2" />
    </svg>
  );
}

function PlacesVector() {
  return (
    <svg className="vector-art-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10 C26 10, 15 21, 15 35 C15 54, 40 74, 40 74 C40 74, 65 54, 65 35 C65 21, 54 10, 40 10 Z" fill="#ffd166" stroke="#20252F" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="40" cy="34" r="10" fill="#fffde6" stroke="#20252F" strokeWidth="2" />
      <circle cx="40" cy="34" r="4" fill="#20252F" />
    </svg>
  );
}

function MusicVector() {
  return (
    <svg className="vector-art-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="30" fill="#20252F" />
      <circle cx="40" cy="40" r="22" stroke="#5c2a9d" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="40" cy="40" r="12" fill="#f3ebfc" stroke="#20252F" strokeWidth="2" />
      <circle cx="40" cy="40" r="4" fill="#20252F" />
      <path d="M55 20 L65 12" stroke="#ff6b6b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BooksVector() {
  return (
    <svg className="vector-art-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 20 C15 20, 30 16, 40 22 C50 16, 65 20, 65 20 L65 65 C65 65, 50 61, 40 67 C30 61, 15 65, 15 65 Z" fill="#edf2fc" stroke="#20252F" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="40" y1="22" x2="40" y2="67" stroke="#20252F" strokeWidth="2.5" />
      <path d="M48 20 L48 40 L54 35 L60 40 L60 20 Z" fill="#ff6e6c" stroke="#20252F" strokeWidth="1.5" />
    </svg>
  );
}

function InternetVector() {
  return (
    <svg className="vector-art-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="56" height="48" rx="6" fill="#eefbf5" stroke="#20252F" strokeWidth="2.5" />
      <rect x="12" y="16" width="56" height="12" fill="#156d4b" />
      <circle cx="20" cy="22" r="2.5" fill="#fff" />
      <circle cx="28" cy="22" r="2.5" fill="#fff" />
      <circle cx="36" cy="22" r="2.5" fill="#fff" />
      <path d="M24 42 Q40 30 56 46" stroke="#156d4b" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="42" r="4" fill="#ff7b54" stroke="#20252F" strokeWidth="1.5" />
      <circle cx="56" cy="46" r="4" fill="#ffd166" stroke="#20252F" strokeWidth="1.5" />
    </svg>
  );
}

const CATEGORY_VECTORS: Record<string, React.FC> = {
  teal: FilmStripVector,
  coral: YoutubeVector,
  butter: PlacesVector,
  peach: MusicVector,
  sky: BooksVector,
  lilac: InternetVector,
};

const CategoryLucideIcon: Record<string, React.ElementType> = {
  teal: Clapperboard,
  coral: Youtube,
  butter: MapPin,
  peach: Headphones,
  sky: BookOpen,
  lilac: Link2,
};

/* Color maps with vibrant accents */
const catTheme: Record<
  string,
  { accent: string; bg: string; border: string; text: string; lightBg: string }
> = {
  teal: {
    accent: "#144d53",
    bg: "#e8f7f5",
    border: "#144d53",
    text: "#0c3337",
    lightBg: "#f2fbf9",
  },
  coral: {
    accent: "#a82323",
    bg: "#fff0f0",
    border: "#a82323",
    text: "#6b1414",
    lightBg: "#fff7f7",
  },
  butter: {
    accent: "#8a6d14",
    bg: "#fffde6",
    border: "#8a6d14",
    text: "#52400a",
    lightBg: "#fffeee",
  },
  peach: {
    accent: "#5c2a9d",
    bg: "#f3ebfc",
    border: "#5c2a9d",
    text: "#391866",
    lightBg: "#f9f4fd",
  },
  sky: {
    accent: "#1e295d",
    bg: "#edf2fc",
    border: "#1e295d",
    text: "#10183b",
    lightBg: "#f5f8fd",
  },
  lilac: {
    accent: "#156d4b",
    bg: "#eefbf5",
    border: "#156d4b",
    text: "#0c402c",
    lightBg: "#f5fdf9",
  },
};

/* ══════════════════════════════════════════
   SCRAPBOOK MODAL COMPONENT
══════════════════════════════════════════ */
function RecModal({
  pick,
  color,
  onClose,
}: {
  pick: RecommendationPick;
  color: string;
  onClose: () => void;
}) {
  const theme = catTheme[color] ?? catTheme.teal;
  const VectorArt = CATEGORY_VECTORS[color] ?? FilmStripVector;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="rec-modal-backdrop" onClick={onClose}>
      <div
        className="rec-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ "--theme-accent": theme.accent, "--theme-bg": theme.bg } as React.CSSProperties}
      >
        <div className="rec-modal-tape" aria-hidden="true" />
        <button className="rec-modal-close" onClick={onClose} aria-label="Close Note">
          <X size={18} />
        </button>

        <div className="rec-modal-header">
          <div className="rec-modal-art">
            <VectorArt />
          </div>
          <div className="rec-modal-meta">
            <span className="rec-modal-type-badge">{pick.type}</span>
            {pick.featured && <span className="rec-modal-featured-tag">★ Curator's Pick</span>}
            <h2 className="rec-modal-title">{pick.title}</h2>
            {pick.creator && (
              <p className="rec-modal-creator">
                by {pick.creator} {pick.year ? `(${pick.year})` : ""}
              </p>
            )}
          </div>
        </div>

        <div className="rec-modal-note-box">
          <div className="rec-modal-note-header">
            <span>Om's Personal Impression</span>
            <span className="rec-modal-stamp">✳ verified</span>
          </div>
          <p className="rec-modal-note-text">“{pick.why}”</p>
        </div>

        <div className="rec-modal-footer">
          <span className="rec-modal-tag">#{pick.tag}</span>
          <div className="rec-modal-actions">
            {pick.link && (
              <a
                href={pick.link}
                target="_blank"
                rel="noreferrer"
                className="rec-modal-btn rec-modal-btn--primary"
              >
                Open External Link <ArrowUpRight size={14} />
              </a>
            )}
            <button className="rec-modal-btn rec-modal-btn--secondary" onClick={onClose}>
              Back to Shelf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MATCHBOX / SPECIMEN CARD
══════════════════════════════════════════ */
function PickCard({
  pick,
  color,
  index,
  onReadAbout,
}: {
  pick: RecommendationPick;
  color: string;
  index: number;
  onReadAbout: () => void;
}) {
  const theme = catTheme[color] ?? catTheme.teal;
  const LucideIcon = CategoryLucideIcon[color] ?? Flame;

  return (
    <article
      className={`matchbox-card matchbox-card--${color} matchbox-card--rot-${(index % 3) + 1}`}
      onClick={onReadAbout}
      style={
        {
          "--theme-accent": theme.accent,
          "--theme-bg": theme.bg,
          "--theme-light": theme.lightBg,
          "--theme-text": theme.text,
          cursor: "pointer",
        } as React.CSSProperties
      }
    >
      <div className="matchbox-card__stripe">
        <span className="matchbox-card__type">
          <LucideIcon size={12} />
          {pick.type}
        </span>
        <span className="matchbox-card__num">#0{index + 1}</span>
      </div>

      <div className="matchbox-card__body">
        <h3 className="matchbox-card__title">{pick.title}</h3>
        {pick.creator && (
          <p className="matchbox-card__creator">
            {pick.creator} {pick.year ? `· ${pick.year}` : ""}
          </p>
        )}

        <p className="matchbox-card__why">{pick.why}</p>

        <div className="matchbox-card__meta">
          <span className="matchbox-card__tag">#{pick.tag}</span>
          {pick.featured && (
            <span className="matchbox-card__star" title="Curator's Pick (Featured)">
              ★
            </span>
          )}
        </div>

        <div className="matchbox-card__actions">
          <button
            className="matchbox-btn matchbox-btn--read"
            onClick={(e) => {
              e.stopPropagation();
              onReadAbout();
            }}
          >
            Read Note ✳
          </button>
          {pick.link ? (
            <a
              href={pick.link}
              target="_blank"
              rel="noreferrer"
              className="matchbox-btn matchbox-btn--go"
              onClick={(e) => e.stopPropagation()}
            >
              Visit <ArrowUpRight size={12} />
            </a>
          ) : (
            <span className="matchbox-btn matchbox-btn--disabled">Archived</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════
   CATEGORY BLOCK COMPONENT (With Background Number Watermark)
══════════════════════════════════════════ */
function CategoryBlock({
  cat,
  index,
  onReadAbout,
}: {
  cat: RecommendationCategory;
  index: number;
  onReadAbout: (pick: RecommendationPick, color: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = catTheme[cat.color] ?? catTheme.teal;
  const VectorArt = CATEGORY_VECTORS[cat.color] ?? FilmStripVector;
  const visiblePicks = cat.picks.filter((p) => p.published);
  const formattedIndex = String(index + 1).padStart(2, "0");

  const displayedPicks = isExpanded ? visiblePicks : visiblePicks.slice(0, 4);
  const hasMore = visiblePicks.length > 4;

  return (
    <section
      className={`rec-category-room rec-category-room--${cat.color}`}
      id={`category-${cat.slug}`}
      style={
        {
          "--theme-accent": theme.accent,
          "--theme-bg": theme.bg,
          "--theme-light": theme.lightBg,
        } as React.CSSProperties
      }
    >
      {/* Background Watermark Number (01, 02, 03...) */}
      <span className="category-bg-number" aria-hidden="true">
        {formattedIndex}
      </span>

      {/* Sleek Minimal Room Header */}
      <header className="shelf-room-header">
        <div className="shelf-room-header__top">
          <div className="shelf-room-kicker-group">
            <span className="shelf-room-num">{formattedIndex}</span>
            <span className="shelf-room-bullet">·</span>
            <span className="shelf-room-kicker">{cat.kicker}</span>
          </div>

          <div className="shelf-room-top-right">
            <span className="shelf-room-count">{visiblePicks.length} Items</span>
          </div>
        </div>

        <div className="shelf-room-header__main">
          <div className="shelf-room-icon">
            <VectorArt />
          </div>
          <div className="shelf-room-titles">
            <h2 className="shelf-room-title">{cat.category}</h2>
            <p className="shelf-room-desc">{cat.description}</p>
          </div>
        </div>

        <div className="shelf-room-line" />
      </header>

      {/* Grid of Matchbox Specimen Cards */}
      <div className="matchbox-grid">
        {displayedPicks.map((pick, i) => {
          const isExtra = i >= 4;
          return (
            <div
              key={pick.id}
              className={isExtra ? "matchbox-unfold-card-anim" : "matchbox-base-item"}
              style={{ "--item-delay": i - 4 } as React.CSSProperties}
            >
              <PickCard
                pick={pick}
                color={cat.color}
                index={i}
                onReadAbout={() => onReadAbout(pick, cat.color)}
              />
            </div>
          );
        })}

        {/* When Collapsed: Place the SAME unfold pill button right in the 5th card slot! */}
        {hasMore && !isExpanded && (
          <div className="matchbox-grid-unfold-slot">
            <button
              className="shelf-unfold-btn"
              onClick={() => setIsExpanded(true)}
              aria-expanded={false}
            >
              <span>Unfold {visiblePicks.length - 4} More Specimen</span>
              <span className="unfold-arrow">▼</span>
            </button>
          </div>
        )}
      </div>

      {/* When Expanded: Move the SAME fold pill button to below the grid */}
      {hasMore && isExpanded && (
        <div className="shelf-unfold-wrapper">
          <button
            className="shelf-unfold-btn"
            onClick={() => setIsExpanded(false)}
            aria-expanded={true}
          >
            <span>Fold Specimen Rack</span>
            <span className="unfold-arrow">▲</span>
          </button>
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN REC ROOM PAGE COMPONENT
══════════════════════════════════════════ */
export default function Recs() {
  const recentBlog = publishedBlogEntries.slice(0, 3);
  const [openPick, setOpenPick] = useState<{ pick: RecommendationPick; color: string } | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  // Collect all picks across categories for interactive hero spotlight fan
  const allFeaturedPicks = useMemo(() => {
    return publishedRecs.flatMap((cat) =>
      cat.picks
        .filter((p) => p.published)
        .map((p) => ({
          ...p,
          color: cat.color,
          categoryName: cat.category,
        }))
    );
  }, []);

  const [spotlightIdx, setSpotlightIdx] = useState(0);

  const activeSpotlightPick = allFeaturedPicks[spotlightIdx] ?? allFeaturedPicks[0];
  const spotlightTheme = catTheme[activeSpotlightPick?.color ?? "teal"] ?? catTheme.teal;
  const SpotlightVector = CATEGORY_VECTORS[activeSpotlightPick?.color ?? "teal"] ?? FilmStripVector;

  const handleShuffleSpotlight = () => {
    if (allFeaturedPicks.length <= 1) return;
    let nextIdx = spotlightIdx;
    while (nextIdx === spotlightIdx) {
      nextIdx = Math.floor(Math.random() * allFeaturedPicks.length);
    }
    setSpotlightIdx(nextIdx);
  };

  // Compute overall stats
  const totalPicks = useMemo(
    () => publishedRecs.reduce((acc, cat) => acc + cat.picks.filter((p) => p.published).length, 0),
    []
  );

  const displayedCategories = useMemo(() => {
    if (!activeCategoryFilter) return publishedRecs;
    return publishedRecs.filter((cat) => cat.slug === activeCategoryFilter);
  }, [activeCategoryFilter]);

  return (
    <SiteShell pageTheme="recs">
      {/* ── HERO SECTION ── Vibrant, Interactive, Tactile */}
      <section className="recs-vivid-hero">
        <div className="recs-vivid-hero__perforations" aria-hidden="true" />
        <div className="recs-hero-bg-vectors" aria-hidden="true">
          <div className="recs-bg-vector-circle" />
          <div className="recs-bg-vector-star">✳</div>
          <div className="recs-bg-vector-sun" />
        </div>

        <div className="recs-vivid-hero__grid">
          {/* Left Column: Headline & Bio — Refined to match site editorial standards */}
          <div className="recs-vivid-hero__copy">
            <p className="recs-hero-tag">
              <Sparkles size={14} className="recs-hero-spark" />
              om's recommendations / vol. 10
            </p>
            <h1 className="recs-hero-title">
              Things Om<br />
              suggested for a<br />
              <em>quiet hour.</em>
            </h1>
            <p className="recs-hero-sub">
              A personal index of films, YouTube channels, cozy spots, music, books, and internet finds Om actually loves.
              Hand-picked recommendations before the algorithm decides for you.
            </p>

            <div className="recs-hero-stats">
              <div className="stat-pill">
                <strong>{publishedRecs.length}</strong>
                <span>Categories</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <strong>{totalPicks}</strong>
                <span>Om's Picks</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <strong>100%</strong>
                <span>Human Taste</span>
              </div>
            </div>

            <a className="recs-hero-jump-btn" href="#rec-shelf-start">
              <ArrowDown size={16} /> Browse Om's Recommendations
            </a>
          </div>

          {/* Right Column: High-Impact Interactive Specimen Showcase Fan Deck */}
          <div className="recs-hero-showcase">
            <div className="showcase-deck">
              {/* Background Stack Layer 2 */}
              <div className="showcase-card showcase-card--bg2" aria-hidden="true" />
              {/* Background Stack Layer 1 */}
              <div className="showcase-card showcase-card--bg1" aria-hidden="true" />

              {/* Top Featured Card */}
              {activeSpotlightPick && (
                <div
                  className="showcase-card showcase-card--active"
                  style={
                    {
                      "--spotlight-accent": spotlightTheme.accent,
                      "--spotlight-bg": spotlightTheme.bg,
                    } as React.CSSProperties
                  }
                >
                  <div className="showcase-tape" aria-hidden="true" />

                  <div className="showcase-top">
                    <span className="showcase-badge">
                      ★ Curator's Spotlight ({spotlightIdx + 1}/{allFeaturedPicks.length})
                    </span>
                    <span className="showcase-cat">{activeSpotlightPick.categoryName}</span>
                  </div>

                  <div className="showcase-main">
                    <div className="showcase-art">
                      <SpotlightVector />
                    </div>
                    <div className="showcase-info">
                      <h3>{activeSpotlightPick.title}</h3>
                      <p className="showcase-creator">
                        {activeSpotlightPick.creator}{" "}
                        {activeSpotlightPick.year ? `(${activeSpotlightPick.year})` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="showcase-note">
                    <Quote size={14} className="showcase-quote-icon" />
                    <p className="showcase-why">“{activeSpotlightPick.why}”</p>
                  </div>

                  <div className="showcase-actions">
                    <button
                      className="showcase-action-btn showcase-action-btn--shuffle"
                      onClick={handleShuffleSpotlight}
                    >
                      <Shuffle size={13} /> Shuffle Spotlight
                    </button>
                    <button
                      className="showcase-action-btn showcase-action-btn--read"
                      onClick={() =>
                        setOpenPick({
                          pick: activeSpotlightPick,
                          color: activeSpotlightPick.color,
                        })
                      }
                    >
                      Read Note ✳
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="showcase-caption">
              <span>✦ Click shuffle to cycle through Om's spotlight picks</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER & JUMP BAR ── */}
      <nav className="recs-filter-bar" id="rec-shelf-start" aria-label="Category Navigation">
        <div className="recs-filter-bar__inner">
          <span className="filter-label">Filter Shelf:</span>
          <button
            className={`filter-pill ${activeCategoryFilter === null ? "is-active" : ""}`}
            onClick={() => setActiveCategoryFilter(null)}
          >
            All Items ({totalPicks})
          </button>
          {publishedRecs.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill filter-pill--${cat.color} ${activeCategoryFilter === cat.slug ? "is-active" : ""
                }`}
              onClick={() =>
                setActiveCategoryFilter(activeCategoryFilter === cat.slug ? null : cat.slug)
              }
            >
              {cat.category} ({cat.picks.filter((p) => p.published).length})
            </button>
          ))}
        </div>
      </nav>

      {/* ── ROOM SECTIONS ── */}
      <div className="recs-category-list">
        {displayedCategories.map((cat, idx) => (
          <CategoryBlock
            key={cat.id}
            cat={cat}
            index={idx}
            onReadAbout={(pick, color) => setOpenPick({ pick, color })}
          />
        ))}
      </div>

      {/* ── THE OPEN TAB (PUBLIC NOTEBOOK) ── */}
      {recentBlog.length > 0 && (
        <section className="open-tab-section">
          {/* Notebook spiral ring binding decor */}
          <div className="notebook-spiral-binding" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>

          <div className="open-tab-section__header">
            <div>
              <p className="section-kicker">
                <Sparkles size={14} /> The Public Notebook · Personal Blogs Written by Om
              </p>
              <h2>
                The Open Tab.<br />
                <em>Unfiltered Thoughts.</em>
              </h2>
              <p>
                Short-form essays, 3 AM epiphanies, and reflections on physics, music, and creative process—written by Om.
              </p>
            </div>

            <div className="open-tab-header-right">
              <span className="om-notebook-stamp">✍️ Om's Desk Journal</span>
              <Link className="open-tab-cta" href="/blog">
                Browse All Entries <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="open-tab-cards">
            {recentBlog.map((entry, idx) => (
              <Link key={entry.id} className="open-tab-card" href={`/blog/${entry.slug}`}>
                <div className="open-tab-card__tape" aria-hidden="true" />
                <div className="open-tab-card__meta">
                  <time>
                    {new Date(entry.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span className={`mood-badge mood-badge--${entry.mood}`}>{entry.mood}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.excerpt}</p>
                <div className="open-tab-card__footer">
                  <span className="read-link">Read Entry →</span>
                  <span className="entry-num">0{idx + 1}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── SCRAPBOOK MODAL ── */}
      {openPick && (
        <RecModal
          pick={openPick.pick}
          color={openPick.color}
          onClose={() => setOpenPick(null)}
        />
      )}
    </SiteShell>
  );
}
