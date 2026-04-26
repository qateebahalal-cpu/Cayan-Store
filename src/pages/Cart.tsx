import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300"
        >
          <ShoppingBag size={40} />
        </motion.div>
        <h2 className="text-xl font-display font-bold text-darker mb-2">حقيبتك فارغة حالياً</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-[240px]">ابدأ بإضافة بعض المنتجات الرائعة من مجموعتنا المختارة.</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          اكتشف المنتجات <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pt-4 pb-24">
      <h2 className="text-2xl font-display font-extrabold text-darker mb-6">حقيبة التسوق</h2>
      
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex gap-4"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-display font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.category}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-primary font-display font-bold text-sm">
                    {(item.price * item.quantity).toLocaleString()} ريال
                  </div>
                  
                  <div className="flex items-center bg-slate-50 rounded-xl p-1 gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-600 active:bg-primary active:text-white transition-all shadow-sm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-600 active:bg-primary active:text-white transition-all shadow-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary */}
      <div className="bg-darker rounded-[32px] p-6 text-white shadow-2xl">
        <h4 className="font-display font-bold mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-primary" /> ملخص الطلب
        </h4>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">المجموع الفرعي</span>
            <span className="font-bold">{cartTotal.toLocaleString()} ريال</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">الشحن والتوصيل</span>
            <span className="text-green-500 font-bold uppercase text-[10px]">مجاني</span>
          </div>
          <div className="h-px bg-white/10 my-2"></div>
          <div className="flex justify-between text-lg items-center">
            <span className="font-medium">الإجمالي النهائي</span>
            <span className="font-display font-extrabold text-primary text-xl">
              {cartTotal.toLocaleString()} ريال
            </span>
          </div>
        </div>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
        >
          إتمام الشراء الآن <ShoppingBag size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;
