import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Package, ArrowRight, Star, Share2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="w-32 h-32 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8 relative"
      >
        <CheckCircle2 size={64} strokeWidth={3} />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-emerald-500/20 rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4 block">تم تأكيد طلبك بنجاح</span>
        <h1 className="text-4xl font-display font-black text-darker mb-4 leading-tight">شكراً لتسوقك <br /> <span className="text-primary">من كيان!</span></h1>
        <p className="text-slate-400 text-sm max-w-[280px] mx-auto mb-10 leading-relaxed font-medium">
          رقم طلبك هو <span className="text-darker font-bold">#KAY-88291</span>. سنقوم بإرسال رسالة نصية لك عند تحديث حالة الطلب.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          <Link to="/orders" className="w-full bg-darker text-white py-5 rounded-[24px] font-bold shadow-xl shadow-darker/20 flex items-center justify-center gap-3">
            تتبع حالة الطلب <Package size={20} />
          </Link>
          <Link to="/" className="w-full bg-slate-100 text-slate-600 py-5 rounded-[24px] font-bold flex items-center justify-center gap-2">
            العودة للمتجر <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-12 p-6 rounded-[32px] border border-dashed border-slate-200">
          <h3 className="text-sm font-bold text-darker mb-4">هل أعجبك المتجر؟</h3>
          <div className="flex gap-2 justify-center mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={24} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 py-3 rounded-xl">
              <Share2 size={16} /> مشاركة
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 py-3 rounded-xl">
              <Download size={16} /> الفاتورة
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
