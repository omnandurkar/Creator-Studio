import { ArrowDown, ArrowUpRight, BookOpen, BookText, ChevronDown, ChevronUp, FlaskConical, FolderOpen, Library as LibraryIcon, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { allLibraryItems, publishedBooks, publishedResearch, type Book, type ResearchPaper, type LibraryItem } from "@/lib/content";
import "../books.css";

type LibraryFilter = "all" | "books" | "research" | "others";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

/* ── Book Card ────────────────────────────────────── */
function BookCard({ entry, index }: { entry: Book; index: number }) {
  const isAvailable = entry.status === "Available";

  return (
    <Link
      className={`writing-card ${isAvailable ? "writing-card--blue" : "writing-card--sage"}`}
      href={isAvailable ? `/library/${entry.slug}` : "#"}
      style={{ opacity: isAvailable ? 1 : 0.7, pointerEvents: isAvailable ? 'auto' : 'none' }}
    >
      <div className="writing-card__tape" aria-hidden="true" />
      <div className="writing-card__meta">
        <span>{entry.category}</span>
        <span>{isAvailable ? formatDate(entry.date) : "Coming Soon"}</span>
      </div>
      <h2>{entry.title}</h2>
      <p>{entry.excerpt}</p>
      <div className="writing-card__footer">
        <span>{entry.tags.length > 0 ? entry.tags.slice(0, 2).join(" / ") : "Pending"}</span>
        {isAvailable && <ArrowUpRight size={17} />}
      </div>
      <span aria-hidden="true" className="writing-card__pageno">0{index + 1}</span>
    </Link>
  );
}

/* ── Research Card ────────────────────────────────── */
function ResearchCard({ entry, index }: { entry: ResearchPaper; index: number }) {
  return (
    <Link className="research-card" href={`/research/${entry.slug}`}>
      <div className="research-card__field-badge">
        <FlaskConical size={12} />
        <span>{entry.field}</span>
      </div>
      <h2>{entry.title}</h2>
      <p className="research-card__authors">{entry.authors.join(", ")}</p>
      <p className="research-card__abstract">{entry.abstract}</p>
      <div className="research-card__footer">
        <span>{formatDate(entry.date)}</span>
        <span className="research-card__tags">{entry.tags.slice(0, 2).join(" · ")}</span>
        <ArrowUpRight size={17} />
      </div>
      <span aria-hidden="true" className="research-card__index">{String(index + 1).padStart(2, "0")}</span>
    </Link>
  );
}

/* ── Section Divider ──────────────────────────────── */
function SectionHeader({
  icon,
  kicker,
  title,
  subtitle,
  accent,
  id,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: React.ReactNode;
  subtitle: string;
  accent: string;
  id: string;
}) {
  return (
    <div className="library-section-header" id={id} style={{ "--section-accent": accent } as React.CSSProperties}>
      <div className="library-section-header__icon" aria-hidden="true">{icon}</div>
      <div className="library-section-header__copy">
        <p className="library-section-header__kicker">{kicker}</p>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className="library-section-header__line" aria-hidden="true" />
    </div>
  );
}

/* ── Filters ──────────────────────────────────────── */
const filters: { label: string; value: LibraryFilter; icon: React.ReactNode }[] = [
  { label: "All", value: "all", icon: <LibraryIcon size={13} /> },
  { label: "Books", value: "books", icon: <BookText size={13} /> },
  { label: "Research", value: "research", icon: <FlaskConical size={13} /> },
  { label: "Others", value: "others", icon: <FolderOpen size={13} /> },
];

/* ── Others placeholder data ─────────────────────── */
const othersItems = [
  { id: "other-001", title: "Coming Soon", description: "Notes, case studies, and more — this section will grow as the archive expands.", icon: "📂" },
];

const SECTION_LIMIT = 3;

export default function Library() {
  const [activeFilter, setActiveFilter] = useState<LibraryFilter>("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const showBooks = activeFilter === "all" || activeFilter === "books";
  const showResearch = activeFilter === "all" || activeFilter === "research";
  const showOthers = activeFilter === "all" || activeFilter === "others";

  const totalCount = allLibraryItems.length + othersItems.length;

  const visibleBooks = expandedSections["books"] ? publishedBooks : publishedBooks.slice(0, SECTION_LIMIT);
  const visibleResearch = expandedSections["research"] ? publishedResearch : publishedResearch.slice(0, SECTION_LIMIT);

  return (
    <SiteShell pageTheme="library">
      {/* ── Hero ── */}
      <section className="writings-hero">
        <div className="writings-hero__ruled-lines" aria-hidden="true" />
        <div className="writings-hero__copy">
          <p className="writings-hero__kicker"><LibraryIcon size={14} /> library / vol. 05</p>
          <h1>For stories<br />and ideas<br /><em>worth keeping.</em></h1>
          <p>Fiction that lingers in the mind, research that pushes it forward, and everything in between — all under one roof.</p>
          <a className="writings-hero__jump" href="#library-shelf"><ArrowDown size={17} /> browse the library</a>
        </div>

        <div className="writings-hero__book" aria-label="Illustrated open journal and bookmark">
          <div className="hero-book__shadow" />
          <div className="hero-book__page hero-book__page--left"><span>01</span><i /><i /><i /><i /><i /></div>
          <div className="hero-book__page hero-book__page--right"><span>Stories &<br />Research</span><i /><i /><i /></div>
        </div>
        <p className="writings-hero__margin-note">knowledge<br />has no borders.</p>
      </section>

      {/* ── Library Collection ── */}
      <section className="writing-archive library-archive" id="library-shelf" aria-labelledby="library-archive-title">
        <div className="writing-archive__heading">
          <div>
            <p className="section-kicker"><LibraryIcon size={14} /> the collection</p>
            <h2 id="library-archive-title">Explore the<br /><em>library.</em></h2>
          </div>
          <p>From fiction novels to academic research papers and beyond — everything that has been written, filed, and kept.</p>
        </div>

        {/* ── Filter Bar ── */}
        <div className="library-filter-row" aria-label="Filter library items">
          <span className="library-filter-row__label">
            <SlidersHorizontal size={15} /> Filter by type
          </span>
          <div className="library-filter-row__controls">
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter.value}
                className={activeFilter === filter.value ? "is-active" : ""}
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {filter.icon}
                {filter.label}
                <span className="library-filter-count">
                  {filter.value === "all"
                    ? totalCount
                    : filter.value === "books"
                      ? publishedBooks.length
                      : filter.value === "research"
                        ? publishedResearch.length
                        : othersItems.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ═══ Books Section ═══ */}
        {showBooks && publishedBooks.length > 0 && (
          <div className="library-section library-section--books">
            <SectionHeader
              id="section-books"
              icon={<BookText size={22} />}
              kicker="section 01"
              title={<>Books &amp; <em>Fiction</em></>}
              subtitle="Stories, novels, and creative fiction — tales that linger in the mind."
              accent="#1e293b"
            />
            <div className="library-card-grid">
              {visibleBooks.map((entry, index) => (
                <BookCard entry={entry} index={index} key={entry.id} />
              ))}
            </div>
            {publishedBooks.length > SECTION_LIMIT && (
              <div className="section-more-wrapper">
                <button className="section-more-btn" onClick={() => toggleSection("books")} type="button">
                  {expandedSections["books"] ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>View More Books ({publishedBooks.length - SECTION_LIMIT} more) <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ Research Papers Section ═══ */}
        {showResearch && publishedResearch.length > 0 && (
          <div className="library-section library-section--research">
            <SectionHeader
              id="section-research"
              icon={<FlaskConical size={22} />}
              kicker="section 02"
              title={<>Research <em>Papers</em></>}
              subtitle="Academic research, experiments, and published findings."
              accent="#3a4a8f"
            />
            <div className="library-card-grid">
              {visibleResearch.map((entry, index) => (
                <ResearchCard entry={entry} index={index} key={entry.id} />
              ))}
            </div>
            {publishedResearch.length > SECTION_LIMIT && (
              <div className="section-more-wrapper">
                <button className="section-more-btn" onClick={() => toggleSection("research")} type="button">
                  {expandedSections["research"] ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>View More Research ({publishedResearch.length - SECTION_LIMIT} more) <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ Others Section ═══ */}
        {showOthers && (
          <div className="library-section library-section--others">
            <SectionHeader
              id="section-others"
              icon={<FolderOpen size={22} />}
              kicker="section 03"
              title={<>Other <em>Works</em></>}
              subtitle="Case studies, reports, and everything else worth archiving."
              accent="#8b5e3c"
            />
            <div className="library-card-grid">
              {othersItems.map((item) => (
                <div className="others-card" key={item.id}>
                  <span className="others-card__icon" aria-hidden="true">{item.icon}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <div className="others-card__badge">coming soon</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state if a filter has no content */}
        {activeFilter === "books" && publishedBooks.length === 0 && (
          <div className="library-empty"><BookOpen size={40} /><p>No books filed yet.</p></div>
        )}
        {activeFilter === "research" && publishedResearch.length === 0 && (
          <div className="library-empty"><FlaskConical size={40} /><p>No research papers filed yet.</p></div>
        )}
      </section>
    </SiteShell>
  );
}
