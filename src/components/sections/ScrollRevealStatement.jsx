import { motion } from 'framer-motion';

export default function ScrollRevealStatement() {
  return (
    <section
      id="statement"
      className="py-28 sm:py-36 bg-[#FBF9F5] text-espresso-950 relative overflow-hidden paper-grain hairline-light-b hairline-light-t"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Subtle Label */}
        <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-espresso-500 block mb-8">
          The Origin Journey
        </span>

        {/* Large Editorial Serif Statement */}
        <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-espresso-900 max-w-4xl mx-auto tracking-tight mb-10">
          “From the misty sanctuaries of the Western Ghats to your morning tumbler.”
        </blockquote>

        {/* Origin Terroir Lineage */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 pt-6 border-t border-espresso-950/10 max-w-xl mx-auto">
          <div className="text-center">
            <span className="block font-display text-lg font-bold text-espresso-900">Coorg</span>
            <span className="text-[10px] uppercase tracking-widest text-espresso-500">1,200m Elevation</span>
          </div>
          <span className="text-gold-brass text-lg">·</span>
          <div className="text-center">
            <span className="block font-display text-lg font-bold text-espresso-900">Chikmagalur</span>
            <span className="text-[10px] uppercase tracking-widest text-espresso-500">Baba Budan Hills</span>
          </div>
        </div>
      </div>
    </section>
  );
}
