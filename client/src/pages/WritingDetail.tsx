/**
 * Pastel Afterimage Archive visual reminder: long-form reading uses restrained
 * book-paper composition, green marginalia, and a dedicated image slot.
 */
import { ArrowLeft, BookOpenText, ListTree, Printer, Share2, Volume2 } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findSongById, findWriting } from "@/lib/content";
import { toast } from "sonner";

function formatDate(date: string) { return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`)); }
function sectionId(index: number) { return `reading-section-${index + 1}`; }

export default function WritingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = findWriting(slug);
  if (!entry) return <SiteShell pageTheme="writings"><section className="writing-reading writing-reading--missing"><p className="section-kicker">entry not found</p><h1>This page is<br />between drafts.</h1><p>It may have been left unpublished, or its link may have changed.</p><Link className="ink-button" href="/writings"><ArrowLeft size={16} /> back to Writings</Link></section></SiteShell>;

  const sections = entry.sections?.length ? entry.sections : [{ heading: "", paragraphs: entry.body }];
  const readingTrack = entry.readingTrackId ? findSongById(entry.readingTrackId) : undefined;
  const playReadingTrack = () => { if (readingTrack?.audioPreview) window.dispatchEvent(new CustomEvent("creator-studio:play-release", { detail: { id: readingTrack.id, title: readingTrack.title, source: readingTrack.audioPreview, label: "reading mix" } })); };
  const shareWriting = async () => {
    const text = `${entry.title} — ${entry.excerpt}`;
    try { if (navigator.share) await navigator.share({ title: entry.title, text }); else await navigator.clipboard.writeText(text); toast("The page is ready to share.", { description: "Its title and archive note have been copied." }); } catch { /* A visitor may close the native sharing surface. */ }
  };

  return <SiteShell pageTheme="writings"><article className="writing-reading"><Link className="writing-reading__back" href="/writings"><ArrowLeft size={16} /> back to the journal</Link><header className="writing-reading__header"><p className="section-kicker"><BookOpenText size={14} /> {entry.category} · {formatDate(entry.date)}</p>{entry.isIllustrative && <p className="illustrative-label illustrative-label--inline">a draft held open in the journal</p>}<h1>{entry.title}</h1><p className="writing-reading__excerpt">{entry.excerpt}</p><div className="writing-reading__tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="writing-reading__tools">{readingTrack?.audioPreview && <button onClick={playReadingTrack} type="button"><Volume2 size={16} /> play reading mix</button>}{entry.shareable && <button onClick={shareWriting} type="button"><Share2 size={16} /> share page</button>}{entry.printable && <button onClick={() => window.print()} type="button"><Printer size={16} /> print page</button>}</div></header><div className="writing-reading__image-slot" aria-label="Reserved space for Om’s future writing artwork or photograph"><span>an image from<br />the notebook<br />can rest here</span><i /><i /></div>
    {sections.length > 1 && <nav className="writing-reading__toc" aria-label="On this page"><p><ListTree size={15} /> on this page</p><div>{sections.map((section, index) => <a href={`#${sectionId(index)}`} key={sectionId(index)}>{String(index + 1).padStart(2, "0")} · {section.heading}</a>)}</div></nav>}
    <div className="writing-reading__body"><aside><span>from<br />Om’s<br />notebook</span></aside><div>{sections.map((section, index) => <section id={sectionId(index)} key={sectionId(index)}>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${entry.id}-${index}-${paragraphIndex}`}>{paragraph}</p>)}</section>)}<p className="writing-reading__last-line">end of this page.<br />not the end of the thought.</p></div></div>
    {entry.footnotes && entry.footnotes.length > 0 && <section className="writing-reading__footnotes"><p className="section-kicker">kept in the margin</p>{entry.footnotes.map((note) => <details key={note.mark}><summary><span>{note.mark}</span> open footnote</summary><p>{note.text}</p></details>)}</section>}
  </article></SiteShell>;
}
