import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Scale, Lightbulb, Coffee } from 'lucide-react';
import { brewingGuides } from '../../data/brewingGuides';

export default function BrewingGuide() {
  const [activeGuide, setActiveGuide] = useState(0);
  const [cupCount, setCupCount] = useState(2);
  const [strength, setStrength] = useState('Traditional'); // 'Mild', 'Traditional', 'Intense'

  const guide = brewingGuides[activeGuide];

  // Dynamic ratio configurator
  const strengthMultiplier = strength === 'Mild' ? 0.85 : strength === 'Intense' ? 1.25 : 1.0;
  const basePowder = activeGuide === 0 ? 16 : activeGuide === 1 ? 15 : 24;
  const baseWater = activeGuide === 0 ? 80 : activeGuide === 1 ? 150 : 200;

  const totalPowder = Math.round(basePowder * cupCount * strengthMultiplier);
  const totalWater = Math.round(baseWater * cupCount);

  return (
    <section id="brewing" className="py-28 sm:py-36 bg-[#160E11] text-cream relative overflow-hidden dark-grain hairline-t hairline-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-gold-brass block mb-3">
            The Brewing Ritual
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-normal tracking-tight text-cream">
            The Perfect Decoction
          </h2>
          <p className="font-display italic text-xl text-caramel-light/80 mt-2 font-light">
            “From bean to cup.”
          </p>
        </div>

        {/* Method Switcher Tabs */}
        <div className="flex justify-center border-b border-white/10 max-w-xl mx-auto mb-16">
          {brewingGuides.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActiveGuide(i)}
              className={`flex-1 py-4 text-xs font-body font-semibold tracking-wider uppercase transition-all relative ${
                activeGuide === i
                  ? 'text-gold-brass font-bold'
                  : 'text-cream/50 hover:text-cream'
              }`}
            >
              <span>{g.title}</span>
              {activeGuide === i && (
                <motion.div
                  layoutId="brewingUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-brass"
                />
              )}
            </button>
          ))}
        </div>

        {/* Luxury Configurator Panel */}
        <div className="max-w-4xl mx-auto mb-20 p-8 sm:p-10 bg-espresso-950 border border-white/10 rounded-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Controls (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-editorial text-cream/50 font-mono block mb-2">
                  Number of Cups
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((cups) => (
                    <button
                      key={cups}
                      onClick={() => setCupCount(cups)}
                      className={`w-12 h-10 text-xs font-mono font-bold uppercase rounded-xs transition-all ${
                        cupCount === cups
                          ? 'bg-gold-brass text-espresso-950'
                          : 'border border-white/15 text-cream/70 hover:border-white/30'
                      }`}
                    >
                      {cups}c
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-editorial text-cream/50 font-mono block mb-2">
                  Extraction Strength
                </span>
                <div className="flex gap-2">
                  {['Mild', 'Traditional', 'Intense'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStrength(s)}
                      className={`px-4 py-2 text-xs font-body font-semibold tracking-wider uppercase rounded-xs transition-all ${
                        strength === s
                          ? 'bg-white/15 text-cream border border-gold-brass'
                          : 'border border-white/10 text-cream/50 hover:border-white/20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output (5 cols) */}
            <div className="md:col-span-5 md:pl-8 md:border-l md:border-white/10">
              <span className="text-[10px] uppercase tracking-editorial text-gold-brass font-mono block mb-3">
                Calculated Decoction Yield
              </span>
              <div className="space-y-4">
                <div>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-cream font-mono">
                    {totalPowder}g
                  </span>
                  <span className="text-xs uppercase tracking-wider text-cream/50 ml-2 font-mono">
                    Fresh Grounds
                  </span>
                </div>
                <div>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-gold-brass font-mono">
                    {totalWater}ml
                  </span>
                  <span className="text-xs uppercase tracking-wider text-cream/50 ml-2 font-mono">
                    Boiling Water (95°C)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Progressive Steps */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 hairline-b">
            <span className="text-xs uppercase tracking-editorial font-bold text-cream/50">
              The {guide.title} Sequence
            </span>
            <span className="text-xs font-mono text-cream/50 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-brass" /> {guide.duration}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {guide.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 p-6 bg-espresso-950/60 border border-white/5 hover:border-white/15 transition-all rounded-xs"
              >
                <span className="font-mono text-sm font-bold text-gold-brass shrink-0 pt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-light">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Barista Secret Tip */}
          <div className="p-6 border-l-2 border-gold-brass bg-espresso-950/90 mt-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-editorial font-semibold text-gold-brass mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>The Roaster's Secret</span>
            </div>
            <p className="text-cream/70 text-xs sm:text-sm font-light leading-relaxed">
              {guide.tips}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
