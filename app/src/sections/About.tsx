import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

    // Set initial state
    gsap.set(heading, { y: 80, opacity: 0 });
    gsap.set(content, { y: 60, opacity: 0 });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.5,
      },
    });

    tl.to(heading, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    tl.to(content, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.1);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-black z-20 section-padding py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left Column - Heading */}
          <div className="md:col-span-4">
            <h3
              ref={headingRef}
              className="text-red font-normal will-change-transform sticky top-32"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              ABOUT
            </h3>
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-8">
            <div ref={contentRef} className="will-change-transform space-y-8">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                The Burning Archive is an independent project dedicated to the critical 
                study of cultural domains such as history, philosophy, cinema, photography, 
                and politics, regarded as essential frameworks for the analysis and 
                interpretation of both historical and contemporary realities.
              </p>
              
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Through carefully curated content and critical analysis, the project aims 
                to provide rigorous yet accessible interpretive frameworks, moving beyond 
                oversimplifications and superficial narratives.
              </p>

              <p className="text-white text-lg md:text-xl leading-relaxed">
                This website represents an extension of the The Burning Archive Instagram 
                profile—a space designed to deepen, archive, and further develop the themes 
                explored, while maintaining an analytical, well-documented, and contemporary 
                approach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
