import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Star, Heart, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants/mockData';

const STORES = [
  { id: 1, name: 'آبل', logo: '🍎', followers: '2.5M', rating: 4.9, image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=400&h=200&auto=format&fit=crop' },
  { id: 2, name: 'سامسونج', logo: '🌌', followers: '1.8M', rating: 4.7, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400&h=200&auto=format&fit=crop' },
  { id: 3, name: 'سوني', logo: '🎮', followers: '900K', rating: 4.8, image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ffc2b0?q=80&w=400&h=200&auto=format&fit=crop' },
  { id: 4, name: 'أديداس', logo: '👟', followers: '1.2M', rating: 4.6, image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=400&h=200&auto=format&fit=crop' },
];

const BrandStores: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-black text-darker">المتاجر المميزة</h1>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm text-[10px] font-bold text-primary">
          <Star size={12} className="fill-primary" /> 50 متجر نشط
        </div>
      </header>

      <div className="space-y-6">
        {STORES.map((store, idx) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative h-32">
              <img src={store.image} alt={store.name} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute -bottom-4 right-6 w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-3xl border-4 border-white">
                {store.logo}
              </div>
            </div>
            
            <div className="p-6 pt-8 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-display font-black text-darker mb-1">{store.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{store.followers} متابع</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                    <Star size={10} className="fill-amber-500" /> {store.rating}
                  </div>
                </div>
              </div>
              <button className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <ArrowLeft size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-2">اكتشف حسب الفئة</h3>
        <div className="grid grid-cols-2 gap-4">
          {['الإلكترونيات', 'الموضة', 'المنزل', 'الجمال'].map((cat, i) => (
            <div key={i} className="p-5 bg-white border border-slate-100 rounded-[32px] flex items-center gap-4 hover:border-primary transition-all cursor-pointer">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-primary">
                <ShoppingBag size={20} />
              </div>
              <span className="text-xs font-bold text-darker">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStores;
