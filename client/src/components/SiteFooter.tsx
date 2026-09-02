/**
 * Pastel Afterimage Archive visual reminder: the footer is a quiet closing-credit
 * strip, carrying the coral studio stamp and warm-paper texture to every page.
 */
import { ArrowUpRight, Globe, Instagram, Mail, Music2, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import StudioMark from "./StudioMark";
import { contactDetails } from "@/lib/content";

export default function SiteFooter() {
  const linkUnavailable = (label: string) => {
    toast(`${label} is catalogued for later.`, {
      description: "This corner of the archive will open when Om is ready to share it.",
    });
  };

  const portfolioUrl = contactDetails.portfolio || "https://www.omnandurkar.space";

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="footer-signoff">
          <StudioMark className="footer-signoff__mark" label="Creator Studio starburst mark" />
          <p>Keep a little room for the unfinished version.</p>
        </div>

        {/* ── Main Portfolio Spotlight Badge ── */}
        <a
          className="footer-portfolio-spotlight"
          href={portfolioUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Om Nandurkar's Main Portfolio at omnandurkar.space"
        >
          <span className="footer-portfolio-spotlight__kicker">
            <Globe size={14} /> Main Portfolio
          </span>
          <strong className="footer-portfolio-spotlight__url">
            omnandurkar.space <ArrowUpRight aria-hidden="true" size={17} />
          </strong>
        </a>

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
        <span className="footer-copyright">
          © {new Date().getFullYear()} Om Nandurkar ·{" "}
          <a
            className="footer-bottom-portfolio"
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
          >
            omnandurkar.space <ArrowUpRight size={13} />
          </a>
        </span>

        <div className="footer-socials" aria-label="Social profiles">
          <a
            className="footer-social-pill"
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Portfolio space"
            title="Om's Portfolio (omnandurkar.space)"
          >
            <Globe size={17} />
          </a>

          {contactDetails.spotify ? (
            <a href={contactDetails.spotify} target="_blank" rel="noreferrer" aria-label="Music profile">
              <Music2 size={17} />
            </a>
          ) : (
            <button aria-label="Music profile" onClick={() => linkUnavailable("Music profile")} type="button"><Music2 size={17} /></button>
          )}

          {contactDetails.instagram ? (
            <a href={contactDetails.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile">
              <Instagram size={17} />
            </a>
          ) : (
            <button aria-label="Instagram profile" onClick={() => linkUnavailable("Instagram")} type="button"><Instagram size={17} /></button>
          )}

          {contactDetails.email ? (
            <a href={`mailto:${contactDetails.email}`} aria-label="Email contact">
              <Mail size={17} />
            </a>
          ) : (
            <button aria-label="Email contact" onClick={() => linkUnavailable("Email")} type="button"><Mail size={17} /></button>
          )}
        </div>

        <span className="footer-build-note">
          <Sparkles size={13} /> living creator studio archive
        </span>
      </div>
    </footer>
  );
}
