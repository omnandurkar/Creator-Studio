import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, FlaskConical, Tag, Users } from "lucide-react";
import { Link, useParams } from "wouter";
import SiteShell from "@/components/SiteShell";
import { findResearch } from "@/lib/content";
import NotFound from "./NotFound";
import "../books.css";

export default function ResearchDetail() {
  const { slug } = useParams();
  const paper = findResearch(slug ?? "");

  if (!paper) return <NotFound />;

  const formattedDate = new Intl.DateTimeFormat("en", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${paper.date}T12:00:00`));

  return (
    <SiteShell pageTheme="library">
      <div className="research-detail">
        <div className="research-detail__bg" aria-hidden="true" />
        <div className="research-detail__container">
          <Link href="/library" className="research-detail__back">
            <ArrowLeft size={16} /> return to library
          </Link>

          <header className="research-detail__header">
            <div className="research-detail__field-pill">
              <FlaskConical size={14} />
              {paper.field}
            </div>
            {paper.conference && (
              <p className="research-detail__conference">{paper.conference}</p>
            )}
            <h1>{paper.title}</h1>
            <div className="research-detail__meta-row">
              <span><Users size={14} /> {paper.authors.join(", ")}</span>
              <span><Calendar size={14} /> {formattedDate}</span>
            </div>
          </header>

          <div className="research-detail__panel glass-panel delay-1">
            <h2>
              <BookOpen size={24} /> Abstract
            </h2>
            <p className="research-detail__abstract-text">{paper.abstract}</p>
          </div>

          <div className="research-detail__tags-panel glass-panel delay-2">
            <h3><Tag size={18} /> Keywords</h3>
            <div className="research-detail__tag-list">
              {paper.tags.map((tag) => (
                <span key={tag} className="research-detail__tag">{tag}</span>
              ))}
            </div>
          </div>

          {(paper.pdfUrl || paper.externalUrl) && (
            <div className="research-detail__actions">
              {paper.pdfUrl && (
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glowing-btn"
                >
                  Read the Paper
                </a>
              )}
              {paper.externalUrl && (
                <a
                  href={paper.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-detail__ext-link"
                >
                  View on publisher <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          )}

          <div className="research-detail__footer-note">
            <p>This paper is part of Om's ongoing research archive. For collaboration inquiries or questions, <Link href="/contact">get in touch</Link>.</p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
