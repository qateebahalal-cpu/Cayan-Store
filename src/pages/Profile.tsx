import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, auth } from '../lib/firebase';
import { LogOut, User as UserIcon, Settings, Package, Heart, LogIn, CreditCard, HelpCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
        >
          <UserIcon size={40} />
        </motion.div>
        <h2 className="text-xl font-display font-bold text-darker mb-2">أهلاً بك في كيان</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-[240px]">قم بتسجيل الدخول لتتمكن من تتبع طلباتك والحصول على عروض حصرية.</p>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          تسجيل الدخول باستخدام جوجل <LogIn size={18} />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="p-4 pt-4 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img 
            src={user.photoURL || 'https://via.placeholder.com/100'} 
            alt={user.displayName || 'User'} 
            className="w-20 h-20 rounded-[28px] border-4 border-white shadow-xl object-cover"
          />
          {isAdmin && (
            <span className="absolute -bottom-1 -right-1 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
              مشرف
            </span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-darker leading-none mb-1">{user.displayName}</h2>
          <p className="text-slate-400 text-xs">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link to="/orders" className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center text-center hover:bg-slate-100 transition-colors">
          <Package className="text-primary mb-2" size={24} />
          <span className="text-xs font-bold text-darker">طلباتي</span>
          <span className="text-[10px] text-slate-400">0 طلب نشط</span>
        </Link>
        <Link to="/wishlist" className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center text-center hover:bg-pink-50 transition-colors">
          <Heart className="text-pink-500 mb-2" size={24} />
          <span className="text-xs font-bold text-darker">المفضلة</span>
          <span className="text-[10px] text-slate-400">مشاهدة الكل</span>
        </Link>
      </div>

      <div className="space-y-2">
        <Link to="/settings" className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <Settings size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">إعدادات الحساب</span>
          </div>
          <ChevronLeft size={16} className="text-slate-300" />
        </Link>

        <Link to="/wallet" className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <CreditCard size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">المحفظة والرصيد</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-primary">1,240 ر.س</span>
            <ChevronLeft size={16} className="text-slate-300" />
          </div>
        </Link>

        <Link to="/help-center" className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <HelpCircle size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">مركز المساعدة</span>
          </div>
          <ChevronLeft size={16} className="text-slate-300" />
        </Link>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-red-50 rounded-2xl transition-colors text-red-500"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut size={18} />
            </div>
            <span className="text-sm font-bold">تسجيل الخروج</span>
          </div>
        </button>
      </div>

      {isAdmin && (
        <div className="mt-8">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">لوحة التحكم</h3>
          <button className="w-full bg-darker text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl">
             إدارة المتجر (قريباً) <Settings size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
