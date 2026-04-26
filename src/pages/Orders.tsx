import React from 'react';
import { motion } from 'motion/react';
import { Package, ChevronLeft, Truck, CheckCircle2, Clock, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ORDERS = [
  {
    id: 'ORD-9982',
    date: '2024-03-15',
    status: 'shipped',
    total: 1250,
    itemsCount: 3,
    items: [
      { name: 'ساعة ذكية برو', price: 450, image: 'https://picsum.photos/seed/p1/100/100' },
      { name: 'سماعات بلوتوث', price: 300, image: 'https://picsum.photos/seed/p2/100/100' }
    ]
  },
  {
    id: 'ORD-7721',
    date: '2024-02-28',
    status: 'delivered',
    total: 890,
    itemsCount: 1,
    items: [
      { name: 'نظارة شمسية فاخرة', price: 890, image: 'https://picsum.photos/seed/p3/100/100' }
    ]
  }
];

const statusConfig = {
  shipped: { label: 'قيد التوصيل', color: 'text-blue-500', bg: 'bg-blue-50', icon: <Truck size={14} /> },
  delivered: { label: 'تم الاستلام', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: <CheckCircle2 size={14} /> },
  processing: { label: 'قيد المعالجة', color: 'text-amber-500', bg: 'bg-amber-50', icon: <Clock size={14} /> },
};

const Orders: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/profile" className="p-2 bg-white rounded-xl shadow-sm">
          <ChevronLeft className="rotate-180" size={20} />
        </Link>
        <h1 className="text-xl font-display font-black text-darker">طلباتي</h1>
      </header>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm"
          >
            <div className="p-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                  رقم الطلب: {order.id}
                </span>
                <span className="text-xs font-bold text-darker">{order.date}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black ${statusConfig[order.status as keyof typeof statusConfig].bg} ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                {statusConfig[order.status as keyof typeof statusConfig].icon}
                {statusConfig[order.status as keyof typeof statusConfig].label}
              </div>
            </div>

            <div className="p-5">
              <div className="flex gap-3 mb-5 overflow-x-auto no-scrollbar pb-2">
                {order.items.map((item, i) => (
                  <img 
                    key={i} 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-100"
                  />
                ))}
                {order.itemsCount > 2 && (
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +{order.itemsCount - 2} أكثر
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold uppercase block">العنوان</span>
                    <span className="text-[10px] font-bold text-darker line-clamp-1">الرياض، الياسمين</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary">
                    <CreditCard size={14} />
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold uppercase block">الإجمالي</span>
                    <span className="text-[10px] font-bold text-darker">{order.total} ريال</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-5 py-3.5 bg-darker text-white rounded-2xl text-xs font-bold shadow-lg shadow-darker/10 hover:bg-primary transition-colors">
                تتبع الشحنة الآن
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
