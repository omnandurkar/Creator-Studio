import { ArrowUpRight, Sparkles, Music2, Flame } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function DaftarHypeBanner() {
  const [hypeCount, setHypeCount] = useState(142);
  const [hasHyped, setHasHyped] = useState(false);

  const triggerHype = () => {
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#ff6e6c", "#ffe58c", "#20252f", "#ff9248"],
    });

    if (!hasHyped) {
      setHypeCount((prev) => prev + 1);
      setHasHyped(true);
      toast.success("🎉 PRE-SAVED & HYPED!", {
        description: "You're catalogued for Om's 4-track concept album DAFTAR! ☕💼🚆",
      });
    } else {
      toast("🔥 Hype Recorded!", {
        description: "DAFTAR · Four Songs / One Workday",
      });
    }
  };

  return (
    <section className="daftar-minimal-banner" aria-label="Upcoming Album Announcement DAFTAR">
      <div className="daftar-minimal-banner__inner">
        {/* Left: Compact Poster Artwork */}
        <div className="daftar-minimal-banner__poster-wrap">
          <img
            src="/assets/Music/Originals/Daftar/Daftar-poster.jpg"
            alt="DAFTAR Album Poster by Om Nandurkar"
            className="daftar-minimal-banner__poster-img"
          />
          <span className="daftar-minimal-banner__tag">UPCOMING</span>
        </div>

        {/* Right: Editorial Minimal Content */}
        <div className="daftar-minimal-banner__content">
          <div className="daftar-minimal-banner__header">
            <span className="daftar-minimal-banner__kicker">
              <Flame size={13} className="flame-pulse" /> UPCOMING CONCEPT ALBUM
            </span>
            <span className="daftar-minimal-banner__serial">SIDE A · 04 TRACKS</span>
          </div>

          <div className="daftar-minimal-banner__title-row">
            <h2 className="daftar-minimal-banner__title">D A F T A R</h2>
            <p className="daftar-minimal-banner__byline">by Om Nandurkar</p>
          </div>

          <p className="daftar-minimal-banner__subtitle">
            Four songs, one workday — office chaos, stolen tea breaks, and evening local train fatigue.
          </p>

          {/* Minimal Horizontal Tracklist Pills */}
          <div className="daftar-minimal-banner__track-pills">
            <span><small>01</small> Routine</span>
            <span className="dot">•</span>
            <span><small>02</small> Office Mein Ishq</span>
            <span className="dot">•</span>
            <span><small>03</small> Daftar Ka Dhua</span>
            <span className="dot">•</span>
            <span><small>04</small> Local Ki Thakan</span>
          </div>

          {/* Action Row */}
          <div className="daftar-minimal-banner__actions">
            <button
              onClick={triggerHype}
              type="button"
              className={`daftar-minimal-hype-btn ${hasHyped ? "is-hyped" : ""}`}
            >
              <Sparkles size={15} />
              <span>{hasHyped ? "PRE-SAVED & HYPED!" : "JOIN THE HYPE & PRE-SAVE"}</span>
              <span className="hype-pill">🔥 {hypeCount}</span>
            </button>

            <Link href="/music/daftar" className="daftar-minimal-link">
              album preview room <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
