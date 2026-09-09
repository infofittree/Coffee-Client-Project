import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Shield, Truck, Sparkles } from 'lucide-react';

export default function WholesaleB2BSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    type: '',
    volume: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="wholesale"
      className="py-28 sm:py-36 bg-[#11231A] text-cream relative overflow-hidden dark-grain hairline-dark-t hairline-dark-b"
    >
      {/* Ambient background illumination */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold-brass/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Statement & Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="text-[11px] uppercase tracking-editorial font-body font-semibold text-gold-brass block mb-3">
                06 / HoReCa & Commercial Roastery Supply
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream leading-[1.08] mb-6">
                YOUR CAFÉ.<br />
                <span className="italic font-light text-caramel">OUR ROAST.</span>
              </h2>
              <p className="text-cream/70 text-sm sm:text-base leading-relaxed max-w-lg font-body">
                Custom roast profiling, scheduled roastery-direct logistics, and batch-level traceability for India’s premier specialty coffee bars, heritage filter coffee outlets, boutique hotels, and dining rooms.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-emerald-500/20 flex items-center justify-center shrink-0 text-gold-brass">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-cream tracking-wide">
                    Custom Decoction & Extraction Profiling
                  </h3>
                  <p className="text-cream/60 text-xs sm:text-sm leading-relaxed mt-1">
                    We dial in roasting temperature profiles and grind micron specifications to match your exact water hardness, decoction ratio, or commercial espresso target TDS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-emerald-500/20 flex items-center justify-center shrink-0 text-gold-brass">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-cream tracking-wide">
                    Scheduled Roastery-Direct Logistics
                  </h3>
                  <p className="text-cream/60 text-xs sm:text-sm leading-relaxed mt-1">
                    Freshly roasted every week in Bengaluru and dispatched pan-India with one-way degassing valve foil packaging to guarantee zero oxidation upon bar delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-emerald-500/20 flex items-center justify-center shrink-0 text-gold-brass">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-cream tracking-wide">
                    FSSAI Grade A Certified & Complete Traceability
                  </h3>
                  <p className="text-cream/60 text-xs sm:text-sm leading-relaxed mt-1">
                    Full estate harvest origin documentation, moisture retention analytics, legal packaging compliance (KAR-109/14-15), and seamless GST commercial invoicing.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Roastery Contact strip */}
            <div className="p-5 bg-black/30 border border-white/10 rounded-sm flex items-center justify-between text-xs">
              <div>
                <span className="block text-cream/40 uppercase tracking-widest text-[10px]">Commercial Desk Direct</span>
                <span className="font-mono text-cream font-medium">080-2668 4573 / 74</span>
              </div>
              <div className="text-right">
                <span className="block text-cream/40 uppercase tracking-widest text-[10px]">Roastery Location</span>
                <span className="font-body text-gold-brass">Bannerghatta Rd, Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Commercial Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-[#0D1B13] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-display text-2xl font-bold text-cream">
                    Commercial Dossier Initiated
                  </h3>
                  <p className="text-cream/70 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you. Our master roaster and commercial partnerships lead will review your establishment specifications and deliver roast samples and pricing within 24 business hours.
                  </p>
                  <div className="pt-4 font-mono text-xs text-gold-brass">
                    Reference: B2B-{Date.now().toString().slice(-6)}
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-4 mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-brass block mb-1">
                      Direct Roastery Inquiry
                    </span>
                    <h3 className="font-display text-xl font-bold text-cream tracking-wide">
                      Request Wholesale Commercial Catalog
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                        Brand / Company Name *
                      </label>
                      <input
                        name="businessName"
                        placeholder="e.g. Bangalore Heritage Cafe"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                        Contact Person *
                      </label>
                      <input
                        name="contactName"
                        placeholder="Full name & title"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                        Business Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="procurement@cafe.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                        Establishment Category *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs"
                      >
                        <option value="" className="bg-[#0D1B13]">Select category...</option>
                        <option value="cafe" className="bg-[#0D1B13]">Specialty Cafe / Filter Coffee Outlet</option>
                        <option value="hotel" className="bg-[#0D1B13]">Luxury Hotel / Fine Dining</option>
                        <option value="corporate" className="bg-[#0D1B13]">Corporate Office / Enterprise Pantry</option>
                        <option value="retail" className="bg-[#0D1B13]">Supermarket / Retail Chain / Distributor</option>
                        <option value="other" className="bg-[#0D1B13]">Other Commercial Entity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                        Expected Monthly Volume *
                      </label>
                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs"
                      >
                        <option value="" className="bg-[#0D1B13]">Select volume...</option>
                        <option value="25-50kg" className="bg-[#0D1B13]">25 – 50 kg / month</option>
                        <option value="50-150kg" className="bg-[#0D1B13]">50 – 150 kg / month</option>
                        <option value="150-500kg" className="bg-[#0D1B13]">150 – 500 kg / month</option>
                        <option value="500kg+" className="bg-[#0D1B13]">500+ kg / month (Custom Roast)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-mono text-cream/60 mb-1.5">
                      Roast Preference & Equipment Details
                    </label>
                    <textarea
                      name="notes"
                      placeholder="e.g. Commercial South Indian Decoction urns, preference for Extra Strong roast profile, sample request for 2 Bangalore branches..."
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-brass text-xs transition-colors rounded-xs resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-brass w-full py-3.5 text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Roastery Dossier & Samples</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
