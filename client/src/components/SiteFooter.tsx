/**
 * Pastel Afterimage Archive visual reminder: the footer is a quiet closing-credit
 * strip, carrying the coral studio stamp and warm-paper texture to every page.
 */
import { ArrowUpRight, Instagram, Mail, Music2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import StudioMark from "./StudioMark";

export default function SiteFooter() {
  const linkUnavailable = (label: string) => {
    toast(`${label} is catalogued for later.`, {
      description: "This corner of the archive will open when Om is ready to share it.",
    });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="footer-signoff">
          <StudioMark className="footer-signoff__mark" label="Creator Studio starburst mark" />
          <p>Keep a little room for the unfinished version.</p>
        </div>
        <Link className="footer-note" href="/contact">
          <span>for songs, stories &amp; stray thoughts</span>
          <strong>say hello <ArrowUpRight aria-hidden="true" size={17} /></strong>
        </Link>
        <Link className="footer-note footer-note--desk" href="/studio-desk"><span>follow the objects</span><strong>open the desk <ArrowUpRight aria-hidden="true" size={17} /></strong></Link>
        <Link className="footer-note footer-note--artifacts" href="/archive-artifacts"><span>free to keep</span><strong>open artifacts <ArrowUpRight aria-hidden="true" size={17} /></strong></Link>
        <Link className="footer-note footer-note--connections" href="/connections"><span>follow a thread</span><strong>open the map <ArrowUpRight aria-hidden="true" size={17} /></strong></Link>
        <Link className="footer-note footer-note--press" href="/press"><span>for a clear note</span><strong>open press kit <ArrowUpRight aria-hidden="true" size={17} /></strong></Link>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Om Nandurkar</span>
        <div className="footer-socials" aria-label="Social profiles">
          <button aria-label="Music profile" onClick={() => linkUnavailable("Music profile")} type="button"><Music2 size={17} /></button>
          <button aria-label="Instagram profile" onClick={() => linkUnavailable("Instagram")} type="button"><Instagram size={17} /></button>
          <button aria-label="Email contact" onClick={() => linkUnavailable("Email")} type="button"><Mail size={17} /></button>
        </div>
        <span className="footer-build-note">made as a living archive</span>
      </div>
    </footer>
  );
}
