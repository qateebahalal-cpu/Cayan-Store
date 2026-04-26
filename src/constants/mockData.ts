import { Product, Category } from '../types';

// Function to generate massive mock data
const generateMockData = () => {
  const categoryNames = [
    'جوالات', 'ساعات ذكية', 'سماعات', 'لابتوبات', 'تابلت', 
    'كاميرات', 'ألعاب فيديو', 'إكسسوارات جوال', 'عطور رجالية', 'عطور نسائية',
    'نظارات شمسية', 'حقائب فاخرة', 'أحذية رياضية', 'ملابس كاجوال', 'أدوات منزلية',
    'أجهزة مطبخ', 'شاشات تلفزيون', 'أنظمة صوتية', 'طائرات درون', 'سكوترات كهربائية',
    'أثاث مكتب', 'إضاءة ذكية', 'أجهزة عناية شخصية', 'ميكياج', 'منتجات بشرة',
    'قهوة مختصة', 'مكائن قهوة', 'أدوات رياضية', 'كتب وروايات', 'ألعاب أطفال',
    'أثاث منزلي', 'سجاد ومفروشات', 'مستلزمات رحلات', 'ساعات مكتبية', 'لوحات فنية',
    'قرطاسية', 'إكسسوارات سيارات', 'أجهزة شبكات', 'طابعات', 'كراسي قيمنق',
    'ماوسات وكيبوردات', 'هاردسك وفلاشات', 'ساعات كلاسيكية', 'أطقم هدايا', 'بخور وعود',
    'مستلزمات حيوانات', 'أجهزة أمان', 'ساعات جدارية', 'حقائب سفر', 'منتجات طبية'
  ];

  const icons = ['Smartphone', 'Watch', 'Sparkles', 'Headphones', 'ShoppingBag'];
  
  const categories: Category[] = categoryNames.map((name, i) => ({
    id: `cat-${i + 1}`,
    name: name,
    icon: icons[i % icons.length],
    image: `https://picsum.photos/seed/cat${i+1}/400/400`
  }));

  const products: Product[] = categories.flatMap((cat) => 
    Array.from({ length: 200 }).map((_, j) => ({
      id: `p-${cat.id}-${j + 1}`,
      name: `${cat.name} موديل ${j + 1}`,
      description: `منتج عالي الجودة من فئة ${cat.name}. صمم خصيصاً لعملاء كيان الباحثين عن التميز والرفاهية.`,
      price: Math.floor(Math.random() * 8000) + 150,
      category: cat.name,
      image: `https://picsum.photos/seed/prod-${cat.id}-${j+1}/600/600`,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 1000),
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.98, // Reduced for massive listing optimization
    }))
  );

  return { categories, products };
};

const { categories, products } = generateMockData();

export const CATEGORIES = categories;
export const PRODUCTS = products;
export const FEATURED_PRODUCTS = products.filter(p => p.isFeatured).slice(0, 10);
