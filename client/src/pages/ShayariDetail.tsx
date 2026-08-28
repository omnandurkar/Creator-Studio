/**
 * Pastel Afterimage Archive visual reminder: this reading view is a soft,
 * uncluttered parchment leaf with crimson ink and botanical framing.
 */
import { ArrowLeft, ArrowRight, Copy, Flower2, Share2, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findShayari, findSongById, publishedShayari } from "@/lib/content";
import { toast } from "sonner";

type LanguageView = "original" | "romanized" | "translation";

export default function ShayariDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = findShayari(slug);
  const [view, setView] = useState<LanguageView>("original");

  if (!entry) return <SiteShell pageTheme="shayari"><section className="shayari-reading shayari-reading--missing"><p className="section-kicker">line not found</p><h1>This page<br />is still blank.</h1><p>The piece may be a draft or the URL may have changed.</p><Link className="ink-button" href="/shayari"><ArrowLeft size={16} /> back to Shayari</Link></section></SiteShell>;

  const views = useMemo(() => [
    { key: "original" as const, label: "original", content: entry.text },
    ...(entry.romanizedText ? [{ key: "romanized" as const, label: "romanized", content: entry.romanizedText }] : []),
    ...(entry.translation ? [{ key: "translation" as const, label: "translation", content: entry.translation }] : []),
  ], [entry]);
  const currentView = views.find((item) => item.key === view) ?? views[0];
  const series = entry.series ? publishedShayari.filter((item) => item.series === entry.series).sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)) : [];
  const seriesIndex = series.findIndex((item) => item.id === entry.id);
  const previous = seriesIndex > 0 ? series[seriesIndex - 1] : undefined;
  const next = seriesIndex >= 0 && seriesIndex < series.length - 1 ? series[seriesIndex + 1] : undefined;
  const readingTrack = entry.readingTrackId ? findSongById(entry.readingTrackId) : undefined;

  const shareLine = async () => {
    const text = `“${entry.text}” — ${entry.title}, Om Nandurkar`;
    try {
      if (navigator.share) await navigator.share({ title: entry.title, text });
      else await navigator.clipboard.writeText(text);
      toast("The line is ready to travel.", { description: "A clean credit for Om Nandurkar has been included." });
    } catch { /* A visitor may close the native sharing surface without an error state. */ }
  };

  const playReadingTrack = () => {
    if (!readingTrack?.audioPreview) return;
    window.dispatchEvent(new CustomEvent("creator-studio:play-release", { detail: { id: readingTrack.id, title: readingTrack.title, source: readingTrack.audioPreview, label: "reading mix" } }));
  };

  return <SiteShell pageTheme="shayari"><article className="shayari-reading"><Link className="shayari-reading__back" href="/shayari"><ArrowLeft size={16} /> back to the letterbox</Link><div className="shayari-reading__leaf"><Flower2 aria-hidden="true" className="shayari-reading__flower" size={34} />{entry.isIllustrative && <p className="illustrative-label illustrative-label--wide">letterpress proof · kept soft at the edges</p>}<p className="section-kicker">{entry.language} · {entry.tags.join(" / ")}</p><h1>{entry.title}</h1>
      {views.length > 1 && <div className="shayari-reading__views" aria-label="Choose a reading view">{views.map((item) => <button aria-pressed={currentView.key === item.key} className={currentView.key === item.key ? "is-active" : ""} key={item.key} onClick={() => setView(item.key)} type="button">{item.label}</button>)}</div>}
      <div className={`shayari-reading__quote-card shayari-reading__quote-card--${currentView.key}`}><blockquote>“{currentView.content}”</blockquote><span>{currentView.label} / {entry.title}</span></div>
      {entry.hiddenLine && <p className="shayari-reading__hidden">{entry.hiddenLine}</p>}
      <div className="shayari-reading__actions">{entry.shareable && <><button onClick={shareLine} type="button"><Share2 size={16} /> share this line</button><button onClick={() => { void navigator.clipboard.writeText(entry.text); toast("The line has been copied."); }} type="button"><Copy size={15} /> copy</button></>}{readingTrack?.audioPreview && <button onClick={playReadingTrack} type="button"><Volume2 size={16} /> play reading mix</button>}</div>
      {series.length > 1 && <nav className="shayari-reading__series" aria-label={`${entry.series} series`}><span>{entry.series} · letter {String((entry.seriesOrder ?? seriesIndex + 1)).padStart(2, "0")} / {String(series.length).padStart(2, "0")}</span><div>{previous ? <Link href={`/shayari/${previous.slug}`}><ArrowLeft size={15} /> previous</Link> : <span>first letter</span>}{next ? <Link href={`/shayari/${next.slug}`}>next <ArrowRight size={15} /></Link> : <span>last letter</span>}</div></nav>}
      <p className="shayari-reading__date">written for the archive · {entry.date}</p></div></article></SiteShell>;
}
