import { ArrowLeft, BookOpen, FlaskConical, Users, Calendar, Tag, Atom, Brain, Shield, Crosshair, Zap, Target, Waves } from "lucide-react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import Math from "@/components/Math";
import "../../books.css";
import "../../research-paper.css";

/* ═══════════════════════════════════════════════════════════
   SVG Diagrams — Vector art illustrations for key concepts
   ═══════════════════════════════════════════════════════════ */

function MetricDiagram() {
  return (
    <svg className="paper-diagram" viewBox="0 0 600 200" fill="none" aria-label="Metric distortion diagram showing flat vs curved space">
      {/* Flat space grid */}
      <text x="75" y="18" textAnchor="middle" className="diagram-label">Flat Euclidean Space</text>
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={`v${i}`} x1={20 + i * 20} y1={25} x2={20 + i * 20} y2={145} stroke="#3a4a8f" strokeWidth="0.8" opacity="0.3" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={`h${i}`} x1={20} y1={25 + i * 20} x2={140} y2={25 + i * 20} stroke="#3a4a8f" strokeWidth="0.8" opacity="0.3" />
      ))}
      <circle cx="80" cy="85" r="6" fill="#3a4a8f" opacity="0.5" />
      <path d="M140 85 L80 85" stroke="#ff6e6c" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrow)" />
      <text x="110" y="78" textAnchor="middle" className="diagram-small">finite distance</text>

      {/* Arrow */}
      <text x="195" y="90" textAnchor="middle" className="diagram-label" fontSize="22">→</text>
      <text x="195" y="108" textAnchor="middle" className="diagram-small">Ω(x) applied</text>

      {/* Curved space */}
      <text x="400" y="18" textAnchor="middle" className="diagram-label">Limitless Metric Distortion</text>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
        const x = 260 + i * 12 + (i > 5 ? (i - 5) * (i - 5) * 2.5 : 0);
        return <line key={`cv${i}`} x1={x} y1={25} x2={x} y2={145} stroke="#3a4a8f" strokeWidth="0.8" opacity={0.2 + i * 0.06} />;
      })}
      {[0, 1, 2, 3, 4, 5, 6].map(i => {
        const curve = i > 2 ? (i - 2) * 3 : 0;
        return <path key={`ch${i}`} d={`M260 ${25 + i * 20} Q${370 + curve} ${25 + i * 20 + curve * 0.5} ${520} ${25 + i * 20}`} stroke="#3a4a8f" strokeWidth="0.8" opacity="0.3" fill="none" />;
      })}
      <circle cx="510" cy="85" r="8" fill="#ff6e6c" opacity="0.7" />
      <text x="510" y="168" textAnchor="middle" className="diagram-small">Sorcerer (x=0)</text>
      <path d="M260 85 Q350 85 480 85" stroke="#6b7dd4" strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <text x="370" y="78" textAnchor="middle" className="diagram-small">∞ proper distance</text>

      {/* Omega label */}
      <text x="400" y="168" textAnchor="middle" className="diagram-accent">Ω(x) → ∞ as x → 0</text>
    </svg>
  );
}

