import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ShoppingBag,
  Clock,
  Search,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  Trash2,
  RefreshCw,
  Download,
  ArrowLeft,
  CheckCircle2,
  Flame,
  Package,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Calendar,
  Layers,
  TrendingUp,
  Plus,
  Check,
  Tag,
  ImageIcon,
  Sun,
  Moon,
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const darkStatusColors = {
  New: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'In Discussion': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Sample Dispatched': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Partner Onboarded': 'bg-gold-brass/20 text-gold-brass border-gold-brass/40',
  Archived: 'bg-white/10 text-white/50 border-white/15',

  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Roasting: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Dispatched: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Delivered: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

const lightStatusColors = {
  New: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold',
  'In Discussion': 'bg-amber-50 text-amber-800 border-amber-300 font-semibold',
  'Sample Dispatched': 'bg-blue-50 text-blue-800 border-blue-300 font-semibold',
  'Partner Onboarded': 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold',
  Archived: 'bg-stone-100 text-stone-600 border-stone-300',

  Pending: 'bg-amber-50 text-amber-800 border-amber-300 font-semibold',
  Roasting: 'bg-orange-50 text-orange-800 border-orange-300 font-semibold',
  Dispatched: 'bg-blue-50 text-blue-800 border-blue-300 font-semibold',
  Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold',
};

export default function AdminDashboard({ onExit }) {
  const {
    inquiries,
    orders,
    products = [],
    updateInquiryStatus,
    deleteInquiry,
    updateOrderStatus,
    deleteOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDemoData,
    exportData,
  } = useAdminData();

  // Theme Mode: 'light' (Bright Studio) vs 'dark' (Espresso Night)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('brownlabel-admin-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const isLight = theme === 'light';

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('brownlabel-admin-theme', next);
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status) => {
    if (isLight) {
      return lightStatusColors[status] || 'bg-stone-100 text-stone-700 border-stone-200';
    }
    return darkStatusColors[status] || 'bg-white/10 text-white/60 border-white/15';
  };

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'inquiries' | 'orders' | 'catalog'
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('ALL');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState('ALL');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');

  // Roastery Blend Formulation State
  const [toastMessage, setToastMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(true);

  const initialNewProduct = {
    name: 'Kafee Pudi',
    variant: '',
    tagline: "Ground 'N' Filter Coffee",
    description: '',
    roastLevel: 'Medium-Dark',
    flavorNotes: 'Dark Chocolate, Caramel, Roasted Nuts',
    blend: 'Arabica & Robusta',
    colorPrimary: '#D6A265',
    colorSecondary: '#C48A47',
    badge: 'New Harvest',
    image: '/images/premium-gold.jpeg',
    price200: 230,
    price400: 430,
    price500: 520,
    price1000: 980,
  };

  const [newProduct, setNewProduct] = useState(initialNewProduct);

  const availableImages = [
    { label: 'Ultra Rich Pouch', path: '/images/ultra-rich.jpeg', color: '#FFDA27' },
    { label: 'Extra Strong Pouch', path: '/images/extra-strong.jpeg', color: '#F47B20' },
    { label: 'Premium Gold Pouch', path: '/images/premium-gold.jpeg', color: '#D6A265' },
    { label: 'Roasted Beans Pouch', path: '/images/roasted-beans.jpeg', color: '#8B5E3C' },
  ];

  const colorPresets = [
    { name: 'Ultra Gold', primary: '#FFDA27', secondary: '#F5B700' },
    { name: 'Flame Orange', primary: '#F47B20', secondary: '#E85D04' },
    { name: 'Heritage Caramel', primary: '#D6A265', secondary: '#C48A47' },
    { name: 'Estate Bronze', primary: '#8B5E3C', secondary: '#5C3D2E' },
    { name: 'Malabar Emerald', primary: '#10B981', secondary: '#059669' },
    { name: 'Peaberry Ruby', primary: '#E11D48', secondary: '#BE123C' },
  ];

  const quickPresets = [
    {
      label: 'Estate Peaberry',
      name: 'Kafee Pudi',
      variant: 'Estate Peaberry Special',
      tagline: 'Hand-Sorted Mysore Peaberry',
      description: 'Hand-picked round peaberry beans delivering a naturally sweeter, intensely aromatic decoction with bright floral undertones.',
      roastLevel: 'Medium',
      flavorNotes: 'Honey, Toasted Almonds, Jasmine Blossom',
      blend: '100% Arabica Peaberry',
      colorPrimary: '#D6A265',
      colorSecondary: '#C48A47',
      badge: 'Micro-Lot',
      image: '/images/premium-gold.jpeg',
      price200: 249,
      price400: 469,
      price500: 559,
      price1000: 1049,
    },
    {
      label: 'Monsooned Malabar',
      name: 'Roasted Coffee Beans',
      variant: 'Monsooned Malabar AA',
      tagline: 'Sea-Wind Aged Whole Beans',
      description: 'Aged by coastal monsoon winds. Rich crema, zero bitterness, syrupy mouthfeel and bold earthy spice notes.',
      roastLevel: 'Medium-Dark',
      flavorNotes: 'Cardamom, Earthy Spice, Pipe Tobacco',
      blend: 'Monsooned Arabica',
      colorPrimary: '#8B5E3C',
      colorSecondary: '#5C3D2E',
      badge: 'Heritage Lot',
      image: '/images/roasted-beans.jpeg',
      price200: 269,
      price400: 499,
      price500: 599,
      price1000: 1149,
    },
    {
      label: 'French Dark Roast',
      name: 'Kafee Pudi',
      variant: 'French Dark Decoction',
      tagline: 'Smoky & Intense Filter Blend',
      description: 'Slow-roasted to second crack for deep, smoky character with rich dark chocolate bitterness and heavy syrup mouthfeel.',
      roastLevel: 'Dark',
      flavorNotes: 'Smoky Cocoa, 85% Dark Chocolate, Black Pepper',
      blend: 'Arabica & Robusta (70:30)',
      colorPrimary: '#F47B20',
      colorSecondary: '#E85D04',
      badge: 'Intense Brew',
      image: '/images/extra-strong.jpeg',
      price200: 219,
      price400: 419,
      price500: 499,
      price1000: 939,
    },
  ];

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.variant.trim()) {
      return;
    }

    const flavorNotesArray = newProduct.flavorNotes
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);

    const prices = {
      '200g': Number(newProduct.price200) || 199,
      '400g': Number(newProduct.price400) || 375,
      '500g': Number(newProduct.price500) || 449,
      '1kg': Number(newProduct.price1000) || 849,
    };

    const created = addProduct({
      name: newProduct.name.trim(),
      variant: newProduct.variant.trim(),
      tagline: newProduct.tagline.trim() || "Ground 'N' Filter Coffee",
      description: newProduct.description.trim() || 'Signature roastery blend crafted in Bengaluru.',
      roastLevel: newProduct.roastLevel,
      flavorNotes: flavorNotesArray.length > 0 ? flavorNotesArray : ['Chocolate', 'Caramel'],
      blend: newProduct.blend.trim() || 'Arabica & Robusta',
      colorPrimary: newProduct.colorPrimary,
      colorSecondary: newProduct.colorSecondary,
      colorAccent: '#1F1012',
      badge: newProduct.badge.trim() || 'Roastery Blend',
      image: newProduct.image,
      prices,
      inStock: true,
    });

    setToastMessage(`✓ Added "${created.name} (${created.variant})" to Roastery Catalog & Storefront!`);
    setTimeout(() => setToastMessage(''), 4000);

    setNewProduct(initialNewProduct);
  };

  const applyPreset = (preset) => {
    setNewProduct({
      ...preset,
    });
    setToastMessage(`Preset applied: ${preset.variant}`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter((i) => i.status === 'New').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const activeRoasting = orders.filter((o) => o.status === 'Pending' || o.status === 'Roasting').length;

    return {
      totalInquiries,
      newInquiries,
      totalOrders: orders.length,
      totalRevenue,
      activeRoasting,
    };
  }, [inquiries, orders]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.businessName?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.contactName?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.phone?.includes(inquirySearch) ||
        inq.notes?.toLowerCase().includes(inquirySearch.toLowerCase());

      const matchesStatus =
        inquiryStatusFilter === 'ALL' || inq.status === inquiryStatusFilter;

      const matchesType =
        inquiryTypeFilter === 'ALL' || inq.type === inquiryTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [inquiries, inquirySearch, inquiryStatusFilter, inquiryTypeFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        ord.id?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        ord.customerName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        ord.location?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        ord.items?.some((i) => i.name.toLowerCase().includes(orderSearch.toLowerCase()));

      const matchesStatus =
        orderStatusFilter === 'ALL' || ord.status === orderStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Reusable Theme Helper Classes
  const cardBg = isLight
    ? 'bg-white border-stone-200/90 shadow-xs'
    : 'bg-[#120A0C] border-white/10';

  const innerBoxBg = isLight
    ? 'bg-stone-50 border-stone-200/90 text-stone-800'
    : 'bg-black/40 border-white/5 text-cream/80';

  const inputClass = isLight
    ? 'bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 font-body'
    : 'bg-black/50 border border-white/10 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-brass font-body';

  const selectClass = isLight
    ? 'bg-white border border-stone-200 text-stone-900 focus:outline-none focus:border-stone-800 font-mono text-xs'
    : 'bg-black/50 border border-white/10 text-cream focus:outline-none focus:border-gold-brass font-mono text-xs';

  return (
    <div
      className={`min-h-screen font-body pb-24 transition-colors duration-200 ${
        isLight
          ? 'bg-[#F7F6F3] text-stone-900 selection:bg-stone-200'
          : 'bg-[#0B0607] text-cream selection:bg-gold-brass/30 selection:text-white'
      }`}
    >
      {/* Top Admin Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-3.5 transition-colors duration-200 ${
          isLight
            ? 'bg-white/95 border-stone-200 shadow-xs'
            : 'bg-[#0E080A]/95 border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Portal Label */}
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-14 rounded-xs overflow-hidden flex items-center justify-center p-0.5">
              <img
                src="/images/logo.png"
                alt="Brown Label Roastery"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1
                  className={`font-display text-lg font-bold tracking-wide ${
                    isLight ? 'text-stone-950' : 'text-cream'
                  }`}
                >
                  BROWN LABEL COFFEE
                </h1>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-gold-brass/20 text-gold-brass border-gold-brass/30'
                  }`}
                >
                  Roastery Desk
                </span>
              </div>
              <p
                className={`text-[10px] font-mono tracking-widest uppercase ${
                  isLight ? 'text-stone-500' : 'text-cream/50'
                }`}
              >
                43 Years of Roastery Heritage · Bengaluru (Est. 1984)
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xs transition-all cursor-pointer border ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300 shadow-2xs'
                  : 'bg-white/5 hover:bg-white/10 text-cream/80 border-white/10'
              }`}
              title={isLight ? 'Switch to Espresso Night Mode' : 'Switch to Bright Studio Mode'}
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Bright Studio</span>
                </>
              )}
            </button>

            <button
              onClick={exportData}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xs transition-colors border cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300 shadow-2xs'
                  : 'bg-white/5 hover:bg-white/10 text-cream/70 border-white/10'
              }`}
              title="Download full operational JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={resetToDemoData}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xs transition-colors border cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300 shadow-2xs'
                  : 'bg-white/5 hover:bg-white/10 text-cream/70 border-white/10'
              }`}
              title="Reset data with initial Bengaluru cafe leads"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            <button
              onClick={onExit}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all shadow-sm active:scale-95 cursor-pointer font-bold ${
                isLight
                  ? 'bg-stone-900 text-white hover:bg-black'
                  : 'bg-gold-brass text-espresso-950 hover:bg-gold-light'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* KPI Cards Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Inquiries */}
          <div className={`${cardBg} p-5 rounded-xs space-y-2`}>
            <div
              className={`flex items-center justify-between text-xs font-mono ${
                isLight ? 'text-stone-500' : 'text-cream/60'
              }`}
            >
              <span className="uppercase tracking-widest">Wholesale Inquiries</span>
              <Building2 className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-gold-brass'}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-3xl sm:text-4xl font-normal ${
                  isLight ? 'text-stone-900 font-semibold' : 'text-cream'
                }`}
              >
                {metrics.totalInquiries}
              </span>
              {metrics.newInquiries > 0 && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {metrics.newInquiries} New
                </span>
              )}
            </div>
            <p className={`text-[11px] font-light ${isLight ? 'text-stone-500' : 'text-cream/40'}`}>
              HoReCa, cafes & retail commercial requests
            </p>
          </div>

          {/* Card 2: Orders */}
          <div className={`${cardBg} p-5 rounded-xs space-y-2`}>
            <div
              className={`flex items-center justify-between text-xs font-mono ${
                isLight ? 'text-stone-500' : 'text-cream/60'
              }`}
            >
              <span className="uppercase tracking-widest">Retail Order Value</span>
              <ShoppingBag className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-gold-brass'}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-3xl sm:text-4xl font-normal ${
                  isLight ? 'text-stone-900 font-semibold' : 'text-cream'
                }`}
              >
                ₹{metrics.totalRevenue.toLocaleString('en-IN')}
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-stone-500' : 'text-cream/50'}`}>
                ({metrics.totalOrders} orders)
              </span>
            </div>
            <p className={`text-[11px] font-light ${isLight ? 'text-stone-500' : 'text-cream/40'}`}>
              Storefront & WhatsApp checkout log
            </p>
          </div>

          {/* Card 3: Roasting Queue */}
          <div className={`${cardBg} p-5 rounded-xs space-y-2`}>
            <div
              className={`flex items-center justify-between text-xs font-mono ${
                isLight ? 'text-stone-500' : 'text-cream/60'
              }`}
            >
              <span className="uppercase tracking-widest">Roasting Queue</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-3xl sm:text-4xl font-normal ${
                  isLight ? 'text-stone-900 font-semibold' : 'text-cream'
                }`}
              >
                {metrics.activeRoasting}
              </span>
              <span
                className={`text-xs font-mono ${
                  isLight ? 'text-orange-700 font-semibold' : 'text-amber-400'
                }`}
              >
                Batches Pending
              </span>
            </div>
            <p className={`text-[11px] font-light ${isLight ? 'text-stone-500' : 'text-cream/40'}`}>
              Awaiting roasting, foil sealing & dispatch
            </p>
          </div>

          {/* Card 4: Top Blend */}
          <div className={`${cardBg} p-5 rounded-xs space-y-2`}>
            <div
              className={`flex items-center justify-between text-xs font-mono ${
                isLight ? 'text-stone-500' : 'text-cream/60'
              }`}
            >
              <span className="uppercase tracking-widest">Top Roast Expression</span>
              <TrendingUp className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-gold-brass'}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-xl sm:text-2xl truncate ${
                  isLight ? 'text-amber-900 font-bold' : 'font-normal text-gold-brass'
                }`}
              >
                Ultra Rich
              </span>
              <span className={`text-[11px] font-mono ${isLight ? 'text-stone-500' : 'text-cream/50'}`}>
                Bestseller
              </span>
            </div>
            <p className={`text-[11px] font-light ${isLight ? 'text-stone-500' : 'text-cream/40'}`}>
              48% of total weekly volume share
            </p>
          </div>
        </section>

        {/* Tab Navigation Row */}
        <div
          className={`flex items-center gap-2 border-b pb-px overflow-x-auto ${
            isLight ? 'border-stone-200' : 'border-white/10'
          }`}
        >
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Layers },
            {
              id: 'inquiries',
              label: `Wholesale Inquiries (${metrics.totalInquiries})`,
              badge: metrics.newInquiries,
              icon: Building2,
            },
            {
              id: 'orders',
              label: `Recent Orders (${metrics.totalOrders})`,
              icon: ShoppingBag,
            },
            { id: 'catalog', label: `Roastery Blends (${products.length})`, icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isLight
                      ? 'border-stone-900 text-stone-950 font-bold bg-white shadow-2xs'
                      : 'border-gold-brass text-gold-brass font-bold bg-white/5'
                    : isLight
                    ? 'border-transparent text-stone-600 hover:text-stone-950 hover:bg-white/50'
                    : 'border-transparent text-cream/60 hover:text-cream hover:bg-white/[0.02]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 text-[9px] rounded-full font-bold ${
                      isLight
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 text-espresso-950'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Recent Inquiries (6 cols) */}
              <div className={`lg:col-span-6 ${cardBg} p-6 rounded-xs space-y-4`}>
                <div
                  className={`flex items-center justify-between border-b pb-3 ${
                    isLight ? 'border-stone-200' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-gold-brass'}`} />
                    <h2
                      className={`font-display text-base font-bold tracking-wide ${
                        isLight ? 'text-stone-900' : 'text-cream'
                      }`}
                    >
                      Latest Commercial Leads
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`text-xs font-mono hover:underline uppercase cursor-pointer ${
                      isLight ? 'text-amber-800 font-bold' : 'text-gold-brass'
                    }`}
                  >
                    View All ({inquiries.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-xs transition-all space-y-2 border ${
                        isLight
                          ? 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/70'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            className={`font-display text-sm font-bold ${
                              isLight ? 'text-stone-950' : 'text-cream'
                            }`}
                          >
                            {inq.businessName}
                          </h3>
                          <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-cream/60'}`}>
                            {inq.contactName} · {inq.phone}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 border rounded-full ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <p
                        className={`text-xs line-clamp-1 font-light italic ${
                          isLight ? 'text-stone-700' : 'text-cream/70'
                        }`}
                      >
                        "{inq.notes}"
                      </p>
                      <div
                        className={`flex items-center justify-between text-[10px] font-mono pt-1 ${
                          isLight ? 'text-stone-500' : 'text-cream/40'
                        }`}
                      >
                        <span>Volume: {inq.volume}</span>
                        <span>{formatDate(inq.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recent Store Orders (6 cols) */}
              <div className={`lg:col-span-6 ${cardBg} p-6 rounded-xs space-y-4`}>
                <div
                  className={`flex items-center justify-between border-b pb-3 ${
                    isLight ? 'border-stone-200' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-gold-brass'}`} />
                    <h2
                      className={`font-display text-base font-bold tracking-wide ${
                        isLight ? 'text-stone-900' : 'text-cream'
                      }`}
                    >
                      Latest Customer Orders
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`text-xs font-mono hover:underline uppercase cursor-pointer ${
                      isLight ? 'text-amber-800 font-bold' : 'text-gold-brass'
                    }`}
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 3).map((ord) => (
                    <div
                      key={ord.id}
                      className={`p-4 rounded-xs transition-all space-y-2 border ${
                        isLight
                          ? 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/70'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono text-xs font-bold ${
                                isLight ? 'text-amber-900' : 'text-gold-brass'
                              }`}
                            >
                              {ord.id}
                            </span>
                            <span
                              className={`text-xs font-medium ${
                                isLight ? 'text-stone-900' : 'text-cream'
                              }`}
                            >
                              {ord.customerName}
                            </span>
                          </div>
                          <p className={`text-[11px] ${isLight ? 'text-stone-500' : 'text-cream/50'}`}>
                            {ord.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`font-display text-sm font-bold block ${
                              isLight ? 'text-stone-900' : 'text-cream'
                            }`}
                          >
                            ₹{ord.totalPrice}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.2 border rounded-full ${getStatusBadge(
                              ord.status
                            )}`}
                          >
                            {ord.status}
                          </span>
                        </div>
                      </div>
                      <div className={`text-[11px] ${isLight ? 'text-stone-600' : 'text-cream/60'}`}>
                        {ord.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(', ')}
                      </div>
                      <div
                        className={`text-right text-[10px] font-mono ${
                          isLight ? 'text-stone-400' : 'text-cream/40'
                        }`}
                      >
                        {formatDate(ord.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Roastery Blend Overview Strip */}
            <div className={`${cardBg} p-6 rounded-xs space-y-4`}>
              <h3
                className={`font-display text-base font-bold ${
                  isLight ? 'text-stone-950' : 'text-cream'
                }`}
              >
                Signature Roast Specifications & Current Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xs space-y-2 border ${
                      isLight
                        ? 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/60'
                        : 'bg-white/[0.02] border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest ${
                          isLight ? 'text-amber-800 font-bold' : 'text-gold-brass'
                        }`}
                      >
                        {p.roastLevel}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="In Stock" />
                    </div>
                    <h4
                      className={`font-display text-sm font-bold truncate ${
                        isLight ? 'text-stone-900' : 'text-cream'
                      }`}
                    >
                      {p.name}
                    </h4>
                    <p
                      className={`font-display text-xs italic truncate ${
                        isLight ? 'text-amber-800' : 'text-caramel'
                      }`}
                    >
                      {p.variant}
                    </p>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isLight ? 'text-stone-500' : 'text-cream/50'
                      }`}
                    >
                      {Array.isArray(p.flavorNotes) ? p.flavorNotes.join(' · ') : p.flavorNotes}
                    </p>
                    <div
                      className={`text-xs font-mono pt-1 border-t ${
                        isLight
                          ? 'border-stone-200 text-stone-800 font-medium'
                          : 'border-white/5 text-cream/80'
                      }`}
                    >
                      Starting ₹{p.prices?.['200g'] || p.prices?.['400g'] || 199}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHOLESALE INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className={`flex flex-col sm:flex-row gap-3 ${cardBg} p-4 rounded-xs`}>
              <div className="relative flex-1">
                <Search
                  className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isLight ? 'text-stone-400' : 'text-cream/40'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search cafe name, contact, phone, or requirements..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xs ${inputClass}`}
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xs ${selectClass}`}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Sample Dispatched">Sample Dispatched</option>
                  <option value="Partner Onboarded">Partner Onboarded</option>
                  <option value="Archived">Archived</option>
                </select>

                <select
                  value={inquiryTypeFilter}
                  onChange={(e) => setInquiryTypeFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xs ${selectClass}`}
                >
                  <option value="ALL">All Categories</option>
                  <option value="cafe">Specialty Café</option>
                  <option value="hotel">Hotel / Dining</option>
                  <option value="corporate">Corporate Pantry</option>
                  <option value="retail">Supermarket / Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length === 0 ? (
              <div className={`text-center py-16 ${cardBg} rounded-xs`}>
                <Building2
                  className={`w-10 h-10 mx-auto mb-3 ${isLight ? 'text-stone-300' : 'text-cream/20'}`}
                />
                <p
                  className={`font-display text-base ${isLight ? 'text-stone-700' : 'text-cream/70'}`}
                >
                  No inquiries found
                </p>
                <p
                  className={`text-xs font-mono mt-1 ${isLight ? 'text-stone-400' : 'text-cream/40'}`}
                >
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => {
                  const whatsappCleanPhone = inq.phone?.replace(/[^0-9]/g, '');
                  const whatsappLink = `https://wa.me/${whatsappCleanPhone}?text=${encodeURIComponent(
                    `Hi ${inq.contactName}, thank you for reaching out to Brown Label Coffee regarding wholesale supply for ${inq.businessName}. We would love to discuss your roast profile and volume requirements.`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className={`${cardBg} p-5 sm:p-6 rounded-xs hover:border-stone-300 transition-all space-y-4`}
                    >
                      {/* Top Bar: Company Name & Status Dropdown */}
                      <div
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
                          isLight ? 'border-stone-200' : 'border-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-mono text-xs font-bold ${
                                isLight ? 'text-amber-800' : 'text-gold-brass'
                              }`}
                            >
                              {inq.id}
                            </span>
                            <h3
                              className={`font-display text-lg font-bold ${
                                isLight ? 'text-stone-950' : 'text-cream'
                              }`}
                            >
                              {inq.businessName}
                            </h3>
                            <span
                              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs border ${
                                isLight
                                  ? 'bg-stone-100 text-stone-700 border-stone-200'
                                  : 'bg-white/5 border-white/10 text-cream/60'
                              }`}
                            >
                              {inq.typeName || inq.type}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-mono ${
                              isLight ? 'text-stone-500' : 'text-cream/40'
                            }`}
                          >
                            Received: {formatDate(inq.createdAt)}
                          </span>
                        </div>

                        {/* Interactive Status Selector */}
                        <div className="flex items-center gap-3">
                          <label
                            className={`text-[10px] font-mono uppercase ${
                              isLight ? 'text-stone-500' : 'text-cream/40'
                            }`}
                          >
                            Status:
                          </label>
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                            className={`text-xs font-mono font-medium px-3 py-1 rounded-full border focus:outline-none cursor-pointer ${getStatusBadge(
                              inq.status
                            )}`}
                          >
                            <option value="New">New</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Sample Dispatched">Sample Dispatched</option>
                            <option value="Partner Onboarded">Partner Onboarded</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                              isLight ? 'text-stone-500' : 'text-cream/40'
                            }`}
                          >
                            Contact Person
                          </span>
                          <span
                            className={`font-medium ${isLight ? 'text-stone-900' : 'text-cream'}`}
                          >
                            {inq.contactName}
                          </span>
                          <div
                            className={`font-mono mt-0.5 ${
                              isLight ? 'text-stone-600' : 'text-cream/60'
                            }`}
                          >
                            {inq.phone}
                          </div>
                          <div
                            className={`font-mono text-[11px] truncate ${
                              isLight ? 'text-stone-500' : 'text-cream/60'
                            }`}
                          >
                            {inq.email}
                          </div>
                        </div>

                        <div>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                              isLight ? 'text-stone-500' : 'text-cream/40'
                            }`}
                          >
                            Monthly Volume Tier
                          </span>
                          <span
                            className={`font-mono text-sm font-bold ${
                              isLight ? 'text-amber-800' : 'text-gold-brass'
                            }`}
                          >
                            {inq.volume || '25-50 kg / month'}
                          </span>
                        </div>

                        <div>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                              isLight ? 'text-stone-500' : 'text-cream/40'
                            }`}
                          >
                            Establishment Details
                          </span>
                          <span
                            className={`text-xs ${isLight ? 'text-stone-700' : 'text-cream/70'}`}
                          >
                            {inq.typeName || 'HoReCa Commercial'}
                          </span>
                        </div>
                      </div>

                      {/* Requirements & Notes */}
                      {inq.notes && (
                        <div className={`p-3 rounded-xs border ${innerBoxBg}`}>
                          <span
                            className={`text-[10px] font-mono uppercase block mb-1 ${
                              isLight ? 'text-stone-500' : 'text-cream/40'
                            }`}
                          >
                            Roasting & Extraction Requirements:
                          </span>
                          <p
                            className={`text-xs leading-relaxed font-light italic ${
                              isLight ? 'text-stone-800' : 'text-cream/80'
                            }`}
                          >
                            "{inq.notes}"
                          </p>
                        </div>
                      )}

                      {/* Bottom Actions Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-xs transition-colors border ${
                              isLight
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Lead</span>
                          </a>

                          <a
                            href={`mailto:${inq.email}?subject=Brown Label Coffee Wholesale Inquiry (${inq.businessName})`}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-xs transition-colors border ${
                              isLight
                                ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                                : 'bg-white/5 hover:bg-white/10 text-cream/80 border-white/10'
                            }`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email Dossier</span>
                          </a>

                          <a
                            href={`tel:${inq.phone}`}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-xs transition-colors border ${
                              isLight
                                ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                                : 'bg-white/5 hover:bg-white/10 text-cream/80 border-white/10'
                            }`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                        </div>

                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-mono inline-flex items-center gap-1 transition-colors p-1 cursor-pointer"
                          title="Delete inquiry record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RECENT STORE ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className={`flex flex-col sm:flex-row gap-3 ${cardBg} p-4 rounded-xs`}>
              <div className="relative flex-1">
                <Search
                  className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isLight ? 'text-stone-400' : 'text-cream/40'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search order ID, customer, location, or blend..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xs ${inputClass}`}
                />
              </div>

              {/* Status Filter */}
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className={`px-3 py-2 rounded-xs ${selectClass}`}
              >
                <option value="ALL">All Order Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Roasting">Roasting</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className={`text-center py-16 ${cardBg} rounded-xs`}>
                <ShoppingBag
                  className={`w-10 h-10 mx-auto mb-3 ${isLight ? 'text-stone-300' : 'text-cream/20'}`}
                />
                <p
                  className={`font-display text-base ${isLight ? 'text-stone-700' : 'text-cream/70'}`}
                >
                  No orders found
                </p>
                <p
                  className={`text-xs font-mono mt-1 ${isLight ? 'text-stone-400' : 'text-cream/40'}`}
                >
                  Orders placed via the storefront will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className={`${cardBg} p-5 sm:p-6 rounded-xs hover:border-stone-300 transition-all space-y-4`}
                  >
                    {/* Order Header */}
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
                        isLight ? 'border-stone-200' : 'border-white/10'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-sm font-bold ${
                              isLight ? 'text-amber-800' : 'text-gold-brass'
                            }`}
                          >
                            {ord.id}
                          </span>
                          <span
                            className={`font-display text-base font-bold ${
                              isLight ? 'text-stone-950' : 'text-cream'
                            }`}
                          >
                            {ord.customerName}
                          </span>
                          {ord.location && (
                            <span
                              className={`text-[11px] ${
                                isLight ? 'text-stone-500' : 'text-cream/50'
                              }`}
                            >
                              · {ord.location}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-mono ${
                            isLight ? 'text-stone-500' : 'text-cream/40'
                          }`}
                        >
                          Placed: {formatDate(ord.createdAt)}
                        </span>
                      </div>

                      {/* Status Selector & Price */}
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-display text-xl font-bold ${
                            isLight ? 'text-stone-950' : 'text-cream'
                          }`}
                        >
                          ₹{ord.totalPrice}
                        </span>

                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className={`text-xs font-mono font-medium px-3 py-1 rounded-full border focus:outline-none cursor-pointer ${getStatusBadge(
                            ord.status
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Roasting">Roasting</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Line Items */}
                    <div className="space-y-2">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest block ${
                          isLight ? 'text-stone-500' : 'text-cream/40'
                        }`}
                      >
                        Ordered Items & Pack Sizes:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {ord.items.map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xs flex items-center justify-between text-xs border ${
                              isLight
                                ? 'bg-stone-50 border-stone-200'
                                : 'bg-black/40 border-white/5'
                            }`}
                          >
                            <div>
                              <span
                                className={`font-medium block ${
                                  isLight ? 'text-stone-900' : 'text-cream'
                                }`}
                              >
                                {item.name}
                              </span>
                              <span
                                className={`text-[10px] font-mono ${
                                  isLight ? 'text-stone-500' : 'text-cream/50'
                                }`}
                              >
                                {item.size} · ₹{item.price} each
                              </span>
                            </div>
                            <span
                              className={`font-mono text-xs font-bold px-2 py-0.5 rounded-xs border ${
                                isLight
                                  ? 'bg-white text-stone-900 border-stone-200'
                                  : 'bg-white/5 text-gold-brass border-white/10'
                              }`}
                            >
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Footer & Actions */}
                    <div
                      className={`flex items-center justify-between pt-2 border-t text-xs ${
                        isLight ? 'border-stone-200' : 'border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {ord.phone && (
                          <a
                            href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono rounded-xs transition-colors border ${
                              isLight
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Customer</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => deleteOrder(ord.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-mono inline-flex items-center gap-1 transition-colors p-1 cursor-pointer"
                        title="Remove order record"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ROASTERY BLENDS & PRICING */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            {/* Header with Add Blend Toggle */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Flame className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-gold-brass'}`} />
                  <h2
                    className={`font-display text-2xl font-bold ${
                      isLight ? 'text-stone-950' : 'text-cream'
                    }`}
                  >
                    Signature Roastery Catalog & Inventory Matrix
                  </h2>
                </div>
                <p
                  className={`text-xs mt-1 font-light ${
                    isLight ? 'text-stone-600' : 'text-cream/60'
                  }`}
                >
                  Formulate new blend offerings and inspect current roastery inventory in real-time.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xs transition-colors self-start sm:self-auto cursor-pointer shadow-sm ${
                  isLight
                    ? 'bg-stone-900 text-white hover:bg-black'
                    : 'bg-gold-brass text-espresso-950 hover:bg-[#F0C968]'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{isFormOpen ? 'Hide Formulator' : '+ New Roastery Blend'}</span>
              </button>
            </div>

            {/* INLINE PRODUCT FORMULATOR (Zero friction - "without asking") */}
            {isFormOpen && (
              <div
                className={`p-6 sm:p-8 rounded-xs space-y-6 relative overflow-hidden shadow-sm border ${
                  isLight
                    ? 'bg-white border-amber-300/80 shadow-xs'
                    : 'bg-[#120A0C] border-gold-brass/30 shadow-2xl'
                }`}
              >
                {/* Formulator Header & Quick Presets */}
                <div
                  className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-4 ${
                    isLight ? 'border-stone-200' : 'border-white/10'
                  }`}
                >
                  <div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest block mb-1 font-bold ${
                        isLight ? 'text-amber-800' : 'text-gold-brass'
                      }`}
                    >
                      Roastery Formulation Desk
                    </span>
                    <h3
                      className={`font-display text-lg font-bold ${
                        isLight ? 'text-stone-950' : 'text-cream'
                      }`}
                    >
                      Create & Publish New Roast Expression
                    </h3>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[11px] font-mono mr-1 ${
                        isLight ? 'text-stone-500' : 'text-cream/50'
                      }`}
                    >
                      Quick Presets:
                    </span>
                    {quickPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded-xs transition-colors cursor-pointer border ${
                          isLight
                            ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300 font-medium'
                            : 'bg-white/5 hover:bg-white/10 text-cream/80 hover:text-gold-brass border-white/10'
                        }`}
                      >
                        ⚡ {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formulation Input Form */}
                <form onSubmit={handleCreateProduct} className="space-y-6">
                  {/* Row 1: Core Identity */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Blend Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kafee Pudi, Mysore Reserve"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${inputClass}`}
                      />
                    </div>

                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Expression / Variant Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vienna Dark Roast, Estate Peaberry"
                        value={newProduct.variant}
                        onChange={(e) => setNewProduct({ ...newProduct, variant: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${inputClass}`}
                      />
                    </div>

                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Edition Badge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. New Harvest, Limited Batch, Bestseller"
                        value={newProduct.badge}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${inputClass}`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Composition & Roast Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Bean Composition
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Arabica & Robusta, 100% Arabica"
                        value={newProduct.blend}
                        onChange={(e) => setNewProduct({ ...newProduct, blend: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${inputClass}`}
                      />
                    </div>

                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Roast Level
                      </label>
                      <select
                        value={newProduct.roastLevel}
                        onChange={(e) => setNewProduct({ ...newProduct, roastLevel: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${selectClass}`}
                      >
                        <option value="Light">Light Roast</option>
                        <option value="Medium">Medium Roast</option>
                        <option value="Medium-Dark">Medium-Dark Roast</option>
                        <option value="Dark">Dark French Roast</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Tagline / Grind Style
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ground 'N' Filter Coffee, Artisan Whole Beans"
                        value={newProduct.tagline}
                        onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${inputClass}`}
                      />
                    </div>
                  </div>

                  {/* Row 3: Tasting Notes & Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Flavor Notes (comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dark Chocolate, Caramel, Roasted Nuts"
                        value={newProduct.flavorNotes}
                        onChange={(e) => setNewProduct({ ...newProduct, flavorNotes: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xs ${inputClass}`}
                      />
                      <span
                        className={`text-[10px] font-mono mt-1 block ${
                          isLight ? 'text-stone-500' : 'text-cream/40'
                        }`}
                      >
                        Separate flavors with commas for automatic badge rendering.
                      </span>
                    </div>

                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-600 font-semibold' : 'text-cream/60'
                        }`}
                      >
                        Blend Description & Cupping Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Aromatic cup profile, mouthfeel, and recommended extraction notes..."
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className={`w-full px-3.5 py-2 text-xs rounded-xs resize-none ${inputClass}`}
                      />
                    </div>
                  </div>

                  {/* Row 4: Packaging Image & Color Palette Selector */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xs border ${
                      isLight ? 'bg-stone-50 border-stone-200' : 'bg-black/30 border-white/5'
                    }`}
                  >
                    {/* Image Selector */}
                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-2 font-semibold ${
                          isLight ? 'text-stone-700' : 'text-cream/60'
                        }`}
                      >
                        Select Packaging Pouch Presentation:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {availableImages.map((img) => {
                          const isSelected = newProduct.image === img.path;
                          return (
                            <button
                              key={img.path}
                              type="button"
                              onClick={() => setNewProduct({ ...newProduct, image: img.path })}
                              className={`p-2 rounded-xs border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                                isSelected
                                  ? isLight
                                    ? 'bg-white border-stone-900 ring-2 ring-stone-900 shadow-xs'
                                    : 'bg-gold-brass/10 border-gold-brass ring-1 ring-gold-brass'
                                  : isLight
                                  ? 'bg-white/80 border-stone-200 hover:border-stone-400'
                                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="w-10 h-12 flex items-center justify-center overflow-hidden">
                                <img
                                  src={img.path}
                                  alt={img.label}
                                  className="h-full object-contain filter drop-shadow-md"
                                />
                              </div>
                              <span
                                className={`text-[9px] font-mono truncate w-full text-center block ${
                                  isLight ? 'text-stone-700 font-medium' : 'text-cream/70'
                                }`}
                              >
                                {img.label.split(' ')[0]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Color Accent Selector */}
                    <div>
                      <label
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-2 font-semibold ${
                          isLight ? 'text-stone-700' : 'text-cream/60'
                        }`}
                      >
                        Roastery Accent Palette:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorPresets.map((palette) => {
                          const isSelected = newProduct.colorPrimary === palette.primary;
                          return (
                            <button
                              key={palette.name}
                              type="button"
                              onClick={() =>
                                setNewProduct({
                                  ...newProduct,
                                  colorPrimary: palette.primary,
                                  colorSecondary: palette.secondary,
                                })
                              }
                              className={`p-2 rounded-xs border text-left transition-all cursor-pointer flex items-center gap-2 ${
                                isSelected
                                  ? isLight
                                    ? 'bg-white border-stone-900 ring-2 ring-stone-900 shadow-xs'
                                    : 'bg-white/10 border-gold-brass ring-1 ring-gold-brass'
                                  : isLight
                                  ? 'bg-white/80 border-stone-200 hover:border-stone-400'
                                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div
                                className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-2xs"
                                style={{ backgroundColor: palette.primary }}
                              />
                              <span
                                className={`text-[10px] font-mono truncate ${
                                  isLight ? 'text-stone-800 font-medium' : 'text-cream/80'
                                }`}
                              >
                                {palette.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Price Matrix */}
                  <div>
                    <label
                      className={`text-[10px] font-mono uppercase tracking-widest block mb-2 font-semibold ${
                        isLight ? 'text-stone-700' : 'text-cream/60'
                      }`}
                    >
                      Retail & HoReCa Price Matrix (₹ Indian Rupees)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span
                          className={`text-[11px] font-mono block mb-1 ${
                            isLight ? 'text-stone-500' : 'text-cream/40'
                          }`}
                        >
                          200g Pack (₹)
                        </span>
                        <input
                          type="number"
                          min="50"
                          max="5000"
                          value={newProduct.price200}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price200: e.target.value })
                          }
                          className={`w-full px-3 py-2 text-xs font-mono rounded-xs ${inputClass}`}
                        />
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-mono block mb-1 ${
                            isLight ? 'text-stone-500' : 'text-cream/40'
                          }`}
                        >
                          400g Pack (₹)
                        </span>
                        <input
                          type="number"
                          min="50"
                          max="5000"
                          value={newProduct.price400}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price400: e.target.value })
                          }
                          className={`w-full px-3 py-2 text-xs font-mono rounded-xs ${inputClass}`}
                        />
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-mono block mb-1 ${
                            isLight ? 'text-stone-500' : 'text-cream/40'
                          }`}
                        >
                          500g Pack (₹)
                        </span>
                        <input
                          type="number"
                          min="50"
                          max="5000"
                          value={newProduct.price500}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price500: e.target.value })
                          }
                          className={`w-full px-3 py-2 text-xs font-mono rounded-xs ${inputClass}`}
                        />
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-mono block mb-1 ${
                            isLight ? 'text-stone-500' : 'text-cream/40'
                          }`}
                        >
                          1 kg Roastery Bag (₹)
                        </span>
                        <input
                          type="number"
                          min="50"
                          max="5000"
                          value={newProduct.price1000}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price1000: e.target.value })
                          }
                          className={`w-full px-3 py-2 text-xs font-mono rounded-xs ${inputClass}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button (Direct action without asking) */}
                  <div
                    className={`flex items-center justify-between pt-4 border-t ${
                      isLight ? 'border-stone-200' : 'border-white/10'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono ${
                        isLight ? 'text-stone-500' : 'text-cream/50'
                      }`}
                    >
                      ⚡ Adding publishes immediately to this dashboard & live storefront catalog.
                    </span>

                    <button
                      type="submit"
                      className={`inline-flex items-center gap-2 px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-md cursor-pointer ${
                        isLight
                          ? 'bg-stone-900 hover:bg-black text-white'
                          : 'bg-gold-brass hover:bg-[#F0C968] text-espresso-950'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Blend to Roastery & Storefront</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SIMULTANEOUS CURRENT PRODUCTS DISPLAY */}
            <div className="space-y-4 pt-4">
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isLight ? 'border-stone-200' : 'border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-gold-brass'}`} />
                  <h3
                    className={`font-display text-lg font-bold ${
                      isLight ? 'text-stone-950' : 'text-cream'
                    }`}
                  >
                    Active Roastery Formulations ({products.length})
                  </h3>
                </div>
                <span
                  className={`text-xs font-mono ${
                    isLight ? 'text-stone-500 font-medium' : 'text-cream/50'
                  }`}
                >
                  Live synced with customer catalog
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className={`${cardBg} p-6 rounded-xs space-y-4 relative overflow-hidden group transition-all`}
                  >
                    {/* Accent Stripe */}
                    <div
                      className="absolute top-0 right-0 w-2 h-full"
                      style={{ backgroundColor: prod.colorPrimary || '#D6A265' }}
                    />

                    {/* Top Row: Thumbnail + Blend Information */}
                    <div className="flex items-start gap-4">
                      {/* Product Pouch Preview */}
                      <div
                        className={`w-16 h-20 rounded-xs flex items-center justify-center p-1 shrink-0 overflow-hidden border ${
                          isLight
                            ? 'bg-stone-50 border-stone-200 shadow-2xs'
                            : 'bg-black/50 border-white/10'
                        }`}
                      >
                        <img
                          src={prod.image || '/images/roasted-beans.jpeg'}
                          alt={prod.name}
                          className="h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest truncate block font-bold ${
                              isLight ? 'text-amber-800' : 'text-gold-brass'
                            }`}
                          >
                            {prod.blend} · {prod.roastLevel}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                              isLight
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            }`}
                          >
                            {prod.inStock ? 'Active' : 'Archived'}
                          </span>
                        </div>

                        <h4
                          className={`font-display text-lg font-bold truncate ${
                            isLight ? 'text-stone-950' : 'text-cream'
                          }`}
                        >
                          {prod.name}
                        </h4>
                        <p
                          className={`font-display text-xs italic truncate ${
                            isLight ? 'text-amber-800 font-medium' : 'text-caramel'
                          }`}
                        >
                          {prod.variant}
                        </p>
                        <p
                          className={`text-[10px] font-mono truncate ${
                            isLight ? 'text-stone-500' : 'text-cream/40'
                          }`}
                        >
                          {prod.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Cupping Description */}
                    <p
                      className={`text-xs leading-relaxed font-light line-clamp-2 ${
                        isLight ? 'text-stone-700' : 'text-cream/70'
                      }`}
                    >
                      {prod.description}
                    </p>

                    {/* Price Matrix Grid */}
                    <div>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest block mb-1.5 ${
                          isLight ? 'text-stone-500' : 'text-cream/40'
                        }`}
                      >
                        Current Price Matrix:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.entries(prod.prices || {}).map(([sz, price]) => (
                          <div
                            key={sz}
                            className={`p-2 text-center rounded-xs border ${
                              isLight
                                ? 'bg-stone-50 border-stone-200'
                                : 'bg-black/40 border-white/10'
                            }`}
                          >
                            <span
                              className={`text-[10px] font-mono block ${
                                isLight ? 'text-stone-500' : 'text-cream/50'
                              }`}
                            >
                              {sz}
                            </span>
                            <span
                              className={`font-display text-xs font-bold ${
                                isLight ? 'text-stone-950' : 'text-cream'
                              }`}
                            >
                              ₹{price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Flavor Notes & Action Buttons */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between gap-2 text-[11px] font-mono ${
                        isLight ? 'border-stone-200' : 'border-white/5'
                      }`}
                    >
                      <div
                        className={`truncate flex-1 ${
                          isLight ? 'text-stone-600' : 'text-cream/50'
                        }`}
                      >
                        <span className={isLight ? 'text-stone-400' : 'text-cream/30'}>
                          Notes:{' '}
                        </span>
                        <span>
                          {Array.isArray(prod.flavorNotes)
                            ? prod.flavorNotes.join(' · ')
                            : prod.flavorNotes}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {prod.badge && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs border ${
                              isLight
                                ? 'bg-amber-50 text-amber-900 border-amber-300 font-medium'
                                : 'bg-gold-brass/10 text-gold-brass border-gold-brass/20'
                            }`}
                          >
                            {prod.badge}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            deleteProduct(prod.id);
                            setToastMessage(`Removed blend "${prod.name} — ${prod.variant}"`);
                            setTimeout(() => setToastMessage(''), 3000);
                          }}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                          title="Remove formulation from roastery catalog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FLOATING ROASTERY TOAST NOTIFICATION */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 font-mono text-xs border ${
                isLight
                  ? 'bg-stone-900 text-white border-stone-800'
                  : 'bg-[#160E10] border-gold-brass text-cream'
              }`}
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
