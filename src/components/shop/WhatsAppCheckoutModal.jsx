import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Copy, ExternalLink, Check, MapPin, User, AlertCircle, ShoppingBag } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import { useAdminData } from '../../context/AdminDataContext';

export default function WhatsAppCheckoutModal({ isOpen, onClose }) {
  const { cart, subtotalPrice, taxAmount, totalPrice } = useCart();
  const { addOrder } = useAdminData();
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('brownlabel-customer-name') || '';
    } catch {
      return '';
    }
  });
  const [address, setAddress] = useState(() => {
    try {
      return localStorage.getItem('brownlabel-customer-address') || '';
    } catch {
      return '';
    }
  });
  const [pincode, setPincode] = useState(() => {
    try {
      return localStorage.getItem('brownlabel-customer-pincode') || '';
    } catch {
      return '';
    }
  });
  const [validationError, setValidationError] = useState('');

  const phoneNumber = '919081751379';

  // Memoize static cart text so it doesn't recalculate on every keystroke
  const cartSummaryText = useMemo(() => {
    const taxLine = taxAmount > 0 ? `\nTaxes (5% GST): ₹${taxAmount}` : '';
    return `${cart
      .map(
        (item) =>
          `• ${item.name} — ${item.variant} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join('\n')}\n\nSubtotal: ₹${subtotalPrice}${taxLine}\n*Total Amount: ₹${totalPrice}*`;
  }, [cart, subtotalPrice, taxAmount, totalPrice]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // Construct complete WhatsApp message on-demand only when sending or copying
  const getFullMessage = useCallback(() => {
    const deliveryDetails = `\n\n📍 Delivery Location:\n• Address: ${address.trim()}\n• PIN Code: ${pincode.trim()}${name.trim() ? `\n• Customer: ${name.trim()}` : ''}`;
    return `Hi Brown Label Coffee!\n\nI'd like to place an order:\n\n${cartSummaryText}${deliveryDetails}\n\nPlease confirm delivery availability at my location and share payment details. Thank you!`;
  }, [cartSummaryText, address, pincode, name]);

  const validateAndSave = () => {
    if (!address.trim() || !pincode.trim()) {
      setValidationError('Please enter your delivery address and PIN code so we can verify delivery coverage.');
      return false;
    }
    setValidationError('');

    try {
      localStorage.setItem('brownlabel-customer-name', name.trim());
      localStorage.setItem('brownlabel-customer-address', address.trim());
      localStorage.setItem('brownlabel-customer-pincode', pincode.trim());
    } catch {}

    if (addOrder && cart.length > 0) {
      addOrder({
        customerName: name.trim() || 'Online Web Customer',
        phone: '+91 (WhatsApp Web)',
        location: `${pincode.trim()}, ${address.trim()}`,
        items: cart.map((item) => ({
          name: `${item.name} — ${item.variant}`,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotalPrice: subtotalPrice,
        taxAmount: taxAmount,
        totalPrice: totalPrice,
        status: 'Pending',
      });
    }

    return true;
  };

  const handleLaunchWhatsApp = () => {
    if (!validateAndSave()) return;
    const finalMessage = getFullMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    if (!validateAndSave()) return;
    const finalMessage = getFullMessage();
    navigator.clipboard.writeText(finalMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Lightweight high-performance solid backdrop (no GPU-heavy backdrop-blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/92"
          />

          {/* Modal Card with CSS isolation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            style={{ contain: 'paint' }}
            className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-espresso-950 border border-caramel/30 rounded-3xl shadow-luxury overflow-hidden text-cream z-10"
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
                    Official Roastery Dispatch Line
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-cream/60 hover:text-cream p-1.5 rounded-full hover:bg-white/10 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & Form */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
              {/* Delivery Details Form */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-mono text-gold font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    Delivery Location Check
                  </span>
                  <span className="text-[10px] text-cream/50 font-mono">* Required for delivery check</span>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-cream/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        placeholder="Your Name (Optional)"
                        className="w-full bg-espresso-900/90 border border-white/15 focus:border-gold rounded-xl pl-8 pr-3 py-2 text-xs text-cream placeholder-cream/40 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => {
                          setPincode(e.target.value.replace(/[^0-9]/g, ''));
                          if (validationError) setValidationError('');
                        }}
                        placeholder="6-digit PIN Code *"
                        className={`w-full bg-espresso-900/90 border ${
                          validationError && !pincode.trim() ? 'border-red-400' : 'border-white/15 focus:border-gold'
                        } rounded-xl px-3 py-2 text-xs text-cream placeholder-cream/40 focus:outline-none transition-colors font-mono`}
                      />
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="Complete Delivery Address (Flat/House No, Street, Area, City) *"
                    className={`w-full bg-espresso-900/90 border ${
                      validationError && !address.trim() ? 'border-red-400' : 'border-white/15 focus:border-gold'
                    } rounded-xl px-3 py-2 text-xs text-cream placeholder-cream/40 focus:outline-none transition-colors resize-none`}
                  />
                </div>

                {validationError && (
                  <div className="flex items-center gap-1.5 text-red-400 text-[11px] pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>

              {/* Lightweight Order Items & Location Card */}
              <div className="bg-espresso-900/90 border border-white/10 rounded-2xl p-4 text-xs font-mono leading-relaxed space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-cream/80 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                    Order Summary ({totalItems} items)
                  </span>
                  <span className="text-gold font-bold text-sm">₹{totalPrice}</span>
                </div>

                <div className="text-[11px] text-cream/70 space-y-1 max-h-24 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center py-0.5">
                      <span className="truncate pr-2">• {item.name} — {item.variant} ({item.size}) ×{item.quantity}</span>
                      <span className="shrink-0 text-cream/90 font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-cream/50 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    Delivery Destination:
                  </span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    {pincode ? `PIN: ${pincode}` : 'PIN Required'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1 mt-auto">
                <button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 sm:py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-luxury-forest text-xs uppercase tracking-wider cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch WhatsApp & Send Order</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-cream font-medium py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 transition-colors text-xs cursor-pointer"
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
