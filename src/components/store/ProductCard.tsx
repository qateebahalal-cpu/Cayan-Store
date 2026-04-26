import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavourite = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              جديد
            </span>
          )}

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <div className="bg-white p-3 rounded-full text-dark transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
              <Eye size={18} />
            </div>
          </div>
        </div>
      </Link>

      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-3 left-3 p-2 rounded-xl transition-all z-10 ${
          isFavourite ? 'bg-pink-500 text-white' : 'bg-white/80 text-slate-400 hover:text-pink-500'
        }`}
      >
        <Heart size={16} fill={isFavourite ? 'currentColor' : 'none'} />
      </button>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <div className="flex items-center gap-1 mb-1">
            <Star size={12} className="text-primary fill-primary" />
            <span className="text-xs font-semibold text-slate-500">{product.rating}</span>
          </div>
          
          <h3 className="font-display font-bold text-slate-800 text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-slate-400 text-xs line-clamp-1 mb-3">
            {product.description}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <div className="font-display font-extrabold text-primary">
            {product.price.toLocaleString()} <span className="text-[10px] font-normal opacity-70">ريال</span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="bg-darker text-white p-2.5 rounded-2xl hover:bg-primary transition-colors flex items-center justify-center z-10"
          >
            <ShoppingCart size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
