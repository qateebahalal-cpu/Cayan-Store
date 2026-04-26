import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/store/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300"
        >
          <Heart size={40} />
        </motion.div>
        <h2 className="text-xl font-display font-bold text-darker mb-2">قائمة الأمنيات فارغة</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-[240px]">أضف المنتجات التي تعجبك هنا لتجدها بسهولة لاحقاً.</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          تصفح المتجر <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pt-4 pb-24">
      <header className="mb-6">
        <h2 className="text-2xl font-display font-extrabold text-darker mb-2">قائمة أمنياتك</h2>
        <p className="text-slate-400 text-sm">{wishlist.length} منتجات في قائمتك المختارة</p>
      </header>
      
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
