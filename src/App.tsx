import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from './components/Button';
import { Footer } from './components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE URLS
// ─────────────────────────────────────────────────────────────────────────────
const HERO_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
const SECTION2_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';
const SECTION3_IMG1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';
const SECTION3_IMG2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';
const SECTION3_BG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES PAGE IMAGES  (none of these may appear on Home)
// ─────────────────────────────────────────────────────────────────────────────
const SVC_CHECKUPS    = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1280&q=85&auto=format&fit=crop'; // dentist examining patient in chair
const SVC_COSMETIC    = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1280&q=85&auto=format&fit=crop'; // close-up brilliant white smile / veneers
const SVC_IMPLANTS    = 'https://images.unsplash.com/photo-1588776814546-1ffbb3f95f57?w=1280&q=85&auto=format&fit=crop'; // dental implant model / tools
const SVC_BRACES      = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1280&q=85&auto=format&fit=crop'; // clear aligner / orthodontic tray
const SVC_WHITENING   = 'https://images.unsplash.com/photo-1601643157091-ce5c665179ab?w=1280&q=85&auto=format&fit=crop'; // professional whitening treatment
const SVC_EMERGENCY   = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1280&q=85&auto=format&fit=crop'; // urgent dental / pain relief clinical

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE IMAGES  (none of these may appear on Home or Services)
// ─────────────────────────────────────────────────────────────────────────────
const ABOUT_DR_SMITH  = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1280&q=85&auto=format&fit=crop'; // male dentist in white coat, professional portrait
const ABOUT_SARAH     = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1280&q=85&auto=format&fit=crop'; // female dental professional smiling
const ABOUT_MICHAEL   = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1280&q=85&auto=format&fit=crop'; // male medical professional / office manager
const ABOUT_ELENA     = 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1280&q=85&auto=format&fit=crop'; // female dental assistant

// ─────────────────────────────────────────────────────────────────────────────
// BEFORE/AFTER GALLERY IMAGES  (unique — not used on any other section/page)
// ─────────────────────────────────────────────────────────────────────────────
const BA_WHITENING_BEFORE   = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=85&auto=format&fit=crop';
const BA_WHITENING_AFTER    = 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=85&auto=format&fit=crop';
const BA_VENEERS_BEFORE     = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=85&auto=format&fit=crop';
const BA_VENEERS_AFTER      = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85&auto=format&fit=crop';
const BA_INVISALIGN_BEFORE  = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&auto=format&fit=crop';
const BA_INVISALIGN_AFTER   = 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&q=85&auto=format&fit=crop';
const BA_IMPLANTS_BEFORE    = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=85&auto=format&fit=crop';
const BA_IMPLANTS_AFTER     = 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=800&q=85&auto=format&fit=crop';

// ─────────────────────────────────────────────────────────────────────────────
// DATA CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const featureBars = ['Advanced Dentistry', 'High Quality Equipment', 'Friendly Staff'];

const services = [
  { name: 'Dental\nVeneers', num: '01', active: true },
  { name: 'Dental\nCrowns', num: '02', active: false },
  { name: 'Teeth\nWhitening', num: '03', active: false },
  { name: 'Dental\nImplants', num: null, active: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/** Returns true on mobile (< 768px) */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

interface MaskPosition {
  x: number;
  y: number;
  sw: number;
  sh: number;
}

/** Computes the position of each card relative to the section container */
function useMaskPositions(
  sectionRef: RefObject<HTMLElement | null>,
  cardRefs: RefObject<(HTMLElement | null)[]>
): MaskPosition[] {
  const [positions, setPositions] = useState<MaskPosition[]>([]);

  const compute = useCallback(() => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const scrollLeft = sectionRef.current.scrollLeft || 0;
    const scrollTop = sectionRef.current.scrollTop || 0;
    const sw = sectionRect.width;
    const sh = sectionRect.height;

    const newPositions: MaskPosition[] = (cardRefs.current || []).map((card) => {
      if (!card) return { x: 0, y: 0, sw, sh };
      const cardRect = card.getBoundingClientRect();
      return {
        x: cardRect.left - sectionRect.left + scrollLeft,
        y: cardRect.top - sectionRect.top + scrollTop,
        sw,
        sh,
      };
    });
    setPositions(newPositions);
  }, [sectionRef, cardRefs]);

  useEffect(() => {
    compute();
    if (!sectionRef.current) return;
    const observer = new ResizeObserver(compute);
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [compute, sectionRef]);

  return positions;
}

/** Calculates the render width of the image if scaled to fill the section height */
function useImageWidth(imageUrl: string, sectionHeight: number): number {
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    if (!imageUrl || sectionHeight === 0) return;
    const img = new Image();
    img.onload = () => {
      const renderWidth = img.naturalWidth * (sectionHeight / img.naturalHeight);
      setImageWidth(renderWidth);
    };
    img.src = imageUrl;
  }, [imageUrl, sectionHeight]);

  return imageWidth;
}

