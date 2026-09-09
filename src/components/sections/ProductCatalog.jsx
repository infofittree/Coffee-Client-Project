import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

function CollectionCard({ product, index }) {
  const { addItem } = useCart();
  const sizes = Object.keys(product.prices);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group flex flex-col bg-cream-50 border border-espresso-950/10 rounded-xs overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Product Image Stage (65% of card visual area) */}
      <div className="relative aspect-[3/4] w-full bg-[#160E10] overflow-hidden flex items-center justify-center p-8">
        {/* Soft Radial Backlight tailored to blend */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity blur-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${product.colorPrimary} 0%, transparent 70%)` }}
        />

        {/* Edition Number / Badge */}
        <span className="absolute top-5 left-5 text-[10px] font-mono uppercase tracking-widest text-cream/50 z-10">
          0{index + 1} &nbsp;/&nbsp; {product.badge}
        </span>

        {/* Authentic Product Photography */}
        <img
          src={product.image}
          alt={`${product.name} — ${product.variant}`}
          className="h-full w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-700 relative z-10"
          loading="eager"
        />

        {/* Subtle Accent Stripe at Bottom of Image Stage */}
        <div
          className="absolute bottom-0 inset-x-0 h-1"
          style={{ backgroundColor: product.colorPrimary }}
        />
      </div>

      {/* Product Information */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-cream-100">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-espresso-500 block mb-1">
            {product.blend}
          </span>
          <h3 className="font-display text-2xl font-bold text-espresso-900 leading-tight">
            {product.name}
          </h3>
          <p
            className="font-display text-lg font-normal italic mb-3"
            style={{ color: product.colorSecondary || '#8B5E3C' }}
          >
            {product.variant}
          </p>

          {/* Flavor Notes Inline */}
          <p className="text-xs text-espresso-600 font-light mb-6">
            {product.flavorNotes.join(' · ')}
          </p>
        </div>

        <div>
          {/* Segmented Size Selector */}
          <div className="grid grid-cols-4 gap-1.5 mb-6">
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`py-1.5 text-[11px] font-mono font-semibold uppercase rounded-xs transition-all ${
                  selectedSize === sz
                    ? 'bg-espresso-900 text-cream'
                    : 'bg-transparent text-espresso-700 border border-espresso-950/15 hover:border-espresso-950/30'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Price & Add to Bag */}
          <div className="flex items-center justify-between pt-4 border-t border-espresso-950/10">
            <div>
              <span className="text-[10px] uppercase font-mono text-espresso-500 block">
                {selectedSize}
              </span>
              <span className="font-display text-2xl font-bold text-espresso-900">
                ₹{product.prices[selectedSize]}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-body font-semibold tracking-wider uppercase rounded-xs transition-all ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-espresso-900 text-cream hover:bg-gold-brass hover:text-espresso-950'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog() {
  return (
    <section id="products" className="py-28 sm:py-36 bg-cream text-espresso-950 relative overflow-hidden paper-grain hairline-light-t hairline-light-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-light-b">
          <div>
            <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-espresso-500 block mb-2">
              The Collection
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-espresso-900">
              The Master Blends
            </h2>
          </div>
          <p className="text-espresso-600 text-xs sm:text-sm font-light max-w-sm mt-4 md:mt-0 leading-relaxed">
            Four distinct expressions of South Indian coffee craftsmanship. Sourced from single-region estates and roasted to order.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <CollectionCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
