/**
 * BlogPost — Single blog entry full page. Warm cream paper, readable type, no frills.
 */
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findBlogEntry, publishedBlogEntries } from "@/lib/content";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const entry = findBlogEntry(slug);

  if (!entry) return <NotFound />;

  const otherEntries = publishedBlogEntries.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <SiteShell pageTheme="blog">
      <article className="blog-post">
        <div className="blog-post__back">
          <Link className="text-arrow-link" href="/blog">
            <ArrowLeft size={15} /> back to the open tab
          </Link>
        </div>

        <header className="blog-post__header">
          <div className="blog-post__meta">
            <time className="blog-post__date">
              {new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span className={`blog-post__mood`}>{entry.mood}</span>
          </div>
          <h1>{entry.title}</h1>
          <p className="blog-post__excerpt">{entry.excerpt}</p>
          <div className="blog-post__tags">
            {entry.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-post__divider" aria-hidden="true">
          <span>✳</span>
        </div>

        <div className="blog-post__body">
          {entry.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
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
                  <time>{new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</time>
                  <h3>{e.title}</h3>
                  <p>{e.excerpt}</p>
                  <span>read <ArrowUpRight size={13} /></span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </SiteShell>
  );
}
