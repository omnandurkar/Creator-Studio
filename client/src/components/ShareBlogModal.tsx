import { useState, useMemo } from "react";
import { Check, Copy, Download, ExternalLink, Instagram, MessageCircle, Quote, Share2, Twitter, X } from "lucide-react";
import { toast } from "sonner";
import { BlogEntry } from "@/lib/content";

interface ShareBlogModalProps {
  entry: BlogEntry;
  onClose: () => void;
}

export default function ShareBlogModal({ entry, onClose }: ShareBlogModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const fullUrl = window.location.href;
  const shareText = `"${entry.title}" — ${entry.excerpt}\n\nRead more by Om Nandurkar on Creator Studio:\n${fullUrl}`;

  // Helper to render high-res Canvas Card Blob
  const generateCardCanvas = useMemo(() => {
    return (): HTMLCanvasElement | null => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 700;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // 1. Cream paper background
      ctx.fillStyle = "#fffaf0";
      ctx.fillRect(0, 0, 1200, 700);

      // 2. Coral drop shadow offset
      ctx.fillStyle = "#ff6e6c";
      ctx.fillRect(50, 50, 1110, 610);

      // 3. Main white notebook card body
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(40, 40, 1110, 610);

      ctx.strokeStyle = "#20252f";
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 1110, 610);

      // 4. Yellow paper tape top
      ctx.fillStyle = "#ffe58c";
      ctx.fillRect(520, 24, 160, 30);
      ctx.strokeStyle = "#20252f";
      ctx.lineWidth = 3;
      ctx.strokeRect(520, 24, 160, 30);

      // 5. Spiral binding rings top
      ctx.fillStyle = "#20252f";
      const spirals = [140, 280, 420, 560, 700, 840, 980];
      spirals.forEach((x) => {
        ctx.fillRect(x, 30, 16, 22);
      });

      // 6. Red margin ruling line
      ctx.strokeStyle = "rgba(255, 110, 108, 0.45)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(110, 40);
      ctx.lineTo(110, 650);
      ctx.stroke();

      // 7. Header Stamp & Mood Tag
      ctx.fillStyle = "#ff6e6c";
      ctx.font = "bold 32px 'Caveat', cursive, Georgia, serif";
      ctx.fillText("✳ Om's Open Tab Journal", 150, 110);

      ctx.fillStyle = "#20252f";
      ctx.font = "bold 18px 'Space Grotesk', sans-serif";
      ctx.fillText(`VIBE: ${entry.mood.toUpperCase()}`, 960, 110);

      // Divider line
      ctx.strokeStyle = "rgba(32, 37, 47, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 140);
      ctx.lineTo(1070, 140);
      ctx.stroke();

      // 8. Blog Title (Auto-Wrapped)
      ctx.fillStyle = "#20252f";
      ctx.font = "bold 48px 'DM Serif Display', Georgia, serif";

      const titleWords = entry.title.split(" ");
      let line = "";
      let y = 225;

      for (let n = 0; n < titleWords.length; n++) {
        const testLine = line + titleWords[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 880 && n > 0) {
          ctx.fillText(line, 150, y);
          line = titleWords[n] + " ";
          y += 62;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 150, y);

      // 9. Blog Excerpt (Auto-Wrapped)
      ctx.fillStyle = "#505562";
      ctx.font = "italic 26px 'Space Grotesk', sans-serif";
      y += 65;

      const excerptText = `"${entry.excerpt}"`;
      const excerptWords = excerptText.split(" ");
      line = "";

      for (let n = 0; n < excerptWords.length; n++) {
        const testLine = line + excerptWords[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 880 && n > 0) {
          ctx.fillText(line, 150, y);
          line = excerptWords[n] + " ";
          y += 38;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 150, y);

      // 10. Footer Divider & Signature
      ctx.strokeStyle = "rgba(32, 37, 47, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 560);
      ctx.lineTo(1070, 560);
      ctx.stroke();

      ctx.fillStyle = "#20252f";
      ctx.font = "bold 32px 'DM Serif Display', Georgia, serif";
      ctx.fillText("Om Nandurkar", 150, 615);

      ctx.fillStyle = "#ff6e6c";
      ctx.font = "bold 18px 'Space Grotesk', sans-serif";
      ctx.fillText("CREATOR STUDIO", 930, 615);

      return canvas;
    };
  }, [entry]);

  // Social Share URLs
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${entry.title}" by Om Nandurkar\n${entry.excerpt}`
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `"${entry.title}" by Om Nandurkar — ${entry.excerpt}\n\n${fullUrl}`
  )}`;

  const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(
    `"${entry.title}" by Om Nandurkar`
  )}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      toast.success("Link copied!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Could not copy link.");
    }
  };

  const handleCopyFormattedCardText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      toast.success("Quote card text copied!");
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      toast.error("Could not copy text.");
    }
  };

  const handleDownloadCardImage = () => {
    try {
      const canvas = generateCardCanvas();
      if (!canvas) return;

      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `om-nandurkar-blog-${entry.slug}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success("Card image downloaded!");
    } catch (err) {
      console.error("Card download error:", err);
      toast.error("Could not generate card image.");
    }
  };

  // WhatsApp Share with Image File Support via Web Share API
  const handleWhatsAppClick = async (e: React.MouseEvent) => {
    const canvas = generateCardCanvas();
    if (canvas && navigator.share && navigator.canShare) {
      try {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          const cardFile = new File([blob], `om-nandurkar-blog-${entry.slug}.png`, { type: "image/png" });
          if (navigator.canShare({ files: [cardFile] })) {
            e.preventDefault();
            await navigator.share({
              files: [cardFile],
              title: `"${entry.title}" by Om Nandurkar`,
              text: `"${entry.title}" by Om Nandurkar — ${entry.excerpt}\n\n${fullUrl}`,
            });
            return;
          }
        }
      } catch {
        // Fallback to standard whatsapp URL if native share dismissed
      }
    }
  };

  const handleNativeShare = async () => {
    const canvas = generateCardCanvas();
    if (canvas && navigator.share) {
      try {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (blob && navigator.canShare) {
          const cardFile = new File([blob], `om-nandurkar-blog-${entry.slug}.png`, { type: "image/png" });
          if (navigator.canShare({ files: [cardFile] })) {
            await navigator.share({
              files: [cardFile],
              title: `${entry.title} — Om Nandurkar`,
              text: `${entry.excerpt}\n\n${fullUrl}`,
            });
            return;
          }
        }

        await navigator.share({
          title: `${entry.title} — Om Nandurkar`,
          text: entry.excerpt,
          url: fullUrl,
        });
      } catch {
        // User cancelled native share
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="share-modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="share-modal-header">
          <div className="share-modal-title">
            <Share2 size={18} className="text-coral" />
            <h3>Share Blog</h3>
          </div>
          <button className="share-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* ── VECTOR ART SHARE CARD PREVIEW ── */}
        <div className="share-card-vector-preview">
          <div className="share-card-tape" aria-hidden="true" />

          {/* Spiral binding rings top */}
          <div className="share-card-spirals" aria-hidden="true">
            <span /><span /><span /><span /><span /><span />
          </div>

          <div className="share-card-content">
            <div className="share-card-top-row">
              <span className="share-card-stamp">✳ Om's Open Tab Journal</span>
              <span className="share-card-mood">{entry.mood}</span>
            </div>

            <h2 className="share-card-headline">{entry.title}</h2>
            <p className="share-card-excerpt">"{entry.excerpt}"</p>

            <div className="share-card-footer-row">
              <div className="share-card-author">
                <span className="author-name">Om Nandurkar</span>
                <span className="author-sub">Creator Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SOCIAL SHARE PLATFORMS ── */}
        <div className="share-modal-section-title">Share Platform</div>
        <div className="share-social-grid">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-social-btn--x"
          >
            <Twitter size={16} />
            <span>X</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="share-social-btn share-social-btn--whatsapp"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-social-btn--linkedin"
          >
            <ExternalLink size={16} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              handleDownloadCardImage();
              toast.success("Card image downloaded for Instagram!");
            }}
            className="share-social-btn share-social-btn--instagram"
          >
            <Instagram size={16} />
            <span>Instagram</span>
          </a>
        </div>

        {/* ── COMPACT ACTION BUTTONS WITH SHORT LABELS & CLEAN ICONS ── */}
        <div className="share-actions-row">
          <button
            type="button"
            className="share-action-btn share-action-btn--download"
            onClick={handleDownloadCardImage}
            title="Download PNG Card Image"
          >
            <Download size={15} />
            <span>Card Image</span>
          </button>

          <button
            type="button"
            className={`share-action-btn ${copiedLink ? "is-active" : ""}`}
            onClick={handleCopyLink}
            title="Copy Page Link"
          >
            {copiedLink ? <Check size={15} /> : <Copy size={15} />}
            <span>{copiedLink ? "Copied!" : "Link"}</span>
          </button>

          <button
            type="button"
            className={`share-action-btn ${copiedText ? "is-active" : ""}`}
            onClick={handleCopyFormattedCardText}
            title="Copy Quote Card Text"
          >
            {copiedText ? <Check size={15} /> : <Quote size={15} />}
            <span>{copiedText ? "Copied!" : "Quote"}</span>
          </button>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              className="share-action-btn share-action-btn--native"
              onClick={handleNativeShare}
              title="More Share Options"
            >
              <Share2 size={15} />
              <span>More</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
