import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-6 left-1/2 bg-espresso-800 text-cream px-6 py-3 rounded-full shadow-xl z-[70] flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="text-cream/50 hover:text-cream">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
