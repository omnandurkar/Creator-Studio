/**
 * Pastel Afterimage Archive visual reminder: the footer is a quiet closing-credit
 * strip, carrying the coral studio stamp and warm-paper texture to every page.
 */
import { ArrowUpRight, Calendar, Globe, History, Instagram, Linkedin, Mail, Music2, Sparkles, Youtube } from "lucide-react";
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

  const showEasterEgg = () => {
    toast("🤫 Om's Secret Archive Note", {
      description: contactDetails.easterEggJoke || "Crafting YouTube videos and Instagram posts past 3 AM for a loyal, silent audience of 14 people.",
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

        <div className="footer-links-grid">
          {/* ── Main Portfolio Spotlight Badge ── */}
          <a
            className="footer-portfolio-spotlight"
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Om Nandurkar's Main Portfolio at omnandurkar.space"
          >
            <span className="footer-portfolio-spotlight__kicker">
              <Globe size={13} /> Main Portfolio
            </span>
            <strong className="footer-portfolio-spotlight__url">
              omnandurkar.space <ArrowUpRight aria-hidden="true" size={16} />
            </strong>
          </a>

          <Link className="footer-note" href="/contact">
            <span>for songs &amp; thoughts</span>
            <strong>say hello <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <Link className="footer-note" href="/recs">
            <span>picks &amp; open tab</span>
            <strong>rec room <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <Link className="footer-note" href="/blog">
            <span>unfinished thoughts</span>
            <strong>open tab <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <Link className="footer-note" href="/studio-desk">
            <span>follow objects</span>
            <strong>the desk <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <Link className="footer-note" href="/archive-artifacts">
            <span>free to keep</span>
            <strong>artifacts <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <Link className="footer-note" href="/connections">
            <span>follow thread</span>
            <strong>connections <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <Link className="footer-note" href="/press">
            <span>for clear note</span>
            <strong>press kit <ArrowUpRight aria-hidden="true" size={15} /></strong>
          </Link>

          <div className="footer-tool-icons-card" aria-label="Archive calendar and changelog tools">
            {/* Archive Calendar */}
            <Link href="/calendar" aria-label="Archive Calendar" title="Archive Release &amp; Event Calendar">
              <Calendar size={17} />
            </Link>

            {/* Archive Build History & Changelog */}
            <Link href="/changelog" aria-label="Archive Changelog" title="Archive Build History &amp; Changelog">
              <History size={17} />
            </Link>
          </div>
        </div>
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
            omnandurkar.space <ArrowUpRight size={12} />
          </a>
        </span>

        <div className="footer-socials" aria-label="Social profiles &amp; archive tools">
          {/* Portfolio */}
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Om's Main Portfolio"
            title="Om's Portfolio (omnandurkar.space)"
          >
            <Globe size={16} />
          </a>

          {/* Music / Spotify */}
          <button
            aria-label="Spotify &amp; Streaming profiles (Catalogued for later)"
            onClick={() => linkUnavailable("Spotify & Streaming profiles")}
            title="Spotify &amp; Streaming profiles (Catalogued for later)"
            type="button"
          >
            <Music2 size={16} />
          </button>

          {/* LinkedIn */}
          {contactDetails.linkedin && (
            <a
              href={contactDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              title="Om on LinkedIn (om-nandurkar17)"
            >
              <Linkedin size={16} />
            </a>
          )}

          {/* YouTube */}
          {contactDetails.youtube && (
            <a
              href={contactDetails.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube channel"
              title="Om's YouTube Channel (@omnandurkarmusicals)"
            >
              <Youtube size={16} />
            </a>
          )}

          {/* Instagram */}
          {contactDetails.instagram && (
            <a
              href={contactDetails.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram profile (@sur.aur.silsile)"
              title="Instagram (@sur.aur.silsile)"
            >
              <Instagram size={16} />
            </a>
          )}

          {/* Email */}
          {contactDetails.email ? (
            <a href={`mailto:${contactDetails.email}`} aria-label="Email contact" title="Send Email (nandurkarom172@gmail.com)">
              <Mail size={16} />
            </a>
          ) : (
            <button aria-label="Email contact" onClick={() => linkUnavailable("Email")} type="button"><Mail size={16} /></button>
          )}
        </div>

        <button className="footer-build-note footer-easter-egg-btn" onClick={showEasterEgg} type="button" title="Click to reveal secret archive note">
          <Sparkles size={13} /> living creator studio archive
        </button>
      </div>
    </footer>
  );
}
