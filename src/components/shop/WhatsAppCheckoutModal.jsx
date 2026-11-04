import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Copy, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAdminData } from '../../context/AdminDataContext';

export default function WhatsAppCheckoutModal({ isOpen, onClose }) {
  const { cart, subtotalPrice, taxAmount, totalPrice } = useCart();
  const { addOrder } = useAdminData();
  const [copied, setCopied] = useState(false);

  const phoneNumber = '919081751379';

  const taxLine = taxAmount > 0 ? `\nTaxes (5% GST): ₹${taxAmount}` : '';

  const message = `Hi Brown Label Coffee! ☕🫘\n\nI'd like to place an order:\n\n${cart
    .map(
      (item) =>
        `• ${item.name} — ${item.variant} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join('\n')}\n\nSubtotal: ₹${subtotalPrice}${taxLine}\n*Total Amount: ₹${totalPrice}*\n\nPlease confirm availability and share payment / shipping details. Thank you! 🙏`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleSendOrder = () => {
    if (addOrder && cart.length > 0) {
      addOrder({
        customerName: 'Online Web Customer',
        phone: '+91 (WhatsApp Web)',
        location: 'Storefront Direct',
        items: cart.map((item) => ({
          name: `${item.name} — ${item.variant}`,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: totalPrice,
        status: 'Pending',
      });
    }
  };

  const handleCopy = () => {
    handleSendOrder();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-espresso-950 border border-caramel/30 rounded-3xl shadow-luxury overflow-hidden text-cream z-10"
          >
            {/* Header */}
            <div className="shrink-0 bg-forest-950 border-b border-emerald-500/25 px-5 py-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-cream leading-tight">
                    Direct Roastery WhatsApp Order
                  </h3>
                  <span className="text-[11px] sm:text-xs text-emerald-400 font-mono">
                    Test Order Line: +91 90817 51379
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-cream/60 hover:text-cream p-1.5 rounded-full hover:bg-white/10 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & Actions */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
              <p className="text-cream/70 text-xs">
                We've structured your order dispatch note ready to send to Brown Label Coffee:
              </p>

              <div className="bg-espresso-900/90 border border-white/10 rounded-2xl p-4 text-xs text-cream/80 whitespace-pre-line max-h-40 sm:max-h-48 overflow-y-auto font-mono leading-relaxed shrink-0">
                {message}
              </div>

              <div className="space-y-2.5 pt-1 mt-auto">
                <a
                  href={whatsappUrl}
                  onClick={handleSendOrder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 sm:py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-luxury-forest text-xs uppercase tracking-wider"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch WhatsApp & Send Order</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-cream font-medium py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 transition-colors text-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gold" />}
                  <span>{copied ? 'Order Text Copied to Clipboard!' : 'Copy Order Text to Clipboard'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
