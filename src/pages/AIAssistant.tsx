import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants/mockData';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'أهلاً بك في كيان ستور! أنا مساعدك الذكي، كيف يمكنني مساعدتك في اختيار المنتج الأنسب لك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const productContext = PRODUCTS.map(p => 
        `- ${p.name}: ${p.description} (السعر: ${p.price} ريال) - التصنيف: ${p.category}`
      ).join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `أنت مساعد تسوق ذكي لمتجر "كيان ستور" (Kayan Store).
          هذا هو الكتالوج المتاح حالياً لدينا:
          ${productContext}
          
          قواعد التعامل:
          1. كن ودوداً واحترافياً.
          2. اقترح منتجات بناءً على ميزانية العميل أو احتياجاته.
          3. إذا طلب العميل منتج غير موجود، اعتذر بأدب واقترح بدائل من القائمة.
          4. استخدم اللهجة السعودية البيضاء أو العربية الفصحى المبسطة.
          5. حاول دائماً ختم الرد بسؤال تفاعلي.`,
        }
      });

      const botResponse = response.text || "عذراً، واجهت مشكلة في التفكير حالياً. حاول مرة أخرى.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "عذراً، حدث خطأ في الاتصال. تأكد من إعداد مفتاح API الخاص بك." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-slate-50 pt-2">
      {/* Header */}
      <div className="px-4 py-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-darker uppercase leading-none mb-1">ذكاء كيان</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-400 font-medium">متصل وجاهز للمساعدة</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-primary transition-colors"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-darker text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-700 shadow-sm rounded-tr-none border border-slate-100' 
                    : 'bg-darker text-white rounded-tl-none font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-end pr-11">
            <div className="bg-slate-200/50 p-4 rounded-3xl rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-xs text-slate-500 font-medium italic">كيان يفكر...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 pb-20 sm:pb-4">
        <div className="relative flex items-center gap-2 max-w-lg mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل كيان عن أفضل المنتجات..."
            className="flex-1 bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-primary/30 transition-all font-medium"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={isLoading}
            className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Send size={20} className="rotate-180" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