interface RevealResult {
  containerRef: RefObject<HTMLElement | null>;
  getAnimStyle: (index: number) => React.CSSProperties;
}

/** Staggered reveal animation using IntersectionObserver */
function useStaggeredReveal(_count: number, threshold = 0.15): RevealResult {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = useCallback(
    (index: number): React.CSSProperties => ({
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
    }),
    [visible]
  );

  return { containerRef, getAnimStyle };
}

// ─────────────────────────────────────────────────────────────────────────────
// MASKED CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface MaskedCardProps {
  bgImage: string;
  position: MaskPosition;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: React.CSSProperties;
}

function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX,
  className = '',
  children,
  cardRef,
  style,
}: MaskedCardProps) {
  const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;

  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: `auto ${position.sh}px`,
    backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...bgStyle, ...style }}
    >
      {children}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = ['Home', 'Services', 'About', 'Gallery', 'Contact'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-white/80 backdrop-blur-md">
        {/* Logo */}
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none">
              Dental
            </span>
            <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none -mt-1.5 md:-mt-2">
              Health
            </span>
          </div>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2">
            quality healthcare
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:+10005550000" className="text-sm font-semibold text-black hover:text-neutral-500 transition-colors">Dental Emergency</a>
          <Button
            id="menu-btn-desktop"
            variant="outline"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </Button>
        </div>

        {/* Hamburger */}
        <button
          id="menu-btn-mobile"
          className="md:hidden w-10 h-10 flex items-center justify-center relative"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}
          />
        </button>
      </nav>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button for desktop (and mobile) */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {navLinks.map((link, i) => {
              const isRouterLink = ['Home', 'Services', 'About', 'Contact'].includes(link);
              const to = link === 'Home' ? '/' : `/${link.toLowerCase()}`;

              if (isRouterLink) {
                return (
                  <Link
                    key={link}
                    to={to}
                    className="text-4xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    style={{
                      opacity: menuOpen ? 1 : 0,
                      transform: menuOpen ? 'translateX(0)' : 'translateX(2rem)',
                      transitionDelay: `${100 + i * 60}ms`,
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </Link>
                );
              }

              return (
                <span
                  key={link}
                  title="Coming soon"
                  aria-label={`${link} — coming soon`}
                  className="text-4xl font-bold text-black/30 cursor-default select-none relative group transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{
                    opacity: menuOpen ? 0.3 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(2rem)',
                    transitionDelay: `${100 + i * 60}ms`,
                  }}
                >
                  {link}
                  <span className="pointer-events-none absolute -top-7 left-0 whitespace-nowrap rounded-md bg-black/10 px-2 py-1 text-[11px] font-semibold text-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Coming soon
                  </span>
                </span>
              );
            })}

            {/* Bottom section */}
            <div
              className="mt-8 pt-8 border-t border-neutral-200 transition-all duration-500"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(2rem)',
                transitionDelay: '450ms',
              }}
            >
              <a href="tel:+10005550000" className="text-sm font-semibold text-black mb-4 block hover:text-neutral-500 transition-colors">Dental Emergency</a>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  id="book-appointment-mobile"
                  variant="primary"
                  className="w-full py-4"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 – HERO
// ─────────────────────────────────────────────────────────────────────────────

