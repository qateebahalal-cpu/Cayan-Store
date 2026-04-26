import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Shirt, ShoppingBag, Eye, RefreshCw, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OUTFIT_ITEMS = [
  { name: 'قميص كتان بيج', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200&h=250&auto=format&fit=crop', price: 180 },
  { name: 'بنطلون شينو كحلي', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=200&h=250&auto=format&fit=crop', price: 290 },
  { name: 'حذاء كلاسيكي بني', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=200&h=250&auto=format&fit=crop', price: 450 },
];

const SmartOutfit: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-primary" size={20} />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">موديل الذكاء الاصطناعي</span>
        </div>
        <h1 className="text-2xl font-display font-black text-darker italic">منسق كيان <span className="text-primary">الذكي</span></h1>
      </header>

      {/* Main Stylist View */}
      <div className="relative mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
             {OUTFIT_ITEMS.slice(0, 2).map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm relative group"
               >
                 <img src={item.image} alt={item.name} className="w-full aspect-[4/5] object-cover rounded-2xl mb-3" />
                 <h3 className="text-xs font-bold text-darker mb-1">{item.name}</h3>
                 <span className="text-[10px] font-black text-primary">{item.price} ر.س</span>
                 <button className="absolute top-6 left-6 p-2 bg-white/80 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                   <RefreshCw size={14} className="text-slate-400" />
                 </button>
               </motion.div>
             ))}
          </div>
          <div className="pt-20 space-y-4">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm relative group"
             >
               <img src={OUTFIT_ITEMS[2].image} alt={OUTFIT_ITEMS[2].name} className="w-full aspect-[4/5] object-cover rounded-2xl mb-3" />
               <h3 className="text-xs font-bold text-darker mb-1">{OUTFIT_ITEMS[2].name}</h3>
               <span className="text-[10px] font-black text-primary">{OUTFIT_ITEMS[2].price} ر.س</span>
               <button className="absolute top-6 left-6 p-2 bg-white/80 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                 <RefreshCw size={14} className="text-slate-400" />
               </button>
             </motion.div>
             <div className="aspect-[4/5] bg-primary/5 rounded-[40px] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-6 text-center">
                <Shirt className="text-primary mb-3" size={32} />
                <p className="text-[10px] font-bold text-primary/60">اطلب تنسيق إكسسوار إضافي</p>
             </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-darker rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-darker/30">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">إجمالي الطقم الكامل</span>
              <h4 className="text-2xl font-display font-black">920 ريال</h4>
            </div>
            <div className="flex -space-x-4">
              {[1, 2].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-darker bg-slate-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-darker bg-primary flex items-center justify-center text-[10px] font-bold">+12</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20">شراء الطقم بالكامل</button>
            <button className="w-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
               <Heart size={20} />
            </button>
          </div>
        </div>
        <Sparkles size={150} className="absolute -left-10 -bottom-10 text-white/5" />
      </div>

      <div className="mt-12">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-2 flex items-center gap-2">أطقم جاهزة أخرى <Eye size={14} /></h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {[1,2,3].map(i => (
            <div key={i} className="min-w-[140px] aspect-square bg-white rounded-3xl p-3 border border-slate-100 relative group overflow-hidden">
               <img src={`https://picsum.photos/seed/outfit${i}/200/200`} className="w-full h-full object-cover rounded-2xl opacity-60" />
               <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className="text-[10px] font-black text-darker uppercase">طقم {i}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartOutfit;
