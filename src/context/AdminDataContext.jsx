import { createContext, useContext, useState, useEffect } from 'react';
import { products as defaultProducts } from '../data/products';

const AdminDataContext = createContext();

const INQUIRIES_KEY = 'brownlabel-admin-inquiries-v1';
const ORDERS_KEY = 'brownlabel-admin-orders-v1';
const PRODUCTS_KEY = 'brownlabel-admin-products-v1';

const defaultInquiries = [
  {
    id: 'INQ-9482',
    businessName: 'Bangalore Heritage Café',
    contactName: 'Rakesh Nambiar',
    email: 'rakesh@heritagecafe.in',
    phone: '+91 98450 12345',
    type: 'cafe',
    typeName: 'Specialty Café / Filter Coffee Outlet',
    volume: '150-500kg',
    notes: 'Require consistent Extra Strong dark decoction roast for 2 outlet locations in Indiranagar and Koramangala. Interested in bi-weekly dispatch.',
    status: 'In Discussion',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hrs ago
  },
  {
    id: 'INQ-9481',
    businessName: 'The Woodrose Luxury Club',
    contactName: 'Anita Rao',
    email: 'procurement@woodrose.com',
    phone: '+91 98860 54321',
    type: 'hotel',
    typeName: 'Luxury Hotel / Fine Dining',
    volume: '50-150kg',
    notes: 'Breakfast filter coffee service and in-room pour-over bags for boutique rooms. Requesting sample tasting kit of Ultra Rich and Premium Gold.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hrs ago
  },
  {
    id: 'INQ-9480',
    businessName: 'TechPark Enterprise Pantries',
    contactName: 'Karthik Sundaram',
    email: 'facilities@techpark-ops.com',
    phone: '+91 99001 12233',
    type: 'corporate',
    typeName: 'Corporate Office / Enterprise Pantry',
    volume: '500kg+',
    notes: 'Daily espresso machine whole beans & traditional filter decoction for 4 building cafeterias in Whitefield. Need monthly recurring commercial invoicing.',
    status: 'Sample Dispatched',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'INQ-9479',
    businessName: 'Malnad Coffee & Tiffin House',
    contactName: 'Venkatesh Murthy',
    email: 'venky@malnadcoffee.co',
    phone: '+91 94480 88776',
    type: 'retail',
    typeName: 'Supermarket / Retail Chain / Distributor',
    volume: '150-500kg',
    notes: 'Retail distribution across 6 retail points in Mysore & Hassan. Need custom shelf packaging and FSSAI documentation.',
    status: 'Partner Onboarded',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
];

const defaultOrders = [
  {
    id: 'BL-89425',
    customerName: 'Sangeetha Iyer',
    phone: '+91 98451 90909',
    location: 'Malleshwaram, Bengaluru',
    items: [
      { name: 'Kafee Pudi — Ultra Rich', size: '1kg', quantity: 2, price: 849 },
      { name: 'Kafee Pudi — Premium Gold', size: '500g', quantity: 1, price: 519 },
    ],
    totalPrice: 2217,
    status: 'Pending',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
  },
  {
    id: 'BL-89424',
    customerName: 'Rajesh Kumar',
    phone: '+91 98410 77665',
    location: 'T. Nagar, Chennai',
    items: [
      { name: 'Kafee Pudi — Extra Strong', size: '500g', quantity: 3, price: 479 },
    ],
    totalPrice: 1437,
    status: 'Roasting',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hrs ago
  },
  {
    id: 'BL-89423',
    customerName: 'Dr. Vikram Rao',
    phone: '+91 98490 33221',
    location: 'Jubilee Hills, Hyderabad',
    items: [
      { name: 'Roasted Coffee Beans', size: '1kg', quantity: 1, price: 1099 },
    ],
    totalPrice: 1099,
    status: 'Dispatched',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id: 'BL-89422',
    customerName: 'Priya Menon',
    phone: '+91 98800 44556',
    location: 'Indiranagar, Bengaluru',
    items: [
      { name: 'Kafee Pudi — Ultra Rich', size: '400g', quantity: 2, price: 375 },
      { name: 'Kafee Pudi — Premium Gold', size: '200g', quantity: 1, price: 229 },
    ],
    totalPrice: 979,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
];

export function AdminDataProvider({ children }) {
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_KEY);
      return saved ? JSON.parse(saved) : defaultInquiries;
    } catch {
      return defaultInquiries;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : defaultOrders;
    } catch {
      return defaultOrders;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to sync inquiries to localStorage:', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to sync products to localStorage:', e);
    }
  }, [products]);

  const addInquiry = (inquiry) => {
    const newInq = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...inquiry,
    };
    setInquiries((prev) => [newInq, ...prev]);
    return newInq;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const addOrder = (order) => {
    const newOrd = {
      id: `BL-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...order,
    };
    setOrders((prev) => [newOrd, ...prev]);
    return newOrd;
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
    );
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const addProduct = (productData) => {
    const slug = (productData.name + '-' + productData.variant)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const newProd = {
      id: slug || `blend-${Date.now()}`,
      createdAt: new Date().toISOString(),
      inStock: true,
      ...productData,
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDemoData = () => {
    setInquiries(defaultInquiries);
    setOrders(defaultOrders);
    setProducts(defaultProducts);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(defaultInquiries));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(defaultOrders));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  };

  const exportData = () => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      roastery: 'Brown Label Coffee Private Limited',
      inquiries,
      orders,
      products,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brown-label-admin-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminDataContext.Provider
      value={{
        inquiries,
        orders,
        products,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDemoData,
        exportData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
