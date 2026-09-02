import { ArrowLeft, BookOpen, Calendar, Crosshair, Eye, EyeOff, Shield, ShieldAlert, Sparkles, Tag, Target, Users, Zap, Wind, Swords, ShieldOff } from "lucide-react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import Math from "@/components/Math";
import "../../books.css";
import "../../research-paper.css";

/* ═══════════════════════════════════════════════════════════
   SVG Diagrams — Vector illustrations for Toji's Mechanics
   ═══════════════════════════════════════════════════════════ */

function BarrierInvarianceDiagram() {
  return (
    <svg className="paper-diagram paper-diagram--wide" viewBox="0 0 720 180" fill="none" aria-label="Barrier topology pass-through protocol">
      {/* Domain Wall */}
      <line x1="360" y1="15" x2="360" y2="165" stroke="#8b2020" strokeWidth="3" strokeDasharray="6 4" />
      <text x="360" y="12" textAnchor="middle" className="diagram-label" fill="#8b2020">Domain Barrier Surface (M_domain)</text>

      {/* Sorcerer Track */}
      <g>
        <circle cx="90" cy="55" r="18" fill="#3a4a8f" opacity="0.15" stroke="#3a4a8f" strokeWidth="1.5" />
        <text x="90" y="60" textAnchor="middle" className="diagram-label" fill="#3a4a8f">Sorcerer</text>
        <text x="90" y="85" textAnchor="middle" className="diagram-small" fill="#3a4a8f">E_cursed &gt; 0</text>
        <path d="M 125 55 L 340 55" stroke="#3a4a8f" strokeWidth="2" markerEnd="url(#arrow)" />
        <circle cx="340" cy="55" r="5" fill="#8b2020" />
        <text x="230" y="47" textAnchor="middle" className="diagram-small" fill="#8b2020">Target Locked / Trapped</text>
      </g>

      {/* Toji Track */}
      <g>
        <circle cx="90" cy="135" r="18" fill="#1b3829" opacity="0.15" stroke="#1b3829" strokeWidth="1.5" />
        <text x="90" y="140" textAnchor="middle" className="diagram-label" fill="#1b3829">Toji Fushiguro</text>
        <text x="90" y="165" textAnchor="middle" className="diagram-accent" fill="#1b3829">E_cursed ≡ 0</text>
        <path d="M 125 135 L 610 135" stroke="#245a45" strokeWidth="2" strokeDasharray="4 2" />
        <text x="230" y="127" textAnchor="middle" className="diagram-small" fill="#245a45">Evaluated as Inanimate Matter (Building/Air)</text>
        <circle cx="360" cy="135" r="6" fill="#245a45" opacity="0.4" />
        <text x="490" y="127" textAnchor="middle" className="diagram-label" fill="#245a45">Clean Pass-Through (Immune to Sure-Hit)</text>
        <circle cx="610" cy="135" r="18" fill="#245a45" opacity="0.2" stroke="#245a45" strokeWidth="1.5" />
        <text x="610" y="140" textAnchor="middle" className="diagram-small" fill="#245a45">Unrestricted</text>
      </g>
    </svg>
  );
}

