import { Sparkles, Clock3, X, Flame, Music2, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface ScheduledReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle?: string;
  albumTitle?: string;
}

export default function ScheduledReleaseModal({
  isOpen,
  onClose,
  trackTitle = "Scheduled Track",
  albumTitle = "DAFTAR",
}: ScheduledReleaseModalProps) {
  if (!isOpen) return null;

  const handlePreSaveHype = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff7043", "#ffca28", "#26a69a", "#ab47bc"],
    });
    toast.success(`🎉 You're pre-saved for ${albumTitle}!`, {
      description: "Songs will be available as soon as the album drops! ☕💼🚆",
    });
    onClose();
  };

  return (
    <div className="scheduled-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="scheduled-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="scheduled-modal-close" onClick={onClose} type="button" aria-label="Close dialog">
          <X size={18} />
        </button>

        <div className="scheduled-modal-badge">
          <Clock3 className="clock-pulse" size={15} />
          <span>SCHEDULED RELEASE</span>
        </div>

        <div className="scheduled-modal-icon-wrap">
          <Music2 size={36} />
        </div>

        <h3 className="scheduled-modal-title">
          “{trackTitle}”
        </h3>

        <p className="scheduled-modal-body">
          This song will be available once the upcoming album <strong>{albumTitle}</strong> is released!
        </p>

        <div className="scheduled-modal-info">
          <div className="smi-item">
            <Calendar size={15} />
            <span>Status: Scheduled Album Release</span>
          </div>
          <div className="smi-item">
            <Flame size={15} />
            <span>Album: DAFTAR · 4 Songs / One Workday</span>
          </div>
        </div>

        <div className="scheduled-modal-actions">
          <button className="scheduled-modal-btn scheduled-modal-btn--hype" onClick={handlePreSaveHype} type="button">
            <Sparkles size={16} /> Pre-Save &amp; Unlock Hype
          </button>
          <button className="scheduled-modal-btn scheduled-modal-btn--secondary" onClick={onClose} type="button">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
