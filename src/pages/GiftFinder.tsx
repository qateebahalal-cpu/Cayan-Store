import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, ChevronLeft, ChevronRight, Sparkles, Heart, Search, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    text: 'لمن هذه الهدية؟',
    options: [
      { label: 'لي شخصياً', icon: '👤' },
      { label: 'لصديق / صديقة', icon: '🫂' },
      { label: 'لشريك الحياة', icon: '❤️' },
      { label: 'لأحد أفراد العائلة', icon: '🏠' },
    ]
  },
  {
    id: 2,
    text: 'ما هي اهتماماتهم الرئيسية؟',
    options: [
      { label: 'التقنية والذكاء', icon: '📱' },
      { label: 'الموضة والأناقة', icon: '🕶️' },
      { label: 'العناية والجمال', icon: '✨' },
      { label: 'المنزل والديكور', icon: '🛋️' },
    ]
  },
  {
    id: 3,
    text: 'ما هي الميزانية التقريبية؟',
    options: [
      { label: 'أقل من 500 ريال', icon: '💸' },
      { label: '500 - 1500 ريال', icon: '💰' },
      { label: 'أكثر من 1500 ريال', icon: '👑' },
      { label: 'الميزانية مفتوحة', icon: '♾️' },
    ]
  }
];

const GiftFinder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinishing(true);
      setTimeout(() => {
        // Result will show here
      }, 2000);
    }
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen bg-darker flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sparkles className="text-primary mb-8" size={64} />
        </motion.div>
        <h2 className="text-2xl font-display font-black text-white mb-4">جاري تحليل اختياراتك...</h2>
        <p className="text-slate-400 text-sm max-w-[240px]">يقوم ذكاء كيان الآن باختيار أفضل الهدايا بناءً على شخصية المستلم وميزانيتك.</p>
        
        <div className="mt-10 w-full max-w-xs bg-white/5 rounded-2xl p-1 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5 }}
            className="h-1.5 bg-primary rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 min-h-screen bg-slate-50 flex flex-col">
      <header className="flex items-center justify-between mb-12">
        <Link to="/" className="p-2 bg-white rounded-xl shadow-sm">
          <ChevronLeft className="rotate-180" size={20} />
        </Link>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? 'w-6 bg-primary' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        <div className="w-10" />
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-4">الخطوة {step + 1} من 3</span>
          <h2 className="text-3xl font-display font-black text-darker mb-10 leading-tight">
            {QUESTIONS[step].text}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {QUESTIONS[step].options.map((opt) => (
              <motion.button
                key={opt.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(opt.label)}
                className="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-primary/30 transition-all text-right"
              >
                <div className="text-3xl">{opt.icon}</div>
                <span className="text-lg font-bold text-darker">{opt.label}</span>
                <div className="mr-auto w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                  <ChevronLeft size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-12 p-8 bg-primary rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-primary/30">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h4 className="font-display font-black text-lg">هل تحتاج مساعدة فورية؟</h4>
            <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-1">تحدث مع خبير هدايا كيان الآن</p>
          </div>
          <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center">
            <Search size={22} />
          </div>
        </div>
        <Gift size={100} className="absolute -left-5 -bottom-5 text-white/10 -rotate-12" />
      </div>
    </div>
  );
};

export default GiftFinder;