function TechniqueFlowDiagram() {
  return (
    <svg className="paper-diagram paper-diagram--wide" viewBox="0 0 700 160" fill="none" aria-label="Limitless technique flow diagram">
      {/* Blue */}
      <rect x="10" y="20" width="150" height="120" rx="8" fill="#1e3a5f" opacity="0.12" stroke="#1e3a5f" strokeWidth="1.5" />
      <text x="85" y="48" textAnchor="middle" className="diagram-label" fill="#1e3a5f">BLUE</text>
      <text x="85" y="66" textAnchor="middle" className="diagram-small" fill="#1e3a5f">Lapse: Convergence</text>
      <text x="85" y="85" textAnchor="middle" className="diagram-accent" fill="#1e3a5f">g_rr &lt; 1</text>
      <text x="85" y="108" textAnchor="middle" className="diagram-small" fill="#1e3a5f">Negative CE → Spatial</text>
      <text x="85" y="122" textAnchor="middle" className="diagram-small" fill="#1e3a5f">Contraction</text>

      {/* Plus sign */}
      <text x="195" y="88" textAnchor="middle" fontSize="28" fill="#3a4a8f" fontWeight="700">⊕</text>

      {/* Red */}
      <rect x="230" y="20" width="150" height="120" rx="8" fill="#8b2020" opacity="0.12" stroke="#8b2020" strokeWidth="1.5" />
      <text x="305" y="48" textAnchor="middle" className="diagram-label" fill="#8b2020">RED</text>
      <text x="305" y="66" textAnchor="middle" className="diagram-small" fill="#8b2020">Reversal: Divergence</text>
      <text x="305" y="85" textAnchor="middle" className="diagram-accent" fill="#8b2020">g_rr &gt; 1</text>
      <text x="305" y="108" textAnchor="middle" className="diagram-small" fill="#8b2020">Positive CE (RCT) →</text>
      <text x="305" y="122" textAnchor="middle" className="diagram-small" fill="#8b2020">Spatial Expansion</text>

      {/* Arrow */}
      <text x="420" y="88" textAnchor="middle" fontSize="22" fill="#3a4a8f">→</text>

      {/* Purple */}
      <rect x="460" y="10" width="220" height="140" rx="8" fill="#6b21a8" opacity="0.1" stroke="#6b21a8" strokeWidth="2" />
      <text x="570" y="42" textAnchor="middle" className="diagram-label" fill="#6b21a8">PURPLE</text>
      <text x="570" y="62" textAnchor="middle" className="diagram-small" fill="#6b21a8">Hollow: Singularity Synthesis</text>
      <text x="570" y="82" textAnchor="middle" className="diagram-accent" fill="#6b21a8">m² &lt; 0 (imaginary mass)</text>
      <text x="570" y="105" textAnchor="middle" className="diagram-small" fill="#6b21a8">Tachyonic Vacuum</text>
      <text x="570" y="119" textAnchor="middle" className="diagram-small" fill="#6b21a8">Instability → Matter</text>
      <text x="570" y="133" textAnchor="middle" className="diagram-small" fill="#6b21a8">Deconstruction</text>
    </svg>
  );
}

