import { Accessibility, Contrast, Eye, Type } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { readerSize, setReaderSize, calmContrast, setCalmContrast, reducedMotion, setReducedMotion } = useTheme();
  return <div className="reader-controls"><button aria-expanded={isOpen} aria-label="Open reading preferences" className="reader-controls__trigger" onClick={() => setIsOpen((open) => !open)} type="button"><Accessibility size={16} /><span>read</span></button>{isOpen && <div className="reader-controls__panel"><p>reading preferences</p><div><span><Type size={15} /> text size</span><button aria-pressed={readerSize === "standard"} className={readerSize === "standard" ? "is-active" : ""} onClick={() => setReaderSize("standard")} type="button">standard</button><button aria-pressed={readerSize === "large"} className={readerSize === "large" ? "is-active" : ""} onClick={() => setReaderSize("large")} type="button">large</button></div><div><span><Contrast size={15} /> calm contrast</span><button aria-pressed={calmContrast} className={calmContrast ? "is-active" : ""} onClick={() => setCalmContrast(!calmContrast)} type="button">{calmContrast ? "on" : "off"}</button></div><div><span><Eye size={15} /> reduce motion</span><button aria-pressed={reducedMotion} className={reducedMotion ? "is-active" : ""} onClick={() => setReducedMotion(!reducedMotion)} type="button">{reducedMotion ? "on" : "off"}</button></div></div>}</div>;
}