function NavierStokesFluidDiagram() {
  return (
    <svg className="paper-diagram" viewBox="0 0 620 180" fill="none" aria-label="Navier Stokes fluid dynamics sensory tracking">
      {/* Invisible Curse */}
      <rect x="30" y="40" width="130" height="100" rx="10" fill="#6b21a8" opacity="0.1" stroke="#6b21a8" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="95" y="75" textAnchor="middle" className="diagram-label" fill="#6b21a8">Invisible Curse</text>
      <text x="95" y="95" textAnchor="middle" className="diagram-small" fill="#6b21a8">Optical Stealth</text>
      <text x="95" y="115" textAnchor="middle" className="diagram-small" fill="#6b21a8">Displaces Air Volume</text>

      {/* Navier Stokes Flow Lines */}
      <path d="M 170 50 Q 240 30 320 50 T 450 50" stroke="#3a4a8f" strokeWidth="1.5" opacity="0.6" fill="none" />
      <path d="M 170 90 Q 250 110 320 90 T 450 90" stroke="#ff6e6c" strokeWidth="1.5" opacity="0.6" fill="none" />
      <path d="M 170 130 Q 230 150 320 130 T 450 130" stroke="#3a4a8f" strokeWidth="1.5" opacity="0.6" fill="none" />

      {/* Pressure & Vortices Labels */}
      <text x="290" y="40" textAnchor="middle" className="diagram-accent" fill="#3a4a8f">∇p (Barometric Shift)</text>
      <text x="290" y="160" textAnchor="middle" className="diagram-accent" fill="#ff6e6c">∇ × v (Micro-vortices)</text>

      {/* Toji Sensory Reception */}
      <rect x="470" y="40" width="120" height="100" rx="10" fill="#1b3829" opacity="0.15" stroke="#1b3829" strokeWidth="1.5" />
      <text x="530" y="75" textAnchor="middle" className="diagram-label" fill="#1b3829">Toji Sensory</text>
      <text x="530" y="93" textAnchor="middle" className="diagram-small" fill="#1b3829">Epidermal Receptors</text>
      <text x="530" y="110" textAnchor="middle" className="diagram-small" fill="#1b3829">Sub-5ms Reflex</text>
      <text x="530" y="125" textAnchor="middle" className="diagram-accent" fill="#1b3829">Microsecond Precision</text>
    </svg>
  );
}

