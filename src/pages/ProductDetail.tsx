import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants/mockData';
import { Product, Review } from '../types';
import { Star, ShoppingCart, ArrowRight, User as UserIcon, Send, Loader2, Share2, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
      setLoadingReviews(false);
    }, (error) => {
      console.error("Error fetching reviews:", error);
      setLoadingReviews(false);
    });

    return unsubscribe;
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: product?.name,
      text: product?.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا التقييم؟')) return;
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
    }
  };

  const handleSubmitReview = async () => {
    if (!user || !id) return;
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId: id,
        userId: user.uid,
        userName: user.displayName || 'مستخدم كيان',
        userImage: user.photoURL || '',
        rating: newRating,
        comment: newComment,
        createdAt: serverTimestamp()
      });
      setNewComment('');
      setNewRating(5);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'reviews');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return <div className="p-8 text-center pt-24 font-display">المنتج غير موجود</div>;
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating;

  return (
    <div className="pb-24">
      <div className="relative h-[400px] bg-slate-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <Link to="/" className="p-2 bg-white/80 backdrop-blur-md rounded-xl text-darker shadow-sm hover:bg-white transition-colors">
            <ArrowRight size={20} />
          </Link>
        </div>

        <button 
          onClick={handleShare}
          className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-xl text-darker shadow-sm hover:bg-white transition-colors"
        >
          <Share2 size={20} />
        </button>

        <AnimatePresence>
          {showShareToast && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-darker text-white px-6 py-2 rounded-full text-xs font-bold shadow-2xl z-50"
            >
              تم نسخ الرابط الحصري بنجاح
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 -mt-8 bg-white rounded-t-[40px] relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
            <h1 className="text-2xl font-display font-black text-darker mt-1">{product.name}</h1>
          </div>
          <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex flex-col items-center">
            <span className="text-xl font-display font-black text-primary">{product.price.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">ريال</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex bg-amber-50 px-2 py-1 rounded-lg gap-1 border border-amber-100 italic">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-700">{averageRating}</span>
          </div>
          <span className="text-xs text-slate-400">({reviews.length || product.reviews} تقييم)</span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          {product.description}
        </p>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="w-full bg-darker text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-darker/20 mb-10"
        >
          أضف إلى حقيبة التسوق <ShoppingCart size={20} />
        </motion.button>

        {/* Reviews Section */}
        <div className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-display font-bold text-darker mb-6 flex items-center gap-2">
            آراء العملاء <Star size={18} className="text-primary" />
          </h3>

          {user ? (
            <div className="bg-slate-50 p-6 rounded-[32px] mb-8 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-4">شاركنا تجربتك</h4>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setNewRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star 
                      size={24} 
                      className={`${star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
                    />
                  </button>
                ))}
              </div>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب رأيك هنا بكل صراحة..."
                className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 min-h-[100px] mb-4"
              />
              <button 
                onClick={handleSubmitReview}
                disabled={isSubmitting || !newComment.trim()}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send className="rotate-180" size={18} />}
                إرسال التقييم
              </button>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 mb-8">
              <p className="text-sm text-slate-500 mb-4">يجب عليك تسجيل الدخول للمشاركة في التقييمات</p>
              <Link to="/profile" className="text-primary text-sm font-bold underline">تسجيل الدخول</Link>
            </div>
          )}

          <div className="space-y-6">
            {loadingReviews ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-primary" size={24} />
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="flex gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    {review.userImage ? (
                      <img src={review.userImage} alt={review.userName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <UserIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-xs font-bold text-slate-800">{review.userName}</h5>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={10} 
                              className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                        {user?.uid === review.userId && (
                          <button 
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-red-400 hover:text-red-500 p-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{review.comment}</p>
                    <span className="text-[10px] text-slate-300 block mt-2 font-mono">
                      {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('ar-SA') : 'الآن'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm">لا توجد مراجعات لهذا المنتج بعد. كن أول من يقيمه!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
