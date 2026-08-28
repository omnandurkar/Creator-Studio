/**
 * Pastel Afterimage Archive visual reminder: the studio stamp is the shared
 * handmade starburst mark that visually connects every otherwise distinct page.
 */
type StudioMarkProps = {
  className?: string;
  label?: string;
};

export default function StudioMark({
  className = "",
  label = "Creator Studio home",
}: StudioMarkProps) {
  return (
    <img
      className={`studio-mark ${className}`}
      src="/assets/creator-studio-stamp.png"
      alt={label}
    />
  );
}
