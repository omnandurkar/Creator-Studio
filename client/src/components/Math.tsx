import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type MathProps = {
  tex: string;
  display?: boolean;
  className?: string;
};

export default function Math({ tex, display = false, className = "" }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    }
  }, [tex, display]);

  return display ? (
    <div className={`math-block ${className}`}>
      <span ref={ref} />
    </div>
  ) : (
    <span ref={ref} className={`math-inline ${className}`} />
  );
}
