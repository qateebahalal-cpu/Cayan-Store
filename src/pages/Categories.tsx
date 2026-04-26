import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants/mockData';
import { Search, Smartphone, Watch, Sparkles, Headphones, ShoppingBag, ChevronLeft } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={18} />,
  Watch: <Watch size={18} />,
  Sparkles: <Sparkles size={18} />,
  Headphones: <Headphones size={18} />,
  ShoppingBag: <ShoppingBag size={18} />,
};

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 pb-24 min-h-screen">
      <div className="flex flex-col gap-6">
        <header>
          <h2 className="text-2xl font-display font-extrabold text-darker mb-2">تصفح الأقسام</h2>
          <p className="text-slate-400 text-sm">استكشف أكثر من 50 تصنيفاً مختلفاً في متجر كيان</p>
        </header>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن قسم معين..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(idx * 0.02, 0.5) }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-[32px] aspect-[4/5] bg-slate-100 shadow-sm border border-slate-100"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darker/90 via-darker/20 to-transparent flex flex-col justify-end p-5">
                <div className="bg-primary/20 backdrop-blur-md w-10 h-10 rounded-xl flex items-center justify-center text-primary mb-3">
                  {iconMap[cat.icon]}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-display font-bold text-sm tracking-tight">{cat.name}</h3>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">200 منتج</span>
                  </div>
                  <div className="bg-white/10 p-1.5 rounded-full text-white group-hover:bg-primary transition-colors">
                    <ChevronLeft size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">لم يتم العثور على أي قسم بهذا الاسم</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
