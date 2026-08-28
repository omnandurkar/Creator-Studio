import { CalendarDays, CircleDot, Music2, Newspaper, StickyNote } from "lucide-react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedNotes, publishedReleases, publishedShayari, publishedWritings } from "@/lib/content";

type CalendarEntry = { id: string; date: string; title: string; kind: string; href: string; icon: "music" | "writing" | "note" };
const formatMonth = (date: string) => new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`));
const formatDay = (date: string) => new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(`${date}T12:00:00`));
const iconFor = (icon: CalendarEntry["icon"]) => icon === "music" ? <Music2 size={16} /> : icon === "writing" ? <Newspaper size={16} /> : <StickyNote size={16} />;

export default function ArchiveCalendar() {
  const entries: CalendarEntry[] = [
    ...publishedReleases.map((item) => ({ id: item.id, date: item.releaseDate, title: item.title, kind: item.type, href: `/music/${item.slug}`, icon: "music" as const })),
    ...publishedShayari.map((item) => ({ id: item.id, date: item.date, title: item.title, kind: "shayari", href: `/shayari/${item.slug}`, icon: "writing" as const })),
    ...publishedWritings.map((item) => ({ id: item.id, date: item.date, title: item.title, kind: item.category, href: `/writings/${item.slug}`, icon: "writing" as const })),
    ...publishedNotes.map((item) => ({ id: item.id, date: item.date, title: item.label, kind: "note", href: "/notes", icon: "note" as const })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const groups = entries.reduce<Record<string, CalendarEntry[]>>((result, entry) => { const month = formatMonth(entry.date); (result[month] ??= []).push(entry); return result; }, {});
  return <SiteShell pageTheme="studio"><section className="archive-calendar__hero"><p className="section-kicker"><CalendarDays size={14} /> archive calendar</p><h1>Some things<br />need their <em>date.</em></h1><p>A gentle chronology of releases, readings and small notes already held in the archive.</p></section><section className="archive-calendar">{Object.entries(groups).map(([month, items]) => <section key={month}><h2>{month}</h2><div>{items.map((item) => <Link href={item.href} key={`${item.kind}-${item.id}`}><time>{formatDay(item.date)}</time><span>{iconFor(item.icon)}</span><div><small>{item.kind}</small><strong>{item.title}</strong></div><CircleDot size={15} /></Link>)}</div></section>)}</section></SiteShell>;
}
