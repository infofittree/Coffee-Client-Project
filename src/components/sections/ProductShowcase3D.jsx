import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Rotate3D, Check } from 'lucide-react';
import SceneContainer from '../3d/SceneContainer';
import InteractivePouch3D from '../3d/InteractivePouch3D';
import SteamingCup3D from '../3d/SteamingCup3D';
import ScrollCoffeeBean from '../3d/ScrollCoffeeBean';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

const sensoryProfiles = {
  'kafee-pudi-ultra-rich': {
    roastDesc: 'Medium-Dark Slow Roast',
    character: 'Rich dark chocolate undertones with a thick, velvety crema head.',
    bestFor: 'Classic Tumbler & Davara Filter Coffee',
  },
  'kafee-pudi-extra-strong': {
    roastDesc: 'Dark Thermal Roast',
    character: 'Intense smoky cocoa aroma designed for a commanding morning decoction.',
    bestFor: 'Strong Morning Wake-Up Decoction',
  },
  'kafee-pudi-premium-gold': {
    roastDesc: 'Artisanal Medium Roast',
    character: 'Wild blossom honey and toasted almond with zero bitterness.',
    bestFor: 'Pour-Over, Aeropress & Mild Filter',
  },
  'roasted-coffee-beans': {
    roastDesc: 'Hand-Selected Estate Whole Beans',
    character: 'Crisp fruity brightness balanced by smooth roasted hazelnut finish.',
    bestFor: 'Home Grinding, Espresso & French Press',
  },
};

