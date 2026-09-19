import { ArrowDownRight, ArrowUpRight, Atom, BookOpen, CirclePlay, Disc3, ExternalLink, Film, Flower2, Headphones, MoveRight, Music2, Newspaper, Pause, Sparkles, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import DaftarHypeBanner from "@/components/DaftarHypeBanner";
import { homeContent, studioProfile } from "@/lib/content";
import { toast } from "sonner";

const heroLines = [
  studioProfile.shortTagline,
  "Half-finished melodies, full-hearted lines.",
  "A little archive for the things that stayed.",
];

const archiveRooms = [
  { no: "01", title: "Music", copy: "songs / acoustic singles / demos", href: "/music", className: "archive-card--music", icon: <Music2 size={16} /> },
  { no: "02", title: "Shayari", copy: "Devanagari lines & romantic poetry", href: "/shayari", className: "archive-card--shayari", icon: "☾" },
  { no: "03", title: "Writings", copy: "essays on sound, physics & code", href: "/writings", className: "archive-card--writings", icon: <BookOpen size={16} /> },
  { no: "04", title: "Library", copy: "Gojo & Toji mathematical papers", href: "/library", className: "archive-card--library", icon: <Atom size={16} /> },
  { no: "05", title: "Recs", copy: "handpicked media, books & tools", href: "/recs", className: "archive-card--recs", icon: <Sparkles size={16} /> },
  { no: "06", title: "Cinephile", copy: "Project Hail Mary & screening shelf", href: "/cinephile", className: "archive-card--cinephile", icon: <Film size={16} /> },
  { no: "07", title: "Blog", copy: "dispatches, thoughts & stories", href: "/blog", className: "archive-card--blog", icon: <Newspaper size={16} /> },
  { no: "08", title: "ADHD Garden", copy: "constructive mind & interest petals", href: "/adhd-garden", className: "archive-card--adhd", icon: <Flower2 size={16} /> },
];

function SoundWave() {
  return (
    <svg aria-hidden="true" className="sound-wave" fill="none" viewBox="0 0 430 102">
      <path d="M1 49C30 49 29 10 59 10s28 81 58 81 30-64 59-64c30 0 27 49 57 49s30-70 60-70 28 44 57 44 31-31 79-31" stroke="currentColor" strokeWidth="4" />
      <path d="M1 58c29 0 29 23 58 23s30-67 58-67 30 53 59 53 28-29 57-29 30 51 60 51 29-29 57-29 32 14 79 14" opacity=".52" stroke="currentColor" strokeDasharray="3 9" strokeWidth="3" />
    </svg>
  );
}

function SunBurst() {
  return (
    <svg aria-hidden="true" className="sun-burst" viewBox="0 0 130 130">
      <g fill="currentColor">
        <path d="M61 0h8l4 36-8 5zM61 130h8l4-36-8-5zM0 61v8l36 4 5-8zM130 61v8l-36 4-5-8zM17 13l6-5 24 27-4 8zM113 117l-6 5-24-27 4-8zM13 113l-5-6 27-24 8 4zM117 17l5 6-27 24-8-4z" />
        <circle cx="65" cy="65" r="27" />
      </g>
    </svg>
  );
}

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleStatus = (e: Event) => {
      const detail = (e as CustomEvent<{ isPlaying: boolean }>).detail;
      if (typeof detail?.isPlaying === "boolean") {
        setIsPlaying(detail.isPlaying);
      }
    };
    window.addEventListener("creator-studio:audio-status", handleStatus);
    return () => window.removeEventListener("creator-studio:audio-status", handleStatus);
  }, []);

  const revealNextLine = () => {
    setLineIndex((current) => (current + 1) % heroLines.length);
    toast("A new line from the studio.", { description: "The record label keeps a few thoughts in rotation." });
  };

  const playFeaturedSong = () => {
    window.location.href = "/music/first-drop";
  };

  return (
    <SiteShell pageTheme="studio">
      <section className="studio-hero">
        <div className="studio-hero__paper-noise" aria-hidden="true" />
        <div className="studio-hero__content">
          <p className="studio-hero__catalogue"><span /> Vol. 01 — the listening room</p>
          <h1>
            <span className="studio-hero__pretitle">Hello, I’m</span>
            {studioProfile.artistName}
            <em>and I collect the things that become songs.</em>
          </h1>
          <p className="studio-hero__line">{heroLines[lineIndex]}</p>
          <div className="studio-hero__actions">
            <Link className="hero-listen" href="/music">
              <CirclePlay aria-hidden="true" size={18} strokeWidth={2.15} />
              Enter the music room
            </Link>
            <button
              type="button"
              className="hero-note-link"
              onClick={() => {
                const target = document.querySelector(".now-playing-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
                }
              }}
            >
              Explore the archive <ArrowDownRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>

        <div className="studio-hero__art" aria-label="A portrait of Om woven into a record and notebook studio collage">
          <div className="studio-hero__artwork studio-hero__collage-art">
            <img alt="" aria-hidden="true" className="hero-collage__portrait" src={studioProfile.portraitImage} />
            <div className="hero-collage__paper hero-collage__paper--blue" />
            <div className="hero-collage__paper hero-collage__paper--cream">
              <span>side one</span><i /><i /><i /><i />
            </div>
            <div className={`hero-collage__record ${isPlaying ? "is-spinning" : ""}`}><div /></div>
            <div className="hero-collage__sun"><SunBurst /></div>
            <div className="hero-collage__scribble">everything becomes<br />a song eventually</div>
          </div>
          <div aria-hidden="true" className="studio-hero__art-border" />
          <div aria-hidden="true" className="hero-orbit hero-orbit--large" />
          <div aria-hidden="true" className="hero-orbit hero-orbit--small" />
          <div aria-hidden="true" className="hero-dots" />
          <button
            aria-label="Reveal another studio line"
            className="hero-record-label"
            onClick={revealNextLine}
            title="Spin for another thought"
            type="button"
          >
            <span>spin<br />for<br />a line</span>
            <SunBurst />
          </button>
          <p className="hero-art-caption">a quiet room, a loud feeling <span>✳</span></p>
        </div>

        <div className="studio-hero__wave"><SoundWave /></div>
        <p className="studio-hero__corner-note">click the record label<br />for a fresh thought</p>
      </section>

      {/* ── DAFTAR Album Hype Banner ── */}
      <DaftarHypeBanner />

      <section className="now-playing-section" aria-labelledby="now-playing-title">
        <div className="now-playing-section__label-wrap">
          <p className="section-kicker"><span className="section-kicker__disc" /> latest from the studio</p>
          <h2 id="now-playing-title">Featured Single:<br /><em>First Drop.</em></h2>
        </div>

        <article className="release-feature">
          <div className="release-feature__art release-feature__art--vector">
            <div className={`release-vector__disc ${isPlaying ? "is-spinning" : ""}`}>
              <img alt="First Drop song cover poster" className="release-disc__cover-img" src="/assets/Music/Originals/First-Drop/First-Drop.jpg" />
              <div className="release-disc__center-hole" />
            </div>
            <div className="release-vector__tape" />
            <div className="release-vector__curves" aria-hidden="true">∿<br />∿</div>
            <span className="release-vector__line release-vector__line--one" />
            <span className="release-vector__line release-vector__line--two" />
            <div className="release-feature__art-stamp">side A</div>
          </div>
          <div className="release-feature__body">
            <p className="release-feature__eyebrow">{homeContent.featuredRelease.kicker}</p>
            <h3>{homeContent.featuredRelease.title}</h3>
            <p className="release-feature__format">{homeContent.featuredRelease.format}</p>
            <p className="release-feature__description">{homeContent.featuredRelease.description}</p>
            <div className="release-feature__player">
              <Link aria-label="Listen to First Drop on Spotify" className="player-play" href="/music/first-drop">
                <CirclePlay size={24} fill="currentColor" />
              </Link>
              <div className="player-track">
                <span className="player-track__name">{homeContent.previewSong.title}</span>
                <span>{homeContent.previewSong.duration}</span>
              </div>
              <div aria-hidden="true" className={`player-wave ${isPlaying ? "is-active" : ""}`}><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
            <Link className="release-feature__link" href="/music/first-drop">open release page <ArrowUpRight aria-hidden="true" size={16} /></Link>
          </div>
        </article>
      </section>

      {/* ── Research & Papers Spotlight ── */}
      <section className="home-research-spotlight" aria-labelledby="research-section-title">

        {/* Journal masthead */}
        <div className="hrs-journal-header">
          <div className="hrs-journal-header__left">
            <span className="hrs-journal-badge"><Atom size={11} /> Mathematical &amp; Physical Research</span>
            <p className="hrs-journal-name">Journal of Metaphysical Mechanics</p>
          </div>
          <div className="hrs-journal-header__right">
            <span className="hrs-journal-meta">Vol. 1, 2024</span>
            <span className="hrs-journal-meta">ISSN 2024-OM01</span>
          </div>
        </div>

        {/* Rule + title block */}
        <div className="hrs-title-block">
          <div className="hrs-title-block__rule" aria-hidden="true" />

          {/* Atom / orbit vector decoration */}
          <svg aria-hidden="true" className="hrs-atom-art" viewBox="0 0 180 180" fill="none">
            <ellipse cx="90" cy="90" rx="78" ry="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 5" />
            <ellipse cx="90" cy="90" rx="78" ry="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 5"
              transform="rotate(60 90 90)" />
            <ellipse cx="90" cy="90" rx="78" ry="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 5"
              transform="rotate(120 90 90)" />
            <circle cx="90" cy="90" r="9" fill="currentColor" opacity="0.18" />
            <circle cx="90" cy="90" r="5" fill="currentColor" opacity="0.5" />
            <circle cx="168" cy="90" r="4" fill="currentColor" opacity="0.55" />
            <circle cx="12" cy="90" r="3" fill="currentColor" opacity="0.35" />
          </svg>

          {/* Floating math glyphs */}
          <div className="hrs-math-glyphs" aria-hidden="true">
            <span>∇</span><span>∞</span><span>∂</span><span>∮</span><span>Σ</span><span>Δ</span>
          </div>

          <h2 id="research-section-title" className="hrs-title-block__heading">
            Peer-Reviewed Papers &amp;
            <br />
            <em>Metaphysical Mechanics.</em>
          </h2>
          <p className="hrs-title-block__abstract">
            Rigorous math-physics papers modelling non-Euclidean spatial distortions and 
            thermodynamic anomalies — written with real differential geometry frameworks.
          </p>
          <div className="hrs-title-block__meta-row">
            <span>Om Nandurkar</span>
            <span className="hrs-sep">·</span>
            <span>Dept. of Speculative Physics</span>
            <span className="hrs-sep">·</span>
            <span>2 papers</span>
          </div>
        </div>

        {/* Paper cards */}
        <div className="home-research-grid">

          <Link className="home-research-card" href="/research/mathematical-physics-gojo-limitless">
            <div className="hrc-top">
              <span className="hrc-number">Paper № 01</span>
              <span className="hrc-field">Differential Geometry</span>
            </div>
            {/* Short crisp title */}
            <h3 className="hrc-title">Gojo's Limitless &amp; Metric Tensor Distortions</h3>
            <div className="hrc-keywords" aria-label="Keywords">
              <span>Einstein Field Eq.</span>
              <span>Cauchy-Schwarz</span>
              <span>Non-Euclidean</span>
            </div>
            <p className="hrc-abstract-label">Abstract —</p>
            <p className="hrc-abstract">Infinity, Red, Blue, and Hollow Purple modelled through Einstein Field Equations and Cauchy-Schwarz metric convergence.</p>
            <div className="hrc-footer">
              <span className="hrc-doi">DOI: 10.1234/jmm.2024.gojo</span>
              <span className="home-research-link">Read Paper <ArrowUpRight size={14} /></span>
            </div>
          </Link>

          <Link className="home-research-card" href="/research/toji-fushiguro-heavenly-restriction">
            <div className="hrc-top">
              <span className="hrc-number">Paper № 02</span>
              <span className="hrc-field">Biomechanics</span>
            </div>
            {/* Short crisp title */}
            <h3 className="hrc-title">Toji Fushiguro's Heavenly Restriction — A Null-State Analysis</h3>
            <div className="hrc-keywords" aria-label="Keywords">
              <span>Zero-Energy State</span>
              <span>Thermodynamics</span>
              <span>Anti-Domain</span>
            </div>
            <p className="hrc-abstract-label">Abstract —</p>
            <p className="hrc-abstract">Zero-cursed energy thermodynamic null state, peak sensory resolution, and tactical anti-domain mechanics under physical constraint.</p>
            <div className="hrc-footer">
              <span className="hrc-doi">DOI: 10.1234/jmm.2024.toji</span>
              <span className="home-research-link">Read Paper <ArrowUpRight size={14} /></span>
            </div>
          </Link>

        </div>

        {/* Corner vector — wave formula line */}
        <svg aria-hidden="true" className="hrs-wave-art" viewBox="0 0 340 38" fill="none">
          <path d="M0 19 C20 5, 40 33, 60 19 S100 5, 120 19 S160 33, 180 19 S220 5, 240 19 S280 33, 300 19 S330 10, 340 19"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text x="4" y="35" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.45">E = mc²</text>
          <text x="140" y="35" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.45">G_μν = 8πT_μν</text>
          <text x="268" y="35" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.45">∇²φ = 0</text>
        </svg>

        {/* Bottom footnote rule */}
        <div className="hrs-footnote">
          <span className="hrs-footnote__line" aria-hidden="true" />
          <p>¹ All papers use real mathematical frameworks applied to fictional systems for academic exploration.</p>
          <Link href="/library" className="hrs-footnote__link">Browse full library <ExternalLink size={12} /></Link>
        </div>

      </section>

      {/* ── Rec Room & Blog Feature Spotlight ── */}
      <section className="home-spotlight-promo" aria-labelledby="promo-spotlight-title">
        <div className="hsp-inner">
          <div className="hsp-header">
            <p className="section-kicker"><Sparkles size={14} /> curated dispatches &amp; shelf recommendations</p>
            <h2 id="promo-spotlight-title" className="hsp-heading">
              Handpicked Recs &amp; <em>Studio Dispatches.</em>
            </h2>
            <p className="hsp-subhead">
              Dive into curated media shelves, essential developer tools, and long-form essays on physics, sound, and software craft.
            </p>
          </div>

          <div className="hsp-grid">
            {/* Card 1: Rec Room Promo */}
            <article className="hsp-card hsp-card--recs">
              <div className="hsp-card__tape hsp-card__tape--recs" aria-hidden="true" />
              <div className="hsp-card__vector hsp-card__vector--recs" aria-hidden="true">
                <svg viewBox="0 0 200 200" fill="none" className="hsp-constellation">
                  <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.35" />
                  <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.45" />
                  <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
                  <polygon points="100,60 108,92 140,100 108,108 100,140 92,108 60,100 92,92" fill="currentColor" opacity="0.35" />
                </svg>
                <div className="hsp-sparkle-burst">✦</div>
              </div>

              <div className="hsp-card__content">
                <div className="hsp-card__badge hsp-card__badge--recs">
                  <Sparkles size={12} /> Om’s Recommendations
                </div>
                <h3>Om’s Handpicked <em>Shelf.</em></h3>
                <p>Films, sci-fi books, ambient vinyl, and developer stack favorites that shaped the studio.</p>
                
                <div className="hsp-card__tags">
                  <span><Film size={11} /> Cinema</span>
                  <span><BookOpen size={11} /> Sci-Fi Books</span>
                  <span><Headphones size={11} /> Vinyl Albums</span>
                  <span><Sparkles size={11} /> Dev Stack</span>
                </div>

                <Link href="/recs" className="hsp-btn hsp-btn--recs">
                  Explore Om’s Shelf <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>

            {/* Card 2: Blog Promo */}
            <article className="hsp-card hsp-card--blog">
              <div className="hsp-card__tape hsp-card__tape--blog" aria-hidden="true" />
              <div className="hsp-card__vector hsp-card__vector--blog" aria-hidden="true">
                <svg viewBox="0 0 220 180" fill="none" className="hsp-paper-stack">
                  <rect x="25" y="20" width="150" height="130" rx="6" fill="currentColor" opacity="0.08" transform="rotate(-4 100 85)" />
                  <rect x="35" y="25" width="150" height="130" rx="6" stroke="currentColor" strokeWidth="1.4" opacity="0.35" transform="rotate(3 100 85)" />
                  <line x1="55" y1="55" x2="155" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
                  <line x1="55" y1="75" x2="140" y2="75" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
                  <line x1="55" y1="95" x2="160" y2="95" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
                  <line x1="55" y1="115" x2="120" y2="115" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
                </svg>
                <div className="hsp-ink-drop">🖋️</div>
              </div>

              <div className="hsp-card__content">
                <div className="hsp-card__badge hsp-card__badge--blog">
                  <Newspaper size={12} /> Om’s Studio Blog
                </div>
                <h3>Om’s Daily <em>Dispatches.</em></h3>
                <p>Personal observations, math-physics notes, software craft, and acoustic dispatches from the desk.</p>
                
                <div className="hsp-card__tags">
                  <span>Deep Dives</span>
                  <span>Code Craft</span>
                  <span>Physics Models</span>
                  <span>Dispatches</span>
                </div>

                <Link href="/blog" className="hsp-btn hsp-btn--blog">
                  Read Om’s Blog <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="studio-note-section">
        <div className="studio-note-section__label">
          <span className="studio-note-section__pin" />
          from the notebook
        </div>
        <blockquote>
          <span>“</span>{homeContent.featuredNote.text}<span>”</span>
        </blockquote>
        <p>{homeContent.featuredNote.label}</p>
        <div aria-hidden="true" className="studio-note-section__scribble">keep this one.</div>
      </section>

      <section className="archive-section" aria-labelledby="archive-title">
        <div className="archive-section__heading">
          <p className="section-kicker">follow the paper trail</p>
          <h2 id="archive-title">Every piece has<br />its own <em>room.</em></h2>
          <p>The archive changes shape depending on what you’re looking for—sound, a line, a frame, or an unfinished thought.</p>
        </div>
        <div className="archive-card-grid">
          {archiveRooms.map((room) => (
            <Link className={`archive-card ${room.className}`} href={room.href} key={room.title}>
              <span className="archive-card__number">{room.no}</span>
              <span className="archive-card__icon" aria-hidden="true">{room.icon}</span>
              <span className="archive-card__body"><strong>{room.title}</strong><small>{room.copy}</small></span>
              <MoveRight aria-hidden="true" className="archive-card__arrow" size={20} />
            </Link>
          ))}
        </div>
      </section>

      <section className="studio-collage" aria-label="Creative practice overview">
        <div className="studio-collage__objects" aria-hidden="true">
          <div className="collage-disc"><Disc3 size={85} /></div>
          <div className="collage-stars">✳ ✳<br />✳</div>
          <div className="collage-tape" />
        </div>
        <div className="studio-collage__copy">
          <p className="section-kicker"><Sparkles size={14} /> currently becoming</p>
          <h2>{studioProfile.currentlyCreating}</h2>
          <p>New pages will be added to the archive as they find their final shape. In the meantime, there are small things worth keeping.</p>
          <Link href="/about" className="text-arrow-link">the person behind the pages <ArrowUpRight size={17} /></Link>
        </div>
        <div className="studio-collage__side-note"><Headphones size={19} /><span>{studioProfile.availability}</span></div>
      </section>
    </SiteShell>
  );
}
