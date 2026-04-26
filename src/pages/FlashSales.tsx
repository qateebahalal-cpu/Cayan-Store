import React from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, ChevronLeft, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '../constants/mockData';

const FlashSales: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      {/* Header with Countdown */}
      <header className="bg-darker rounded-[40px] p-8 text-white relative overflow-hidden mb-10 shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-amber-400 fill-amber-400" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400/80">عرض محدود الوقت</span>
          </div>
          <h1 className="text-3xl font-display font-black mb-6">تخفيضات <span className="text-primary">البرق</span></h1>
          
          <div className="flex gap-3">
             <div className="flex flex-col items-center">
                <div className="w-12 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl font-display font-black">12</div>
                <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">ساعة</span>
             </div>
             <div className="text-2xl pt-2">:</div>
             <div className="flex flex-col items-center">
                <div className="w-12 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl font-display font-black">45</div>
                <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">دقيقة</span>
             </div>
             <div className="text-2xl pt-2">:</div>
             <div className="flex flex-col items-center">
                <div className="w-12 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl font-display font-black">09</div>
                <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">ثانية</span>
             </div>
          </div>
        </div>
        <Clock size={150} className="absolute -left-10 -bottom-10 text-white/5 rotate-12" />
      </header>

      {/* Flash Sale Products */}
      <div className="space-y-6">
        {FEATURED_PRODUCTS.slice(0, 5).map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm flex items-center gap-6 relative group"
          >
            <div className="relative w-32 h-32 flex-shrink-0">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[32px]" />
               <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                  -40%
               </div>
            </div>

            <div className="flex-1">
               <div className="flex items-center gap-1 mb-1">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-slate-400">{product.rating}</span>
               </div>
               <h3 className="text-sm font-bold text-darker mb-1">{product.name}</h3>
               <p className="text-[10px] text-slate-400 line-clamp-1 mb-3">{product.description}</p>
               
               <div className="flex items-center justify-between">
                  <div>
                     <span className="text-xs font-display font-black text-primary">{(product.price * 0.6).toLocaleString()} ريال</span>
                     <span className="text-[9px] text-slate-300 line-through block italic">{product.price.toLocaleString()} ر.س</span>
                  </div>
                  <button className="bg-darker text-white p-2.5 rounded-xl group-hover:bg-primary transition-colors">
                     <ShoppingCart size={14} />
                  </button>
               </div>

               {/* Stock Progress */}
               <div className="mt-4">
                  <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                     <span>متبقي 20 قطة</span>
                     <span>80% تم البيع</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
                     <div className="w-[80%] h-full bg-gradient-to-r from-red-500 to-amber-500" />
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-[40px]">
         <h4 className="font-display font-black text-darker mb-2">اشترك في تنبيهات البرق</h4>
         <p className="text-xs text-slate-400 mb-6">كن أول من يعرف عن العروض المفاجئة القادمة بمجرد بدئها.</p>
         <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto">
            تفعيل التنبيهات <Zap size={16} />
         </button>
      </div>
    </div>
  );
};

export default FlashSales;