function SixEyesPipeline() {
  return (
    <svg className="paper-diagram" viewBox="0 0 600 120" fill="none" aria-label="Six Eyes threat filtering pipeline">
      {[
        { x: 10, w: 120, label: "Sense", sub: "Extract kinematic\n& CE data", color: "#0d7377" },
        { x: 145, w: 120, label: "Classify", sub: "Cross-reference\nthreat matrix", color: "#3a4a8f" },
        { x: 280, w: 120, label: "Decide", sub: "Safe → pass\nDanger → block", color: "#8b5e3c" },
        { x: 415, w: 170, label: "Execute", sub: "Activate Ω(x)\nor permit transit", color: "#6b21a8" },
      ].map((step, i) => (
        <g key={i}>
          <rect x={step.x} y="15" width={step.w} height="90" rx="6" fill={step.color} opacity="0.1" stroke={step.color} strokeWidth="1.5" />
          <text x={step.x + step.w / 2} y="42" textAnchor="middle" className="diagram-label" fill={step.color}>{step.label}</text>
          {step.sub.split("\n").map((line, j) => (
            <text key={j} x={step.x + step.w / 2} y={60 + j * 14} textAnchor="middle" className="diagram-small" fill={step.color}>{line}</text>
          ))}
          {i < 3 && <text x={step.x + step.w + 7} y="65" fontSize="16" fill="#3a4a8f">→</text>}
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   Paper Sections
   ═══════════════════════════════════════════════════════════ */

function PaperSection({ id, icon, number, title, children }: { id: string; icon: React.ReactNode; number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="paper-section" id={id}>
      <div className="paper-section__header">
        <span className="paper-section__number">{number}</span>
        <span className="paper-section__icon">{icon}</span>
        <h2>{title}</h2>
      </div>
      <div className="paper-section__body">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="paper-subsection">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════ */

export default function GojoLimitlessResearch() {
  return (
    <SiteShell pageTheme="library">
      <article className="research-paper">
        <div className="research-paper__bg" aria-hidden="true" />

        <div className="research-paper__container">
          <Link href="/library" className="research-detail__back">
            <ArrowLeft size={16} /> return to library
          </Link>

          {/* ── Title Block ── */}
          <header className="research-paper__title-block">
            <div className="research-detail__field-pill">
              <FlaskConical size={14} /> Mathematical Physics
            </div>
            <p className="research-paper__conf">Independent Research • 2026</p>
            <h1>The Neurological Architecture of <span className="gojo-name-highlight">Satoru Gojo</span>'s Limitless Technique</h1>
            <div className="research-detail__meta-row">
              <span><Users size={14} /> Om M Nandurkar</span>
              <span><Calendar size={14} /> 01 September 2026</span>
            </div>
          </header>

          {/* ── Abstract ── */}
          <div className="paper-abstract">
            <h2><BookOpen size={20} /> Abstract</h2>
            <p>
              The hereditary cursed technique known as the Limitless (無下限呪術, <em>Mukagen Jujutsu</em>) represents an unprecedented convergence of abstract mathematical analysis, relativistic field theories, and computational neurobiology. This investigation establishes a comprehensive formal framework for the mechanics governing the Limitless and its auxiliary manifestations. We demonstrate that the popular conceptualization of the neutral "Infinity" (<em>Mugen</em>) as a manifestation of Zeno's classical dichotomy paradox fails within flat Euclidean space, as infinite geometric progressions of spatial subdivisions converge in finite proper time and possess a Lebesgue measure of zero.
            </p>
            <p>
              Instead, the phenomenon is accurately modeled as a continuous deformation of the local Riemannian spacetime metric tensor via a cursed-energy-dependent conformal factor, generating infinite proper distance across a finite coordinate interval. We further evaluate the thermodynamic and relativistic mechanics of Cursed Technique Lapse: Blue, Cursed Technique Reversal: Red, and Hollow Technique: Purple.
            </p>
            <p>
              Finally, this paper models the biophysical architecture of the Six Eyes (<em>Rikugan</em>) as a quantum sensory and processing apparatus operating near the Landauer thermodynamic limit, analyzes the epistemic and information-theoretic collapse induced by the Domain Expansion: Unlimited Void, and formalizes the topological vulnerability exploited to sever the Limitless manifold.
            </p>
          </div>

          {/* ── Table of Contents ── */}
          <nav className="paper-toc">
            <h3>Contents</h3>
            <ol>
              <li><a href="#sec-intro">Introduction: The Metaphysical Foundation</a></li>
              <li><a href="#sec-zeno">Mathematical Formalization of Neutral Infinity</a></li>
              <li><a href="#sec-metric">Riemannian Metric Distortion</a></li>
              <li><a href="#sec-dynamics">Dynamics: Lapse, Reversal, and Synthesis</a></li>
              <li><a href="#sec-sixeyes">The Six Eyes Interface</a></li>
              <li><a href="#sec-domain">Domain Expansion: Unlimited Void</a></li>
              <li><a href="#sec-vulnerability">Structural Vulnerabilities</a></li>
              <li><a href="#sec-conclusion">Conclusion</a></li>
            </ol>
          </nav>

          {/* ═══ Section 1: Introduction ═══ */}
          <PaperSection id="sec-intro" icon={<BookOpen size={18} />} number="01" title="Introduction: The Metaphysical Foundation of the Limitless">
            <p>
              Within the taxonomy of inherited jujutsu abilities, the Limitless technique of the Gojo clan is distinguished by its direct manipulation of the spatial continuum through mathematical operations. Rather than projecting physical matter or converting cursed energy into standard elemental compounds, the technique allows the sorcerer to manipulate the spatial metric at an atomic and subatomic level.
            </p>
            <p>
              The operational framework of the Limitless is organized across four cardinal manifestations: the neutral barrier, an amplified attractive convergence, an inverted repulsive divergence, and a composite hollow state.
            </p>
            <div className="paper-callout">
              <strong>Neutral State — Infinity (<em>Mugen</em>):</strong> An automated spatial deceleration field that acts as an asymptotic barrier against approaching mass-energy vectors.
            </div>
            <div className="paper-callout paper-callout--blue">
              <strong>Lapse: Blue (<em>Ao</em>):</strong> Amplified negative cursed energy generates localized spatial deficits that create an attractive gravitational potential.
            </div>
            <div className="paper-callout paper-callout--red">
              <strong>Reversal: Red (<em>Aka</em>):</strong> Positive energy derived from RCT inverts spatial convergence into aggressive metric expansion.
            </div>
            <div className="paper-callout paper-callout--purple">
              <strong>Hollow: Purple (<em>Murasaki</em>):</strong> An advanced synthesis wherein conflicting infinities of convergence and divergence are superimposed, generating anomalous non-physical mass that deconstructs matter.
            </div>
            <p>
              Despite its genetic presence in the Gojo bloodline, practical mastery of the Limitless is exceptionally rare. The spatial calculations demand micro-scale manipulation of cursed energy beyond the scope of ordinary human cognition. Consequently, the Limitless remains functionally inert unless inherited concurrently with the <strong>Six Eyes</strong> (<em>Rikugan</em>).
            </p>
          </PaperSection>

          {/* ═══ Section 2: Zeno's Paradox ═══ */}
          <PaperSection id="sec-zeno" icon={<Atom size={18} />} number="02" title="Mathematical Formalization of Neutral Infinity">
            <SubSection title="Zeno's Paradox and the Real Analysis Dilemma">
              <p>
                The primary explanation roots the mechanics of the neutral Limitless in Zeno of Elea's Dichotomy Paradox. An attacker attempting to traverse a normalized unit interval <Math tex="[0, 1]" /> must reach each coordinate defined by:
              </p>
              <Math display tex="z_n = 1 - \frac{1}{2^n}, \quad n \in \mathbb{N}" />
              <p>
                However, modern real analysis reveals this paradox collapses in standard Euclidean space. The aggregate distance <Math tex="S" /> traversed across infinite sub-intervals is governed by a convergent geometric series:
              </p>
              <Math display tex="S = \sum_{n=1}^{\infty} \frac{1}{2^n} = \frac{1/2}{1 - 1/2} = 1" />
              <p>
                For an incoming projectile with initial velocity <Math tex="v_0" />, the total elapsed time <Math tex="T" /> is finite:
              </p>
              <Math display tex="T = \sum_{n=1}^{\infty} \Delta t_n = \frac{1}{v_0} \sum_{n=1}^{\infty} \frac{1}{2^n} = \frac{1}{v_0}" />
              <p>
                Because both sums converge, an unperturbed Euclidean space offers no resistance. The projectile crosses all infinitely subdivided boundaries in finite proper time, rendering purely arithmetic Zeno subdivision <strong>completely ineffective</strong> as a physical barrier.
              </p>
            </SubSection>

            <SubSection title="Measure-Theoretic Analysis: The Lebesgue Measure of Zeno Boundaries">
              <p>
                Let the set of all subdivision points be:
              </p>
              <Math display tex="Z = \left\{ z_n \in \mathbb{R} \;\middle|\; z_n = 1 - \frac{1}{2^n}, \; n \in \mathbb{N} \right\}" />
              <p>
                Using Lebesgue outer measure, for arbitrary <Math tex="\epsilon > 0" />, we construct covering intervals <Math tex="I_n" /> with total length:
              </p>
              <Math display tex="\sum_{n=1}^{\infty} |I_n| = \sum_{n=1}^{\infty} \frac{\epsilon}{2^n} = \epsilon" />
              <p>
                As <Math tex="\epsilon \to 0" />:
              </p>
              <Math display tex="m(Z) = 0" />
              <p className="paper-highlight">
                The set of Zeno division points occupies <strong>zero total length</strong> on the real line. For the Limitless to function as an impenetrable defense, the sorcerer must actively distort the underlying geometry of the continuum.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 3: Riemannian Metric ═══ */}
          <PaperSection id="sec-metric" icon={<Waves size={18} />} number="03" title="Riemannian Metric Distortion and Conformal Spatial Scaling">
            <p>
              In unperturbed Minkowski spacetime, the invariant interval is:
            </p>
            <Math display tex="ds^2 = -c^2 dt^2 + dx^2 + dy^2 + dz^2" />
            <p>
              Under the neutral Limitless, cursed energy scales the spatial sector through a conformal factor <Math tex="\Omega^2(x)" />:
            </p>
            <Math display tex="ds^2 = -c^2 dt^2 + \Omega^2(x) \left( dx^2 + dy^2 + dz^2 \right)" />
            <p>
              The conformal factor is parameterized via an inverse kernel function:
            </p>
            <Math display tex="\Omega(x) = 1 + \frac{\alpha}{\|x\|^k}, \quad k \ge 1" />

            <MetricDiagram />

            <p>
              The proper distance <Math tex="L" /> from an external coordinate <Math tex="x_0" /> to the origin diverges:
            </p>
            <Math display tex="L = \int_{0}^{x_0} \left( 1 + \frac{\alpha}{x^k} \right) dx \to \infty" />
            <p>
              While an external observer sees the entity halt millimeters from the sorcerer's body, the internal proper distance becomes <strong>mathematically infinite</strong>. The coordinate velocity relation:
            </p>
            <Math display tex="\frac{dx}{dt} = \frac{v_{\text{proper}}}{\Omega(x)} = \frac{v_{\text{proper}}}{1 + \frac{\alpha}{x^k}}" />
            <p>
              As <Math tex="x \to 0" />, <Math tex="\Omega(x) \to \infty" />, driving observable coordinate velocity to zero. The entity decelerates asymptotically until its relative progress is indistinguishable from absolute rest.
            </p>
          </PaperSection>

          {/* ═══ Section 4: Dynamics ═══ */}
          <PaperSection id="sec-dynamics" icon={<Zap size={18} />} number="04" title="Dynamics of Spatial Distortion: Lapse, Reversal, and Synthesis">

            <TechniqueFlowDiagram />

            <SubSection title="Cursed Technique Lapse: Blue (Convergent Negative Space)">
              <p>
                Blue corresponds to severe contraction of spatial metric components (<Math tex="g_{rr} < 1" />) within a localized volume, establishing an artificial gravitational singularity. The effective gravitational potential:
              </p>
              <Math display tex="\nabla \cdot \vec{g}_{\text{eff}} = -4\pi G \rho_{\text{cursed}}" />
              <p>
                Surrounding space collapses inward to restore metric equilibrium. Beyond destructive attraction, Blue facilitates high-speed spatial transit via stereographic projection mapping, bringing distant points into topological contact.
              </p>
            </SubSection>

            <SubSection title="Cursed Technique Reversal: Red (Divergent Repulsive Metric)">
              <p>
                Red requires Reverse Cursed Technique — negative cursed energy multiplied by itself produces positive energy:
              </p>
              <Math display tex="(-E_{\text{cursed}}) \times (-E_{\text{cursed}}) \to +E_{\text{positive}}" />
              <p>
                This mirrors an exotic stress-energy tensor violating both Weak and Strong Energy Conditions, resembling a localized cosmological constant <Math tex="\Lambda > 0" />:
              </p>
              <Math display tex="G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}" />
              <p>
                The conformal factor undergoes exponential expansion:
              </p>
              <Math display tex="\Omega_{\text{Red}}(r) = \exp\left(+\frac{\beta E_{\text{positive}}}{r}\right)" />
            </SubSection>

            <SubSection title="Hollow Technique: Purple (Singularity Synthesis and Imaginary Mass)">
              <p>
                Purple superimposes the convergent infinity of Blue with the divergent infinity of Red:
              </p>
              <Math display tex="\Psi_{\text{Purple}} = \Psi_{\text{Blue}} \oplus \Psi_{\text{Red}}" />
              <p>
                With an imaginary mass parameter <Math tex="m = i\mu" />, the energy-momentum invariant becomes:
              </p>
              <Math display tex="E^2 = p^2 c^2 + m^2 c^4 \implies E^2 = p^2 c^2 - \mu^2 c^4" />
              <p>
                In quantum field theory, this denotes a <strong>tachyonic field configuration</strong> with inverted potential:
              </p>
              <Math display tex="V(\phi) \approx -\frac{1}{2}\mu^2 \phi^2 + \frac{\lambda}{4!} \phi^4" />
              <p className="paper-highlight">
                Hollow Purple propagates as a traveling pocket of <strong>vacuum instability</strong>. Matter intersecting its boundary has its metric anchoring disrupted — atomic nuclei and molecular bonds dissociate as local spacetime coordinates fail to maintain stable field equations.
              </p>
            </SubSection>

            {/* Comparison Table */}
            <div className="paper-table-wrap">
              <h3>Comparative Dynamics of the Limitless Suite</h3>
              <div className="paper-table-scroll">
                <table className="paper-table">
                  <thead>
                    <tr>
                      <th>Technique</th>
                      <th>Energy Polarity</th>
                      <th>Metric Behavior</th>
                      <th>Physical Manifestation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Infinity</strong></td>
                      <td>Baseline Negative</td>
                      <td>Conformal Dilation (Ω → ∞)</td>
                      <td>Asymptotic deceleration</td>
                    </tr>
                    <tr className="paper-table__blue">
                      <td><strong>Blue</strong></td>
                      <td>Amplified Negative</td>
                      <td>Spatial Depression (g_rr &lt; 1)</td>
                      <td>Gravitational collapse</td>
                    </tr>
                    <tr className="paper-table__red">
                      <td><strong>Red</strong></td>
                      <td>Positive (RCT)</td>
                      <td>Spatial Inflation (g_rr &gt; 1)</td>
                      <td>Repulsive shockwave</td>
                    </tr>
                    <tr className="paper-table__purple">
                      <td><strong>Purple</strong></td>
                      <td>Superposition (- ⊕ +)</td>
                      <td>Tachyonic Instability (m² &lt; 0)</td>
                      <td>Vacuum decay / matter erasure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </PaperSection>

          {/* ═══ Section 5: Six Eyes ═══ */}
          <PaperSection id="sec-sixeyes" icon={<Brain size={18} />} number="05" title="Neurological Computation and the Six Eyes Interface">
            <SubSection title="Atomic-Scale Sensory Resolution and Quantum Processing">
              <p>
                The Six Eyes function as a quantum-scale perceptual and processing interface, providing real-time sensory fidelity across the electromagnetic and cursed energy spectra. The primary advantage is near-total elimination of cursed energy expenditure. By Landauer's Principle:
              </p>
              <Math display tex="W = k_B T \ln 2" />
              <p>
                Gojo manipulates cursed energy where energy dissipated per cycle approaches zero (<Math tex="\lim \Delta E \to 0" />). The energy expended is lower than the biological regeneration rate, ensuring the sorcerer <strong>cannot exhaust his cursed energy</strong> under standard combat conditions.
              </p>
            </SubSection>

            <SubSection title="Subconscious Automation and Algorithmic Threat Filtering">
              <SixEyesPipeline />
              <p>
                The Six Eyes continuously scan environmental vectors, processing their characteristics through a multi-stage deterministic sorting process. Non-hazardous vectors — atmospheric oxygen, safe acoustic frequencies, ambient light — are permitted to cross the boundary. Dangerous vectors immediately activate localized metric expansion.
              </p>
              <p>
                This encounters a major bottleneck with <strong>chemical toxins</strong>: distinguishing a harmless water droplet from one containing dissolved potassium cyanide requires real-time molecular-level classification.
              </p>
            </SubSection>

            <SubSection title="Homeostasis and Neural Regeneration">
              <p>
                Sustained computation generates oxidative stress and synaptic degradation. Gojo utilizes a continuous neural maintenance loop: positive cursed energy via RCT is circulated through the prefrontal cortex 24/7, repairing micro-cellular damage and removing neurotoxic metabolic byproducts.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 6: Domain Expansion ═══ */}
          <PaperSection id="sec-domain" icon={<Target size={18} />} number="06" title="Domain Expansion: Unlimited Void and Information Theory">
            <SubSection title="Epistemic Saturation and Cognitive Recursion">
              <p>
                Inside Unlimited Void (<em>Muryōkūsho</em>), the target's brain is forced to process an infinite series of analytical subdivisions for every perceptual impulse:
              </p>
              <Math display tex="\text{Perception} \to \text{Analysis} \to \text{Communication} \to \text{Perception} \to \dots" />
              <p>
                Every cognitive operation is trapped behind an infinite number of analytical prerequisites. The target is paralyzed not by darkness, but by <strong>overwhelming informational saturation</strong>.
              </p>
            </SubSection>

            <SubSection title="The 0.2-Second Phenomenon: Quantitative Information Overload">
              <p>
                During the Shibuya Incident, Gojo deployed Unlimited Void for precisely <Math tex="t = 0.20\text{ s}" />. Each civilian brain was flooded with approximately six months of raw cognitive information:
              </p>
              <Math display tex="\text{Compression Factor} = \frac{t_{\text{equiv}}}{t_{\text{domain}}} = \frac{1.555 \times 10^7\text{ s}}{0.20\text{ s}} \approx 7.776 \times 10^7" />
              <p>
                At a perceptual bandwidth of <Math tex="C_{\text{human}} \approx 10^7 \text{ bits/s}" />, the informational influx:
              </p>
              <Math display tex="\Phi_{\text{data}} = C_{\text{human}} \times 7.776 \times 10^7 \approx 7.776 \times 10^{14} \text{ bits/s}" />
              <p className="paper-highlight">
                Non-sorcerers entered immediate catatonic stupor, requiring approximately two months of rehabilitation. Special-grade cursed spirits were immobilized for several minutes.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 7: Vulnerabilities ═══ */}
          <PaperSection id="sec-vulnerability" icon={<Shield size={18} />} number="07" title="Structural Vulnerabilities and Topological Rupture">
            <p>Despite its formidable capability, the neutral Limitless is governed by specific constraints:</p>
            <ul className="paper-list">
              <li><strong>Domain Expansion:</strong> A foreign domain's sure-hit function bypasses the spatial metric entirely, manifesting attacks directly upon physical coordinates.</li>
              <li><strong>Domain Amplification:</strong> Wraps the attacker in neutral domain energy that absorbs and neutralizes the Limitless upon contact.</li>
              <li><strong>Cursed Tools:</strong> The Inverted Spear of Heaven or Black Rope forcibly reset <Math tex="\Omega(x) \to 1" />.</li>
              <li><strong>Neurological Trauma:</strong> Deliberate destruction of the prefrontal cortex degrades computational bandwidth.</li>
            </ul>

            <SubSection title="Topological Discontinuity: Sukuna's World Cutting Slash">
              <p>
                Standard attacks operate within coordinate space traversing the distorted metric:
              </p>
              <Math display tex="ds^2 = \Omega^2(x) \, dx^2" />
              <p>
                Sukuna, using Mahoraga's adaptation data, expanded targeting parameters to encompass the <strong>spatial manifold itself</strong>. The slash applied a bisection operation directly across the manifold:
              </p>
              <Math display tex="\mathcal{M}_{\text{severed}} = \mathcal{M} \setminus \Sigma" />
              <p>
                where <Math tex="\Sigma" /> is a two-dimensional hypersurface of discontinuity. By severing the continuum's topology, the slash bypassed infinite proper distance entirely — it <strong>cut the very fabric of space</strong> holding that distance.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 8: Conclusion ═══ */}
          <PaperSection id="sec-conclusion" icon={<Crosshair size={18} />} number="08" title="Conclusion">
            <p>
              Satoru Gojo's Limitless technique represents an internally coherent system of applied non-Euclidean geometry and quantum computation. The neutral Infinity cannot be explained through classical Zeno paradoxes alone — real analysis and Lebesgue measure theory demonstrate that discrete divisions of flat Euclidean space possess zero measure and converge in finite time.
            </p>
            <p>
              Instead, the technique functions through continuous Riemannian geometry, using cursed energy to deform the metric tensor and project infinite proper distance into finite coordinate volumes. By manipulating the polarity and topology of this metric, the sorcerer produces centripetal spatial collapse (Blue), centrifugal metric inflation (Red), and tachyonic vacuum instability (Purple).
            </p>
            <p>
              This demanding spatial framework is made computationally viable by the quantum perceptual apparatus of the Six Eyes, automated algorithmic filtering, and real-time neural regeneration via Reverse Cursed Technique.
            </p>
            <p className="paper-final">
              Ultimately, the technique's absolute defense remains bound to the topological continuity of the space it manipulates. While the Limitless renders its user immune to any vector traversing the spatial metric, it remains vulnerable to higher-order <strong>topological severance</strong> that targets and cleaves the underlying continuum itself.
            </p>
          </PaperSection>

          {/* ── Footer ── */}
          <div className="paper-footer">
            <div className="paper-footer__tags">
              <Tag size={14} />
              {["Riemannian geometry", "Jujutsu Kaisen", "mathematical physics", "metric tensor", "quantum computation", "topology"].map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p>This paper is part of Om's research archive. For collaboration inquiries, <Link href="/contact">get in touch</Link>.</p>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
