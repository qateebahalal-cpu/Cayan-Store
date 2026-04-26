import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Plus, Trash2, Home, Briefcase, Globe, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Addresses: React.FC = () => {
  const addresses = [
    {
      id: 1,
      type: 'home',
      name: 'المنزل',
      address: 'حي الياسمين، شارع الملك عبدالعزيز',
      city: 'الرياض',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'المكتب',
      address: 'برج المملكة، الطابق 22',
      city: 'الرياض',
      isDefault: false
    }
  ];

  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-display font-black text-darker">عناوين التوصيل</h1>
        <button className="p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
          <Plus size={20} />
        </button>
      </header>

      <div className="space-y-4">
        {addresses.map((addr, idx) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-[32px] bg-white border ${addr.isDefault ? 'border-primary/30 shadow-md ring-1 ring-primary/5' : 'border-slate-100 shadow-sm'} relative`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${addr.type === 'home' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                {addr.type === 'home' ? <Home size={24} /> : <Briefcase size={24} />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-darker">{addr.name}</h3>
                  {addr.isDefault && (
                    <span className="bg-primary/10 text-primary text-[8px] font-black uppercase px-2 py-0.5 rounded-full">افتراضي</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{addr.address}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{addr.city}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-3 bg-slate-50 text-[10px] font-black text-slate-600 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest">
                تعديل
              </button>
              <button className="px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            {addr.isDefault && (
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-8 rounded-[40px] bg-darker text-white relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-lg font-display font-black mb-2">إضافة موقع جديد</h4>
          <p className="text-xs text-slate-400 mb-6 max-w-[200px]">حدد موقعك بدقة على الخريطة لتسريع عملية التوصيل.</p>
          <button className="bg-white text-darker px-6 py-3 rounded-2xl text-xs font-bold">استخدام الخريطة</button>
        </div>
        <MapPin size={120} className="absolute -left-10 -bottom-10 text-white/5" />
      </div>
    </div>
  );
};

export default Addresses;
