import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AdminDataProvider } from './context/AdminDataContext';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ScrollRevealStatement from './components/sections/ScrollRevealStatement';
import HeritageSection from './components/sections/HeritageSection';
import ProductCatalog from './components/sections/ProductCatalog';
import BrewingGuide from './components/sections/BrewingGuide';
import TestimonialsSection from './components/sections/TestimonialsSection';
import WholesaleB2BSection from './components/sections/WholesaleB2BSection';
import Footer from './components/layout/Footer';
import CartDrawer from './components/shop/CartDrawer';
import WhatsAppCheckoutModal from './components/shop/WhatsAppCheckoutModal';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash === '#admin';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [hasAnnouncement, setHasAnnouncement] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenWhatsAppCheckout = () => {
    setIsCartOpen(false);
    setIsWhatsAppModalOpen(true);
  };

  const handleExitAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  return (
    <AdminDataProvider>
      <CartProvider>
        {isAdminView ? (
          <AdminDashboard onExit={handleExitAdmin} />
        ) : (
          <div className="min-h-screen bg-espresso-950 text-cream flex flex-col font-body selection:bg-gold/30 selection:text-white">
            {/* Top Announcement Bar */}
            <AnnouncementBar onDismiss={() => setHasAnnouncement(false)} />

            {/* Floating Navbar with dynamic top positioning */}
            <Navbar
              onCartOpen={() => setIsCartOpen(true)}
              hasAnnouncement={hasAnnouncement}
            />

            {/* Main Content Sections */}
            <main className="flex-1">
              <HeroSection />
              <ScrollRevealStatement />
              <HeritageSection />
              <ProductCatalog />
              <BrewingGuide />
              <TestimonialsSection />
              <WholesaleB2BSection />
            </main>

            {/* Global Footer */}
            <Footer onOpenAdmin={() => (window.location.hash = '#admin')} />

            {/* Sliding Shopping Bag Drawer */}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onWhatsAppCheckout={handleOpenWhatsAppCheckout}
            />

            {/* Structured WhatsApp Checkout Modal */}
            <WhatsAppCheckoutModal
              isOpen={isWhatsAppModalOpen}
              onClose={() => setIsWhatsAppModalOpen(false)}
            />
          </div>
        )}
      </CartProvider>
    </AdminDataProvider>
  );
}
