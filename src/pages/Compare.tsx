import React from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ArrowRight, ShieldCheck, Scale, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants/mockData';

const Compare: React.FC = () => {
  const p1 = PRODUCTS[0];
  const p2 = PRODUCTS[400]; // Another category product

  const specs = [
    { label: 'السعر', v1: `${p1.price} ر.س`, v2: `${p2.price} ر.س` },
    { label: 'القسم', v1: p1.category, v2: p2.category },
    { label: 'التقييم', v1: p1.rating, v2: p2.rating },
    { label: 'المراجعات', v1: p1.reviews, v2: p2.reviews },
    { label: 'الوزن', v1: '0.8 كج', v2: '1.2 كج' },
    { label: 'الخامة', v1: 'بلاستيك مقوى', v2: 'معدن مصقول' },
  ];

  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-black text-darker italic">مقارنة <span className="text-primary italic">المنتجات</span></h1>
        <Link to="/search" className="p-2 bg-white rounded-xl shadow-sm text-slate-400">
          <ChevronLeft className="rotate-180" size={20} />
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {[p1, p2].map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm text-center relative overflow-hidden"
          >
            <div className="absolute top-2 left-2 p-1.5 bg-slate-50 rounded-lg text-slate-300">
              <MousePointer2 size={12} />
            </div>
            <img src={p.image} className="w-20 h-20 mx-auto rounded-2xl mb-3 object-cover shadow-sm" />
            <h3 className="text-[10px] font-bold text-darker line-clamp-1 mb-1">{p.name}</h3>
            <span className="text-[9px] font-black text-primary uppercase">{p.price} ريال</span>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <h4 className="text-xs font-black text-darker uppercase tracking-widest flex items-center gap-2">المواصفات الفنية <Scale size={14} className="text-primary" /></h4>
           <span className="text-[10px] font-bold text-slate-400 italic">مقارنة دقيقة</span>
        </div>
        
        <div className="p-2">
          {specs.map((spec, i) => (
            <div key={i} className={`flex items-center text-center py-5 px-4 ${i !== specs.length - 1 ? 'border-b border-slate-50' : ''}`}>
               <div className="flex-1 text-[10px] font-bold text-slate-500">{spec.v1}</div>
               <div className="absolute left-1/2 -translate-x-1/2 bg-slate-100 px-3 py-1 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest z-10 border border-white">
                  {spec.label}
               </div>
               <div className="flex-1 text-[10px] font-bold text-primary">{spec.v2}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-100 flex items-center gap-5">
        <div className="w-14 h-14 bg-emerald-500 text-white rounded-[24px] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-emerald-900 mb-1">حمـاية المستهلك</h4>
          <p className="text-[10px] text-emerald-700/60 leading-relaxed font-medium">جميع المواصفات الواردة تم التحقق منها يدوياً من قبل فريق كيان لمطابقة الواقع.</p>
        </div>
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <button className="w-full bg-darker text-white py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center gap-3">
          إصدار تقرير المقارنة <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Compare;
