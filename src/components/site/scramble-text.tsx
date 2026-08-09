import { useEffect, useRef, useState } from "react";

// Standard character set with uniform uppercase character metrics
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Per-character scramble reveal that preserves layout width and eliminates jitter.
 */
export function ScrambleText({
  text,
  active,
  className = "",
  speed = 35,
}: {
  text: string;
  active: boolean;
  className?: string;
  speed?: number;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      frame.current = 0;
      return;
    }

    frame.current = 0;
    const tick = (t: number) => {
      if (t - last.current >= speed) {
        last.current = t;
        const progress = frame.current / 2;
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              if (i < progress) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );
        frame.current += 1;
      }

      if (frame.current / 2 <= text.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, text, speed]);

  return (
    <span className={`inline-block whitespace-nowrap font-sans tabular-nums ${className}`}>
      {display}
    </span>
  );
}
