import React from 'react';
import { motion } from 'motion/react';
import { Bell, Tag, Package, Star, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'offer',
    title: 'خصم حصري لك فقط! 🎁',
    desc: 'استخدم كود KAYAN25 للحصول على خصم 25% على طلبك القادم.',
    time: 'منذ ساعتين',
    icon: <Tag className="text-pink-500" size={20} />,
    bg: 'bg-pink-50'
  },
  {
    id: 2,
    type: 'order',
    title: 'طلبك #ORD-9982 في الطريق',
    desc: 'قام المندوب باستلام طلبك وهو الآن في طريقه إليك.',
    time: 'منذ 5 ساعات',
    icon: <Truck className="text-blue-500" size={20} />,
    bg: 'bg-blue-50'
  },
  {
    id: 3,
    type: 'review',
    title: 'شكراً لتقييمك! ⭐',
    desc: 'مراجعتك لمنتج "ساعة ذكية برو" تم نشرها بنجاح.',
    time: 'يوم أمس',
    icon: <Star className="text-amber-500" size={20} />,
    bg: 'bg-amber-50'
  }
];

import { Truck } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-black text-darker">الإشعارات</h1>
        <button className="text-xs font-bold text-primary">تحديد الكل كقروء</button>
      </header>

      <div className="space-y-4">
        {NOTIFICATIONS.map((notif, idx) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-5 rounded-[32px] bg-white border border-slate-100 relative group flex gap-4`}
          >
            <div className={`w-12 h-12 ${notif.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              {notif.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-darker">{notif.title}</h3>
                <span className="text-[10px] text-slate-400 font-bold">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{notif.desc}</p>
              
              {notif.type === 'offer' && (
                <button className="bg-darker text-white px-4 py-2 rounded-xl text-[10px] font-bold">تسوق الآن</button>
              )}
            </div>

            <button className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-slate-50 rounded-lg">
              <X size={14} className="text-slate-400" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 font-bold mb-6">عرض جميع الإشعارات السابقة</p>
        <div className="inline-flex py-3 px-6 bg-white rounded-2xl border border-slate-100 text-[10px] font-black text-darker uppercase tracking-widest shadow-sm">
          لا توجد إشعارات أخرى
        </div>
      </div>
    </div>
  );
};

export default Notifications;
