import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Heritage', href: '#heritage' },
  { label: 'Collection', href: '#products' },
  { label: 'Brewing', href: '#brewing' },
  { label: 'Wholesale', href: '#wholesale' },
];

export default function Navbar({ onCartOpen, hasAnnouncement = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        hasAnnouncement && !scrolled ? 'top-[33px]' : 'top-0'
      } ${
        scrolled
          ? 'bg-espresso-950/92 backdrop-blur-md hairline-b py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark & Identity */}
          <a href="#home" className="flex items-center gap-3.5 group" aria-label="Brown Label Coffee Homepage">
            <div className="h-9 w-12 overflow-hidden bg-espresso-900 border border-white/10 rounded-xs flex items-center justify-center p-0.5">
              <img
                src="/images/logo.jpeg"
                alt="Brown Label Coffee"
                className="h-full w-full object-contain filter brightness-95 group-hover:brightness-105 transition-all"
              />
            </div>
            <div>
              <span className="block font-display text-base sm:text-lg font-bold tracking-tight text-cream group-hover:text-gold-brass transition-colors leading-none">
                BROWN LABEL
              </span>
              <span className="block text-[9px] tracking-editorial text-cream/40 uppercase font-body mt-0.5">
                Bengaluru · Since 1984
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-body font-medium tracking-wider uppercase text-cream/70 hover:text-cream transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-brass group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Commerce Actions */}
          <div className="flex items-center gap-5">
            <a
              href="#products"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-body font-semibold tracking-wider uppercase bg-gold-brass text-espresso-950 rounded-xs hover:bg-gold-light transition-all"
            >
              <span>Order Coffee</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onCartOpen}
              className="relative p-2 text-cream/80 hover:text-cream transition-colors"
              aria-label={`Open shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-brass text-espresso-950 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-cream/70 hover:text-cream"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-espresso-950 border-t border-white/10 px-8 py-8"
          >
            <div className="space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xl font-display text-cream/85 hover:text-gold-brass transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-6 border-t border-white/10">
                <a
                  href="#products"
                  onClick={() => setMobileOpen(false)}
                  className="btn-brass w-full text-center"
                >
                  Explore Collection
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
