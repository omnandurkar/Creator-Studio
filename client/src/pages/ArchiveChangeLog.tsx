import { ArrowUpRight, ClipboardList } from "lucide-react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import changes from "@/content/changelog.json";

export default function ArchiveChangeLog() {
  return <SiteShell pageTheme="studio"><section className="change-log__hero"><p className="section-kicker"><ClipboardList size={14} /> archive changelog</p><h1>What moved<br />in the <em>margins.</em></h1><p>A factual index of additions and changes to Creator Studio. It keeps the archive’s own small history visible.</p></section><section className="change-log">{changes.map((change, index) => <article key={change.id}><span>{String(index + 1).padStart(2, "0")}</span><time>{change.date}</time><div><h2>{change.title}</h2><p>{change.detail}</p><footer>{change.rooms.map((room) => <i key={room}>{room}</i>)}</footer></div></article>)}<Link className="change-log__return" href="/studio-desk">return to the desk <ArrowUpRight size={16} /></Link></section></SiteShell>;
}
