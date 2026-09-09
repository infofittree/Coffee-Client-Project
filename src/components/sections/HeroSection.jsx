import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SceneContainer from '../3d/SceneContainer';
import ScrollCoffeeBean from '../3d/ScrollCoffeeBean';
import FloatingBeansParticles from '../3d/FloatingBeansParticles';

const stats = [
  { value: '40+', label: 'Years of Craft' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '100%', label: 'Natural Beans' },
  { value: '210°C', label: 'Precision Roasting' },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-32 pb-16 bg-espresso-950 text-cream"
    >
      {/* Warm Ambient Studio Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950 via-[#140C0E] to-espresso-950 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-forest-900/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Hero Spread */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Editorial Hierarchy (7 cols) */}
          <div className="lg:col-span-7">
            {/* Small Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-gold-brass" />
              <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-gold-brass">
                Since 1984 &nbsp;·&nbsp; Bengaluru
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[0.96] text-cream mb-6">
              THE ART OF <br />
              <span className="font-bold italic text-serif-foil">SOUTH INDIAN</span> <br />
              ROASTING.
            </h1>

            {/* Tagline */}
            <p className="font-display italic text-xl sm:text-2xl text-caramel-light/90 mb-5 font-light">
              "Coffee with Difference....."
            </p>

            {/* Description */}
            <p className="text-cream/70 text-base sm:text-lg max-w-lg mb-10 leading-relaxed font-light">
              Four decades of artisanal roasting excellence. Hand-selected Arabica and Robusta beans from the shade-grown estates of Coorg, Chikmagalur, and Wayanad — roasted to order in Bengaluru for the timeless filter decoction.
            </p>

            {/* Differentiated CTAs */}
            <div className="flex flex-wrap items-center gap-6">
              <a href="#products" className="btn-brass group">
                <span>Explore the Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#heritage"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-cream/70 hover:text-cream transition-colors py-2 border-b border-white/20 hover:border-cream"
              >
                <span>Discover Our Story</span>
              </a>
            </div>
          </div>

          {/* Right: Uncaged 3D Coffee Bean with Generous Whitespace (5 cols) */}
          <div className="lg:col-span-5 relative h-[440px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
            {/* Soft Warm Pedestal Glow */}
            <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-transparent blur-2xl pointer-events-none" />

            <SceneContainer camera={{ position: [0, 0, 4.6], fov: 40 }}>
              <ScrollCoffeeBean />
              <FloatingBeansParticles count={6} />
            </SceneContainer>
          </div>
        </div>
      </div>

      {/* Refined Editorial Stats Row (No cards, subtle hairline dividers) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full mt-16 pt-8 hairline-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((item, idx) => (
            <div
              key={item.label}
              className={`text-left ${idx !== 0 ? 'md:pl-8 md:border-l md:border-white/10' : ''}`}
            >
              <span className="block font-display text-3xl sm:text-4xl font-normal text-cream tracking-tight">
                {item.value}
              </span>
              <span className="block text-[10px] sm:text-[11px] font-body uppercase tracking-widest text-cream/50 mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="relative z-10 text-center pt-8">
        <a
          href="#statement"
          className="inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-editorial text-cream/40 hover:text-cream transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5 text-gold-brass/80 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
