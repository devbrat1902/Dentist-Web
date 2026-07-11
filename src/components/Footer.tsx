import React from 'react';
import { Link } from 'react-router-dom';

/** Renders a visually-muted, non-interactive label with a "Coming soon" tooltip on hover */
function ComingSoonLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      title="Coming soon"
      aria-label={`${children} — coming soon`}
      className={`relative inline-block opacity-40 cursor-default select-none group ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/20 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm border border-white/10">
        Coming soon
      </span>
    </span>
  );
}

export function Footer() {
  const navLinks = ['Home', 'Services', 'About', 'Gallery', 'Contact'];

  return (
    <footer className="bg-black text-white py-12 md:py-20 px-4 md:px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">

          {/* Logo & Blurb */}
          <div className="flex flex-col col-span-1">
            <div className="flex flex-col mb-4">
              <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-none text-white">
                Dental
              </span>
              <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-none -mt-1.5 md:-mt-2 text-white">
                Health
              </span>
              <span className="text-[10px] md:text-xs font-medium leading-none mt-1.5 md:mt-2 text-white/70 uppercase tracking-widest">
                quality healthcare
              </span>
            </div>
            <p className="text-white/60 text-sm font-medium mt-4 max-w-[250px]">
              Providing professional dental services that match the current technologies in a comfortable and friendly environment.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col col-span-1">
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white/50 text-sm">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isRouterLink = ['Home', 'Services', 'About', 'Contact'].includes(link);
                const to = link === 'Home' ? '/' : `/${link.toLowerCase()}`;

                if (isRouterLink) {
                  return (
                    <li key={link}>
                      <Link to={to} className="text-base font-bold hover:text-white/70 transition-colors">
                        {link}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={link}>
                    <ComingSoonLink className="text-base font-bold">{link}</ComingSoonLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col col-span-1">
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white/50 text-sm">Contact Us</h4>
            <address className="not-italic flex flex-col gap-3 text-base font-medium">
              <p>
                123 Smile Avenue<br />
                Suite 200<br />
                West New York, NJ 07093
              </p>
              <a href="tel:+10005550000" className="font-bold text-lg mt-2 hover:text-white/70 transition-colors">(000) 000-0000</a>
            </address>
          </div>

          {/* Hours & Socials */}
          <div className="flex flex-col col-span-1">
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white/50 text-sm">Hours</h4>
            <ul className="flex flex-col gap-2 text-sm font-medium mb-8">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon - Fri</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Saturday</span>
                <span>9:00 AM - 3:00 PM</span>
              </li>
              <li className="flex justify-between pb-2 text-white/50">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>

            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white/50 text-sm">Follow Us</h4>
            <div className="flex gap-4">
              {/* X / Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors" aria-label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs font-semibold">
          <p>© 2026 Dental Health. All rights reserved.</p>
          <div className="flex gap-6">
            <ComingSoonLink>Privacy Policy</ComingSoonLink>
            <ComingSoonLink>Terms of Service</ComingSoonLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
