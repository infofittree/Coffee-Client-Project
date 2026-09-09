import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Copy, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function WhatsAppCheckoutModal({ isOpen, onClose }) {
  const { cart, totalPrice } = useCart();
  const [copied, setCopied] = useState(false);

  const phoneNumber = '918026684573';

  const message = `Hi Brown Label Coffee! ☕🫘\n\nI'd like to place an order:\n\n${cart
    .map(
      (item) =>
        `• ${item.name} — ${item.variant} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join('\n')}\n\n*Total Amount: ₹${totalPrice}*\n\nPlease confirm availability and share payment / shipping details. Thank you! 🙏`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-espresso-950 border border-caramel/30 rounded-3xl shadow-luxury z-[60] overflow-hidden text-cream"
          >
            {/* Header */}
            <div className="bg-forest-950 border-b border-emerald-500/25 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">Direct Roastery WhatsApp Order</h3>
                  <span className="text-xs text-emerald-400 font-mono">Official Line: +91 80 2668 4573</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-cream/60 hover:text-cream p-1.5 rounded-full hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-cream/70 text-xs mb-3">
                We've structured your order dispatch note ready to send to Brown Label Coffee:
              </p>

              <div className="bg-espresso-900/90 border border-white/10 rounded-2xl p-4 text-xs text-cream/80 whitespace-pre-line max-h-56 overflow-y-auto font-mono leading-relaxed">
                {message}
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-luxury-forest text-xs uppercase tracking-wider"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch WhatsApp & Send Order</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-cream font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-colors text-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gold" />}
                  <span>{copied ? 'Order Text Copied to Clipboard!' : 'Copy Order Text to Clipboard'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
