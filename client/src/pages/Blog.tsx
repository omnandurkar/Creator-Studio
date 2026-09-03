import { useState, useMemo } from "react";
import { ArrowUpRight, Calendar as CalendarIcon, Search, Sparkles, X } from "lucide-react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedBlogEntries } from "@/lib/content";

const moodColors: Record<string, string> = {
  reflective: "peach",
  curious: "sky",
  honest: "butter",
  excited: "coral",
  melancholic: "lilac",
};

function NotebookVector() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="blog-hero-vector">
      {/* Notebook Base Shadows */}
      <rect x="25" y="25" width="150" height="115" rx="8" fill="#20252f" opacity="0.15" />
      {/* Left Page */}
      <rect x="20" y="20" width="75" height="115" rx="6" fill="#fffaf0" stroke="#20252f" strokeWidth="2.5" />
      {/* Right Page */}
      <rect x="95" y="20" width="75" height="115" rx="6" fill="#fffaf0" stroke="#20252f" strokeWidth="2.5" />
      {/* Center Spine Crease */}
      <line x1="95" y1="20" x2="95" y2="135" stroke="#20252f" strokeWidth="2" strokeDasharray="3 3" />
      {/* Lined Rules */}
      <line x1="30" y1="45" x2="85" y2="45" stroke="#ff6e6c" strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="60" x2="85" y2="60" stroke="#20252f" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="75" x2="85" y2="75" stroke="#20252f" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="90" x2="85" y2="90" stroke="#20252f" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="105" x2="70" y2="105" stroke="#20252f" strokeWidth="1" opacity="0.2" />
      {/* Right Page Sketch Lines */}
      <path d="M105 45 C120 35, 140 55, 160 45" stroke="#20252f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="120" cy="80" r="18" stroke="#ff6e6c" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M110 105 L155 105 L145 120 Z" fill="#ffe58c" stroke="#20252f" strokeWidth="1.5" />
      {/* Paper Tape */}
      <rect x="55" y="12" width="35" height="12" fill="#ffe58c" opacity="0.8" stroke="#20252f" strokeWidth="1" transform="rotate(-4 72 18)" />
      <rect x="115" y="12" width="35" height="12" fill="#ff6e6c" opacity="0.7" stroke="#20252f" strokeWidth="1" transform="rotate(3 132 18)" />
      {/* Star Stamp */}
      <circle cx="150" cy="110" r="10" fill="#ff6e6c" opacity="0.2" />
      <text x="146" y="114" fontSize="11" fill="#ff6e6c" fontWeight="bold">✳</text>
    </svg>
  );
}

