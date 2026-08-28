/**
 * Pastel Afterimage Archive visual reminder: Notes is the Lemon Wall room—warm
 * yellow paper, taped corners, thumbtacks, scribbled arrows, and a loose pinned
 * composition that feels genuinely different from the archive pages.
 */
import { ArrowUpRight, Dices, Lightbulb, Pin, Printer, Sparkles, StickyNote, Tags } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedNotes, type Note } from "@/lib/content";
import { toast } from "sonner";

function NoteCard({ note, index, selected, onSelect }: { note: Note; index: number; selected: boolean; onSelect: () => void }) {
  return <article className={`sticky-note sticky-note--${note.color} sticky-note--${note.pinStyle} ${selected ? "is-selected" : ""}`} style={{ "--note-rotation": `${note.rotation}deg`, "--note-index": index } as CSSProperties}><span aria-hidden="true" className="sticky-note__pin" />{note.isIllustrative && <span className="illustrative-label">desk scrap · kept close</span>}<p className="sticky-note__number">0{index + 1}</p><blockquote>“{note.text}”</blockquote><footer><span>{note.label}</span><span>{note.tags[0]}</span></footer><button aria-label={`Bring ${note.label} to the spotlight`} className="sticky-note__select" onClick={onSelect} type="button">keep this close ↗</button><span aria-hidden="true" className="sticky-note__corner">✳</span></article>;
}

function dailyIndexForNotes(notes: Note[]) { if (!notes.length) return 0; const stamp = new Date().toISOString().slice(0, 10); return stamp.split("").reduce((total, character) => total + character.charCodeAt(0), 0) % notes.length; }

export default function Notes() {
  const [selectedIndex, setSelectedIndex] = useState(() => dailyIndexForNotes(publishedNotes));
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const selectedNote = publishedNotes[selectedIndex];
  const tags = useMemo(() => Array.from(new Set(publishedNotes.flatMap((note) => note.tags))), []);
  const visibleNotes = activeTag ? publishedNotes.filter((note) => note.tags.includes(activeTag)) : publishedNotes;
  const shuffleNotes = () => setSelectedIndex((current) => publishedNotes.length ? (current + 1 + Math.floor(Math.random() * Math.max(1, publishedNotes.length - 1))) % publishedNotes.length : 0);
  const printSpotlight = () => { window.print(); toast("The spotlight note is ready for print."); };

  return <SiteShell pageTheme="notes"><section className="notes-hero"><div className="notes-hero__grid" aria-hidden="true" /><div className="notes-hero__copy"><p className="notes-hero__kicker"><StickyNote size={14} /> lemon wall / vol. 05</p><h1>For the things<br />too small for a<br /><em>whole page.</em></h1><p>Loose ends, lyric sparks, very good questions, reminders, and the thoughts that showed up without an appointment.</p><a className="notes-hero__jump" href="#note-board">pinboard below <ArrowUpRight size={16} /></a></div><div className="notes-hero__pinboard" aria-label="Handcrafted sticky-note collage"><div className="hero-note hero-note--one"><span>note to self</span><p>trust the<br />strange<br />version.</p></div><div className="hero-note hero-note--two"><span>later</span><i /><i /><i /></div><div className="hero-note hero-note--three">✳<br />✎</div><div className="hero-note__string" /><div className="hero-note__pin hero-note__pin--one" /><div className="hero-note__pin hero-note__pin--two" /></div><p className="notes-hero__margin">a soft place<br />to leave a thought.</p></section>
    <section className="note-spotlight" aria-labelledby="spotlight-note-title"><div className="note-spotlight__lead"><p className="section-kicker"><Lightbulb size={14} /> a thought for today</p><h2 id="spotlight-note-title">One idea.<br /><em>One more door.</em></h2><p>A different note comes forward each day. Shuffle the wall when you want a change of scene.</p><div className="note-spotlight__actions"><button onClick={shuffleNotes} type="button"><Dices size={17} /> shuffle the wall</button>{selectedNote?.printable && <button onClick={printSpotlight} type="button"><Printer size={16} /> print this note</button>}</div></div>{selectedNote && <div className={`note-spotlight__note note-spotlight__note--${selectedNote.color}`}><span className="note-spotlight__pin"><Pin size={17} fill="currentColor" /></span>{selectedNote.isIllustrative && <span className="illustrative-label">desk scrap · kept close</span>}<blockquote>“{selectedNote.text}”</blockquote><p>{selectedNote.label}</p><span className="note-spotlight__spark">✳</span></div>}<div aria-hidden="true" className="note-spotlight__arrow">this one<br />found you ↗</div></section>
    <section className="note-board" id="note-board" aria-labelledby="note-board-title"><div className="note-board__heading"><div><p className="section-kicker"><Pin size={14} /> pieces of the process</p><h2 id="note-board-title">Pinned, for<br /><em>later.</em></h2></div><p>A loose wall for short-form writing: lyric sparks, working questions, reminders, and the thoughts that are still looking for their full page.</p></div><div className="note-board__tags" aria-label="Filter notes by tag"><span><Tags size={15} /> notebook map</span>{tags.map((tag) => <button aria-pressed={activeTag === tag} className={activeTag === tag ? "is-active" : ""} key={tag} onClick={() => setActiveTag((current) => current === tag ? null : tag)} type="button">{tag}</button>)}</div><div className="note-board__grid">{visibleNotes.map((note) => <NoteCard index={publishedNotes.indexOf(note)} key={note.id} note={note} onSelect={() => setSelectedIndex(publishedNotes.indexOf(note))} selected={selectedIndex === publishedNotes.indexOf(note)} />)}</div></section>
    <section className="notes-closer"><div className="notes-closer__shapes" aria-hidden="true"><span>?</span><i /><i /><i /><div>✳</div></div><div className="notes-closer__copy"><p className="section-kicker"><Sparkles size={14} /> a living wall</p><h2>Keep the line<br />before it <em>leaves.</em></h2><p>Pin the phrase before it disappears. A note can stay small, and still be the beginning of a whole new song.</p><Link className="text-arrow-link" href="/writings">open the longer pages <ArrowUpRight size={17} /></Link></div></section></SiteShell>;
}
