/**
 * Pastel Afterimage Archive visual reminder: the release-detail room extends
 * Blue-Room Frequency with a calm editorial listening surface and clear exits.
 */
import { ArrowLeft, ArrowUpRight, Clock3, ExternalLink, FileMusic, ListMusic, Music2, Orbit, Play, Quote, ScrollText, Sparkles, UsersRound } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findRelease, findSongById, publishedReleases, type Song } from "@/lib/content";

export default function ReleaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const release = findRelease(slug);

  if (!release) {
    return (
      <SiteShell pageTheme="music">
        <section className="release-not-found">
          <p className="section-kicker">release not found</p>
          <h1>This record<br />isn’t on the shelf.</h1>
          <p>It may be a draft, or the link may have changed. Return to the library and keep exploring.</p>
          <Link className="ink-button" href="/music"><ArrowLeft size={16} /> Back to music</Link>
        </section>
      </SiteShell>
    );
  }

  const releaseLinks = Object.entries(release.links ?? {});
  const tracks = "trackIds" in release ? (release.trackIds ?? []).map((trackId) => findSongById(trackId)).filter((track): track is Song => Boolean(track)) : [];
  const audioPreview = "audioPreview" in release ? release.audioPreview : undefined;
  const relatedReleases = (release.relatedIds ?? []).map((id) => publishedReleases.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const playRelease = (source = audioPreview, label: string = release.type) => {
    if (!source) return;
    window.dispatchEvent(new CustomEvent("creator-studio:play-release", { detail: { id: release.id, title: release.title, source, label } }));
  };
  return (
    <SiteShell pageTheme="music">
      <section className="release-detail">
        <Link className="release-detail__back" href="/music"><ArrowLeft size={16} /> back to the blue room</Link>
        <div className="release-detail__grid">
          <div className="release-detail__art"><div className="release-detail__record"><i /></div><span>{release.type}</span></div>
          <div className="release-detail__copy">
            <p className="section-kicker"><Music2 size={14} /> release note</p>
            {release.isIllustrative && <p className="illustrative-label illustrative-label--inline">Studio sketch no. 01 · first pressing</p>}
            <h1>{release.title}</h1>
            <p className="release-detail__meta">{release.type} · {new Date(release.releaseDate).getFullYear()}</p>
            <p className="release-detail__description">{release.description}</p>
            {"mood" in release && release.mood && <div className="release-detail__moods">{release.mood.map((mood) => <span key={mood}>{mood}</span>)}</div>}
            {audioPreview && <button className="release-detail__preview release-detail__preview--ready" onClick={() => playRelease()} type="button"><Play size={17} fill="currentColor" /> play in the listening room <span>{release.duration ?? ""}</span></button>}
            {!audioPreview && <p className="release-detail__unavailable"><Clock3 size={16} /> This preview is still kept in the margins.</p>}
            {releaseLinks.length > 0 && <div className="release-detail__links">{releaseLinks.map(([platform, url]) => <a href={url} key={platform} rel="noreferrer" target="_blank">{platform}<ExternalLink size={14} /></a>)}</div>}
          </div>
        </div>
        {tracks.length > 0 && <section className="release-detail__tracks"><div><p className="section-kicker"><ListMusic size={14} /> foldout track list</p><h2>Three rooms,<br /><em>one spine.</em></h2></div><ol>{tracks.map((track, index) => <li key={track.id}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{track.title}</strong><small>{track.duration} · {track.mood?.[0]}</small></div>{track.audioPreview ? <button onClick={() => window.dispatchEvent(new CustomEvent("creator-studio:play-release", { detail: { id: track.id, title: track.title, source: track.audioPreview, label: "album track" } }))} type="button"><Play fill="currentColor" size={14} /> play</button> : <Link href={`/music/${track.slug}`}>open <ArrowUpRight size={14} /></Link>}</li>)}</ol></section>}
        {release.lyricFragments && release.lyricFragments.length > 0 && <section className="release-detail__lyrics"><p className="section-kicker"><Quote size={14} /> lyrics in the margin</p><div>{release.lyricFragments.map((fragment) => <blockquote key={fragment}>{fragment}</blockquote>)}</div><p>{release.lyricContext}</p></section>}
        {release.story && <section className="release-detail__story"><details><summary><ScrollText size={19} /><span><small>where this came from</small><strong>Open the story drawer</strong></span><Sparkles size={18} /></summary><div><p>{release.story}</p>{release.storyPlace && <span>filed from: {release.storyPlace}</span>}</div></details></section>}
        {release.versions && release.versions.length > 0 && <section className="release-detail__versions"><p className="section-kicker"><FileMusic size={14} /> versions cabinet</p><h2>Every piece keeps<br /><em>its earlier selves.</em></h2><div>{release.versions.map((version, index) => <article key={version.id}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{version.label}</strong><p>{version.description}</p></div>{version.audioPreview ? <button onClick={() => playRelease(version.audioPreview, version.label)} type="button"><Play fill="currentColor" size={14} /> listen</button> : <small>space held</small>}</article>)}</div></section>}
        {release.credits && release.credits.length > 0 && <section className="release-detail__credits"><p className="section-kicker"><UsersRound size={14} /> liner notes</p><div>{release.credits.map((credit) => <p key={`${credit.role}-${credit.name}`}><span>{credit.role}</span><strong>{credit.name}</strong></p>)}</div></section>}
        {release.timeline && release.timeline.length > 0 && <section className="release-detail__timeline"><p className="section-kicker"><Clock3 size={14} /> session timeline</p><ol>{release.timeline.map((moment) => <li key={`${moment.date}-${moment.title}`}><span>{moment.date}</span><div><strong>{moment.title}</strong><p>{moment.detail}</p></div></li>)}</ol></section>}
        {relatedReleases.length > 0 && <section className="release-detail__related"><p className="section-kicker"><Orbit size={14} /> nearby in the archive</p>{relatedReleases.map((related) => <Link href={`/music/${related.slug}`} key={related.id}>{related.title}<ArrowUpRight size={16} /></Link>)}</section>}
      </section>
    </SiteShell>
  );
}