function TacticalDoctrinePipeline() {
  return (
    <svg className="paper-diagram" viewBox="0 0 620 120" fill="none" aria-label="Tactical doctrine four phase pipeline">
      {[
        { x: 10, w: 130, label: "1. Attrition", sub: "Bounties & proxy\nCognitive exhaustion", color: "#8b2020" },
        { x: 160, w: 130, label: "2. Masking", sub: "Fly Head swarms\nSensory saturation", color: "#8b5e3c" },
        { x: 310, w: 130, label: "3. Ambush", sub: "Zero-CE stealth\nBlind spot strike", color: "#3a4a8f" },
        { x: 460, w: 150, label: "4. Disruption", sub: "Inverted Spear contact\nNullify technique", color: "#6b21a8" },
      ].map((step, i) => (
        <g key={i}>
          <rect x={step.x} y="15" width={step.w} height="90" rx="6" fill={step.color} opacity="0.1" stroke={step.color} strokeWidth="1.5" />
          <text x={step.x + step.w/2} y="42" textAnchor="middle" className="diagram-label" fill={step.color}>{step.label}</text>
          {step.sub.split("\n").map((line, j) => (
            <text key={j} x={step.x + step.w/2} y={60 + j*14} textAnchor="middle" className="diagram-small" fill={step.color}>{line}</text>
          ))}
          {i < 3 && <text x={step.x + step.w + 6} y="65" fontSize="16" fill="#3a4a8f">→</text>}
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
   Main Component
   ═══════════════════════════════════════════════════════════ */

export default function TojiHeavenlyRestrictionResearch() {
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
              <Sparkles size={14} /> Biomechanical Metaphysics
            </div>
            <p className="research-paper__conf">Independent Research • 2026</p>
            <h1>
              The Biomechanical Architecture and Metaphysical Invariance of <span className="toji-name-highlight">Toji Fushiguro’s</span> Heavenly Restriction
            </h1>
            <div className="research-detail__meta-row">
              <span><Users size={14} /> Om M Nandurkar</span>
              <span><Calendar size={14} /> 02 September 2026</span>
            </div>
          </header>

          {/* ── Abstract ── */}
          <div className="paper-abstract">
            <h2><BookOpen size={20} /> Abstract</h2>
            <p>
              The existential outlier designated as Toji Fushiguro (born Toji Zen'in) represents the absolute antithesis of standard cursed-energy metaphysics within jujutsu society. While traditional jujutsu power scaling relies on the accumulation, manipulation, and output of negative cursed energy (<Math tex="\mathcal{E}_{\text{cursed}} > 0" />), Fushiguro operates under a rare manifestation of Heavenly Restriction (<em>Ten'yo Jubaku</em>) characterized by the complete elimination of cursed energy to an absolute zero state (<Math tex="\mathcal{E}_{\text{cursed}} \equiv 0" />).
            </p>
            <p>
              This investigation models the biomechanical, thermodynamic, and metaphysical systems that govern Fushiguro’s combat efficacy. Through classical continuum mechanics and sensory bio-physics, we demonstrate how his complete lack of cursed energy is compensated for by hyper-evolved somatic senses capable of tracking curses via microscopic fluid-dynamic disruptions, atmospheric pressure gradients, and thermal variations.
            </p>
            <p>
              Furthermore, we evaluate the topological invariance that renders his physiology completely invisible to standard jujutsu barrier mathematics and domain sure-hit (<em>kanarazu ataru</em>) targeting algorithms. Finally, this paper analyzes the weaponized synergy between his neuromuscular output and specialized grade-tier cursed tools—specifically the Inverted Spear of Heaven and the Split Soul Katana—providing a comprehensive framework for how a non-sorcerer systematically dismantled the modern era’s apex sorcerers.
            </p>
          </div>

          {/* ── Table of Contents ── */}
          <nav className="paper-toc">
            <h3>Contents</h3>
            <ol>
              <li><a href="#sec-intro">Introduction: Metaphysical Vacuum of Heavenly Restriction</a></li>
              <li><a href="#sec-decoupling">Metaphysical Decoupling: The Zero-Cursed-Energy State</a></li>
              <li><a href="#sec-barrier">Barrier Topology and Metaphysical Stealth</a></li>
              <li><a href="#sec-biomechanics">Sensorimotor Biomechanics &amp; Navier-Stokes Sensing</a></li>
              <li><a href="#sec-weapons">Weaponized Equipment Synergy &amp; Cursed Tool Mechanics</a></li>
              <li><a href="#sec-tactical">Tactical Doctrine and Asymmetric Attrition</a></li>
              <li><a href="#sec-conclusion">Conclusion: The Evolutionary Parity of Physical Transcendence</a></li>
            </ol>
          </nav>

          {/* ═══ Section 1: Introduction ═══ */}
          <PaperSection id="sec-intro" icon={<BookOpen size={18} />} number="01" title="Introduction: The Metaphysical Vacuum of Heavenly Restriction">
            <p>
              In the conventional taxonomy of jujutsu metaphysics, human consciousness naturally produces negative emotional runoff that manifests as cursed energy. Non-sorcerers emit this energy diffusely into their surroundings, giving rise to cursed spirits, whereas trained jujutsu sorcerers manipulate, condense, and circulate cursed energy within their internal pathways to reinforce physical tissue and activate hereditary cursed techniques.
            </p>
            <p>
              Heavenly Restrictions represent innate binding vows imposed upon an individual at birth by natural metaphysical laws, establishing non-negotiable structural trade-offs between physical capability and cursed energy capacity. These conditions generally manifest along two symmetrical archetypes:
            </p>
            <div className="paper-callout paper-callout--blue">
              <strong>Severe Somatic Attenuation (e.g. Kokichi Muta):</strong> Severe physical fragility, chronic systemic pain, and missing limbs balanced by expansive, nationwide cursed energy reserves and remote projection bandwidth.
            </div>
            <div className="paper-callout paper-callout--red">
              <strong>Physical Optimization Archetype (e.g. Toji Fushiguro):</strong> Complete elimination of cursed energy reserves down to absolute zero in exchange for extreme neuromuscular resilience, sensory transcendence, and immunity to domain targeting.
            </div>
            <p>
              Within the Zen'in clan’s conservative hierarchy—which equates social status strictly to cursed technique utility—Fushiguro was regarded as a defective failure. However, prior instances of physically gifted Heavenly Restrictions merely depressed cursed energy to baseline civilian levels. Fushiguro represents a singular historical singularity: the <strong>complete and unconditional eradication of all cursed energy</strong> from the human organism.
            </p>

            {/* Spectrum Table */}
            <div className="paper-table-wrap">
              <h3>Thermodynamic Spectrum of Cursed Energy Distribution</h3>
              <div className="paper-table-scroll">
                <table className="paper-table">
                  <thead>
                    <tr>
                      <th>Classification</th>
                      <th>Cursed Energy State (E_cursed)</th>
                      <th>Baseline Emission Dynamics</th>
                      <th>Technique &amp; Physical Interaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Jujutsu Sorcerers</strong></td>
                      <td><Math tex="\mathcal{E}_{\text{cursed}} \gg 0" /></td>
                      <td>Controlled, channeled internal flow</td>
                      <td>Innate techniques; deliberate kinetic reinforcement.</td>
                    </tr>
                    <tr className="paper-table__blue">
                      <td><strong>Non-Sorcerers (Civilians)</strong></td>
                      <td><Math tex="\mathcal{E}_{\text{cursed}} = \epsilon > 0" /></td>
                      <td>Continuous passive atmospheric leakage</td>
                      <td>Uncontrolled runoff generating cursed spirits.</td>
                    </tr>
                    <tr className="paper-table__red">
                      <td><strong>Incomplete Restriction</strong></td>
                      <td><Math tex="\mathcal{E}_{\text{cursed}} \approx 0" stroke-width="1.5" /></td>
                      <td>Trace retention below civilian levels</td>
                      <td>Partial physical amplification; requires sensory aids.</td>
                    </tr>
                    <tr className="paper-table__purple">
                      <td><strong>Absolute Zero Restriction</strong></td>
                      <td><Math tex="\mathcal{E}_{\text{cursed}} \equiv 0" /></td>
                      <td>Zero emission; absolute thermodynamic null</td>
                      <td>Complete physical transcendence; metaphysical invisibility.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </PaperSection>

          {/* ═══ Section 2: Decoupling ═══ */}
          <PaperSection id="sec-decoupling" icon={<ShieldOff size={18} />} number="02" title="Metaphysical Decoupling: The Zero-Cursed-Energy State">
            <SubSection title="The Absolute Null Energy Condition">
              <p>
                The distinction between an extremely low cursed energy reserve (<Math tex="\mathcal{E} \to 0" />) and an absolute null state (<Math tex="\mathcal{E} \equiv 0" />) is categorical rather than scalar. In ordinary humans, trace reserves (<Math tex="\epsilon > 0" stroke-width="1.5" />) anchor the individual to the global jujutsu framework, permitting them to be identified by barrier detection arrays and caught within domain constructs.
              </p>
              <p>Fushiguro’s thermodynamic state regarding cursed energy is formalized as:</p>
              <Math display tex="\mathcal{E}_{\text{cursed}} = 0 \; \text{J}, \quad \nabla \mathcal{E}_{\text{cursed}} = \vec{0}, \quad \oint_{\partial \mathcal{V}} \vec{J}_{\text{CE}} \cdot d\vec{A} = 0" />
              <p>
                where <Math tex="\vec{J}_{\text{CE}}" /> represents cursed energy flux density across closed physiological surface <Math tex="\partial \mathcal{V}" />. Because no cursed energy leaves or enters his biological boundaries, Fushiguro generates <strong>zero cursed energy residuals</strong> (<em>zanshin</em>).
              </p>
            </SubSection>

            <SubSection title="Six Eyes Perceptual Blindspots and Environmental Occlusion">
              <p>
                During his 2006 targeted assassination of Satoru Gojo, Fushiguro exploited this energetic null. Even Gojo's Six Eyes (<em>Rikugan</em>)—capable of processing cursed energy signatures down to quantum thresholds—could not track Fushiguro directly. To such perception, Fushiguro appears as an <strong>absolute blackbody void</strong>—a blank silhouette devoid of energetic contrast.
              </p>
              <p>
                Gojo was forced to monitor indirect atmospheric displacements. To counter this, Fushiguro introduced swarms of low-grade cursed spirits (Fly Heads) into the airspace, saturating Gojo’s sensory bandwidth with high-volume noise and allowing Fushiguro to step into blind spots undetected.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 3: Barrier Topology ═══ */}
          <PaperSection id="sec-barrier" icon={<ShieldAlert size={18} />} number="03" title="Barrier Topology and Metaphysical Stealth">
            <p>
              When a sorcerer deploys a domain barrier, the technique constructs a closed coordinate manifold <Math tex="\mathcal{M}_{\text{domain}}" />. The barrier's biological recognition protocols scan for internal cursed energy signatures (<Math tex="\mathcal{E}_{\text{cursed}} > 0" />) to designate living entities for spatial confinement.
            </p>
            <p>
              Fushiguro, presenting a cursed energy density of absolute zero (<Math tex="\rho_{\text{CE}} = 0" />), cannot be recognized by the barrier's identity logic. The construct evaluates his biological mass as equivalent to inanimate matter, such as a boulder or volume of air. Consequently, he can step into or out of enclosed domains without breaching their outer perimeter.
            </p>

            <BarrierInvarianceDiagram />

            <SubSection title="Invariance to Domain Sure-Hit Algorithms">
              <p>
                The ultimate lethality of a Domain Expansion is its environmental sure-hit (<em>kanarazu ataru</em>) effect. The targeting assignment operator of a standard domain sure-hit is defined as:
              </p>
              <Math display tex="\mathcal{T}_{\text{sure-hit}}(\vec{x}) = \int_{\mathcal{V}_{\text{target}}} \delta\left(\rho_{\text{CE}}(\vec{x}) - 0\right) d^3x" />
              <p>
                For any target where <Math tex="\rho_{\text{CE}}(\vec{x}) = 0" />, the function fails to resolve a valid targeting coordinate. An enclosed domain's sure-hit effect cannot track or lock onto a zero-cursed-energy body.
              </p>
              <p className="paper-highlight">
                This structural immunity operates independently of anti-domain defensive techniques like Simple Domain or Hollow Wicker Basket. Fushiguro requires no counter-barrier — his body is <strong>fundamentally non-targetable</strong> by closed-domain coordinate systems.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 4: Biomechanics ═══ */}
          <PaperSection id="sec-biomechanics" icon={<Wind size={18} />} number="04" title="Sensorimotor Biomechanics &amp; Navier-Stokes Sensing">
            <SubSection title="Continuum Mechanics of Atmospheric Displacement">
              <p>
                Cursed spirits displace the surrounding air as they move, generating aerodynamic disturbances, thermal variations, and barometric fluctuations. Fushiguro perceives and tracks curses by treating the surrounding atmosphere as a continuous viscous fluid governed by the Navier-Stokes equations:
              </p>
              <Math display tex="\rho \left( \frac{\partial \vec{v}}{\partial t} + \vec{v} \cdot \nabla \vec{v} \right) = -\nabla p + \mu \nabla^2 \vec{v} + \vec{f}_{\text{curse}}" />
              <p>
                where <Math tex="\rho" /> is air density, <Math tex="\vec{v}" /> is velocity field, <Math tex="p" /> is pressure, <Math tex="\mu" /> is dynamic viscosity, and <Math tex="\vec{f}_{\text{curse}}" /> represents body force exerted by an approaching curse.
              </p>

              <NavierStokesFluidDiagram />

              <p>
                By processing minute pressure gradients <Math tex="\nabla p" /> and micro-vortices <Math tex="\nabla \times \vec{v}" />, Fushiguro reconstructs the exact geometry, mass, velocity, and trajectory of an invisible curse in real time with microsecond precision.
              </p>
            </SubSection>

            <SubSection title="Synaptic Latency and Neuromuscular Acceleration">
              <p>
                Standard human nerve conduction speed tops out at <Math tex="70\text{ to }120\text{ m/s}" />, producing reflex latencies between <Math tex="150\text{ and }300\text{ ms}" />. Fushiguro’s peripheral nervous system exhibits thick myelination sheaths driving conduction velocities well above <Math tex="200\text{ m/s}" />.
              </p>
              <p>
                Sub-millisecond synaptic delay drops his total biological reaction latency below <strong>5 milliseconds</strong>, allowing sprint accelerations exceeding <Math tex="200\text{ km/h}" /> in a fraction of a second.
              </p>
            </SubSection>

            <SubSection title="Musculoskeletal Force Transmission">
              <p>
                Applying the impulse-momentum theorem:
              </p>
              <Math display tex="\vec{J} = \int_{t_1}^{t_2} \vec{F}(t) \, dt = \Delta \vec{p} = m \Delta \vec{v}" />
              <p>
                When wielding Playful Cloud (<em>Yūun</em>), his kinetic energy output:
              </p>
              <Math display tex="E_k = \frac{1}{2} m v_{\text{strike}}^2 + \frac{1}{2} I \omega^2" />
              <p>
                In Shibuya, Fushiguro hit Special Grade curse Dagon with such kinetic violence that the friction sharpened the reinforced steel points of the staff, overpowering a curse with massive energy reserves through purely mechanical force.
              </p>
            </SubSection>
          </PaperSection>

          {/* ═══ Section 5: Weapons ═══ */}
          <PaperSection id="sec-weapons" icon={<Swords size={18} />} number="05" title="Weaponized Equipment Synergy &amp; Cursed Tool Mechanics">
            <SubSection title="Forced Operational Cancellation: Inverted Spear of Heaven">
              <p>
                The Inverted Spear of Heaven (<em>Ame no Sakahoko</em>) is a Special Grade tool that forces the complete nullification of any active cursed technique upon contact:
              </p>
              <Math display tex="\mathcal{O}_{\text{nullify}} \left( \Psi_{\text{CT}} \right) \xrightarrow[\text{contact}]{} 0" />
              <p>
                When contacting Gojo's neutral Limitless barrier, it dispels the cursed energy field sustaining the metric distortion, collapsing the conformal factor back to flat space (<Math tex="\Omega(x) \to 1" />).
              </p>
            </SubSection>

            <SubSection title="Ontological Cleavage: Split Soul Katana">
              <p>
                The Split Soul Katana (<em>Shikon-tō</em>) ignores external physical and energetic armor layers by slicing directly through the outline of the target's soul. While sorcerers protect themselves with dense cursed energy sheaths, this weapon targets the primary ontological blueprint of physical matter, bypassing yield strength entirely:
              </p>
              <Math display tex="\sigma_{\text{applied}} < \sigma_y \implies \text{No Plastic Deformation / Fracture}" />
            </SubSection>

            <SubSection title="Biological Ingestion &amp; Energetic Containment">
              <p>
                To prevent high-grade cursed tools from giving away his position, Fushiguro tamed a low-grade inventory curse and physically swallowed it. Because his body contains zero cursed energy, his outer tissues act as a sealed container that blocks energetic emissions, allowing him to carry a full arsenal with <strong>zero total energetic signature</strong>.
              </p>
            </SubSection>

            {/* Tools Table */}
            <div className="paper-table-wrap">
              <h3>Cursed Tool Armament Suite</h3>
              <div className="paper-table-scroll">
                <table className="paper-table">
                  <thead>
                    <tr>
                      <th>Cursed Tool Designation</th>
                      <th>Grade Classification</th>
                      <th>Functional Mechanism</th>
                      <th>Tactical Combat Objective</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="paper-table__blue">
                      <td><strong>Inverted Spear of Heaven</strong></td>
                      <td>Special Grade</td>
                      <td>Forced operational nullification of active techniques</td>
                      <td>Neutralizing spatial barriers, infinity fields, &amp; defenses.</td>
                    </tr>
                    <tr className="paper-table__purple">
                      <td><strong>Split Soul Katana</strong></td>
                      <td>Special Grade</td>
                      <td>Direct ontological cleavage of soul outline</td>
                      <td>Durability-bypassing strikes against reinforced bodies.</td>
                    </tr>
                    <tr className="paper-table__red">
                      <td><strong>Playful Cloud</strong></td>
                      <td>Special Grade</td>
                      <td>Pure kinetic amplification scaling with raw strength</td>
                      <td>Overpowering cursed entities via direct momentum impact.</td>
                    </tr>
                    <tr>
                      <td><strong>Chain of a Thousand Miles</strong></td>
                      <td>Cursed Tool</td>
                      <td>Infinite length expansion when terminal end is concealed</td>
                      <td>Long-range unpredictable vector attacks &amp; orbital swings.</td>
                    </tr>
                    <tr>
                      <td><strong>Inventory Curse</strong></td>
                      <td>Low-Grade Curse</td>
                      <td>Spatially compressed internal storage in stomach</td>
                      <td>Complete energetic shielding of weapons inside body.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </PaperSection>

          {/* ═══ Section 6: Tactical Doctrine ═══ */}
          <PaperSection id="sec-tactical" icon={<Target size={18} />} number="06" title="Tactical Doctrine and Asymmetric Attrition">

            <TacticalDoctrinePipeline />

            <p>
              Fushiguro’s combat history demonstrates that his greatest asset was his ability to analyze and exploit the fundamental rules of jujutsu combat. His tactical doctrine was executed in four sequential operational phases:
            </p>
            <ol className="paper-list">
              <li><strong>Sensory &amp; Cognitive Attrition:</strong> Deployed third-party bounties to force targets to maintain active techniques for days, exhausting their prefrontal cortices.</li>
              <li><strong>Energetic Masking:</strong> Released Fly Head swarms to saturate cursed energy perception with high-volume noise.</li>
              <li><strong>Kinetic Ambush:</strong> Leveraged zero-energy stealth to strike from absolute blind spots at sub-5ms speeds.</li>
              <li><strong>Forced Disruption:</strong> Applied the Inverted Spear of Heaven at impact, grounding the target's technique at its foundation.</li>
            </ol>

            <p className="paper-highlight">
              During the Star Plasma Vessel mission, Fushiguro placed a open-market bounty on Riko Amanai, forcing Gojo to keep Six Eyes and Infinity active continuously for days. When Gojo finally reached protected grounds and let down his guard, Fushiguro ambushed him in a state of severe neurological exhaustion, bypassing his defenses and inflicting catastrophic injuries.
            </p>
          </PaperSection>

          {/* ═══ Section 7: Conclusion ═══ */}
          <PaperSection id="sec-conclusion" icon={<Crosshair size={18} />} number="07" title="Conclusion: The Evolutionary Parity of Physical Transcendence">
            <p>
              Toji Fushiguro’s existence proves that the complete eradication of cursed energy does not result in a vulnerable human; instead, it establishes an alternative evolutionary branch that stands on equal footing with the pinnacle of jujutsu sorcery.
            </p>
            <p>
              By descending to an absolute zero state (<Math tex="\mathcal{E}_{\text{cursed}} \equiv 0" />), Fushiguro cannot be tracked by cursed energy perception, contained by barrier techniques, or targeted by conventional domain sure-hit mechanisms. Supported by hyper-attuned biological senses that interpret invisible threats through Navier-Stokes fluid dynamics, and wielding weapons capable of grounding cursed energy and severing the soul, Fushiguro operated as the ultimate counter to the sorcerer ecosystem.
            </p>
            <p className="paper-final">
              His legacy proved that physical perfection achieved through complete energetic negation can match and dismantle even the most celebrated hereditary techniques in jujutsu history.
            </p>
          </PaperSection>

          {/* ── Footer ── */}
          <div className="paper-footer">
            <div className="paper-footer__tags">
              <Tag size={14} />
              {["Heavenly Restriction", "Jujutsu Kaisen", "biomechanics", "Navier Stokes", "barrier topology", "cursed tools"].map(t => (
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
