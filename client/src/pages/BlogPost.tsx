import { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Clock, FileText, Share2, Sparkles } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import ShareBlogModal from "@/components/ShareBlogModal";
import { findBlogEntry, publishedBlogEntries } from "@/lib/content";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const entry = findBlogEntry(slug);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!entry) return <NotFound />;

  const otherEntries = publishedBlogEntries.filter((e) => e.slug !== slug).slice(0, 2);

  // Compute Word Count & Reading Time
  const fullText = [...entry.body, entry.excerpt].join(" ");
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <SiteShell pageTheme="blog">
      {/* 1. STICKY READING PROGRESS BAR AT TOP */}
      <div
        className="reading-progress-bar"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      <article className="blog-post">
        <div className="blog-post__back">
          <Link className="text-arrow-link" href="/blog">
            <ArrowLeft size={15} /> back to the open tab
          </Link>
        </div>

        <header className="blog-post__header">
          <div className="blog-post__meta">
            <time className="blog-post__date">
              {new Date(entry.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="blog-post__mood">{entry.mood}</span>
          </div>

          <h1>{entry.title}</h1>
          <p className="blog-post__excerpt">{entry.excerpt}</p>

          {/* 1. ENHANCED READING STATS & SHARE BUTTON BAR */}
          <div className="blog-post__reading-stats">
            <span className="reading-stat-pill">
              <Clock size={13} /> {readTime} min read
            </span>
            <span className="reading-stat-pill">
              <FileText size={13} /> {wordCount} words
            </span>
            <button
              type="button"
              className="reading-stat-pill reading-share-btn"
              onClick={() => setIsShareModalOpen(true)}
              title="Share this blog post"
            >
              <Share2 size={13} />
              <span>Share Blog</span>
            </button>
          </div>

          <div className="blog-post__tags">
            {entry.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-post__divider" aria-hidden="true">
          <span>✳</span>
        </div>

        {/* 2. EDITORIAL NOTEBOOK BODY WITH DROP-CAP & RISOGRAPH MARGIN */}
        <div className="blog-post__body-wrapper">
          <div className="blog-post__margin-line" aria-hidden="true">
            <span className="margin-stamp">✳ Om's Desk Note</span>
          </div>

          <div className="blog-post__body">
            {entry.body.map((para, i) => (
              <p key={i} className={i === 0 ? "has-drop-cap" : ""}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <footer className="blog-post__footer">
          <div className="blog-post__footer-sig">
            <Sparkles size={14} />
            <span>Om Nandurkar · Creator Studio</span>
          </div>
          <Link className="text-arrow-link" href="/blog">
            read more entries <ArrowUpRight size={15} />
          </Link>
        </footer>

        {otherEntries.length > 0 && (
          <section className="blog-post__more">
            <p className="section-kicker">more from the open tab</p>
            <div className="blog-post__more-entries">
              {otherEntries.map((e) => (
                <Link className="blog-post__more-card" href={`/blog/${e.slug}`} key={e.id}>
                  <time>
                    {new Date(e.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                  <h3>{e.title}</h3>
                  <p>{e.excerpt}</p>
                  <span>
                    read <ArrowUpRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {isShareModalOpen && (
        <ShareBlogModal entry={entry} onClose={() => setIsShareModalOpen(false)} />
      )}
    </SiteShell>
  );
}
