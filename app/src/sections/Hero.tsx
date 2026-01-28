import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const burningRef = useRef<HTMLHeadingElement>(null);
  const archiveRef = useRef<HTMLHeadingElement>(null);
  const topRightBlockRef = useRef<HTMLDivElement>(null);
  const bottomLeftBlockRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const burning = burningRef.current;
    const archive = archiveRef.current;
    const topRightBlock = topRightBlockRef.current;
    const bottomLeftBlock = bottomLeftBlockRef.current;
    const verticalLine = verticalLineRef.current;
    const horizontalLine = horizontalLineRef.current;
    const container = containerRef.current;

    if (!section || !burning || !archive || !topRightBlock || !bottomLeftBlock || !verticalLine || !horizontalLine || !container) return;

    // Set initial scattered positions (off-screen or offset)
    gsap.set(burning, { x: '-30vw', y: '-20vh', opacity: 0 });
    gsap.set(archive, { x: '30vw', y: '20vh', opacity: 0 });
    gsap.set(topRightBlock, { x: '20vw', y: '-30vh', scale: 0.8, opacity: 0 });
    gsap.set(bottomLeftBlock, { x: '-20vw', y: '30vh', scale: 0.8, opacity: 0 });
    gsap.set(verticalLine, { scaleY: 0, transformOrigin: 'top' });
    gsap.set(horizontalLine, { scaleX: 0, transformOrigin: 'left' });

    // Create the assembly timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: (progress) => {
            if (progress < 0.3) return 0.15;
            if (progress < 0.7) return 0.5;
            return 1;
          },
          duration: { min: 0.2, max: 0.5 },
          ease: 'power1.inOut',
        },
      },
    });

    // Phase 1: Elements fly in and assemble (0% - 50%)
    tl.to(burning, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    tl.to(archive, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.05);

    tl.to(topRightBlock, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.1);

    tl.to(bottomLeftBlock, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.15);

    tl.to(verticalLine, {
      scaleY: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0.2);

    tl.to(horizontalLine, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0.25);

    // Phase 2: Hold the assembled state (50% - 70%)
    // No animation - just holding

    // Phase 3: Exit animation (70% - 100%)
    tl.to(container, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 0.7);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden z-10"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full will-change-transform"
      >
        {/* Grid Lines */}
        <div
          ref={verticalLineRef}
          className="absolute left-[40%] top-0 h-full w-px bg-white will-change-transform"
        />
        <div
          ref={horizontalLineRef}
          className="absolute left-0 top-[55%] w-full h-px bg-white will-change-transform"
        />

        {/* THE BURNING - Top Left */}
        <h1
          ref={burningRef}
          className="absolute left-[5%] top-[10%] text-white font-normal leading-none will-change-transform"
          style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
        >
          THE BURNING
        </h1>

        {/* ARCHIVE - Bottom Right */}
        <h2
          ref={archiveRef}
          className="absolute right-[5%] bottom-[10%] text-white font-normal leading-none will-change-transform"
          style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
        >
          ARCHIVE
        </h2>

        {/* Red Block - Top Right */}
        <div
          ref={topRightBlockRef}
          className="absolute right-[8%] top-[15%] bg-red text-white p-6 md:p-8 will-change-transform transition-fast hover:scale-[1.02] cursor-pointer"
        >
          <nav className="flex flex-col gap-4">
            <a
              href="#about"
              className="text-small-white link-hover"
            >
              ABOUT
            </a>
            <a
              href="#instagram"
              className="text-small-white link-hover"
            >
              INSTAGRAM
            </a>
          </nav>
        </div>

        {/* Red Block - Bottom Left */}
        <div
          ref={bottomLeftBlockRef}
          className="absolute left-[8%] bottom-[15%] bg-red text-white p-6 md:p-8 will-change-transform transition-fast hover:scale-[1.02] cursor-pointer"
        >
          <nav className="flex flex-col gap-4">
            <a
              href="#substack"
              className="text-small-white link-hover"
            >
              SUBSTACK
            </a>
            <a
              href="#writings"
              className="text-small-white link-hover"
            >
              WRITINGS
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
