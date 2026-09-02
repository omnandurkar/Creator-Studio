/**
 * Pastel Afterimage Archive visual reminder: this is a tactile listening object,
 * using the shared ink-and-coral print treatment rather than generic media chrome.
 */
import { Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const demoSource = "/assets/om-illustrative-audio-sketch.mp3";
const demoTitle = "Postcard for 2:17 AM";

type ReleasePlayDetail = { id: string; title: string; source: string; label?: string };

function formatTime(seconds: number) {
  const wholeSeconds = Math.floor(seconds || 0);
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [isVisible, setIsVisible] = useState(true);
  const [activeRelease, setActiveRelease] = useState<ReleasePlayDetail>({ id: "studio-sketch-01", title: demoTitle, source: demoSource, label: "studio sketch 01" });

  const notifyStatus = (playing: boolean, release = activeRelease) => {
    window.dispatchEvent(new CustomEvent("creator-studio:audio-status", {
      detail: { isPlaying: playing, id: release.id, title: release.title }
    }));
  };

  const startPlayback = async (detail?: ReleasePlayDetail) => {
    if (!audioRef.current) return;
    const targetRelease = detail ?? activeRelease;
    setIsVisible(true);

    if (detail) {
      setActiveRelease(detail);
      const fullSourceUrl = new URL(detail.source, window.location.origin).href;
      if (audioRef.current.src !== fullSourceUrl) {
        audioRef.current.src = detail.source;
      }
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      notifyStatus(true, targetRelease);
    } catch (err) {
      console.warn("Audio play retry:", err);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        notifyStatus(true, targetRelease);
      } catch {
        setIsPlaying(false);
        notifyStatus(false, targetRelease);
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      void startPlayback();
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      notifyStatus(false);
    }
  };

  useEffect(() => {
    const playDemo = () => void startPlayback();
    const playRelease = (event: Event) => {
      const detail = (event as CustomEvent<ReleasePlayDetail>).detail;
      if (detail?.source) void startPlayback(detail);
    };
    const togglePlay = () => togglePlayback();

    window.addEventListener("creator-studio:play-demo", playDemo);
    window.addEventListener("creator-studio:play-release", playRelease);
    window.addEventListener("creator-studio:toggle-play", togglePlay);
    return () => {
      window.removeEventListener("creator-studio:play-demo", playDemo);
      window.removeEventListener("creator-studio:play-release", playRelease);
      window.removeEventListener("creator-studio:toggle-play", togglePlay);
    };
  }, [activeRelease, isPlaying]);

  if (!isVisible) return null;

  return (
    <div className="mini-player" aria-label="Creator Studio audio player">
      <audio
        onEnded={() => {
          setIsPlaying(false);
          notifyStatus(false);
        }}
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 60)}
        onPause={() => {
          setIsPlaying(false);
          notifyStatus(false);
        }}
        onPlay={() => {
          setIsPlaying(true);
          notifyStatus(true);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        ref={audioRef}
        src={activeRelease.source}
      />
      <span className="mini-player__tag">{activeRelease.label ?? "studio sketch"}</span>
      <button aria-label={isPlaying ? "Pause audio" : "Play audio"} className="mini-player__play" onClick={togglePlayback} type="button">
        {isPlaying ? <Pause fill="currentColor" size={16} /> : <Play fill="currentColor" size={16} />}
      </button>
      <div className="mini-player__details">
        <strong>{activeRelease.title}</strong>
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
      <input
        aria-label="Seek in audio"
        className="mini-player__progress"
        max={duration}
        min="0"
        onChange={(event) => {
          if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value);
            setCurrentTime(Number(event.target.value));
          }
        }}
        type="range"
        value={currentTime}
      />
      <button
        aria-label="Hide audio player"
        className="mini-player__close"
        onClick={() => {
          audioRef.current?.pause();
          setIsPlaying(false);
          notifyStatus(false);
          setIsVisible(false);
        }}
        type="button"
      >
        <X size={15} />
      </button>
    </div>
  );
}
