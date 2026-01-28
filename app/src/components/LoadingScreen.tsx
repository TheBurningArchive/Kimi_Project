import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!container || !text || !leftPanel || !rightPanel) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        onComplete();
      },
    });

    // Typewriter effect for the text
    const fullText = 'THE BURNING ARCHIVE';
    text.textContent = '';

    // Animate text character by character
    tl.to(
      {},
      {
        duration: 1.5,
        onUpdate: function () {
          const progress = this.progress();
          const charCount = Math.floor(progress * fullText.length);
          text.textContent = fullText.substring(0, charCount);
        },
      },
      0
    );

    // Hold for a moment
    tl.to({}, { duration: 0.5 }, 1.5);

    // Split screen animation
    tl.to(
      leftPanel,
      {
        x: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
      },
      2
    );

    tl.to(
      rightPanel,
      {
        x: '100%',
        duration: 0.8,
        ease: 'power3.inOut',
      },
      2
    );

    tl.to(
      text,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      },
      2
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Left panel */}
      <div
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full bg-black will-change-transform"
      />

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full bg-black will-change-transform"
      />

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          ref={textRef}
          className="text-white font-normal tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 5rem)' }}
        >
          THE BURNING ARCHIVE
        </h1>
      </div>
    </div>
  );
}