export default function ProductShowcase3D() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('400g');
  const [viewMode, setViewMode] = useState('pouch'); // 'pouch', 'bean', 'cup'
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const activeProduct = products[activeProductIndex];
  const sizes = Object.keys(activeProduct.prices);
  const currentSize = sizes.includes(selectedSize) ? selectedSize : sizes[0];
  const price = activeProduct.prices[currentSize];
  const sensory = sensoryProfiles[activeProduct.id] || sensoryProfiles['kafee-pudi-ultra-rich'];

  const handleAddToCart = () => {
    addItem(activeProduct, currentSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleSelectProduct = (idx) => {
    setActiveProductIndex(idx);
    if (products[idx].id === 'roasted-coffee-beans') {
      setViewMode('bean');
    } else if (viewMode === 'bean') {
      setViewMode('pouch');
    }
  };

  return (
    <section id="showcase-3d" className="py-28 sm:py-36 bg-espresso-950 text-cream relative overflow-hidden dark-grain hairline-t">
      {/* Subtle Studio Vignette */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeProduct.colorPrimary }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-gold-brass block mb-2">
              Interactive 3D Studio
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream">
              The Tasting Studio
            </h2>
          </div>
          <p className="text-cream/50 text-xs sm:text-sm font-light max-w-sm mt-4 md:mt-0 leading-relaxed">
            Inspect our packaging and authentic 3D roasted beans in 360°. Select your expression below.
          </p>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 3D Product Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative h-[480px] sm:h-[560px] w-full bg-[#0E080A] rounded-xs border border-white/10 overflow-hidden flex items-center justify-center">
              {/* Three.js Canvas */}
              <SceneContainer camera={{ position: [0, 0, 4.8], fov: 40 }}>
                {viewMode === 'pouch' ? (
                  <InteractivePouch3D activeProduct={activeProduct} />
                ) : viewMode === 'bean' ? (
                  <ScrollCoffeeBean />
                ) : (
                  <SteamingCup3D />
                )}
              </SceneContainer>

              {/* View Switcher Controls (Top Right) */}
              <div className="absolute top-5 right-5 flex items-center bg-espresso-950/90 border border-white/15 rounded-xs p-1 z-20">
                <button
                  onClick={() => setViewMode('pouch')}
                  aria-label="View product pouch"
                  aria-pressed={viewMode === 'pouch'}
                  className={`px-3 py-1.5 text-[11px] font-body tracking-wider uppercase transition-all ${
                    viewMode === 'pouch'
                      ? 'bg-gold-brass text-espresso-950 font-bold'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  Pouch
                </button>
                <button
                  onClick={() => setViewMode('bean')}
                  aria-label="View 3D coffee bean"
                  aria-pressed={viewMode === 'bean'}
                  className={`px-3 py-1.5 text-[11px] font-body tracking-wider uppercase transition-all ${
                    viewMode === 'bean'
                      ? 'bg-gold-brass text-espresso-950 font-bold'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  3D Bean
                </button>
                <button
                  onClick={() => setViewMode('cup')}
                  aria-label="View steaming decoction cup"
                  aria-pressed={viewMode === 'cup'}
                  className={`px-3 py-1.5 text-[11px] font-body tracking-wider uppercase transition-all ${
                    viewMode === 'cup'
                      ? 'bg-gold-brass text-espresso-950 font-bold'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  Decoction Cup
                </button>
              </div>

              {/* Interaction Hint */}
              <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-editorial text-cream/40 flex items-center gap-2 pointer-events-none">
                <Rotate3D className="w-3.5 h-3.5 text-gold-brass" />
                <span>Drag to inspect 360°</span>
              </div>
            </div>

            {/* Horizontal Variant Navigation Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProduct(idx)}
                  aria-label={`Select ${p.variant}`}
                  aria-pressed={activeProductIndex === idx}
                  className={`p-3 text-left border rounded-xs transition-all ${
                    activeProductIndex === idx
                      ? 'border-gold-brass bg-white/5'
                      : 'border-white/10 hover:border-white/20 bg-transparent'
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-widest text-cream/40 font-mono mb-1">
                    0{idx + 1}
                  </span>
                  <span className="block font-display text-sm font-bold text-cream truncate">
                    {p.variant}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Editorial Product Details & Selection (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Product Header */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-brass">
                    {activeProduct.badge}
                  </span>
                  <span className="text-cream/30">·</span>
                  <span className="text-xs font-mono text-cream/50">
                    {activeProduct.blend}
                  </span>
                </div>

                <h3 className="font-display text-4xl sm:text-5xl font-normal text-cream mb-1">
                  {activeProduct.name}
                </h3>
                <p
                  className="font-display text-2xl font-bold mb-4 italic"
                  style={{ color: activeProduct.colorPrimary }}
                >
                  {activeProduct.variant}
                </p>

                <p className="text-cream/75 text-sm leading-relaxed mb-6 font-light">
                  {activeProduct.description}
                </p>

                {/* Character & Roast Specification */}
                <div className="py-4 hairline-t hairline-b mb-6 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-cream/50 uppercase tracking-wider font-mono">Roast Profile</span>
                    <span className="text-cream font-medium">{sensory.roastDesc}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-cream/50 uppercase tracking-wider font-mono">Sensory Note</span>
                    <span className="text-cream/90 font-light max-w-[240px] text-right">{sensory.character}</span>
                  </div>
                </div>

                {/* Flavor Notes */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-editorial font-semibold text-cream/50 block mb-2">
                    Key Aromatic Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.flavorNotes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-xs text-cream/80"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Segmented Packaging Size Selector */}
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-editorial font-semibold text-cream/50 block mb-2">
                    Select Size
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        aria-label={`Select size ${sz}`}
                        aria-pressed={currentSize === sz}
                        className={`py-2 text-xs font-body font-semibold tracking-wider uppercase rounded-xs transition-all ${
                          currentSize === sz
                            ? 'bg-gold-brass text-espresso-950'
                            : 'border border-white/15 text-cream/70 hover:border-white/30'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Primary CTA */}
                <div className="flex items-center justify-between gap-6 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream/40 font-mono block">
                      Price (Incl. Taxes)
                    </span>
                    <span className="font-display text-3xl font-bold text-cream">
                      ₹{price}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 btn-brass ${added ? 'bg-emerald-600 text-white' : ''}`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Collection</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
