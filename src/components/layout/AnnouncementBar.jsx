import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar({ onDismiss }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <aside
      aria-label="Roastery Announcement"
      className="bg-espresso-950 text-cream/80 py-2 px-6 text-[11px] font-body tracking-wider uppercase border-b border-white/5 relative z-[60] transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center truncate">
          <span>
            Bengaluru Roastery &nbsp;·&nbsp; Complimentary Pan-India Delivery on orders above ₹599 &nbsp;·&nbsp;
            Code <strong className="text-gold-brass font-bold">BREW40</strong> for 10% off
          </span>
        </div>
        <button
          onClick={handleClose}
          className="text-cream/40 hover:text-cream transition-colors ml-4 p-0.5"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
