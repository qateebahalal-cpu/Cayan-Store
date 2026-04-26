import React from 'react';
import { Search, ShoppingBag, Bell, Menu, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 glass-morphism px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <Menu size={22} />
        </button>
        <Link to="/" className="text-2xl font-display font-extrabold tracking-tighter text-darker flex items-center gap-1">
          <span className="text-primary">K</span>AYAN
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/search">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Search size={22} />
          </motion.button>
        </Link>
        
        <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white"
            >
              {cartCount}
            </motion.span>
          )}
        </Link>

        {user ? (
          <Link to="/profile" className="flex-shrink-0 ml-1">
            <img 
              src={user.photoURL || ''} 
              alt="Profile" 
              className="w-8 h-8 rounded-xl border border-slate-200 object-cover"
            />
          </Link>
        ) : (
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={22} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
