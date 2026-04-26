import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, User, Bell, Shield, Smartphone, Globe, Moon, CreditCard, MapPin, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const sections = [
    {
      title: 'الحساب والأمان',
      items: [
        { icon: <User size={18} />, label: 'تعديل البيانات الشخصية', color: 'text-blue-500' },
        { icon: <Shield size={18} />, label: 'كلمة المرور والأمان', color: 'text-emerald-500' },
        { icon: <MapPin size={18} />, label: 'عناوين التوصيل', color: 'text-rose-500' },
        { icon: <CreditCard size={18} />, label: 'طرق الدفع', color: 'text-amber-500' },
      ]
    },
    {
      title: 'التفضيلات',
      items: [
        { icon: <Bell size={18} />, label: 'الإشعارات التفاعلية', color: 'text-purple-500', toggle: true },
        { icon: <Moon size={18} />, label: 'الوضع الليلي (تلقائي)', color: 'text-slate-700', toggle: true },
        { icon: <Globe size={18} />, label: 'لغة التطبيق', color: 'text-cyan-500', extra: 'العربية' },
      ]
    },
    {
      title: 'أخرى',
      items: [
        { icon: <Smartphone size={18} />, label: 'عن تطبيق كيان', color: 'text-darker' },
      ]
    }
  ];

  return (
    <div className="p-4 pb-24 min-h-screen bg-white">
      <header className="flex items-center gap-4 mb-10">
        <Link to="/profile" className="p-2 bg-slate-50 rounded-xl">
          <ChevronLeft className="rotate-180" size={20} />
        </Link>
        <h1 className="text-xl font-display font-black text-darker">الإعدادات</h1>
      </header>

      <div className="space-y-10">
        {sections.map((section, sIdx) => (
          <div key={section.title}>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-2">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, iIdx) => (
                <motion.div 
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 bg-white rounded-xl shadow-sm ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-darker">{item.label}</span>
                  </div>
                  
                  {item.toggle ? (
                    <div className="w-10 h-6 bg-emerald-500 rounded-full relative p-1">
                      <div className="w-4 h-4 bg-white rounded-full absolute left-1 shadow-sm" />
                    </div>
                  ) : item.extra ? (
                    <span className="text-xs font-bold text-primary">{item.extra}</span>
                  ) : (
                    <ChevronLeft size={16} className="text-slate-300" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-500 rounded-[32px] font-bold text-sm hover:bg-red-100 transition-colors">
          <LogOut size={18} /> تسجيل الخروج من الحساب
        </button>
      </div>
    </div>
  );
};

export default Settings;
