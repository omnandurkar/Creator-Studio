/** The Studio Desk is the archive's object-led index: each tactile item opens a room. */
import { ArrowUpRight, CloudSun, Coffee, Headphones, MousePointer2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { deskObjects, studioWeather, type DeskObject } from "@/lib/content";

function DeskObjectButton({ item, isSelected, onSelect }: { item: DeskObject; isSelected: boolean; onSelect: () => void }) {
  return <button aria-pressed={isSelected} className={`desk-object desk-object--${item.accent} ${isSelected ? "is-selected" : ""}`} onClick={onSelect} type="button"><span>{item.symbol}</span><small>{item.label}</small></button>;
}

export default function StudioDesk() {
  const [selectedId, setSelectedId] = useState(deskObjects[0]?.id ?? "");
  const selected = deskObjects.find((item) => item.id === selectedId) ?? deskObjects[0];
  return <SiteShell pageTheme="studio"><section className="desk-hero"><div className="desk-hero__copy"><p className="section-kicker"><Sparkles size={14} /> studio desk / open index</p><h1>The work is<br />already on the <em>table.</em></h1><p>Choose an object to move through Om’s archive by texture, not by menu.</p></div><div className="desk-hero__weather"><span className="desk-hero__weather-icon"><CloudSun size={28} /></span><p>{studioWeather.eyebrow}</p><strong>{studioWeather.month}</strong><i /><small>{studioWeather.carrying}</small></div></section>
    <section className="studio-desk" aria-labelledby="studio-desk-title"><div className="studio-desk__mat"><div className="studio-desk__tape" aria-hidden="true" /><Coffee className="studio-desk__cup" aria-hidden="true" size={58} /><Headphones className="studio-desk__headphones" aria-hidden="true" size={116} /><div className="studio-desk__paper" aria-hidden="true"><i /><i /><i /><i /></div><p className="studio-desk__instruction"><MousePointer2 size={15} /> touch an object</p>{deskObjects.map((item) => <DeskObjectButton isSelected={selected?.id === item.id} item={item} key={item.id} onSelect={() => setSelectedId(item.id)} />)}</div><aside className="studio-desk__drawer"><p className="section-kicker">opened from the desk</p><h2 id="studio-desk-title">{selected?.title}</h2><p>{selected?.description}</p>{selected && <Link className="ink-button" href={selected.route}>open the room <ArrowUpRight size={16} /></Link>}</aside></section>
    <section className="weather-board"><div><p className="section-kicker"><CloudSun size={14} /> {studioWeather.eyebrow}</p><h2>What the archive<br /><em>is holding.</em></h2><p>This rotating card can be refreshed once a month, or whenever the studio weather changes.</p></div><dl><div><dt>listening</dt><dd>{studioWeather.listening}</dd></div><div><dt>making</dt><dd>{studioWeather.making}</dd></div><div><dt>reading</dt><dd>{studioWeather.reading}</dd></div><div><dt>carrying</dt><dd>{studioWeather.carrying}</dd></div></dl></section></SiteShell>;
}
