import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AIAssistant from './pages/AIAssistant';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Addresses from './pages/Addresses';
import Wallet from './pages/Wallet';
import GiftFinder from './pages/GiftFinder';
import HelpCenter from './pages/HelpCenter';
import BrandStores from './pages/BrandStores';
import OrderSuccess from './pages/OrderSuccess';
import SmartOutfit from './pages/SmartOutfit';
import FlashSales from './pages/FlashSales';
import Compare from './pages/Compare';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';

import Categories from './pages/Categories';

// Temporary components for remaining routes
const ProfilePage = () => <div className="p-8 text-center pt-24 font-display">ملفك الشخصي وإعدادات الحساب</div>;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-x-hidden" dir="rtl">
              <Navbar />
              
              <main className="flex-1 w-full max-w-lg mx-auto sm:shadow-2xl sm:bg-white min-h-screen bg-white">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/addresses" element={<Addresses />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/gift-finder" element={<GiftFinder />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/brand-stores" element={<BrandStores />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/smart-outfit" element={<SmartOutfit />} />
                  <Route path="/flash-sales" element={<FlashSales />} />
                  <Route path="/compare" element={<Compare />} />
                </Routes>
              </main>

              <MobileNav />
            </div>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}
