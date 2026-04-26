import React from 'react';
import { motion } from 'motion/react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History, CreditCard, ChevronLeft, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wallet: React.FC = () => {
  const transactions = [
    { id: 1, type: 'spent', title: 'شراء منتج #ORD-9982', amount: -450, date: '15 مارس' },
    { id: 2, type: 'refund', title: 'استرجاع مبلغ طلب ملغي', amount: 120, date: '12 مارس' },
    { id: 3, type: 'reward', title: 'مكافأة دعوة صديق', amount: 50, date: '10 مارس' },
  ];

  return (
    <div className="p-4 pb-24 min-h-screen bg-white">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/profile" className="p-2 bg-slate-50 rounded-xl">
          <ChevronLeft className="rotate-180" size={20} />
        </Link>
        <h1 className="text-xl font-display font-black text-darker">محفظة كيان</h1>
      </header>

      {/* Balance Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-darker to-slate-800 rounded-[40px] p-8 text-white relative overflow-hidden mb-10 shadow-2xl shadow-darker/30"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">الرصيد المتاح</span>
          <div className="flex items-baseline gap-2 mb-8">
            <h2 className="text-5xl font-display font-black tracking-tighter">1,240</h2>
            <span className="text-sm font-bold text-primary">ريال</span>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-white py-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <ArrowUpRight size={16} /> شحن الرصيد
            </button>
            <button className="flex-1 bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
              <History size={16} /> السجل
            </button>
          </div>
        </div>
        <WalletIcon size={180} className="absolute -left-20 -bottom-20 text-white/5 rotate-12" />
      </motion.div>

      {/* Loyalty Points */}
      <div className="bg-amber-50 rounded-[32px] p-6 border border-amber-100 flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-400 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-400/20">
            <Gift size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">نقاط المكافآت</h3>
            <p className="text-xs text-amber-700/60 font-medium">3,450 نقطة متاحة</p>
          </div>
        </div>
        <button className="text-xs font-black text-amber-900 uppercase tracking-widest underline decoration-amber-300 decoration-2 underline-offset-4">استبدال</button>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-sm font-black text-darker uppercase tracking-widest mb-6 px-2">أحدث العمليات</h3>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                  {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-darker">{tx.title}</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</span>
                </div>
              </div>
              <span className={`text-sm font-display font-black ${tx.amount > 0 ? 'text-emerald-500' : 'text-darker'}`}>
                {tx.amount > 0 ? `+${tx.amount}` : tx.amount} ريال
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
