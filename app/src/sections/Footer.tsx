import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Set initial state
    gsap.set(content, { y: 60, opacity: 0 });

    // Create scroll-triggered animation
    gsap.to(content, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-white text-black z-20 section-padding py-20 md:py-32"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto will-change-transform">
        {/* Main CTA */}
        <div className="mb-20">
          <h2
            className="font-normal leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
          >
            LET&apos;S CONNECT
          </h2>
          <p className="text-black/60 text-lg md:text-xl max-w-xl">
            For collaborations, speaking engagements, or just to say hello.
          </p>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <a
            href="mailto:hello@theburningarchive.com"
            className="group flex items-center gap-4 border-b border-black/20 pb-6 hover:border-red transition-colors duration-300"
          >
            <Mail className="w-6 h-6 text-black/60 group-hover:text-red transition-colors duration-300" />
            <span className="text-xl md:text-2xl group-hover:text-red transition-colors duration-300">
              hello@theburningarchive.com
            </span>
            <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-b border-black/20 pb-6 hover:border-red transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://instagram.com', '_blank');
            }}
          >
            <Instagram className="w-6 h-6 text-black/60 group-hover:text-red transition-colors duration-300" />
            <span className="text-xl md:text-2xl group-hover:text-red transition-colors duration-300">
              @theburningarchive
            </span>
            <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-black/10">
          <p className="text-black/40 text-sm">
            &copy; {new Date().getFullYear()} The Burning Archive. All rights reserved.
          </p>

          <nav className="flex items-center gap-6">
            <a
              href="#about"
              className="text-small-white text-black/60 hover:text-black transition-colors duration-300"
            >
              ABOUT
            </a>
            <a
              href="#substack"
              className="text-small-white text-black/60 hover:text-black transition-colors duration-300"
            >
              SUBSTACK
            </a>
            <a
              href="#instagram"
              className="text-small-white text-black/60 hover:text-black transition-colors duration-300"
            >
              INSTAGRAM
            </a>
            <a
              href="#writings"
              className="text-small-white text-black/60 hover:text-black transition-colors duration-300"
            >
              WRITINGS
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
