/**
 * Pastel Afterimage Archive visual reminder: the shell carries shared paper,
 * grain, and ink structure while the page-specific `page-theme` class supplies
 * each room with its own colour world and vectors.
 */
import type { ReactNode } from "react";
import MiniPlayer from "./MiniPlayer";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type SiteShellProps = {
  children: ReactNode;
  pageTheme: "studio" | "music" | "shayari" | "writings" | "notes" | "cinephile" | "about" | "contact" | "garden" | "books" | "book-deep-night" | "library" | "recs" | "blog";
  customBg?: string;
  style?: React.CSSProperties;
};

export default function SiteShell({ children, pageTheme, customBg, style }: SiteShellProps) {
  const shellStyle: React.CSSProperties = {
    ...(customBg ? ({ "--page-base": customBg } as React.CSSProperties) : {}),
    ...style,
  };

  return (
    <div className={`site-shell page-theme page-theme--${pageTheme}`} style={shellStyle}>
      <div aria-hidden="true" className="page-grain" />
      <div aria-hidden="true" className="page-cropmarks page-cropmarks--top" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
