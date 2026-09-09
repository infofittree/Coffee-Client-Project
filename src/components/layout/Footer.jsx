import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

const footerLinks = {
  Roastery: [
    { label: 'Kafee Pudi — Ultra Rich', href: '#products' },
    { label: 'Kafee Pudi — Extra Strong', href: '#products' },
    { label: 'Kafee Pudi — Premium Gold', href: '#products' },
    { label: 'Roasted Coffee Beans', href: '#products' },
  ],
  Heritage: [
    { label: 'Our Story (Since 1984)', href: '#heritage' },
    { label: 'The Origin Terroirs', href: '#statement' },
    { label: '3D Sensory Studio', href: '#showcase-3d' },
    { label: 'Decoction Brew Guide', href: '#brewing' },
  ],
  Commercial: [
    { label: 'HoReCa & Cafe Supply', href: '#wholesale' },
    { label: 'Custom Extraction Profiling', href: '#wholesale' },
    { label: 'Pan-India Scheduled Logistics', href: '#wholesale' },
    { label: 'Commercial Sample Kit', href: '#wholesale' },
  ],
  Assurance: [
    { label: 'FSSAI Lic: 11214334000045', href: '#contact' },
    { label: 'Pkg Reg: KAR-109/14-15', href: '#contact' },
    { label: 'Freshness Valve Standard', href: '#' },
    { label: 'Zero Artificial Additives', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#0B0607] text-cream relative overflow-hidden dark-grain hairline-dark-t"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-12 relative z-10">
        {/* Massive Editorial Brand Statement */}
        <div className="pb-16 sm:pb-24 border-b border-white/10">
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold-brass block mb-4">
            The Master Roasters of Bengaluru · Est. 1984
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-cream/90 leading-[1.05]">
              BREW SOMETHING <br />
              <span className="italic font-serif text-caramel">DIFFERENT.</span>
            </h2>
            <div className="max-w-sm">
              <p className="text-xs sm:text-sm text-cream/60 leading-relaxed font-body">
                Four decades of roasting mastery, preserving South Indian coffee heritage with unyielding fidelity to estate origin, timing, and craft.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12 border-b border-white/10">
          {/* Brand & Roastery Column (2 cols on lg) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-14 rounded-xs overflow-hidden bg-espresso-900 border border-white/15 flex items-center justify-center">
                <img
                  src="/images/logo.jpeg"
                  alt="Brown Label Coffee Since 1984"
                  className="h-full w-full object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-cream tracking-wide">
                  BROWN LABEL COFFEE
                </h3>
                <p className="text-[10px] tracking-widest text-caramel uppercase font-mono">
                  Private Limited · Bengaluru
                </p>
              </div>
            </div>

            <p className="text-cream/60 text-xs leading-relaxed max-w-sm font-body">
              Estate-sourced Arabica and Robusta beans from Coorg, Chikmagalur, and Wayanad. Roasted in small artisanal batches to peak aromatic depth.
            </p>

            <div className="space-y-2.5 text-xs text-cream/65 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold-brass mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  315/A, Corpn. No.51, 2nd Main, N.S. Palya,<br />
                  Bannerghatta Road, Bengaluru — 560 076, Karnataka
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold-brass shrink-0" />
                <span className="font-mono">080-2668 4573 / 74</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold-brass shrink-0" />
                <span className="font-mono">brownlabelcoffee1984@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="font-mono text-[11px] font-bold text-cream/90 uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-cream/50 hover:text-gold-brass text-xs transition-colors duration-200 block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regulatory & Compliance Bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              FSSAI Lic. 11214334000045
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-[11px] text-cream/50">
              Pkg. Reg. KAR-109/14-15
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
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
            {/* Facebook */}
            <a
              href="#"
              className="text-cream/50 hover:text-gold-brass transition-colors p-1.5"
              aria-label="Facebook Page"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            {/* Twitter / X */}
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

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-cream/40 font-mono">
          <span>© {new Date().getFullYear()} Brown Label Coffee Private Limited. All rights reserved.</span>
          <span>Crafted with difference in Bengaluru.</span>
        </div>
      </div>
    </footer>
  );
}
