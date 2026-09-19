import {
  Atom,
  BookOpen,
  ChevronDown,
  Film,
  Flower2,
  Menu,
  Music2,
  Newspaper,
  Search,
  Sparkles,
  StickyNote,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import StudioMark from "./StudioMark";

/* ─── Animated SVG: Quill pen for the "Ink" trigger ─── */
function QuillSVG() {
  return (
    <svg className="ntrig-icon ntrig-icon--quill" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        className="quill-feather"
        d="M18 2C14 2 6 7 4 18"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
      />
      <path
        className="quill-spine"
        d="M18 2C13 8 8 13 4 18"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2"
        opacity="0.55"
      />
      <path
        className="quill-nib"
        d="M4 18 L3 21 L6 20 Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
      />
      <path
        className="quill-ink-drop"
        d="M3.5 21 Q4 23 4.5 21"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Animated SVG: Compass for the "Discover" trigger ─── */
function CompassSVG() {
  return (
    <svg className="ntrig-icon ntrig-icon--compass" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
      <g className="compass-needle-group">
        <path d="M11 3 L12.4 9.5 L11 11 L9.6 9.5 Z" fill="currentColor" />
        <path d="M11 19 L12.4 12.5 L11 11 L9.6 12.5 Z" fill="currentColor" opacity="0.35" />
      </g>
      <circle cx="11" cy="11" r="1.5" fill="currentColor" opacity="0.6" />
      {/* Cardinal tick marks */}
      <line x1="11" y1="2" x2="11" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="11" y1="18" x2="11" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="11" x2="4" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Animated SVG: Music waveform for the Music link ─── */
function WaveSVG({ active }: { active: boolean }) {
  return (
    <svg className={`ntrig-icon ntrig-icon--wave ${active ? "is-playing" : ""}`} viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <rect className="wave-bar wave-bar--1" x="1"  y="5"  width="2.5" height="6"  rx="1.25" fill="currentColor" />
      <rect className="wave-bar wave-bar--2" x="5"  y="2"  width="2.5" height="12" rx="1.25" fill="currentColor" />
      <rect className="wave-bar wave-bar--3" x="9"  y="0"  width="2.5" height="16" rx="1.25" fill="currentColor" />
      <rect className="wave-bar wave-bar--4" x="13" y="3"  width="2.5" height="10" rx="1.25" fill="currentColor" />
      <rect className="wave-bar wave-bar--5" x="17" y="6"  width="2.5" height="5"  rx="1.25" fill="currentColor" />
    </svg>
  );
}

/* ─── Nav group definitions ─── */
const INK_ITEMS = [
  {
    label: "Shayari",
    href: "/shayari",
    desc: "Devanagari lines & poetry",
    iconNode: <span className="ndrop-emoji-icon" aria-hidden>☾</span>,
    color: "#b8860b",
  },
  {
    label: "Writings",
    href: "/writings",
    desc: "Essays on sound & code",
    iconNode: <BookOpen size={17} />,
    color: "#4a7c59",
  },
  {
    label: "Notes",
    href: "/notes",
    desc: "Pinned scraps & lemon wall",
    iconNode: <StickyNote size={17} />,
    color: "#c0782a",
  },
];

const DISCOVER_ITEMS = [
  {
    label: "Recs",
    href: "/recs",
    desc: "Handpicked favourites",
    iconNode: <Sparkles size={17} />,
    color: "#7c5cbf",
  },
  {
    label: "Cinephile",
    href: "/cinephile",
    desc: "Films & screening shelf",
    iconNode: <Film size={17} />,
    color: "#347b7d",
  },
  {
    label: "Blog",
    href: "/blog",
    desc: "Thoughts & dispatches",
    iconNode: <Newspaper size={17} />,
    color: "#3a4a8f",
  },
  {
    label: "ADHD Garden",
    href: "/adhd-garden",
    desc: "Mind & interest petals",
    iconNode: <Flower2 size={17} />,
    color: "#5a8a45",
  },
];

const DIRECT_LINKS = [
  { label: "Library", href: "/library" },
  { label: "About",   href: "/about" },
];

/* ─── Reusable dropdown group ─── */
type DropItem = { label: string; href: string; desc: string; iconNode: React.ReactNode; color: string };

function NavDropGroup({
  id,
  label,
  triggerIcon,
  items,
  isOpen,
  onToggle,
  onClose,
  isAnyActive,
}: {
  id: string;
  label: string;
  triggerIcon: React.ReactNode;
  items: DropItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isAnyActive: boolean;
}) {
  const [location] = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => location === href || location.startsWith(`${href}/`);

  const focusItem = (index: number) => {
    requestAnimationFrame(() => {
      const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a.ndrop-item");
      if (links && links.length > 0) {
        const targetIndex = (index + links.length) % links.length;
        links[targetIndex]?.focus();
      }
    });
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        onToggle();
      }
      focusItem(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        onToggle();
      }
      focusItem(items.length - 1);
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      onClose();
    }
  };

  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const links = Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>("a.ndrop-item") || []
    );
    if (!links.length) return;

    const currentIndex = links.findIndex((el) => el === document.activeElement);

    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
      links[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
      links[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1]?.focus();
    }
  };

  // Close when focus leaves the component wrap
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (isOpen && wrapRef.current && !wrapRef.current.contains(e.relatedTarget as Node)) {
      onClose();
    }
  };

  // Global escape key listener when open
  useEffect(() => {
    if (!isOpen) return;
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="ndrop-wrap" ref={wrapRef} onBlur={handleBlur}>
      <button
        ref={triggerRef}
        id={`ndrop-trig-${id}`}
        className={`site-nav__link ndrop-trigger ${isAnyActive ? "is-active" : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`ndrop-panel-${id}`}
        data-group={id}
        onClick={onToggle}
        onKeyDown={handleTriggerKeyDown}
        type="button"
      >
        {isAnyActive && <span className="site-nav__active-dot" aria-hidden="true" />}
        <span className="ndrop-trigger__icon">{triggerIcon}</span>
        {label}
        <ChevronDown
          size={12}
          aria-hidden="true"
          className={`ndrop-chevron ${isOpen ? "is-open" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id={`ndrop-panel-${id}`}
          className={`ndrop-panel ndrop-panel--${id}`}
          role="menu"
          aria-labelledby={`ndrop-trig-${id}`}
          onKeyDown={handlePanelKeyDown}
        >
          {/* Decorative SVG header strip */}
          {id === "ink" && (
            <div className="ndrop-deco ndrop-deco--ink" aria-hidden="true">
              <svg viewBox="0 0 320 28" fill="none">
                {/* Ruled lines */}
                {[6, 14, 22].map((y) => (
                  <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
                ))}
                {/* Margin line */}
                <line x1="38" y1="0" x2="38" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="2 2" />
                <text x="6" y="18" fontSize="9" fontFamily="serif" fill="currentColor" opacity="0.35" fontStyle="italic">words that stayed</text>
              </svg>
            </div>
          )}
          {id === "discover" && (
            <div className="ndrop-deco ndrop-deco--discover" aria-hidden="true">
              <svg viewBox="0 0 320 28" fill="none">
                {/* Stars */}
                {[[18, 14], [80, 8], [160, 18], [240, 10], [300, 16]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2 : 1.2} fill="currentColor" opacity={i % 2 === 0 ? 0.4 : 0.2} />
                ))}
                {/* Dashed orbit */}
                <ellipse cx="160" cy="14" rx="130" ry="7" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.15" />
                <text x="112" y="11" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.35">things worth finding</text>
              </svg>
            </div>
          )}

          {/* Items */}
          <div className={`ndrop-items ndrop-items--${id === "discover" ? "grid" : "list"}`}>
            {items.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className={`ndrop-item ${isActive(item.href) ? "is-active" : ""}`}
                role="menuitem"
                style={{ "--i": i, "--item-color": item.color } as React.CSSProperties}
              >
                <span className="ndrop-item__icon-wrap">
                  {item.iconNode}
                </span>
                <span className="ndrop-item__body">
                  <span className="ndrop-item__label">{item.label}</span>
                  <span className="ndrop-item__desc">{item.desc}</span>
                </span>
                {isActive(item.href) && (
                  <span className="ndrop-item__current-pip" aria-hidden="true" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Header ─── */
export default function SiteHeader() {
  const [location] = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  /* Zero-rerender GPU-accelerated scroll progress calculation */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressBarRef.current) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progressRatio = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0;
            progressBarRef.current.style.transform = `scaleX(${progressRatio})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close everything on navigation */
  useEffect(() => {
    setOpenGroup(null);
    setIsMobileOpen(false);
  }, [location]);

  const toggleGroup = (id: string) =>
    setOpenGroup((prev) => (prev === id ? null : id));

  const isActive = (href: string) => {
    if (href === "/library") return location === "/library" || location.startsWith("/research") || location.startsWith("/books");
    if (href === "/adhd-garden") return location === "/adhd-garden";
    return location === href || location.startsWith(`${href}/`);
  };

  const isInkActive = INK_ITEMS.some((i) => isActive(i.href));
  const isDiscoverActive = DISCOVER_ITEMS.some((i) => isActive(i.href));
  const isMusicActive = isActive("/music");

  const allMobile = [
    { label: "Music",       href: "/music",       no: "01" },
    { label: "Shayari",     href: "/shayari",     no: "02" },
    { label: "Writings",    href: "/writings",    no: "03" },
    { label: "Notes",       href: "/notes",       no: "04" },
    { label: "Recs",        href: "/recs",        no: "05" },
    { label: "Cinephile",   href: "/cinephile",   no: "06" },
    { label: "Blog",        href: "/blog",        no: "07" },
    { label: "ADHD Garden", href: "/adhd-garden", no: "08" },
    { label: "Library",     href: "/library",     no: "09" },
    { label: "About",       href: "/about",       no: "10" },
  ];

  return (
    <header className="site-header" ref={headerRef}>
      {/* Zero-rerender GPU scroll progress bar */}
      <div className="site-header__progress-track" aria-hidden="true">
        <div
          ref={progressBarRef}
          className="site-header__progress-bar"
        />
      </div>
      <div className="site-header__inner">

        {/* Brand */}
        <Link href="/" className="brand-lockup" aria-label="Creator Studio home">
          <StudioMark className="brand-lockup__mark" />
          <span className="brand-lockup__copy">
            <span className="brand-lockup__eyebrow">Om's personal archive of</span>
            <span className="brand-lockup__name">Creator Studio</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="site-nav" aria-label="Primary navigation">

          {/* Music — direct with animated wave icon */}
          <Link
            href="/music"
            className={`site-nav__link ndrop-trigger ndrop-trigger--music ${isMusicActive ? "is-active" : ""}`}
          >
            {isMusicActive && <span className="site-nav__active-dot" aria-hidden="true" />}
            <span className="ndrop-trigger__icon">
              <WaveSVG active={isMusicActive} />
            </span>
            Music
          </Link>

          {/* Ink group */}
          <NavDropGroup
            id="ink"
            label="Ink"
            triggerIcon={<QuillSVG />}
            items={INK_ITEMS}
            isOpen={openGroup === "ink"}
            onToggle={() => toggleGroup("ink")}
            onClose={() => setOpenGroup(null)}
            isAnyActive={isInkActive}
          />

          {/* Discover group */}
          <NavDropGroup
            id="discover"
            label="Discover"
            triggerIcon={<CompassSVG />}
            items={DISCOVER_ITEMS}
            isOpen={openGroup === "discover"}
            onToggle={() => toggleGroup("discover")}
            onClose={() => setOpenGroup(null)}
            isAnyActive={isDiscoverActive}
          />

          {/* Library + About — direct links */}
          {DIRECT_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`site-nav__link ${isActive(link.href) ? "is-active" : ""}`}
            >
              {isActive(link.href) && <span className="site-nav__active-dot" aria-hidden="true" />}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Tools */}
        <div className="site-header__tools">
          <Link aria-label="Search the archive" className="header-search" href="/search">
            <Search size={17} />
          </Link>
        </div>

        <Link
          className={`header-action ${location === "/contact" ? "is-active" : ""}`}
          href="/contact"
        >
          <Sparkles aria-hidden="true" size={15} strokeWidth={2.25} />
          <span>Say hello</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-expanded={isMobileOpen}
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-toggle"
          onClick={() => setIsMobileOpen((o) => !o)}
          type="button"
        >
          {isMobileOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {allMobile.map((item, index) => (
            <Link
              className={`mobile-nav__link ${isActive(item.href) ? "is-active" : ""}`}
              href={item.href}
              key={item.label}
              onClick={() => setIsMobileOpen(false)}
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <span>{item.no}</span>
              {item.label}
              {isActive(item.href) && <span className="mobile-nav__active-badge">Current</span>}
            </Link>
          ))}
          <Link
            className="mobile-nav__contact"
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
          >
            <Sparkles aria-hidden="true" size={16} /> Say hello
          </Link>
        </nav>
      )}
    </header>
  );
}
