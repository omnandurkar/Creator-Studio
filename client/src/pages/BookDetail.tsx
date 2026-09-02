import { ArrowLeft, BookOpen, CloudLightning, Wind, Activity } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findBook } from "@/lib/content";
import NotFound from "./NotFound";
import { useEffect } from "react";
import "../books.css";

export default function BookDetail() {
  const { slug } = useParams();
  const book = findBook(slug ?? "");

  useEffect(() => {
    // Setup intersection observer for scroll-fade elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    // Give it a small timeout to ensure DOM is ready
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-fade');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [slug]);

  if (!book) return <NotFound />;

  const isBook1 = book.slug === "before-i-could-say-i-loved-you";

  return (
    <SiteShell pageTheme={isBook1 ? "book-deep-night" : "writings"}>
      {isBook1 && (
        <>
          <div className="book-deep-night-bg"></div>
          <div className="weather-overlay"></div>
          <div className="rain-animation"></div>
        </>
      )}

      <div className={`cinematic-container ${!isBook1 ? "themed-light" : ""}`}>
        <Link href="/library" className="back-link">
          <ArrowLeft size={16} /> return to library
        </Link>

        <header className="cinematic-header">
          <p>{book.category} • {new Date(book.date).getFullYear()}</p>
          <h1>{book.title}</h1>
        </header>

        <main>
          <div className="glass-panel delay-1">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
              <BookOpen size={28} /> The Story
            </h2>
            <p className="synopsis-text">{book.excerpt}</p>
            
            {isBook1 && (
              <div className="story-quote">
                "And as he reached her, standing in the rain with the white scarf in his hand, Rahul knew that whatever happened next would change everything."
              </div>
            )}
            
            {book.pdfUrl && (
              <div className="action-wrapper">
                <a 
                  href={book.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glowing-btn"
                >
                  Enter the Story
                </a>
              </div>
            )}
          </div>
          
          {isBook1 && (
            <>
              {/* Motifs Grid */}
              <div className="motif-grid" style={{ marginBottom: '6rem' }}>
                <div className="motif-card glass-panel delay-2" style={{ marginBottom: 0 }}>
                  <CloudLightning size={40} />
                  <h3>The Storm</h3>
                  <p>A chaotic tempest outside mirroring the emotional turbulence within.</p>
                </div>
                <div className="motif-card glass-panel delay-2" style={{ animationDelay: '0.8s', marginBottom: 0 }}>
                  <Wind size={40} />
                  <h3>The White Scarf</h3>
                  <p>A fleeting connection, a fragile symbol of hope amidst the downpour.</p>
                </div>
                <div className="motif-card glass-panel delay-2" style={{ animationDelay: '1s', marginBottom: 0 }}>
                  <Activity size={40} />
                  <h3>The Accident</h3>
                  <p>How quickly a perfect day shatters into fragments of memory.</p>
                </div>
              </div>

              {/* Character Profiles */}
              <section className="scroll-fade">
                <h2 className="section-title">The Protagonists</h2>
                <div className="profiles-grid">
                  <div className="profile-card rahul-card">
                    <h3>Rahul</h3>
                    <p>Quiet, introspective, preferring the company of history and books. He carried a subtle confidence hidden beneath a mask of indifference, searching for something real in a noisy world.</p>
                  </div>
                  <div className="profile-card naina-card">
                    <h3>Naina</h3>
                    <p>Vibrant, magnetic, and effortlessly charming. A bright light that could illuminate any room she walked into, pulling others into her orbit with her genuine warmth.</p>
                  </div>
                </div>
              </section>

              {/* Timeline */}
              <section className="scroll-fade" style={{ transitionDelay: '0.2s' }}>
                <h2 className="section-title">Timeline of a Night</h2>
                <div className="timeline-container">
                  <div className="timeline-line"></div>
                  <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>The Encounter</h3>
                      <p>A white scarf dancing in the violent currents of a storm, a desperate plea for help.</p>
                    </div>
                  </div>
                  <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>The Rain</h3>
                      <p>A quiet respite under a streetlamp. Two strangers finding an unexpected, comforting connection.</p>
                    </div>
                  </div>
                  <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>The Accident</h3>
                      <p>A sudden roar of an engine. A perfect day shattered into fragments of memory.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fading Memory Fragments */}
              <section className="memory-fragments">
                <div className="memory-fragment scroll-fade">
                  <p>"And yet, in the midst of it all, something shifted in Rahul... a rare, genuine smile."</p>
                </div>
                <div className="memory-fragment scroll-fade" style={{ transitionDelay: '0.2s' }}>
                  <p>"He didn't want anyone to notice it—especially not a ladies' scarf. It was a reminder of something personal..."</p>
                </div>
                <div className="memory-fragment scroll-fade" style={{ transitionDelay: '0.4s' }}>
                  <p>"She was out of danger, but memory loss is common. It's possible she may not remember..."</p>
                </div>
              </section>

              {/* Author's Note */}
              <section className="authors-note scroll-fade">
                <div className="note-card">
                  <h3>A Note from Om M Nandurkar</h3>
                  <p>"Love is not always about grand gestures or perfect moments. It’s about being present in the imperfections, finding beauty in the flaws, and choosing to stay even when it’s easier to walk away. This story is for anyone who has ever hesitated, doubted, or feared love, yet found the courage to embrace it anyway."</p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </SiteShell>
  );
}
