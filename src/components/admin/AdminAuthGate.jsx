import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

const SESSION_KEY = 'brownlabel_admin_auth_session';
const PIN_KEY = 'brownlabel_admin_custom_pin';
const DEFAULT_PIN = '1984'; // Heritage founding year

export function checkAdminSession() {
  try {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    // Session valid for 4 hours
    const isValid = parsed.token && Date.now() - parsed.timestamp < 4 * 60 * 60 * 1000;
    if (!isValid) sessionStorage.removeItem(SESSION_KEY);
    return isValid;
  } catch {
    return false;
  }
}

export function grantAdminSession() {
  try {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        token: Math.random().toString(36).substring(2) + Date.now().toString(36),
        timestamp: Date.now(),
      })
    );
  } catch {}
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

export default function AdminAuthGate({ onAuthenticated, onCancel }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);

  const activePin = typeof window !== 'undefined' ? localStorage.getItem(PIN_KEY) || DEFAULT_PIN : DEFAULT_PIN;

  const isLocked = lockedUntil > Date.now();
  const remainingLockTime = Math.ceil((lockedUntil - Date.now()) / 1000);

  useEffect(() => {
    let timer;
    if (isLocked) {
      timer = setInterval(() => {
        if (Date.now() >= lockedUntil) {
          setLockedUntil(0);
          setAttempts(0);
          setError('');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockedUntil]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (pin === activePin) {
      grantAdminSession();
      onAuthenticated();
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setPin('');

      if (nextAttempts >= 5) {
        setLockedUntil(Date.now() + 60 * 1000);
        setError('Too many failed attempts. Security cooldown active for 60 seconds.');
      } else {
        setError(`Incorrect passkey. ${5 - nextAttempts} attempts remaining.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-espresso-950 text-cream flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-espresso-950 to-espresso-950 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-gold-brass/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-espresso-900/90 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold-brass/10 border border-gold-brass/30 flex items-center justify-center mx-auto mb-4 text-gold-brass">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-brass/80 block mb-1">
            Roastery Portal Security
          </span>
          <h2 className="font-display text-2xl font-bold text-cream">Operations Access</h2>
          <p className="text-xs text-cream/50 mt-2">
            Enter the authorized Roastery Passkey to manage orders and inventory.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-cream/60 mb-2">
              Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={12}
                disabled={isLocked}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter Passkey"
                className="w-full bg-espresso-950/80 border border-white/15 focus:border-gold-brass/60 rounded-xl px-4 py-3.5 text-center text-xl tracking-[0.3em] font-mono text-cream placeholder:text-cream/20 focus:outline-none focus:ring-1 focus:ring-gold-brass/50 transition-all disabled:opacity-50"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-cream/40 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-rose-400 text-xs mt-2.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLocked || !pin}
              className="w-full btn-brass py-3 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLocked ? `Locked (${remainingLockTime}s)` : 'Verify & Enter'}</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 text-xs text-cream/60 hover:text-cream transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] text-cream/40 font-mono">
            Default passkey: <span className="text-gold-brass/70">1984</span> (Founding Year)
          </p>
        </div>
      </motion.div>
    </div>
  );
}
