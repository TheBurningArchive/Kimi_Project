import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: 'The Art of Doing Nothing',
    date: 'January 15, 2026',
    excerpt: 'In a world obsessed with productivity, the radical act of stillness has become a form of resistance.',
  },
  {
    title: 'Why I Deleted My Twitter',
    date: 'December 3, 2025',
    excerpt: 'Social media promised connection but delivered anxiety. Here is what happened when I walked away.',
  },
  {
    title: 'On Writing Daily',
    date: 'November 18, 2025',
    excerpt: 'The morning pages routine that transformed my creative practice and quieted my inner critic.',
  },
  {
    title: 'The Tyranny of Inbox Zero',
    date: 'October 22, 2025',
    excerpt: 'How our obsession with empty inboxes is stealing our most precious resource: attention.',
  },
];

export default function Substack() {
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
      id="substack"
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
              SUBSTACK
            </h3>
            <p className="text-white/60 mt-4 text-sm">
              Weekly essays on creativity, technology, and living with intention.
            </p>
          </div>

          {/* Right Column - Article List */}
          <div className="md:col-span-8">
            <div ref={listRef} className="space-y-0">
              {articles.map((article, index) => (
                <article
                  key={index}
                  className="group border-b border-white/20 py-6 will-change-transform cursor-pointer"
                >
                  <a
                    href="#"
                    className="block"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://substack.com', '_blank');
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-white text-xl md:text-2xl font-normal group-hover:text-red transition-colors duration-300">
                          {article.title}
                        </h4>
                        <p className="text-white/50 text-sm mt-2">
                          {article.date}
                        </p>
                        <p className="text-white/70 mt-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                      <ExternalLink
                        className="w-5 h-5 text-white/40 group-hover:text-red transition-colors duration-300 flex-shrink-0 mt-1"
                      />
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="mt-12 will-change-transform">
              <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red text-white px-8 py-4 text-small-white transition-fast hover:bg-white hover:text-black"
              >
                <span>SUBSCRIBE ON SUBSTACK</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
