/**
 * Pastel Afterimage Archive visual reminder: this shared navigation uses warm
 * paper, ink outlines, coral stamps, and concise labels so page themes can vary
 * without losing a clear way home.
 */
import { Menu, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import StudioMark from "./StudioMark";
import AccessibilityPanel from "./AccessibilityPanel";

const sections = [
  { label: "Music", href: "/music", isReady: true },
  { label: "Shayari", href: "/shayari", isReady: true },
  { label: "Writings", href: "/writings", isReady: true },
  { label: "Notes", href: "/notes", isReady: true },
  { label: "Cinephile", href: "/cinephile", isReady: true },
  { label: "Mind Garden", href: "/mind-garden", isReady: true },
  { label: "About", href: "/about", isReady: true },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const comingSoon = (section: string) => {
    setIsMenuOpen(false);
    toast(`${section} is the next room to open.`, {
      description: "We are building and reviewing one page at a time.",
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-lockup" aria-label="Creator Studio home">
          <StudioMark className="brand-lockup__mark" />
          <span className="brand-lockup__copy">
            <span className="brand-lockup__eyebrow">the personal archive of</span>
            <span className="brand-lockup__name">Creator Studio</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {sections.map((section) =>
            section.isReady ? (
              <Link className="site-nav__link" href={section.href} key={section.label}>{section.label}</Link>
            ) : (
              <button className="site-nav__link" key={section.label} onClick={() => comingSoon(section.label)} type="button">
                {section.label}
              </button>
            ),
          )}
        </nav>

        <div className="site-header__tools"><Link aria-label="Search the archive" className="header-search" href="/search"><Search size={17} /></Link><AccessibilityPanel /></div>
        <Link className="header-action" href="/contact">
          <Sparkles aria-hidden="true" size={15} strokeWidth={2.25} />
          <span>Say hello</span>
        </Link>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {sections.map((section, index) =>
            section.isReady ? (
              <Link className="mobile-nav__link" href={section.href} key={section.label} onClick={() => setIsMenuOpen(false)} style={{ "--item-index": index } as React.CSSProperties}>
                <span>0{index + 1}</span>{section.label}
              </Link>
            ) : (
              <button className="mobile-nav__link" key={section.label} onClick={() => comingSoon(section.label)} style={{ "--item-index": index } as React.CSSProperties} type="button">
                <span>0{index + 1}</span>{section.label}
              </button>
            ),
          )}
          <Link className="mobile-nav__contact" href="/contact" onClick={() => setIsMenuOpen(false)}><Sparkles aria-hidden="true" size={16} /> Say hello</Link>
        </nav>
      )}
    </header>
  );
}
