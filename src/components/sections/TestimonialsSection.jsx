import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    id: 'priya-menon',
    name: 'Priya Menon',
    location: 'Indiranagar, Bengaluru',
    role: '8-Year Daily Brewer',
    quote:
      'The Kafee Pudi Ultra Rich has become the bedrock of our morning ritual. The fragrance that releases the moment you snip the foil pack carries straight back to Malleshwaram. Eight years in, and the roast profile hasn’t wavered once.',
    product: 'Kafee Pudi — Ultra Rich',
    stars: 5,
  },
  {
    id: 'rajesh-kumar',
    name: 'Rajesh Kumar',
    location: 'T. Nagar, Chennai',
    role: 'Heritage Cafe Proprietor',
    quote:
      'Running a traditional South Indian filter coffee outlet means our patrons notice even the slightest shift in decoction density. Brown Label Extra Strong yields that dense, golden-caramel crema head consistently with every single batch.',
    product: 'Kafee Pudi — Extra Strong',
    stars: 5,
  },
  {
    id: 'ananya-sharma',
    name: 'Ananya Sharma',
    location: 'Bandra, Mumbai',
    role: 'Specialty Coffee Connoisseur',
    quote:
      'I had spent years drinking high-end imported Italian espresso roasts before discovering Brown Label’s Premium Gold. The delicate stone-fruit sweetness and total absence of acrid bitterness is exceptional. It is my permanent morning brew.',
    product: 'Kafee Pudi — Premium Gold',
    stars: 5,
  },
  {
    id: 'dr-vikram-rao',
    name: 'Dr. Vikram Rao',
    location: 'Jubilee Hills, Hyderabad',
    role: 'Whole Bean Connoisseur',
    quote:
      'The roasted whole beans are roasted with surgical precision. Freshly ground every morning at 6 AM, the lingering bittersweet cocoa aroma sets the entire tone for the day. True heritage Indian craft at its finest.',
    product: 'Roasted Coffee Beans',
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-28 sm:py-36 bg-espresso-950 text-cream relative overflow-hidden dark-grain hairline-dark-t hairline-dark-b"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-brass/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Marker */}
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-gold-brass block mb-3">
            05 / Customer Chronicles
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-light tracking-wide text-cream/90">
            Preserved in the Daily Routine
          </h2>
        </div>

        {/* Dominant Editorial Quote - Unboxed */}
        <div className="min-h-[280px] sm:min-h-[220px] flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {Array.from({ length: current.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold-brass fill-gold-brass" />
                ))}
              </div>

              {/* Quote Body */}
              <blockquote className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-cream/95 leading-[1.3] font-light tracking-tight mb-10">
                “{current.quote}”
              </blockquote>

              {/* Customer Attribution */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
                <span className="font-display text-lg font-bold text-cream tracking-wide">
                  {current.name}
                </span>
                <span className="hidden sm:inline text-gold-brass">·</span>
                <span className="text-xs uppercase tracking-widest text-caramel/90 font-medium">
                  {current.location}
                </span>
                <span className="hidden sm:inline text-gold-brass">·</span>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-emerald-400/90 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  {current.role}
                </span>
              </div>

              <div className="mt-2 text-center">
                <span className="text-[11px] uppercase tracking-widest text-cream/40 font-mono">
                  Blend: <span className="text-cream/70">{current.product}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Editorial Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8 max-w-xl mx-auto">
          <button
            onClick={prev}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-cream/50 hover:text-gold-brass transition-colors font-mono group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Prev</span>
          </button>

          {/* Slide Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-gold-brass' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <span className="font-mono text-xs text-cream/40 ml-2">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
          </div>

          <button
            onClick={next}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-cream/50 hover:text-gold-brass transition-colors font-mono group"
            aria-label="Next testimonial"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
