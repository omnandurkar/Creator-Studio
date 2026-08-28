import { ArrowDown, ArrowUpRight, ExternalLink, Flower2, HeartHandshake, Leaf, Sparkles, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SiteShell from "@/components/SiteShell";
import { adhdGarden } from "@/lib/content";

function FlowerInWind() {
  return (
    <svg aria-hidden="true" className="adhd-flower" viewBox="0 0 720 620">
      <path className="adhd-wind adhd-wind--one" d="M-40 168 C108 120, 180 218, 319 164 S520 93, 760 158" />
      <path className="adhd-wind adhd-wind--two" d="M-35 318 C102 371, 200 271, 334 328 S540 404, 758 336" />
      <path className="adhd-wind adhd-wind--three" d="M10 468 C147 416, 229 524, 370 472 S580 392, 740 448" />
      <path className="adhd-stem" d="M364 554 C357 454, 390 390, 369 288" />
      <path className="adhd-leaf adhd-leaf--left" d="M358 414 C294 420, 260 377, 243 344 C315 339, 348 365, 358 414Z" />
      <path className="adhd-leaf adhd-leaf--right" d="M372 444 C441 426, 478 467, 490 505 C418 506, 384 481, 372 444Z" />
      <g className="adhd-flower__head">
        <path className="adhd-flower__petal adhd-flower__petal--one" d="M366 269 C288 206, 299 121, 363 103 C425 122, 435 208, 366 269Z" />
        <path className="adhd-flower__petal adhd-flower__petal--two" d="M381 278 C375 181, 449 141, 497 180 C524 235, 473 291, 381 278Z" />
        <path className="adhd-flower__petal adhd-flower__petal--three" d="M382 292 C478 247, 535 301, 519 358 C469 397, 403 361, 382 292Z" />
        <path className="adhd-flower__petal adhd-flower__petal--four" d="M365 301 C440 377, 393 443, 335 425 C294 386, 307 322, 365 301Z" />
        <path className="adhd-flower__petal adhd-flower__petal--five" d="M350 290 C274 351, 204 310, 219 251 C253 205, 325 225, 350 290Z" />
        <path className="adhd-flower__petal adhd-flower__petal--six" d="M353 275 C252 270, 225 190, 268 149 C325 132, 366 193, 353 275Z" />
        <circle className="adhd-flower__centre" cx="366" cy="287" r="46" />
        <circle className="adhd-flower__seed" cx="366" cy="287" r="10" />
      </g>
      <g className="adhd-flower__sparks"><circle cx="157" cy="210" r="9" /><circle cx="555" cy="120" r="7" /><circle cx="611" cy="434" r="10" /><path d="M170 445 l13 13 m0 -13 l-13 13" /><path d="M142 92 l13 13 m0 -13 l-13 13" /></g>
    </svg>
  );
}

export default function AdhdGarden() {
  const [activeTension, setActiveTension] = useState(0);
  const [activePetal, setActivePetal] = useState(adhdGarden.interestPetals[0] ?? "ideas");
  const [isBreezing, setIsBreezing] = useState(false);
  const breezeTimeout = useRef<number | undefined>(undefined);
  const tension = adhdGarden.tensions[activeTension];

  useEffect(() => () => window.clearTimeout(breezeTimeout.current), []);

  const releaseBreeze = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearTimeout(breezeTimeout.current);
    setIsBreezing(true);
    breezeTimeout.current = window.setTimeout(() => setIsBreezing(false), 4600);
  };

  return (
    <SiteShell pageTheme="garden">
      <section className={`adhd-garden-hero ${isBreezing ? "is-breezing" : ""}`}>
        <div className="adhd-garden-hero__winds" aria-hidden="true"><i /><i /><i /></div>
        <div className="adhd-garden-hero__copy">
          <p className="section-kicker"><Wind size={14} /> {adhdGarden.eyebrow}</p>
          <h1>This is what<br />a <em>constructive</em><br /><b>ADHD</b> mind<br />can make.</h1>
          <p>{adhdGarden.intro}</p>
          <div className="adhd-garden-hero__actions">
            <a className="adhd-garden-hero__jump" href="#the-garden"><Flower2 size={17} /> enter the garden <ArrowDown size={16} /></a>
            <button aria-pressed={isBreezing} className="adhd-garden-hero__breeze" onClick={releaseBreeze} type="button"><Wind size={17} /> {isBreezing ? "breeze passing…" : "breathe with the wind"}</button>
          </div>
          <p aria-live="polite" className="adhd-garden-hero__breeze-status">{isBreezing ? "A light breeze is moving through the garden." : ""}</p>
        </div>
        <div className="adhd-garden-hero__art"><FlowerInWind /><p>one mind,<br />many petals.</p></div>
        <aside className="adhd-garden-hero__scrap">not a flaw to erase.<br /><strong>a pattern to understand.</strong></aside>
      </section>

      <section className="adhd-garden-ground" id="the-garden">
        <div className="adhd-garden-ground__intro">
          <p className="section-kicker"><Sparkles size={14} /> a clear note, not a diagnosis</p>
          <h2>Many directions<br />can still become <em>one body of work.</em></h2>
          <p>{adhdGarden.definition} <a href={adhdGarden.sources[0]?.url} rel="noreferrer" target="_blank">[1]</a> <a href={adhdGarden.sources[1]?.url} rel="noreferrer" target="_blank">[2]</a></p>
        </div>
        <aside className="adhd-garden-ground__care"><HeartHandshake size={26} /><p>{adhdGarden.disclaimer}</p></aside>
      </section>

      <section className="adhd-tensions" aria-labelledby="adhd-tensions-title">
        <div className="adhd-tensions__lead">
          <p className="section-kicker"><Wind size={14} /> the difficult and the possible</p>
          <h2 id="adhd-tensions-title">The wind is not<br />always <em>kind.</em></h2>
          <p>Both things can be true: some patterns need real support, and a broad range of interests can become meaningful material. There is no obligation to make suffering productive.</p>
          <div className="adhd-tensions__switch" role="tablist" aria-label="ADHD reflections">
            {adhdGarden.tensions.map((item, index) => <button aria-controls="adhd-tension-panel" aria-selected={activeTension === index} key={item.label} onClick={() => setActiveTension(index)} role="tab" type="button">{index + 1 < 10 ? `0${index + 1}` : index + 1} / {item.label}</button>)}
          </div>
        </div>
        {tension && <article className={`adhd-tension-card adhd-tension-card--${activeTension}`} id="adhd-tension-panel" role="tabpanel"><span>{tension.label}</span><h3>{tension.title}</h3><p>{tension.copy}</p><i aria-hidden="true">✳</i></article>}
      </section>

      <section className="adhd-practices" aria-labelledby="adhd-practices-title">
        <div className="adhd-practices__heading"><p className="section-kicker"><Leaf size={14} /> practical scaffolds</p><h2 id="adhd-practices-title">Give the ideas<br />somewhere to <em>land.</em></h2><p>These are practical experiments, not a substitute for clinical advice. Keep what reduces friction; leave what does not fit.</p></div>
        <div className="adhd-practices__list">{adhdGarden.practices.map((practice) => <article key={practice.number}><span>{practice.number}</span><h3>{practice.title}</h3><p>{practice.copy}</p><i aria-hidden="true" /></article>)}</div>
      </section>

      <section className="adhd-petal-field" aria-labelledby="adhd-petal-title">
        <div className="adhd-petal-field__copy"><p className="section-kicker"><Flower2 size={14} /> interest field</p><h2 id="adhd-petal-title">One curiosity<br />can feed <em>another.</em></h2><p>Click a petal. No interest has to become a career to matter; the small things can still nourish the work.</p></div>
        <div className="adhd-petal-field__flower" aria-label="A flower of Om's creative interests">
          {adhdGarden.interestPetals.map((petal, index) => <button aria-pressed={activePetal === petal} className={activePetal === petal ? "is-active" : ""} key={petal} onClick={() => setActivePetal(petal)} style={{ "--petal-index": index } as React.CSSProperties} type="button">{petal}</button>)}
          <span>many<br />interests</span>
          <p aria-live="polite">today, the garden is listening for <strong>{activePetal}</strong>.</p>
        </div>
      </section>

      <section className="adhd-garden-closing">
        <div><p className="section-kicker"><Sparkles size={14} /> a last garden note</p><h2>{adhdGarden.closingTitle}</h2><p>{adhdGarden.closingCopy}</p><a href="/about">follow the off-stage interests <ArrowUpRight size={16} /></a></div>
        <div className="adhd-garden-closing__sources"><p>Read more from trusted health sources:</p>{adhdGarden.sources.map((source, index) => <a href={source.url} key={source.url} rel="noreferrer" target="_blank">[{index + 1}] {source.label} <ExternalLink size={14} /></a>)}</div>
      </section>
    </SiteShell>
  );
}
