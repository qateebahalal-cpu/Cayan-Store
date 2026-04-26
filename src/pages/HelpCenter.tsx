import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronDown, MessageCircle, Phone, Mail, FileText, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  { q: 'كيف يمكنني تتبع طلبي؟', a: 'يمكنك تتبع طلبك من خلال صفحة "طلباتي" في حسابك، حيث ستجد رابطاً للتتبع المباشر.' },
  { q: 'ما هي سياسة الاسترجاع؟', a: 'نقبل الاسترجاع خلال 14 يوماً من تاريخ الاستلام بشرط أن يكون المنتج بحالته الأصلية.' },
  { q: 'هل تتوفر خدمة الدفع عند الاستلام؟', a: 'نعم، نوفر خدمة الدفع عند الاستلام في معظم مدن المملكة العربية السعودية.' },
  { q: 'كيف أحصل على خصم للعملاء الجدد؟', a: 'يمكنك استخدام الكود WELCOME10 للحصول على خصم 10% على أول طلب لك.' }
];

const HelpCenter: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/profile" className="p-2 bg-white rounded-xl">
          <ArrowLeft size={20} className="rotate-180" />
        </Link>
        <h1 className="text-xl font-display font-black text-darker">مركز المساعدة</h1>
      </header>

      {/* Search Help */}
      <div className="relative mb-10">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="كيف يمكننا مساعدتك اليوم؟"
          className="w-full bg-white border-none rounded-[24px] py-4 pr-12 pl-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="p-6 bg-white rounded-[32px] border border-slate-100 flex flex-col items-center text-center shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-3">
            <Package size={24} />
          </div>
          <span className="text-xs font-bold text-darker">الشحن والتوصيل</span>
        </button>
        <button className="p-6 bg-white rounded-[32px] border border-slate-100 flex flex-col items-center text-center shadow-sm">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-3">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xs font-bold text-darker">الأمان والخصوصية</span>
        </button>
      </div>

      {/* FAQs */}
      <div className="mb-10">
        <h3 className="text-sm font-black text-darker uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
          الأسئلة الشائعة <HelpCircle size={14} className="text-primary" />
        </h3>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-right"
              >
                <span className="text-sm font-bold text-darker">{faq.q}</span>
                <ChevronDown className={`text-slate-300 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} size={18} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-50">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Options */}
      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-5 bg-darker text-white rounded-[32px] shadow-xl shadow-darker/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div className="text-right">
              <h4 className="text-sm font-bold">المحادثة المباشرة</h4>
              <p className="text-[10px] text-white/50">متصل (المتوسط 2 دقيقة)</p>
            </div>
          </div>
          <ArrowLeft size={18} className="rotate-180" />
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button className="p-5 bg-white rounded-[32px] border border-slate-100 flex items-center gap-3">
            <Phone className="text-emerald-500" size={18} />
            <span className="text-xs font-bold text-darker">اتصل بنا</span>
          </button>
          <button className="p-5 bg-white rounded-[32px] border border-slate-100 flex items-center gap-3">
            <Mail className="text-blue-500" size={18} />
            <span className="text-xs font-bold text-darker">البريد</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