/* Mini Calendar Widget Component with Entry Activity Dots & Manual DD/MM/YYYY Input */
function BlogCalendarPicker({
  selectedDate,
  onSelectDate,
  onClose,
}: {
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
  onClose: () => void;
}) {
  const [manualInput, setManualInput] = useState(() => {
    if (selectedDate) {
      const [y, m, d] = selectedDate.split("-");
      return `${d}/${m}/${y}`;
    }
    return "";
  });
  const [inputError, setInputError] = useState<string | null>(null);

  // Extract all entry dates mapped: "YYYY-MM-DD" -> array of titles
  const entryDatesMap = useMemo(() => {
    const map = new Map<string, string[]>();
    publishedBlogEntries.forEach((e) => {
      const dateKey = e.date;
      const existing = map.get(dateKey) ?? [];
      map.set(dateKey, [...existing, e.title]);
    });
    return map;
  }, []);

  // Auto-format DD/MM/YYYY as user types digits
  const handleInputChange = (rawVal: string) => {
    setInputError(null);
    const digitsOnly = rawVal.replace(/[^\d]/g, "");

    let formatted = "";
    if (digitsOnly.length > 0) {
      formatted += digitsOnly.slice(0, 2);
      if (digitsOnly.length > 2) {
        formatted += "/" + digitsOnly.slice(2, 4);
        if (digitsOnly.length > 4) {
          formatted += "/" + digitsOnly.slice(4, 8);
        }
      }
    }

    setManualInput(formatted);
  };

  const handleApplyManualDate = () => {
    setInputError(null);
    if (!manualInput.trim()) {
      onSelectDate(null);
      return;
    }

    const parts = manualInput.trim().split("/");
    if (parts.length === 3) {
      let [d, m, y] = parts;
      if (d.length === 1) d = "0" + d;
      if (m.length === 1) m = "0" + m;
      if (y.length === 2) y = "20" + y;

      const dayNum = parseInt(d, 10);
      const monthNum = parseInt(m, 10);
      const yearNum = parseInt(y, 10);

      if (
        dayNum >= 1 &&
        dayNum <= 31 &&
        monthNum >= 1 &&
        monthNum <= 12 &&
        yearNum >= 2000 &&
        yearNum <= 2099
      ) {
        const isoDate = `${yearNum}-${String(monthNum).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

        // Check if date is before August 1, 2026
        if (isoDate < "2026-08-01") {
          setInputError("✍️ Om's Desk Journal started on August 1, 2026. No entries exist prior to this date.");
          return;
        }

        onSelectDate(isoDate);
        return;
      }
    }

    setInputError("Please enter a valid DD/MM/YYYY date (e.g. 03/09/2026)");
  };

  // Calendar Months for August & September 2026
  const calendarMonths = [
    {
      name: "September 2026",
      yearMonth: "2026-09",
      daysInMonth: 30,
      startDayOffset: 2, // Tuesday
    },
    {
      name: "August 2026",
      yearMonth: "2026-08",
      daysInMonth: 31,
      startDayOffset: 6, // Saturday
    },
  ];

  return (
    <div className="blog-calendar-popover">
      <div className="blog-calendar-popover__header">
        <div>
          <strong>Desk Journal Calendar</strong>
          <p>Dates with glowing dots contain published entries</p>
        </div>
        <button className="blog-calendar-close" onClick={onClose} aria-label="Close calendar">
          <X size={16} />
        </button>
      </div>

      {/* Manual Date Entry Box (DD/MM/YYYY) */}
      <div className="manual-date-box">
        <label htmlFor="manual-date-field" className="manual-date-label">
          Enter Specific Date (DD/MM/YYYY):
        </label>
        <div className="manual-date-input-group">
          <input
            id="manual-date-field"
            type="text"
            placeholder="DD/MM/YYYY (auto /)"
            value={manualInput}
            maxLength={10}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApplyManualDate();
            }}
            className="manual-date-input"
          />
          <button className="manual-date-apply-btn" onClick={handleApplyManualDate}>
            Apply
          </button>
        </div>
        {inputError && <span className="manual-date-error-text">{inputError}</span>}
      </div>

      <div className="blog-calendar-months">
        {calendarMonths.map((m) => (
          <div key={m.yearMonth} className="blog-calendar-month">
            <div className="blog-calendar-month__title">{m.name}</div>
            <div className="blog-calendar-weekdays">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="blog-calendar-days">
              {Array.from({ length: m.startDayOffset }).map((_, idx) => (
                <span key={`empty-${idx}`} className="calendar-day-empty" />
              ))}
              {Array.from({ length: m.daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const dateKey = `${m.yearMonth}-${String(dayNum).padStart(2, "0")}`;
                const hasEntries = entryDatesMap.has(dateKey);
                const isSelected = selectedDate === dateKey;
                const entryTitles = entryDatesMap.get(dateKey) ?? [];

                return (
                  <button
                    key={dateKey}
                    className={`calendar-day-btn ${hasEntries ? "has-entry" : ""} ${isSelected ? "is-selected" : ""}`}
                    onClick={() => {
                      if (isSelected) {
                        onSelectDate(null);
                        setManualInput("");
                      } else {
                        onSelectDate(dateKey);
                        const [y, mm, dd] = dateKey.split("-");
                        setManualInput(`${dd}/${mm}/${y}`);
                      }
                    }}
                    title={hasEntries ? `Entry on ${dateKey}: ${entryTitles.join(", ")}` : dateKey}
                  >
                    <span>{dayNum}</span>
                    {hasEntries && <span className="entry-dot" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="blog-calendar-footer">
          <span>Filtered to date: <strong>{selectedDate}</strong></span>
          <button
            className="calendar-reset-btn"
            onClick={() => {
              onSelectDate(null);
              setManualInput("");
            }}
          >
            Show All Dates
          </button>
        </div>
      )}
    </div>
  );
}

const ITEMS_PER_PAGE = 7;

function getReadingTime(body: string[], excerpt: string) {
  const fullText = [...body, excerpt].join(" ");
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return { minutes, wordCount };
}

function getPageNumbers(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique moods from published entries
  const availableMoods = useMemo(() => {
    const moods = new Set(publishedBlogEntries.map((e) => e.mood));
    return Array.from(moods);
  }, []);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleDateChange = (d: string | null) => {
    setSelectedDate(d);
    setCurrentPage(1);
  };

  const handleMoodChange = (m: string | null) => {
    setSelectedMood(m);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDate(null);
    setSelectedMood(null);
    setCurrentPage(1);
  };

  // Filter entries based on search, calendar date, and selected mood
  const filteredEntries = useMemo(() => {
    return publishedBlogEntries.filter((entry) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        entry.date.includes(searchQuery);

      const matchesDate = !selectedDate || entry.date === selectedDate;
      const matchesMood = !selectedMood || entry.mood === selectedMood;

      return matchesSearch && matchesDate && matchesMood;
    });
  }, [searchQuery, selectedDate, selectedMood]);

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEntries = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredEntries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEntries, safeCurrentPage]);

  return (
    <SiteShell pageTheme="blog">
      {/* ── HERO SECTION ── Vibrant, Editorial, Creative Notebook */}
      <section className="blog-vivid-hero">
        <div className="blog-hero-spiral-binding" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>

        <div className="blog-hero-bg-vectors" aria-hidden="true">
          <div className="blog-bg-circle" />
          <div className="blog-bg-star">✳</div>
          <div className="blog-bg-sun" />
        </div>

        <div className="blog-vivid-hero__grid">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="blog-vivid-hero__copy">
            <p className="blog-hero-tag">
              <Sparkles size={14} className="blog-hero-spark" />
              the public notebook · personal blogs written by om
            </p>
            <h1 className="blog-hero-title">
              Things I needed<br />
              <em>to say.</em>
            </h1>
            <p className="blog-hero-sub">
              No word counts. No headlines. Just unfiltered essays, 3 AM epiphanies, and reflections on physics, music, and creative process—written by Om.
            </p>

            <div className="blog-hero-stats">
              <div className="stat-pill">
                <strong>{publishedBlogEntries.length}</strong>
                <span>Published Essays</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <strong>100%</strong>
                <span>Unfiltered</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <strong>Late Night</strong>
                <span>Om's Desk Notes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Vector Artwork Showcase */}
          <div className="blog-vivid-hero__art">
            <div className="blog-art-card">
              <div className="blog-art-tape" aria-hidden="true" />
              <NotebookVector />
              <div className="blog-art-caption">
                <span className="blog-art-stamp">✍️ Om's Field Notes</span>
                <p>Late-Night Drafts & Reflections</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH, MOOD & CALENDAR FILTER BAR ── */}
      <section className="blog-filter-bar">
        <div className="blog-filter-container">
          {/* Live Search Input */}
          <div className="blog-search-box">
            <Search size={16} className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search essays by title, topic, tag or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button
                className="blog-search-clear"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
                type="button"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Calendar Picker Icon Trigger */}
          <div className="blog-calendar-wrapper">
            <button
              className={`blog-calendar-trigger ${selectedDate ? "is-active" : ""}`}
              onClick={() => setShowCalendar((prev) => !prev)}
              title={selectedDate ? `Filtered by Date: ${selectedDate}` : "Filter by Date in Calendar"}
              aria-label="Toggle Desk Calendar"
              type="button"
            >
              <CalendarIcon size={16} />
              {selectedDate && <span className="calendar-trigger-dot" aria-hidden="true" />}
            </button>

            {/* Calendar Popover */}
            {showCalendar && (
              <BlogCalendarPicker
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  handleDateChange(date);
                  setShowCalendar(false);
                }}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>
        </div>

        {/* Mood Filter Chips Bar */}
        <div className="blog-mood-chips-row">
          <span className="mood-chips-label">Filter Vibe:</span>
          <button
            type="button"
            className={`blog-mood-chip ${!selectedMood ? "is-active" : ""}`}
            onClick={() => handleMoodChange(null)}
          >
            All Essays
          </button>
          {availableMoods.map((m) => {
            const mColor = moodColors[m] ?? "butter";
            const isSelected = selectedMood === m;
            return (
              <button
                key={m}
                type="button"
                className={`blog-mood-chip blog-mood-chip--${mColor} ${isSelected ? "is-active" : ""}`}
                onClick={() => handleMoodChange(isSelected ? null : m)}
              >
                <span>{m}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators */}
        {(searchQuery || selectedDate || selectedMood) && (
          <div className="blog-active-filters">
            <span className="filter-summary-label">
              Showing {filteredEntries.length} of {publishedBlogEntries.length} entries
            </span>
            {searchQuery && (
              <button
                type="button"
                className="active-filter-badge"
                onClick={() => handleSearchChange("")}
              >
                Keyword: "{searchQuery}" <X size={12} />
              </button>
            )}
            {selectedDate && (
              <button
                type="button"
                className="active-filter-badge"
                onClick={() => handleDateChange(null)}
              >
                Date: {selectedDate} <X size={12} />
              </button>
            )}
            {selectedMood && (
              <button
                type="button"
                className="active-filter-badge"
                onClick={() => handleMoodChange(null)}
              >
                Vibe: {selectedMood} <X size={12} />
              </button>
            )}
            <button
              type="button"
              className="reset-all-filters-btn"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* ── BLOG ENTRIES LIST & PAGINATION ── */}
      <section className="blog-entries-section">
        {filteredEntries.length === 0 ? (
          <div className="blog-no-results">
            {selectedDate && selectedDate < "2026-08-01" ? (
              <div className="blog-journal-start-note">
                <span className="journal-stamp">✍️ Om's Desk Journal Note</span>
                <p>This journal started on August 1, 2026. No entries exist prior to this date.</p>
              </div>
            ) : (
              <p>No essays match your search, mood, or date filter.</p>
            )}
            <button
              type="button"
              className="reset-all-filters-btn"
              onClick={handleResetFilters}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="blog-entries-list">
              {paginatedEntries.map((entry, index) => {
                const absoluteIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE + index;
                const moodColor = moodColors[entry.mood] ?? "butter";
                const readTime = getReadingTime(entry.body, entry.excerpt);

                return (
                  <Link
                    className={`blog-entry-row blog-entry-row--${moodColor}`}
                    href={`/blog/${entry.slug}`}
                    key={entry.id}
                  >
                    <div className="blog-entry-row__index">
                      <span>{String(absoluteIndex + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="blog-entry-row__meta">
                      <time className="blog-entry-row__date">
                        {new Date(entry.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <span className="blog-entry-row__readtime" title={`${readTime.wordCount} words`}>
                        ⏱ {readTime.minutes} min read
                      </span>
                      <span className={`blog-entry-row__mood blog-entry-row__mood--${moodColor}`}>
                        {entry.mood}
                      </span>
                    </div>

                    <div className="blog-entry-row__copy">
                      <h2>{entry.title}</h2>
                      <p>{entry.excerpt}</p>
                      <div className="blog-entry-row__tags">
                        {entry.tags.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="blog-entry-row__arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 7-Item Pagination Controls with Numbered Page Buttons [1] [2] [3]... */}
            {totalPages > 1 && (
              <div className="blog-pagination">
                <button
                  type="button"
                  className="blog-pagination-btn"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous Page"
                >
                  ← Prev
                </button>

                <div className="blog-pagination-numbers">
                  {getPageNumbers(safeCurrentPage, totalPages).map((p, idx) => {
                    if (typeof p === "string") {
                      return (
                        <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                          ...
                        </span>
                      );
                    }
                    const isCurrent = p === safeCurrentPage;
                    return (
                      <button
                        key={p}
                        type="button"
                        className={`pagination-num-btn ${isCurrent ? "is-active" : ""}`}
                        onClick={() => setCurrentPage(p)}
                        aria-label={`Page ${p}`}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="blog-pagination-btn"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next Page"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

        <div className="blog-back-link-wrap">
          <Link className="text-arrow-link" href="/recs">
            ← back to the rec room
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
