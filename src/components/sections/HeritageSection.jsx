import { ArrowRight, Compass, Sparkles } from 'lucide-react';

const origins = [
  {
    name: 'Chikmagalur',
    title: 'The Sacred Cradle',
    elevation: '1,100m – 1,450m',
    hills: 'Baba Budan Giri Ranges',
    description:
      'Where coffee was first seeded in India centuries ago. High-altitude rainfall and volcanic red loam yield Arabicas with bright floral notes, gentle citrus nuance, and raw cane sweetness.',
    accent: '#B88243',
  },
  {
    name: 'Coorg (Kodagu)',
    title: 'Misty Canopy Estates',
    elevation: '900m – 1,200m',
    hills: 'Brahmagiri Escarpment',
    description:
      'Ripened under two-tier forest canopies of native rosewood and wild fig. The slow maturation infuses the beans with dense chocolate undertones, roasted almonds, and heavy crema body.',
    accent: '#84A690',
  },
];

export default function HeritageSection() {
  return (
    <section id="heritage" className="py-24 sm:py-32 bg-cream text-espresso-950 relative overflow-hidden paper-grain">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Editorial Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 hairline-light-b">
          {/* Left Dominant Typography: 43 YEARS */}
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-espresso-500 block mb-3">
              The Bengaluru Roastery · Est. 1984
            </span>
            <div className="font-display leading-[0.88] tracking-tighter text-espresso-900 select-none">
              <span className="block text-7xl sm:text-9xl lg:text-[10.5rem] font-bold">
                43
              </span>
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-normal italic text-gold-brass font-display mt-2">
                Years of Mastery.
              </span>
            </div>
          </div>

          {/* Right Narrative Story Block */}
          <div className="lg:col-span-6 pt-4 lg:pt-8">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-espresso-900 mb-6 leading-snug">
              “Coffee with Difference” is not a slogan. It is 43 years of thermal discipline.
            </h2>
            <div className="space-y-5 text-espresso-700 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Founded in 1984 on Bannerghatta Road in Bengaluru, Brown Label Coffee has spent 43 continuous years mastering South Indian filter coffee. While mass markets turned to automated bulk roasting and excessive chicory fillers, our master roasters preserved the delicate art of drum roasting.
              </p>
              <p>
                Every single batch is calibrated by ambient monsoon humidity and bean density. By slowly caramelizing the natural bean sugars at a controlled 210°C, we capture the heavy body and sweet chocolate aroma that defines the iconic South Indian morning cup.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-espresso-950/10 flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-espresso-600">
              <div>
                <span className="block text-xl font-display font-bold text-espresso-900">315/A</span>
                <span className="text-[10px] text-espresso-500">Roastery No. 51</span>
              </div>
              <div className="h-8 w-px bg-espresso-950/10" />
              <div>
                <span className="block text-xl font-display font-bold text-espresso-900">100%</span>
                <span className="text-[10px] text-espresso-500">Shade-Grown</span>
              </div>
              <div className="h-8 w-px bg-espresso-950/10" />
              <div>
                <span className="block text-xl font-display font-bold text-gold-brass">PAN-INDIA</span>
                <span className="text-[10px] text-espresso-500">Fresh Roasted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Cinematic Photographic Moment: Terroir Heritage */}
        <div className="py-20">
          <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden rounded-sm shadow-md bg-espresso-900">
            <img
              src="/images/heritage-brew.webp"
              alt="Authentic South Indian artisanal filter coffee poured in traditional brass davara tumbler"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/35 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-cream max-w-lg">
              <span className="text-[10px] uppercase tracking-editorial font-semibold text-gold-brass block mb-1">
                The Terroir
              </span>
              <p className="font-display text-lg sm:text-2xl font-light italic leading-snug">
                Under wild fig and silver oak canopy, our beans ripen at their own unhurried pace.
              </p>
            </div>
          </div>
        </div>

        {/* Supporting Terroir Origin Spread (2-Column Magazine Columns) */}
        <div>
          <div className="flex items-center justify-between mb-10 pb-4 hairline-light-b">
            <span className="text-xs uppercase tracking-editorial font-bold text-espresso-500">
              The Heritage Origins
            </span>
            <span className="text-xs font-mono text-espresso-500">
              Western Ghats Biosphere · 12°N – 13°N
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {origins.map((origin) => (
              <div key={origin.name} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-2xl font-bold text-espresso-900">
                      {origin.name}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold text-espresso-600">
                      {origin.elevation}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-gold-brass font-medium block mb-3">
                    {origin.title}
                  </span>
                  <p className="text-espresso-700 text-xs sm:text-sm leading-relaxed font-light">
                    {origin.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-espresso-950/10 text-[11px] font-mono text-espresso-500">
                  {origin.hills}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
