import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const writings = [
  {
    title: 'The Morning Pages',
    type: 'Book',
    year: '2024',
    description: 'A guide to unlocking creativity through daily stream-of-consciousness writing.',
    link: '#',
  },
  {
    title: 'Digital Minimalism for Writers',
    type: 'Essay Collection',
    year: '2023',
    description: 'Essays on reclaiming focus in an age of infinite distraction.',
    link: '#',
  },
  {
    title: 'Letters from Brooklyn',
    type: 'Memoir',
    year: '2022',
    description: 'A year of observations, conversations, and quiet moments in New York.',
    link: '#',
  },
  {
    title: 'The Art of the Slow Email',
    type: 'Essay',
    year: '2021',
    description: 'Published in The Atlantic. On correspondence as a craft.',
    link: '#',
  },
];

export default function Writings() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const list = listRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !list || !cta) return;

    // Set initial state
    gsap.set(heading, { x: -60, opacity: 0 });
    gsap.set(list.children, { y: 40, opacity: 0 });
    gsap.set(cta, { y: 30, opacity: 0 });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 0.5,
      },
    });

    tl.to(heading, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    tl.to(list.children, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
    }, 0.1);

    tl.to(cta, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.4);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="writings"
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
              WRITINGS
            </h3>
            <p className="text-white/60 mt-4 text-sm">
              Books, essays, and published works spanning a decade of writing.
            </p>
          </div>

          {/* Right Column - Writings List */}
          <div className="md:col-span-8">
            <div ref={listRef} className="space-y-0">
              {writings.map((writing, index) => (
                <article
                  key={index}
                  className="group border-b border-white/20 py-8 will-change-transform"
                >
                  <a
                    href={writing.link}
                    className="block"
                    onClick={(e) => {
                      e.preventDefault();
                      // In a real app, this would link to the actual writing
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-small-white bg-white text-black px-2 py-1">
                            {writing.type}
                          </span>
                          <span className="text-white/50 text-sm">
                            {writing.year}
                          </span>
                        </div>
                        <h4 className="text-white text-2xl md:text-3xl font-normal group-hover:text-red transition-colors duration-300">
                          {writing.title}
                        </h4>
                        <p className="text-white/70 mt-3 leading-relaxed max-w-xl">
                          {writing.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-10 h-10 border border-white/30 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="mt-12 will-change-transform">
              <a
                href="#"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 text-small-white transition-fast hover:bg-white hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would link to a full bibliography
                }}
              >
                <BookOpen className="w-4 h-4" />
                <span>VIEW FULL BIBLIOGRAPHY</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
