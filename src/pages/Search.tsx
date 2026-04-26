import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants/mockData';
import { Product } from '../types';
import ProductCard from '../components/store/ProductCard';
import { Search as SearchIcon, Filter, X, SlidersHorizontal, ArrowUpDown, Star, ChevronDown, Check } from 'lucide-react';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter Categories
  const categoryOptions = ['الكل', ...CATEGORIES.map(c => c.name)];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesQuery = product.name.includes(query) || product.description.includes(query);
      const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesRating = product.rating >= minRating;
      
      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result.slice(0, 50); // Limit results for performance
  }, [query, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('الكل');
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Search Header */}
      <div className="bg-white p-4 sticky top-14 z-20 shadow-sm border-b border-slate-100">
        <div className="relative mb-4">
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="ابحث عن أكثر من 10,000 منتج..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl pr-12 pl-4 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-darker text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap"
          >
            <SlidersHorizontal size={14} /> فلترة
          </button>
          
          <div className="h-6 w-[1px] bg-slate-200" />

          {['الأكثر صلة', 'الأقل سعراً', 'الأعلى سعراً', 'الأعلى تقييماً'].map((label, idx) => {
            const options: SortOption[] = ['relevance', 'price-asc', 'price-desc', 'rating'];
            const isActive = sortBy === options[idx];
            return (
              <button 
                key={label}
                onClick={() => setSortBy(options[idx])}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-slate-500">
            تم العثور على {filteredProducts.length === 50 ? '+50' : filteredProducts.length} منتج
          </h2>
          { (selectedCategory !== 'الكل' || minRating > 0 || sortBy !== 'relevance') && (
            <button onClick={clearFilters} className="text-primary text-xs font-bold">مسح الفلاتر</button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-10">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <SearchIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-darker mb-2">لا توجد نتائج</h3>
            <p className="text-sm text-slate-400">جرب البحث بكلمات أخرى أو تغيير إعدادات الفلترة.</p>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white rounded-t-[40px] z-[101] p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-black text-darker">خيارات الفلترة</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-slate-50 rounded-xl">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Filter size={14} className="text-primary" /> الأقسام
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.slice(0, 12).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2.5 rounded-2xl text-[11px] font-bold transition-all border ${
                          selectedCategory === cat 
                            ? 'bg-darker border-darker text-white' 
                            : 'bg-slate-50 border-slate-100 text-slate-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-4">الحد الأدنى للتقييم</h4>
                  <div className="flex gap-2">
                    {[4, 3, 2, 1].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-2xl text-xs font-bold border transition-all ${
                          minRating === rating 
                            ? 'bg-amber-50 border-amber-200 text-amber-700' 
                            : 'bg-slate-50 border-slate-100 text-slate-500'
                        }`}
                      >
                        {rating}+ <Star size={12} className={minRating === rating ? 'fill-amber-500' : ''} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter (Simplified) */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-4">نطاق السعر (ريال)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">من</label>
                      <input 
                        type="number" 
                        value={minPrice} 
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">إلى</label>
                      <input 
                        type="number" 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  onClick={clearFilters}
                  className="flex-1 py-4 bg-slate-100 rounded-2xl text-sm font-bold text-slate-500"
                >
                  إعادة ضبط
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-[2] py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20"
                >
                  تطبيق الفلاتر
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
