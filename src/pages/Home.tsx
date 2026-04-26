import React from 'react';
import { motion } from 'motion/react';
import { FEATURED_PRODUCTS, CATEGORIES } from '../constants/mockData';
import ProductCard from '../components/store/ProductCard';
import { Smartphone, Watch, Sparkles, Headphones, ShoppingBag, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={20} />,
  Watch: <Watch size={20} />,
  Sparkles: <Sparkles size={20} />,
  Headphones: <Headphones size={20} />,
  ShoppingBag: <ShoppingBag size={20} />,
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-10">
      {/* Search Trigger */}
      <section className="px-4 pt-4">
        <div 
          onClick={() => navigate('/search')}
          className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3 text-slate-400">
            <Search size={18} />
            <span className="text-sm font-medium">ابحث عن جوالات، عطور، ساعات...</span>
          </div>
          <div className="bg-white p-1 rounded-lg shadow-sm">
             <ArrowLeft size={16} className="text-primary" />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-4 pt-4 pb-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-48 rounded-[32px] overflow-hidden group shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop" 
            alt="Hero Banner"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darker/80 to-transparent flex flex-col justify-center px-8">
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2"
            >
              عرض خاص وحصري
            </motion.span>
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white text-3xl font-display font-extrabold mb-4 leading-tight"
            >
               مخزون ضخم <br /> <span className="text-primary">بأفضل الأسعار</span>
            </motion.h2>
            <Link to="/categories" className="bg-white text-darker px-6 py-2 rounded-full text-xs font-bold w-fit shadow-xl inline-block">
              تصفح الأقسام الـ 50
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-darker">تصفح 50 قسماً</h3>
          <Link to="/categories" className="text-primary text-xs font-semibold flex items-center gap-1">
            الكل <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.slice(0, 15).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <div className="w-16 h-16 rounded-3xl glass-morphism flex items-center justify-center text-slate-600 shadow-sm border border-slate-200 hover:text-primary hover:border-primary transition-all cursor-pointer">
                {iconMap[cat.icon]}
              </div>
              <span className="text-[10px] font-bold text-slate-500 text-center line-clamp-1">{cat.name}</span>
            </motion.div>
          ))}
          <div className="flex flex-col items-center gap-2 min-w-[72px]">
            <Link to="/categories" className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-primary shadow-inner border border-dashed border-slate-300">
               <ArrowLeft size={20} />
            </Link>
            <span className="text-[10px] font-bold text-slate-500">+35 آخرين</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-darker">منتجات مختارة من الـ 10,000</h3>
          <button className="text-primary text-xs font-semibold flex items-center gap-1">
            تصفح المزيد <ArrowLeft size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Smart Services Grid */}
      <section className="px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Link to="/smart-outfit" className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100 flex flex-col justify-between aspect-square group shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-50 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900 mb-1 leading-tight">المنسق الذكي</h4>
              <p className="text-[10px] text-emerald-700/60 font-medium">تنسيقات عصرية بالذكاء الاصطناعي</p>
            </div>
          </Link>
          <div className="space-y-4">
            <Link to="/brand-stores" className="block p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:border-primary transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-darker">الماركات</span>
                <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                  <ShoppingBag size={14} />
                </div>
              </div>
            </Link>
            <Link to="/flash-sales" className="block p-5 bg-amber-50 border border-amber-100 rounded-[32px] shadow-sm hover:bg-amber-100 transition-all relative overflow-hidden">
               <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-amber-900">عروض البرق</span>
                  <Zap size={14} className="text-amber-500 fill-amber-500" />
               </div>
               <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-amber-200/20 rounded-full" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="px-4 mb-20">
        <div className="bg-darker rounded-[32px] p-8 relative overflow-hidden text-center">
           <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 p-4 rounded-2xl">
                 <div className="text-primary text-2xl font-display font-black tracking-tighter">10K+</div>
                 <div className="text-slate-400 text-[10px] font-bold uppercase">منتج متاح</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                 <div className="text-primary text-2xl font-display font-black tracking-tighter">50</div>
                 <div className="text-slate-400 text-[10px] font-bold uppercase">تصنيف مختلف</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
