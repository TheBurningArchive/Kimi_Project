import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram as InstagramIcon, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const instagramPosts = [
  { id: 1, alt: 'Typewriter on desk' },
  { id: 2, alt: 'Coffee and notebook' },
  { id: 3, alt: 'Brooklyn street scene' },
  { id: 4, alt: 'Vintage book collection' },
  { id: 5, alt: 'Writing desk setup' },
  { id: 6, alt: 'Autumn leaves in park' },
];

export default function Instagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !grid || !cta) return;

    // Set initial state
    gsap.set(heading, { x: -60, opacity: 0 });
    gsap.set(grid.children, { scale: 0.9, opacity: 0 });
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

    tl.to(grid.children, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
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
      id="instagram"
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
              INSTAGRAM
            </h3>
            <p className="text-white/60 mt-4 text-sm">
              Visual diaries from a life of writing, wandering, and wondering.
            </p>
          </div>

          {/* Right Column - Grid */}
          <div className="md:col-span-8">
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {instagramPosts.map((post, index) => (
                <a
                  key={post.id}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square bg-white/5 will-change-transform overflow-hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://instagram.com', '_blank');
                  }}
                >
                  {/* Placeholder for Instagram image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                    <InstagramIcon className="w-8 h-8 text-white/20" />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-red/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Index number */}
                  <span className="absolute top-2 left-2 text-small-white opacity-50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="mt-12 will-change-transform">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red text-white px-8 py-4 text-small-white transition-fast hover:bg-white hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://instagram.com', '_blank');
                }}
              >
                <InstagramIcon className="w-4 h-4" />
                <span>FOLLOW ON INSTAGRAM</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
