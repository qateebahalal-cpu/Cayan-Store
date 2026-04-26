import React from 'react';
import { Home, Grid, ShoppingCart, User, Sparkles, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';

const MobileNav: React.FC = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { icon: <Home size={20} />, label: 'الرئيسية', path: '/' },
    { icon: <Search size={20} />, label: 'البحث', path: '/search' },
    { icon: <Sparkles size={20} />, label: 'ذكاء كيان', path: '/ai-assistant', highlight: true },
    { icon: <ShoppingCart size={20} />, label: 'السلة', path: '/cart', badge: cartCount },
    { icon: <User size={20} />, label: 'حسابي', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-morphism border-t border-slate-200 safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center transition-all ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileTap={{ y: -5 }}
                  className={`relative p-1 rounded-xl transition-all ${
                    item.highlight ? 'bg-primary/10 text-primary p-2 mb-1' : ''
                  }`}
                >
                  {item.icon}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && !item.highlight && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
                {!item.highlight && (
                  <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-primary' : ''}`}>
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
