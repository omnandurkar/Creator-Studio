/**
 * Pastel Afterimage Archive visual reminder: unfinished routes remain deliberate
 * in presentation, using a warm paper note rather than a navigation dead-end.
 */
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";

export default function NotReady() {
  return (
    <SiteShell pageTheme="studio">
      <section className="not-ready-page">
        <p className="kicker">studio in progress</p>
        <h1>This room opens soon.</h1>
        <p>We are shaping the archive one page at a time. Return to the studio while this page is being built.</p>
        <Link className="ink-button" href="/">Return home</Link>
      </section>
    </SiteShell>
  );
}
