import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ isOpen, onClose, onWhatsAppCheckout }) {
  const { cart, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/80 backdrop-blur-md z-50"
          />

          {/* Luxury Sliding Drawer */}
          <motion.aside
            aria-label="Shopping Cart Drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-espresso-950/98 backdrop-blur-2xl z-50 shadow-2xl border-l border-white/10 flex flex-col text-cream"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <ShoppingBag className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-cream">Your Coffee Bag</h2>
                  <span className="text-[11px] text-cream/50 font-mono">Fresh roasted to order</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-cream/60 hover:text-cream transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-cream/40">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-lg text-cream font-bold">Your bag is empty</h3>
                  <p className="text-cream/50 text-xs mt-1 max-w-xs mx-auto">
                    Explore our Kafee Pudi roasts or Whole Beans and experience the authentic South Indian cup.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-espresso-900/80 border border-white/10 shadow-sm"
                  >
                    {/* Color dot indicator */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                      style={{ backgroundColor: `${item.colorPrimary}20` }}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.colorPrimary }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-cream text-xs sm:text-sm truncate">
                        {item.name} — {item.variant}
                      </h4>
                      <p className="text-[11px] text-gold font-mono font-medium">{item.size}</p>
                      <p className="text-xs font-bold text-cream/90 mt-0.5 font-mono">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-espresso-950 rounded-xl px-2 py-1 border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="text-cream/60 hover:text-cream p-0.5"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono text-cream w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="text-cream/60 hover:text-cream p-0.5"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-cream/40 hover:text-red-400 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Subtotal & Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-espresso-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-cream/60 text-xs uppercase tracking-wider font-mono">Estimated Subtotal</span>
                  <span className="text-2xl font-display font-bold text-gold font-mono">₹{totalPrice}</span>
                </div>

                <p className="text-[11px] text-cream/50">
                  ✦ Orders above ₹599 qualify for Free Pan-India Delivery.
                </p>

                <button
                  onClick={onWhatsAppCheckout}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-luxury-forest text-xs uppercase tracking-wider"
                >
                  <span>Dispatch Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-cream/40 hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
