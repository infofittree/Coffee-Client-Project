import { MapPin, Phone, Mail, ShieldCheck, MessageCircle } from 'lucide-react';

const footerNavLinks = {
  'Our Blends': [
    { label: 'Kafee Pudi — Ultra Rich', href: '#products' },
    { label: 'Kafee Pudi — Extra Strong', href: '#products' },
    { label: 'Kafee Pudi — Premium Gold', href: '#products' },
    { label: 'Roasted Coffee Beans', href: '#products' },
  ],
  'The Roastery': [
    { label: 'Our Story (Since 1984)', href: '#heritage' },
    { label: 'The Origin Terroirs', href: '#statement' },
    { label: 'Decoction Brew Guide', href: '#brewing' },
    { label: 'Wholesale & B2B Supply', href: '#wholesale' },
    { label: 'Roastery Operations Portal', href: '#admin' },
  ],
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#0B0607] text-cream relative overflow-hidden dark-grain hairline-dark-t"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-12 relative z-10">
        {/* Editorial Brand Statement Banner */}
        <div className="pb-14 sm:pb-20 border-b border-white/10">
          <span className="text-xs uppercase font-body font-semibold tracking-editorial text-gold-brass block mb-3">
            The Master Roasters of Bengaluru · 43 Years of Heritage (Est. 1984)
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream leading-[1.12]">
              BREW SOMETHING <br />
              <span className="italic font-serif text-caramel-light">TRULY DIFFERENT.</span>
            </h2>
            <div className="max-w-md">
              <p className="text-sm sm:text-base text-cream/75 leading-relaxed font-body font-light">
                43 years of thermal discipline, preserving authentic South Indian filter coffee culture from estate harvest to the traditional morning tumbler.
              </p>
            </div>
          </div>
        </div>

        {/* Balanced 4-Column Directory Grid */}
        <div className="py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-white/10">
          {/* Column 1: Brand & Heritage (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-14 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Brown Label Coffee Since 1984"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-cream tracking-wide leading-tight">
                  BROWN LABEL COFFEE
                </h3>
                <p className="text-xs tracking-wider text-caramel-light uppercase font-body mt-0.5">
                  Private Limited · Bengaluru · Est. 1984
                </p>
              </div>
            </div>

            <p className="text-cream/70 text-sm leading-relaxed max-w-sm font-body font-light">
              Artisanal drum-roasted South Indian filter coffee and whole beans, shade-grown and estate-sourced from Coorg and Chikmagalur.
            </p>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-cream/80 font-body">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Grade-A Certified · 100% Pure Coffee</span>
              </div>
            </div>
          </div>

          {/* Column 2: Our Blends (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-cream/90 font-body mb-4">
              Our Blends
            </h4>
            <ul className="space-y-2.5">
              {footerNavLinks['Our Blends'].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold-brass font-body transition-colors duration-200 block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The Roastery (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-cream/90 font-body mb-4">
              The Roastery
            </h4>
            <ul className="space-y-2.5">
              {footerNavLinks['The Roastery'].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold-brass font-body transition-colors duration-200 block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Roastery Desk & Direct Contact (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-cream/90 font-body mb-4">
              Roastery Desk
            </h4>

            <div className="space-y-3.5 text-sm">
              {/* Address */}
              <div className="flex items-start gap-3 text-cream/75">
                <MapPin className="w-4 h-4 text-gold-brass mt-0.5 shrink-0" />
                <span className="leading-relaxed font-body">
                  315/A, Corpn. No.51, 2nd Main, N.S. Palya,<br />
                  Bannerghatta Road, Bengaluru — 560 076, Karnataka
                </span>
              </div>

              {/* Clickable Telephone */}
              <div className="flex items-center gap-3 text-cream/75">
                <Phone className="w-4 h-4 text-gold-brass shrink-0" />
                <a
                  href="tel:+918026684573"
                  className="hover:text-gold-brass transition-colors font-body font-medium"
                  aria-label="Call Brown Label Coffee"
                >
                  080-2668 4573 / 74
                </a>
              </div>

              {/* Clickable Email */}
              <div className="flex items-center gap-3 text-cream/75">
                <Mail className="w-4 h-4 text-gold-brass shrink-0" />
                <a
                  href="mailto:brownlabelcoffee1984@gmail.com"
                  className="hover:text-gold-brass transition-colors font-body"
                  aria-label="Email Brown Label Coffee"
                >
                  brownlabelcoffee1984@gmail.com
                </a>
              </div>

              {/* WhatsApp Quick Order Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918026684573?text=Hi%20Brown%20Label%20Coffee!%20I'd%20like%20to%20inquire%20about%20ordering%20coffee."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 hover:text-emerald-200 text-xs font-semibold tracking-wide transition-all font-body shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory, Compliance & Social Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              FSSAI Lic. 11214334000045
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-[11px] text-cream/60">
              Pkg. Reg. KAR-109/14-15
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[11px] text-cream/60 font-body">
              Zero Artificial Additives
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/thebrownlabelcoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-gold-brass transition-colors p-1.5"
              aria-label="Instagram Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              className="text-cream/50 hover:text-gold-brass transition-colors p-1.5"
              aria-label="Facebook Page"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a
              href="#"
              className="text-cream/50 hover:text-gold-brass transition-colors p-1.5"
              aria-label="Twitter Profile"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Desk Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50 font-body">
          <span>© {new Date().getFullYear()} Brown Label Coffee Private Limited. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Crafted with difference in Bengaluru.</span>
            <span>·</span>
            <a
              href="#admin"
              className="text-gold-brass/75 hover:text-gold-brass transition-colors uppercase tracking-wider font-semibold text-[11px]"
            >
              Roastery Portal ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
