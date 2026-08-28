import { Clapperboard, Copy, Download, Link2, Share2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SiteShell from "@/components/SiteShell";
import { connectionArchive } from "@/lib/content";

function saveShareCard(title: string, line: string, room: string) {
  const shades: Record<string, string> = { music: "#bfe0f2", shayari: "#f0a1b4", writings: "#a6d2c0" };
  const source = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${shades[room] ?? "#f6da95"}"/><rect x="34" y="34" width="1132" height="562" fill="none" stroke="#20252f" stroke-width="4"/><text x="78" y="108" font-size="22" font-family="Arial,sans-serif" fill="#20252f">CREATOR STUDIO / OM NANDURKAR</text><text x="78" y="270" font-size="86" font-family="Georgia,serif" fill="#20252f">${title}</text><text x="78" y="370" font-size="31" font-family="Georgia,serif" fill="#20252f">${line}</text><text x="78" y="550" font-size="24" font-family="Arial,sans-serif" fill="#20252f">THE PERSONAL ARCHIVE</text></svg>`;
  const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-creator-studio-card.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ArchiveConnections() {
  const [activeId, setActiveId] = useState(connectionArchive.connections[0]?.id ?? "");
  const [cardId, setCardId] = useState(connectionArchive.shareCards[0]?.id ?? "");
  const active = connectionArchive.connections.find((item) => item.id === activeId);
  const card = connectionArchive.shareCards.find((item) => item.id === cardId);

  const share = async () => {
    if (!card) return;
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: card.title, text: card.line, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Archive link copied.");
  };

  return (
    <SiteShell pageTheme="studio">
      <section className="connections-hero">
        <div className="connections-hero__fragment" aria-hidden="true">
          <span>THREAD FILE / 03</span><i /><i /><b>found between rooms</b>
        </div>
        <p className="section-kicker"><Link2 size={14} /> influence overlap map</p>
        <h1>Follow the<br /><em>thread.</em></h1>
        <p>Some works are joined by a colour, a question, a sound, or the small space between two images. This page keeps only the links that earn their place.</p>
      </section>

      <section className="influence-map">
        <div className="influence-map__lead">
          <p className="section-kicker"><Sparkles size={14} /> cross-room constellations</p>
          <h2>The archive is<br />not a row of <em>rooms.</em></h2>
          <p>Choose a thread to see the pair it keeps in conversation. The marks below are the beginning of a map, ready to gather more true associations.</p>
        </div>
        <div className="influence-map__nodes">
          {connectionArchive.connections.map((connection, index) => (
            <button aria-pressed={activeId === connection.id} className={activeId === connection.id ? "is-active" : ""} key={connection.id} onClick={() => setActiveId(connection.id)} style={{ "--node-order": index } as React.CSSProperties} type="button">
              <span>{connection.fromRoom}</span><strong>{connection.from}</strong><i>↔</i><strong>{connection.to}</strong><span>{connection.toRoom}</span>
            </button>
          ))}
        </div>
        {active && <aside><p>open thread / first mark</p><strong>{active.thread}</strong><small>{active.from} ↔ {active.to}</small></aside>}
      </section>

      <section className="frame-of-month">
        <div>
          <p className="section-kicker"><Clapperboard size={14} /> frame of the month</p>
          <h2>{connectionArchive.frameOfTheMonth.filed ? <>One frame,<br />held close.</> : <>One frame<br />waiting for its <em>note.</em></>}</h2>
          <p>{connectionArchive.frameOfTheMonth.caption}</p>
        </div>
        <div className="frame-of-month__mat" aria-label="Frame of the month image space">
          {connectionArchive.frameOfTheMonth.image ? <img alt={connectionArchive.frameOfTheMonth.title} src={connectionArchive.frameOfTheMonth.image} /> : <><span>empty mount / a cleared cinema still</span><i /><i /><i /></>}
          <small>{connectionArchive.frameOfTheMonth.title}</small>
        </div>
      </section>

      <section className="double-features">
        <div>
          <p className="section-kicker">double-feature essays</p>
          <h2>Two films,<br />one <em>question.</em></h2>
          <p>When Om writes an essay joining two films, it will appear here. The folder remains open until that connection is ready to be authored.</p>
        </div>
        <div>
          {connectionArchive.doubleFeatures.length ? connectionArchive.doubleFeatures.map((feature) => <article key={feature.id}><span>{feature.firstTitle} ↔ {feature.secondTitle}</span><h3>{feature.title}</h3></article>) : <article className="double-features__empty"><span>folder no. 00 / open</span><h3>No double feature has been filed yet.</h3><p>The next pairing can begin with a genuine question, not a score or a borrowed opinion.</p></article>}
        </div>
      </section>

      <section className="share-cards">
        <div>
          <p className="section-kicker"><Share2 size={14} /> archive share card</p>
          <h2>A small image<br />for the <em>return.</em></h2>
          <p>Select a passage, then save a clean SVG image or share the current archive page. Each card is a small way to carry an approved piece of the archive into another room.</p>
        </div>
        <div className="share-cards__controls">
          <div className="share-cards__select">{connectionArchive.shareCards.map((item) => <button aria-pressed={cardId === item.id} className={cardId === item.id ? "is-active" : ""} key={item.id} onClick={() => setCardId(item.id)} type="button">{item.title}</button>)}</div>
          {card && <article className={`share-card share-card--${card.room}`}><span>Creator Studio / {card.room}</span><h3>{card.title}</h3><p>{card.line}</p><small>Om Nandurkar</small></article>}
          <div className="share-cards__actions">
            <button onClick={share} type="button"><Share2 size={16} /> share page</button>
            {card && <button onClick={() => saveShareCard(card.title, card.line, card.room)} type="button"><Download size={16} /> save image card</button>}
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Archive link copied."); }} type="button"><Copy size={16} /> copy link</button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
