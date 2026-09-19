import { ArrowDown, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { publishedBooks, type Book } from "@/lib/content";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function BookCard({ entry, index }: { entry: Book; index: number }) {
  const isAvailable = entry.status === "Available";

  return (
    <Link
      className={`writing-card ${isAvailable ? "writing-card--blue" : "writing-card--sage"} ${entry.coverImage ? "writing-card--has-cover" : ""}`}
      href={isAvailable ? `/books/${entry.slug}` : "#"}
      style={{ opacity: isAvailable ? 1 : 0.7, pointerEvents: isAvailable ? 'auto' : 'none' }}
    >
      <div className="writing-card__tape" aria-hidden="true" />
      <div className="writing-card__meta">
        <span>{entry.category}</span>
        <span>{isAvailable ? formatDate(entry.date) : "Coming Soon"}</span>
      </div>

      {entry.coverImage ? (
        <div className="book-card__content-with-cover">
          <div className="book-card__cover-thumb">
            <img src={entry.coverImage} alt={`${entry.title} cover`} />
            <div className="book-card__cover-spine" />
          </div>
          <div className="book-card__text-details">
            <h2>{entry.title}</h2>
            <p>{entry.excerpt}</p>
          </div>
        </div>
      ) : (
        <>
          <h2>{entry.title}</h2>
          <p>{entry.excerpt}</p>
        </>
      )}

      <div className="writing-card__footer">
        <span>{entry.tags.length > 0 ? entry.tags.slice(0, 2).join(" / ") : "Pending"}</span>
        {isAvailable && <ArrowUpRight size={17} />}
      </div>
      <span aria-hidden="true" className="writing-card__pageno">0{index + 1}</span>
    </Link>
  );
}

export default function Books() {
  return (
    <SiteShell pageTheme="books">
      <section className="writings-hero">
        <div className="writings-hero__ruled-lines" aria-hidden="true" />
        <div className="writings-hero__copy">
          <p className="writings-hero__kicker"><BookOpen size={14} /> story room / vol. 01</p>
          <h1>For stories<br />that linger<br /><em>in the mind.</em></h1>
          <p>A collection of books, intertwined tales of love, loss, and the silent spaces in between.</p>
          <a className="writings-hero__jump" href="#book-shelf"><ArrowDown size={17} /> browse stories</a>
        </div>

        <div className="writings-hero__book" aria-label="Illustrated open journal and bookmark">
          <div className="hero-book__shadow" />
          <div className="hero-book__page hero-book__page--left"><span>01</span><i /><i /><i /><i /><i /></div>
          <div className="hero-book__page hero-book__page--right"><span>Read the Fiction<br />that stays with you</span><i /><i /><i /></div>
        </div>
        <p className="writings-hero__margin-note">you can<br />always re-write.</p>
      </section>

      <section className="writing-archive" id="book-shelf" aria-labelledby="book-archive-title">
        <div className="writing-archive__heading">
          <div><p className="section-kicker"><BookOpen size={14} /> the library</p><h2 id="book-archive-title">Read the<br /><em>tales.</em></h2></div>
          <p>Delve into interconnected stories that explore the depths of human emotions.</p>
        </div>

        <div className="writing-card-grid">
          {publishedBooks.map((entry, index) => <BookCard entry={entry} index={index} key={entry.id} />)}
        </div>
      </section>
    </SiteShell>
  );
}