function Section1() {
  const isMobile = useIsMobile();
  const focalX = isMobile ? 0.7 : 0.8;

  const section1Ref = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s1Reveal = useStaggeredReveal(4);

  // Attach both refs to the section
  const setSectionRef = useCallback(
    (el: HTMLElement | null) => {
      section1Ref.current = el;
      (s1Reveal.containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
    },
    [s1Reveal.containerRef]
  );

  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    const el = section1Ref.current;
    if (!el) return;
    setSectionHeight(el.getBoundingClientRect().height);
    const ro = new ResizeObserver(() => {
      setSectionHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const positions = useMaskPositions(section1Ref, cardRefs);
  const imageWidth = useImageWidth(HERO_IMAGE, sectionHeight);

  const emptyPos: MaskPosition = { x: 0, y: 0, sw: 0, sh: 0 };

  return (
    <section
      ref={setSectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col pt-24 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 bg-stone-50"
    >
      {/* Animated CSS Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-gradient-bg" aria-hidden="true" />

      {/* Feature bars */}
      {featureBars.map((label, i) => (
        <MaskedCard
          key={label}
          bgImage={HERO_IMAGE}
          position={positions[i] ?? emptyPos}
          imageWidth={imageWidth}
          focalX={focalX}
          className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative"
          cardRef={(el) => { cardRefs.current[i] = el; }}
          style={s1Reveal.getAnimStyle(i)}
        >
          <span className="flex items-center justify-center h-full text-black text-lg md:text-3xl font-bold text-center relative z-10">
            {label}
          </span>
        </MaskedCard>
      ))}

      {/* Main hero card */}
      <MaskedCard
        bgImage={HERO_IMAGE}
        position={positions[3] ?? emptyPos}
        imageWidth={imageWidth}
        focalX={focalX}
        className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative flex flex-col justify-between p-4 md:p-7"
        cardRef={(el) => { cardRefs.current[3] = el; }}
        style={s1Reveal.getAnimStyle(3)}
      >
        {/* Top-left text */}
        <div className="text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[200px] md:max-w-[300px] z-10 shrink-0">
          We wish to provide professional dental services<br />
          that match the current technologies
        </div>

        <div className="flex items-end justify-between z-10 mt-auto shrink-0">
          {/* Bottom-left block */}
          <div className="-ml-1 md:-ml-3 pb-1 md:pb-1">
            <span className="block text-black text-xs md:text-sm font-semibold mb-1 md:mb-2">
              Trusted Dentist in West New York
            </span>
            <h1 className="text-black font-bold leading-[0.79] tracking-tight" style={{ fontSize: 'clamp(3rem,11vw,11rem)' }}>
              Dental<br />Care
            </h1>
          </div>

          {/* Bottom-right CTA */}
          <Link
            to="/contact"
            className="pb-2 md:pb-3 md:mr-1 text-white text-xs md:text-sm font-semibold relative group shrink-0"
          >
            Free Consultation
            <span className="absolute bottom-1.5 md:bottom-2.5 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
        </div>
      </MaskedCard>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 – SMILE GALLERY
// ─────────────────────────────────────────────────────────────────────────────

function Section2() {
  const isMobile = useIsMobile();
  const focalX = isMobile ? 0.65 : 0.8;

  const section2Ref = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s2Reveal = useStaggeredReveal(4);

  const setSectionRef = useCallback(
    (el: HTMLElement | null) => {
      section2Ref.current = el;
      (s2Reveal.containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
    },
    [s2Reveal.containerRef]
  );

  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    const el = section2Ref.current;
    if (!el) return;
    setSectionHeight(el.getBoundingClientRect().height);
    const ro = new ResizeObserver(() => {
      setSectionHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const positions = useMaskPositions(section2Ref, cardRefs);
  const imageWidth = useImageWidth(SECTION2_IMAGE, sectionHeight);

  const emptyPos: MaskPosition = { x: 0, y: 0, sw: 0, sh: 0 };

  return (
    <section
      ref={setSectionRef}
      className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
        {/* Card 0 – Top Left: Smile Gallery */}
        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[0] ?? emptyPos}
          imageWidth={imageWidth}
          focalX={focalX}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
          cardRef={(el) => { cardRefs.current[0] = el; }}
          style={s2Reveal.getAnimStyle(0)}
        >
          <h2 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-2xl md:text-3xl font-bold z-10">
            Smile Gallery
          </h2>
          <p className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">
            Our cosmetic dental work
          </p>
        </MaskedCard>

        {/* Card 1 – Top Right: spans 2 rows on desktop */}
        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[1] ?? emptyPos}
          imageWidth={imageWidth}
          focalX={focalX}
          className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
          cardRef={(el) => { cardRefs.current[1] = el; }}
          style={s2Reveal.getAnimStyle(1)}
        >
          <p className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10">
            If you want a gorgeous smile,<br />
            call us to ask about a smile makeover.
          </p>
          <a href="tel:+10005550000">
            <Button
              id="call-us-btn"
              variant="secondary"
              size="large"
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10"
            >
              Call Us
            </Button>
          </a>
        </MaskedCard>

        {/* Card 2 – Bottom Left: Smile makeover */}
        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[2] ?? emptyPos}
          imageWidth={imageWidth}
          focalX={focalX}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
          cardRef={(el) => { cardRefs.current[2] = el; }}
          style={s2Reveal.getAnimStyle(2)}
        >
          <h2
            className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black font-bold leading-[0.9] z-10"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}
          >
            Smile<br />makeover
          </h2>
        </MaskedCard>

        {/* Card 3 – Bottom Full Width: Services */}
        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[3] ?? emptyPos}
          imageWidth={imageWidth}
          focalX={focalX}
          className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
          cardRef={(el) => { cardRefs.current[3] = el; }}
          style={s2Reveal.getAnimStyle(3)}
        >
          <div className="absolute inset-0 z-10 flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 p-2 md:p-3">
            {services.map((svc) => (
              <div
                key={svc.name}
                className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                  svc.active ? 'bg-white/90 backdrop-blur-md' : 'bg-white/20 backdrop-blur-xl'
                }`}
              >
                <h3
                  className={`text-xl md:text-4xl font-bold leading-[1.05] whitespace-pre-line ${
                    svc.active ? 'text-black' : 'text-white'
                  }`}
                >
                  {svc.name}
                </h3>
                {svc.num && (
                  <div
                    className={`self-end w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold ${
                      svc.active ? 'border-black text-black' : 'border-white text-white'
                    }`}
                  >
                    {svc.num}
                  </div>
                )}
              </div>
            ))}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 – IMPLANT DENTISTRY
// ─────────────────────────────────────────────────────────────────────────────

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`rotate-[-45deg] ${className}`}
    >
      <path
        d="M1 7h12m0 0L8 2m5 5L8 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section3() {
  const s3Reveal = useStaggeredReveal(4);

  return (
    <section
      ref={s3Reveal.containerRef as RefObject<HTMLElement>}
      className="min-h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-1.5 md:gap-2">
          {/* Heading card */}
          <div
            className="rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0"
            style={s3Reveal.getAnimStyle(0)}
          >
            <h2
              className="font-bold leading-[0.95] text-black"
              style={{ fontSize: 'clamp(3rem,7vw,6.5rem)' }}
            >
              Implant<br />Dentistry
            </h2>
            <p className="text-xs md:text-sm font-semibold text-black">
              Restore Missing Teeth
            </p>
          </div>

          {/* Two image cards */}
          <div
            className="flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0"
            style={s3Reveal.getAnimStyle(1)}
          >
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src={SECTION3_IMG1}
                alt="Dental implant procedure"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src={SECTION3_IMG2}
                alt="Dental restoration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Consultation card */}
          <div
            className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0"
            style={s3Reveal.getAnimStyle(2)}
          >
            <div>
              <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">
                Consultation
              </p>
              <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8">
                Dental<br />Restoration<br />Services
              </h3>
            </div>
            <Link to="/contact">
              <Button
                id="book-online-btn"
                variant="secondary"
                size="large"
              >
                Book Online
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN – tall image card */}
        <div
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0"
          style={s3Reveal.getAnimStyle(3)}
        >
          <img
            src={SECTION3_BG}
            alt="Smiling patient"
            className="w-full h-full object-cover"
          />

          {/* Overlay cards */}
          <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
            {/* Overlay Card 1 – white */}
            <div className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
              <h4 className="text-lg md:text-2xl font-bold text-black leading-5 md:leading-7">
                The Process<br />of Installing<br />Implants
              </h4>
              <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center">
                <ArrowIcon />
              </div>
            </div>

            {/* Overlay Card 2 – glass */}
            <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
              <h4 className="text-lg md:text-2xl font-bold text-white leading-5 md:leading-7">
                Caring<br />for Dental<br />Implants
              </h4>
              <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center">
                <ArrowIcon className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BEFORE / AFTER GALLERY
// ─────────────────────────────────────────────────────────────────────────────

const beforeAfterData = [
  { label: 'Teeth Whitening',       before: BA_WHITENING_BEFORE,  after: BA_WHITENING_AFTER  },
  { label: 'Veneers / Smile Makeover', before: BA_VENEERS_BEFORE, after: BA_VENEERS_AFTER    },
  { label: 'Invisalign & Braces',   before: BA_INVISALIGN_BEFORE, after: BA_INVISALIGN_AFTER },
  { label: 'Dental Implants',       before: BA_IMPLANTS_BEFORE,   after: BA_IMPLANTS_AFTER   },
];

function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clamped = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(clamped);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updatePos(e.clientX);
  };
  const onPointerUp = () => { dragging.current = false; };

  return (
    <div className="flex flex-col gap-3">
      {/* Treatment label */}
      <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/50 px-1">{label}</p>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden cursor-ew-resize select-none bg-stone-100"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Before image (base layer, full width) */}
        <img src={before} alt={`Before — ${label}`} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" draggable={false} />

        {/* After image (clipped to right of divider) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <img src={after} alt={`After — ${label}`} className="absolute inset-0 w-full h-full object-cover object-center" draggable={false} />
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] pointer-events-none"
          style={{ left: `${pos}%` }}
        />

        {/* Handle knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none z-10"
          style={{ left: `${pos}%` }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5,6 2,9 5,12" />
            <polyline points="13,6 16,9 13,12" />
            <line x1="2" y1="9" x2="16" y2="9" />
          </svg>
        </div>

        {/* Before / After pill labels */}
        <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          Before
        </span>
        <span className="absolute top-3 right-3 bg-white/90 text-black text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          After
        </span>
      </div>
    </div>
  );
}

function BeforeAfterSection() {
  const reveal = useStaggeredReveal(1);

  return (
    <section
      ref={reveal.containerRef as RefObject<HTMLElement>}
      className="px-3 md:px-5 py-6 md:py-10"
      style={reveal.getAnimStyle(0)}
    >
      {/* Heading */}
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <h2
          className="font-bold text-black leading-[0.9] tracking-tight uppercase"
          style={{ fontSize: 'clamp(2.5rem,7vw,6rem)' }}
        >
          Real<br />Results
        </h2>
        <p className="text-sm md:text-base font-semibold text-black/50 md:mb-2 md:max-w-[300px] leading-relaxed">
          Drag the slider to compare before and after — real patients, real transformations.
        </p>
      </div>

      {/* 2×2 grid of sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {beforeAfterData.map((item) => (
          <BeforeAfterSlider
            key={item.label}
            label={item.label}
            before={item.before}
            after={item.after}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ SECTION
// ─────────────────────────────────────────────────────────────────────────────

const faqData = [
  {
    q: "Does it hurt?",
    a: "We prioritize comfortable, pain-free dentistry. Most procedures involve little to no discomfort, and we offer sedation options for patients who feel anxious about treatment.",
  },
  {
    q: "Do you accept my insurance?",
    a: "We accept most major insurance plans. Contact our office with your insurance details and we'll verify your coverage before your visit.",
  },
  {
    q: "What if I'm nervous about the dentist?",
    a: "You're not alone — many of our patients feel anxious about dental visits. Our team is trained to make you feel comfortable, and we're happy to walk you through every step before we begin.",
  },
  {
    q: "How often should I visit the dentist?",
    a: "We recommend a checkup and cleaning every six months for most patients, though your dentist may suggest a different schedule based on your specific needs.",
  },
  {
    q: "Do you see children?",
    a: "Yes! We welcome patients of all ages, from toddlers to seniors, and our team is experienced in making pediatric visits comfortable and even fun.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Please bring a valid photo ID, your insurance card (if applicable), and a list of any current medications. Arriving 10–15 minutes early to complete paperwork is appreciated.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`rounded-xl md:rounded-2xl border transition-colors duration-300 ${isOpen ? 'border-black bg-black text-white' : 'border-black/10 bg-white text-black hover:border-black/30'}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-7 text-left"
      >
        <span className={`text-lg md:text-xl font-bold leading-snug ${isOpen ? 'text-white' : 'text-black'}`}>
          {q}
        </span>
        {/* Plus / Minus icon */}
        <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-white/40 text-white' : 'border-black/20 text-black'}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13" className={`transition-all duration-300 origin-center ${isOpen ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`} />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        ref={answerRef}
        style={{
          maxHeight: isOpen ? `${answerRef.current?.scrollHeight ?? 200}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p className={`px-5 md:px-7 pb-5 md:pb-7 text-sm md:text-base font-medium leading-relaxed ${isOpen ? 'text-white/80' : 'text-black/70'}`}>
          {a}
        </p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reveal = useStaggeredReveal(1);

  return (
    <section
      ref={reveal.containerRef as RefObject<HTMLElement>}
      className="px-3 md:px-5 py-6 md:py-10"
      style={reveal.getAnimStyle(0)}
    >
      {/* Heading */}
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <h2
          className="font-bold text-black leading-[0.9] tracking-tight uppercase"
          style={{ fontSize: 'clamp(2.5rem,7vw,6rem)' }}
        >
          Frequently<br />Asked
        </h2>
        <p className="text-sm md:text-base font-semibold text-black/50 md:mb-2 md:max-w-[280px] leading-relaxed">
          Got questions? We've got answers. Don't see yours? Call us anytime.
        </p>
      </div>

      {/* Accordion list */}
      <div className="flex flex-col gap-2 md:gap-2.5">
        {faqData.map((item, i) => (
          <FAQItem
            key={i}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <BeforeAfterSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

const servicesPageData = [
  { 
    title: "General Checkups\n& Cleanings", 
    desc: "Comprehensive exams, cleanings, and preventive care to keep your smile healthy year-round.", 
    img: SVC_CHECKUPS,
    theme: "image"
  },
  { 
    title: "Cosmetic\nDentistry", 
    desc: "Whitening, veneers, and smile makeovers crafted to give you the confidence you deserve.", 
    img: SVC_COSMETIC,
    theme: "image"
  },
  { 
    title: "Dental\nImplants", 
    desc: "Permanent, natural-looking tooth replacements that restore your smile and oral function.", 
    img: SVC_IMPLANTS,
    theme: "image"
  },
  { 
    title: "Invisalign\n& Braces", 
    desc: "Discreet orthodontic solutions for teens and adults — straighter teeth, clearer confidence.", 
    img: SVC_BRACES,
    theme: "image"
  },
  { 
    title: "Teeth\nWhitening", 
    desc: "Professional whitening treatments for a brighter, more confident smile.", 
    img: SVC_WHITENING,
    theme: "image"
  },
  { 
    title: "Emergency\nCare", 
    desc: "Same-day appointments for dental pain, breaks, or unexpected issues.", 
    img: SVC_EMERGENCY,
    theme: "image"
  },
];

function Services() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header section */}
      <div className="pt-24 md:pt-32 px-3 md:px-5 pb-6 md:pb-10">
        <h1 
          className="text-black font-bold leading-[0.79] tracking-tight uppercase" 
          style={{ fontSize: 'clamp(3rem,11vw,11rem)' }}
        >
          Our<br />Services
        </h1>
      </div>

      {/* Grid section */}
      <div className="px-3 md:px-5 pb-3 md:pb-5 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2 flex-1">
        {servicesPageData.map((svc, i) => {
          const isImage = svc.theme === 'image';
          const isDark = svc.theme === 'dark';

          return (
            <div 
              key={svc.title}
              className={`relative rounded-xl md:rounded-2xl overflow-hidden min-h-[320px] md:min-h-[450px] flex flex-col justify-end p-5 md:p-8 ${!isImage && isDark ? 'bg-zinc-900 text-white' : ''} ${!isImage && !isDark ? 'bg-stone-100 text-black' : ''}`}
            >
              {isImage && (
                <>
                  <img src={svc.img!} className="absolute inset-0 w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </>
              )}

              <div className={`absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold z-10 ${isImage || isDark ? 'border-white text-white' : 'border-black text-black'}`}>
                0{i + 1}
              </div>

              <div className="relative z-10">
                <h3 className={`text-3xl md:text-4xl font-bold whitespace-pre-line leading-[1.05] tracking-tight mb-3 md:mb-4 ${isImage || isDark ? 'text-white' : 'text-black'}`}>
                  {svc.title}
                </h3>
                <p className={`text-sm md:text-base font-semibold max-w-[90%] md:max-w-[80%] ${isImage || isDark ? 'text-white/90' : 'text-black/80'}`}>
                  {svc.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const phone = data.get('phone') as string;

    let hasError = false;
    const newErrors = { name: '', phone: '' };
    if (!name || name.trim() === '') { 
      newErrors.name = 'Full name is required'; 
      hasError = true; 
    }
    if (!phone || phone.trim() === '') { 
      newErrors.phone = 'Phone number is required'; 
      hasError = true; 
    }

    setErrors(newErrors);
    if (hasError) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Header section */}
      <div className="pt-24 md:pt-32 px-3 md:px-5 pb-6 md:pb-10">
        <h1 
          className="text-black font-bold leading-[0.79] tracking-tight uppercase" 
          style={{ fontSize: 'clamp(3rem,11vw,11rem)' }}
        >
          Contact<br />Us
        </h1>
      </div>

      <div className="flex-1 px-3 md:px-5 pb-5 md:pb-10 flex flex-col md:flex-row gap-1.5 md:gap-2">
        
        {/* Left Column - Contact Info & Map */}
        <div className="md:w-1/2 flex flex-col gap-1.5 md:gap-2">
          {/* Info Card */}
          <div className="bg-zinc-100 rounded-xl md:rounded-2xl p-6 md:p-10 flex flex-col justify-center min-h-[300px]">
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-6 md:mb-8">Get in Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs md:text-sm font-bold text-black/50 uppercase tracking-wider mb-2">Location</h3>
                <p className="text-base md:text-lg font-semibold text-black">123 Smile Avenue<br/>Suite 200<br/>San Francisco, CA 94102</p>
              </div>
              
              <div>
                <h3 className="text-xs md:text-sm font-bold text-black/50 uppercase tracking-wider mb-2">Contact</h3>
                <p className="text-base md:text-lg font-semibold text-black mb-1">(415) 555-0100</p>
                <p className="text-base md:text-lg font-semibold text-black">hello@dentalhealth.dental</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-xs md:text-sm font-bold text-black/50 uppercase tracking-wider mb-2">Hours</h3>
                <ul className="text-base md:text-lg font-semibold text-black space-y-1">
                  <li className="flex justify-between max-w-[250px]"><span>Mon - Fri</span> <span>8:00 AM - 6:00 PM</span></li>
                  <li className="flex justify-between max-w-[250px]"><span>Saturday</span> <span>9:00 AM - 3:00 PM</span></li>
                  <li className="flex justify-between max-w-[250px] text-black/50"><span>Sunday</span> <span>Closed</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-stone-200 rounded-xl md:rounded-2xl min-h-[250px] flex-1 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-black/30 font-bold text-xl md:text-2xl uppercase tracking-widest">Interactive Map</span>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="md:w-1/2 bg-stone-50 rounded-xl md:rounded-2xl p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">Book an Appointment</h2>
          <p className="text-sm md:text-base font-semibold text-black/60 mb-6 md:mb-8">Fill out the form below and we'll get back to you shortly.</p>
          
          {status === 'success' ? (
            <div className="flex-1 flex items-center justify-center flex-col text-center py-10">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">Request Received!</h3>
              <p className="text-black/70 font-medium">Thank you for contacting us. Our team will reach out to confirm your appointment details soon.</p>
              <Button 
                onClick={() => { setStatus('idle'); setErrors({name:'', phone:''}); }}
                variant="outline"
                className="mt-8"
              >
                Book Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="name" className="text-xs font-bold text-black/70 uppercase tracking-wide mb-1.5 pl-1">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Jane Doe"
                    className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3.5 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow`}
                  />
                  {errors.name && <span className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.name}</span>}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label htmlFor="phone" className="text-xs font-bold text-black/70 uppercase tracking-wide mb-1.5 pl-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="(555) 123-4567"
                    className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3.5 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow`}
                  />
                  {errors.phone && <span className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.phone}</span>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col relative">
                  <label htmlFor="service" className="text-xs font-bold text-black/70 uppercase tracking-wide mb-1.5 pl-1">Service</label>
                  <select 
                    id="service" 
                    name="service" 
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow appearance-none cursor-pointer"
                  >
                    <option value="">Select a service...</option>
                    <option value="General Checkups & Cleanings">General Checkups & Cleanings</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Invisalign & Braces">Invisalign & Braces</option>
                    <option value="Teeth Whitening">Teeth Whitening</option>
                    <option value="Emergency Care">Emergency Care</option>
                  </select>
                  <div className="absolute right-4 bottom-4 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label htmlFor="date" className="text-xs font-bold text-black/70 uppercase tracking-wide mb-1.5 pl-1">Preferred Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="notes" className="text-xs font-bold text-black/70 uppercase tracking-wide mb-1.5 pl-1">Message / Notes</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow resize-none"
                ></textarea>
              </div>

              <Button 
                type="submit" 
                variant="primary"
                disabled={status === 'submitting'}
                className="mt-2 md:mt-4 w-full py-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Book Appointment'}
              </Button>
            </form>
          )}
        </div>

      </div>

      {/* Insurance & Payment Section */}
      <div className="px-3 md:px-5 pb-5 md:pb-10">
        <div className="bg-zinc-900 rounded-xl md:rounded-2xl p-8 md:p-12 lg:p-16 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Insurance & Payment</h2>
          <p className="text-base md:text-lg font-medium text-white/80 max-w-2xl mb-8 md:mb-12 leading-relaxed">
            We accept most major insurance plans and offer flexible payment options to make quality dental care accessible.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            {['Delta Dental', 'Cigna', 'Aetna', 'MetLife', 'Guardian', 'United Healthcare'].map((provider) => (
              <span key={provider} className="bg-white/10 border border-white/20 text-white text-sm md:text-base font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors cursor-default select-none">
                {provider}
              </span>
            ))}
          </div>
          
          <p className="text-sm md:text-base font-bold text-white/70 max-w-xl">
            New patients welcome — free consultation available. Ask us about financing options for larger treatment plans.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const statsData = [
  { label: "Years of Practice", value: "15+" },
  { label: "Happy Patients", value: "2,400+" },
  { label: "Google Rating", value: "4.9★" },
  { label: "Family-Friendly", value: "100%" },
];

const teamData = [
  { name: "Sarah Jenkins", role: "Dental Hygienist", img: ABOUT_SARAH },
  { name: "Michael Chang", role: "Office Manager", img: ABOUT_MICHAEL },
  { name: "Elena Rodriguez", role: "Dental Assistant", img: ABOUT_ELENA },
];

function About() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Header section */}
      <div className="pt-24 md:pt-32 px-3 md:px-5 pb-6 md:pb-10">
        <h1 
          className="text-black font-bold leading-[0.79] tracking-tight uppercase" 
          style={{ fontSize: 'clamp(3rem,11vw,11rem)' }}
        >
          About<br />Us
        </h1>
      </div>

      <div className="flex-1 px-3 md:px-5 pb-5 md:pb-10 flex flex-col gap-1.5 md:gap-2">
        
        {/* Bio Section */}
        <div className="bg-zinc-100 rounded-xl md:rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          <div className="md:w-1/2 relative min-h-[300px]">
            <img src={ABOUT_DR_SMITH} alt="Dr. Smith" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">Meet<br />Dr. Smith</h2>
            <p className="text-base md:text-lg font-medium text-black/80 mb-6 md:mb-8 leading-relaxed">
              With over 15 years of experience and a passion for pain-free dentistry, Dr. Smith and our dedicated team believe every patient deserves to feel comfortable, respected, and excited about their smile.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Board-certified general & cosmetic dentist",
                "Continuing education in implants & orthodontics",
                "Bilingual team (English / Spanish)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-black/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
          {statsData.map((stat, i) => (
            <div key={i} className="bg-stone-50 rounded-xl md:rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
              <div className="text-4xl md:text-5xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm font-semibold text-black/60 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="pt-6 md:pt-10 pb-2">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 md:mb-8 tracking-tight px-2">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-2">
            {teamData.map((member, i) => (
              <div key={i} className="bg-zinc-100 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[400px] flex flex-col justify-end p-6">
                <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm md:text-base font-semibold text-white/80">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
