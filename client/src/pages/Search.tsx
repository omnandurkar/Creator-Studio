import { ArrowUpRight, Search as SearchIcon, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedFilms, publishedNotes, publishedReleases, publishedShayari, publishedWritings } from "@/lib/content";

type SearchEntry = { id: string; title: string; excerpt: string; tags: string[]; kind: string; href: string };
function includesTerm(entry: SearchEntry, term: string) { return `${entry.title} ${entry.excerpt} ${entry.tags.join(" ")} ${entry.kind}`.toLowerCase().includes(term); }

export default function Search() {
  const [query, setQuery] = useState("");
  const entries = useMemo<SearchEntry[]>(() => [
    ...publishedReleases.map((item) => ({ id: item.id, title: item.title, excerpt: item.description, tags: item.mood ?? [], kind: item.type, href: `/music/${item.slug}` })),
    ...publishedShayari.map((item) => ({ id: item.id, title: item.title, excerpt: item.text, tags: item.tags, kind: "shayari", href: `/shayari/${item.slug}` })),
    ...publishedWritings.map((item) => ({ id: item.id, title: item.title, excerpt: item.excerpt, tags: item.tags, kind: item.category, href: `/writings/${item.slug}` })),
    ...publishedNotes.map((item) => ({ id: item.id, title: item.label, excerpt: item.text, tags: item.tags, kind: "note", href: "/notes" })),
    ...publishedFilms.map((item) => ({ id: item.id, title: item.title, excerpt: item.sceneToRemember, tags: [...item.tags, ...(item.motifs ?? [])], kind: "screening folder", href: `/cinephile/${item.slug}` })),
  ], []);
  const cleanedQuery = query.trim().toLowerCase();
  const results = cleanedQuery ? entries.filter((entry) => includesTerm(entry, cleanedQuery)) : entries.slice(0, 6);
  return <SiteShell pageTheme="studio"><section className="archive-search"><div><p className="section-kicker"><SearchIcon size={14} /> archive search</p><h1>Find the thread<br />you want to <em>follow.</em></h1><p>Search titles, tags, fragments, rooms and notes across Om’s archive.</p></div><label className="archive-search__input"><SearchIcon size={20} /><input autoComplete="off" autoFocus onChange={(event) => setQuery(event.target.value)} placeholder="Try “quiet”, “night”, “process”..." type="search" value={query} /><span>{cleanedQuery ? `${results.length} found` : "start anywhere"}</span></label></section><section className="archive-search__results"><p className="section-kicker"><Sparkles size={14} /> {cleanedQuery ? "matching artifacts" : "begin with these"}</p>{results.length > 0 ? <div>{results.map((entry) => <Link href={entry.href} key={`${entry.kind}-${entry.id}`}><span>{entry.kind}</span><h2>{entry.title}</h2><p>{entry.excerpt}</p><footer>{entry.tags.slice(0, 3).map((tag) => <i key={tag}>{tag}</i>)}<ArrowUpRight size={16} /></footer></Link>)}</div> : <div className="archive-search__empty"><p>No room is filed under that phrase yet.</p><small>Try a mood, a theme, a form or a word from a note.</small></div>}</section></SiteShell>;
}
