/**
 * Pastel Afterimage Archive visual reminder: Music is the Blue-Room Frequency
 * page—powder blue, navy ink, record grooves, equalizer bars, and a distinctly
 * different sonic world while preserving the shared printed-paper construction.
 */
import { ArrowDown, ArrowUpRight, Disc3, Headphones, Music2, Orbit, Play, Plus, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import DaftarHypeBanner from "@/components/DaftarHypeBanner";
import { publishedReleases, contactDetails, type Release } from "@/lib/content";

type FilterName = "all" | "single" | "album" | "ep" | "mixtape" | "demo" | "collaboration";
const filters: { label: string; value: FilterName }[] = [{ label: "All", value: "all" }, { label: "Singles", value: "single" }, { label: "Albums", value: "album" }, { label: "EPs", value: "ep" }, { label: "Other", value: "demo" }];

function ReleaseArt({ index }: { index: number }) {
  const styles = ["release-art--coral", "release-art--butter", "release-art--mint", "release-art--lilac"];
  return <div aria-hidden="true" className={`release-art ${styles[index % styles.length]}`}><span className="release-art__orbit release-art__orbit--one" /><span className="release-art__orbit release-art__orbit--two" /><div className="release-art__record"><i /></div><span className="release-art__zigzag">⌁</span></div>;
}

function ReleaseCard({ release, index }: { release: Release; index: number }) {
  const isUpcoming = "isUpcoming" in release && Boolean(release.isUpcoming);
  const year = new Date(release.releaseDate).getFullYear();
  return (
    <Link className={`music-release-card music-release-card--${index % 4}`} href={`/music/${release.slug}`}>
      <div className="music-release-card__art">
        {release.coverImage ? <img alt={`${release.title} cover artwork`} src={release.coverImage} /> : <ReleaseArt index={index} />}
        <span className="music-release-card__index">{String(index + 1).padStart(2, "0")}</span>
        {isUpcoming && <span className="music-release-card__upcoming-badge">🔥 UPCOMING ALBUM</span>}
        {release.isIllustrative && !isUpcoming && <span className="music-release-card__sample">first proof</span>}
        <span className="music-release-card__play"><Play fill="currentColor" size={16} /></span>
      </div>
      <div className="music-release-card__details">
        <div>
          <p>{release.type} {isUpcoming ? "· Upcoming Album" : ""}</p>
          <span>{isUpcoming ? "SOON" : year}</span>
        </div>
        <h2>{release.title}</h2>
        {isUpcoming && <span className="music-release-card__upcoming-sub">4 tracks · Releasing Soon</span>}
        {!isUpcoming && release.mood?.[0] && <span className="music-release-card__mood">{release.mood[0]}</span>}
        <span className="music-release-card__open">
          {isUpcoming ? "preview upcoming album" : "open release"} <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

function EmptyShelf() {
  return <div className="empty-shelf"><div className="empty-shelf__disc" aria-hidden="true"><Disc3 size={78} /><i /></div><div className="empty-shelf__copy"><p className="section-kicker"><Plus size={14} /> an open shelf</p><h2>Your sound<br /><em>has room to arrive.</em></h2><p>This shelf is held open for the next artifact. No further releases have been filed here yet.</p></div><div className="empty-shelf__steps"><span>01</span><p>First artifact waiting</p><span>02</span><p>Add your title, cover and links</p><span>03</span><p>Set it live</p></div></div>;
}

export default function Music() {
  const [activeFilter, setActiveFilter] = useState<FilterName>("all");
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [isSleeveFlipped, setIsSleeveFlipped] = useState(false);
  const moods = useMemo(() => Array.from(new Set(publishedReleases.flatMap((release) => release.mood ?? []))).slice(0, 6), []);
  const visibleReleases = useMemo(() => {
    const byFormat = activeFilter === "all" ? publishedReleases : activeFilter === "demo" ? publishedReleases.filter((release) => release.type === "demo" || release.type === "collaboration") : publishedReleases.filter((release) => release.type === activeFilter);
    return activeMood ? byFormat.filter((release) => release.mood?.includes(activeMood)) : byFormat;
  }, [activeFilter, activeMood]);

  return <SiteShell pageTheme="music"><section className="music-hero"><div className="music-hero__grid" aria-hidden="true" /><div className="music-hero__copy"><p className="music-hero__eyebrow"><span /> the blue room / vol. 02</p><h1>For the songs<br />that need <em>space</em><br />around them.</h1><p>Singles, albums, late-night demos, and collaborations from Om’s evolving sound world.</p><div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "16px" }}><a className="music-hero__jump" href="#release-shelf"><ArrowDown size={17} /> Browse the shelf</a>{contactDetails.spotify && <a className="music-hero__jump" href={contactDetails.spotify} rel="noreferrer" style={{ background: "#1db954", color: "#ffffff", borderColor: "#1db954" }} target="_blank"><Music2 size={16} /> Om on Spotify <ArrowUpRight size={15} /></a>}</div></div><div className="music-hero__art" aria-label="Abstract record and equalizer illustration"><div className="music-hero__equalizer" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="music-hero__record"><span /><i /></div><button aria-expanded={isSleeveFlipped} aria-label="Turn the music sleeve for a production note" className={`music-hero__sleeve ${isSleeveFlipped ? "is-flipped" : ""}`} onClick={() => setIsSleeveFlipped((flipped) => !flipped)} type="button"><span>{isSleeveFlipped ? "keep the\nfirst strange\ntake." : "Om\nNandurkar"}</span><i /><i /><i /></button><div className="music-hero__ring music-hero__ring--one" /><div className="music-hero__ring music-hero__ring--two" /><p>turn it up,<br />then look closer.</p></div><div className="music-hero__serial">SIDE A · 00—∞</div></section>
    <div style={{ padding: "0 clamp(1rem, 4vw, 3rem)" }}><DaftarHypeBanner /></div>
    <section className="music-library" id="release-shelf"><div className="music-library__heading"><div><p className="section-kicker"><Music2 size={14} /> the release shelf</p><h2>A growing<br /><em>discography.</em></h2></div><p>Follow one first proof, then step into a foldout EP, a morning demo, or a collaboration-shaped space. Each release keeps its own sound, story and margin.</p></div><div className="music-filter-row" aria-label="Filter music releases"><span className="music-filter-row__label"><SlidersHorizontal size={15} /> Filter by format</span><div className="music-filter-row__controls">{filters.map((filter) => <button aria-pressed={activeFilter === filter.value} className={activeFilter === filter.value ? "is-active" : ""} key={filter.value} onClick={() => setActiveFilter(filter.value)} type="button">{filter.label}</button>)}</div></div><div className="music-mood-row" aria-label="Filter music by mood"><span><Orbit size={15} /> follow a feeling</span>{moods.map((mood) => <button aria-pressed={activeMood === mood} className={activeMood === mood ? "is-active" : ""} key={mood} onClick={() => setActiveMood((selected) => selected === mood ? null : mood)} type="button">{mood}</button>)}</div>{visibleReleases.length > 0 ? <div className="music-release-grid">{visibleReleases.map((release, index) => <ReleaseCard index={index} key={release.id} release={release} />)}</div> : <EmptyShelf />}</section>
    <section className="music-constellation" aria-labelledby="constellation-title"><div className="music-constellation__copy"><p className="section-kicker"><Orbit size={14} /> release constellation</p><h2 id="constellation-title">Follow the thread,<br /><em>not just the track.</em></h2><p>Some releases are connected by a time of day, a kind of room, or the feeling they leave in the margin. Choose a star to filter the shelf above.</p></div><div className="music-constellation__map" aria-label="Mood constellation map">{moods.map((mood, index) => <button aria-pressed={activeMood === mood} className={`constellation-node constellation-node--${index + 1} ${activeMood === mood ? "is-active" : ""}`} key={mood} onClick={() => { setActiveMood(mood); document.querySelector("#release-shelf")?.scrollIntoView({ behavior: "smooth" }); }} type="button"><i />{mood}</button>)}</div></section>
    <section className="music-process"><div className="music-process__visual" aria-hidden="true"><span className="process-loop process-loop--one" /><span className="process-loop process-loop--two" /><div className="process-sound-lines"><i /><i /><i /><i /><i /><i /><i /></div><p>the sound<br />keeps moving</p></div><div className="music-process__copy"><p className="section-kicker"><Headphones size={14} /> made to be changed</p><h2>Build the library <em>in your own time.</em></h2><p>No rush, no noise. Each release can arrive with its own title, date, cover, listening link, and a short note about where it came from.</p><Link className="text-arrow-link" href="/">return to the studio <ArrowUpRight size={17} /></Link></div></section>
  </SiteShell>;
}
