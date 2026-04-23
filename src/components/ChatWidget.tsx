"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Sparkles, BrainCircuit } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { chatKnowledge } from '@/data/chatKnowledge';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user' | 'agent';
  timestamp: Date;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const lang = pathname?.startsWith('/ar') ? 'ar' : 'es';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = {
    es: {
      botName: "ALEX // NEURAL-LINK",
      intro: "SISTEMA DE ENLACE ACTIVO. ¡Hola! Soy **Alex**, tu Agente de confianza. ¿En qué puedo ayudarte hoy?",
      placeholder: "Consulte con la IA de Fenixx...",
      initialSuggestions: ["Ver Oficinas", "Rastrear Carga", "Servicios Logísticos", "Hablar con Agente"],
      error: "Lo siento, la conexión neural ha fallado. Reintentando..."
    },
    ar: {
      botName: "أليكس // وصلة عصبية",
      intro: "محطة اتصال فينيكس نشطة. كيف يمكنني مساعدتك اليوم؟",
      placeholder: "استشر ذكاء فينيكس الاصطناعي...",
      initialSuggestions: ["المكاتب", "تتبع الشحنة", "الخدمات", "تحدث مع وكيل"],
      error: "عذرًا، فشل الاتصال العصبي. جاري إعادة المحاولة..."
    }
  };

  const current = data[lang] || data.es;

  const handleBotResponse = async (userText: string) => {
    setIsTyping(true);
    
    // Preparar el historial para que la IA tenga contexto
    const history = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: userText }],
          lang,
          knowledge: chatKnowledge[lang] || chatKnowledge.es
        }),
      });

      const result = await response.json();
      setIsTyping(false);

      if (result.reply) {
        addMessage(result.reply, 'bot');
        // Si la IA detecta que el usuario quiere hablar con un humano, activamos el LiveMode visualmente
        if (userText.toLowerCase().includes('agente') || userText.toLowerCase().includes('humano')) {
          setIsLiveMode(true);
        }
      } else {
        addMessage(current.error, 'bot');
      }
    } catch (error) {
      setIsTyping(false);
      addMessage(current.error, 'bot');
    }
    
    // Mantener sugerencias dinámicas al final
    setSuggestions([current.initialSuggestions[3]]); 
  };

  const addMessage = (text: string, sender: 'bot' | 'user' | 'agent') => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, sender, timestamp: new Date() }]);
  };

  const onSend = (text: string) => {
    if (!text.trim()) return;
    addMessage(text, 'user');
    setInputText("");
    setSuggestions([]);
    handleBotResponse(text);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage(current.intro, 'bot');
        setSuggestions(current.initialSuggestions);
      }, 600);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, suggestions]);

  return (
    <div className="fixed bottom-5 right-5 z-[9999]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[320px] md:w-[400px] h-[550px] bg-[#080808] border border-white/20 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
          >
            {/* Background Tech Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 overflow-hidden">
               <div className="w-full h-32 bg-white blur-3xl animate-[scanline_8s_linear_infinite]" />
            </div>
            
            {/* Header */}
            <div className="p-5 border-b border-white/15 flex items-center justify-between relative z-10 bg-[#0c0c0c]/80 backdrop-blur-3xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-2.5 h-2.5 rounded-full animate-ping absolute ${isLiveMode ? 'bg-[#FC3D03]' : 'bg-cyan-500'}`} />
                  <div className={`w-2.5 h-2.5 rounded-full relative shadow-[0_0_8px_currentColor] ${isLiveMode ? 'bg-[#FC3D03] text-[#FC3D03]' : 'bg-cyan-500 text-cyan-500'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-[0.4em] text-white">
                    {current.botName}
                  </span>
                  <span className="text-[7px] text-white/30 font-mono flex items-center gap-1 mt-0.5">
                    <BrainCircuit size={8} /> NEURAL SYNC ACTIVE
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Content Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide relative z-10">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-[12px] leading-[1.6] max-w-[85%] font-medium ${
                      m.sender === 'user' 
                      ? 'bg-[#FC3D03] text-white shadow-[0_8px_20px_rgba(252,61,3,0.3)] rounded-tr-none' 
                      : 'bg-white/[0.07] text-white border-l-[3px] border-[#FC3D03] rounded-tl-none'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<b class="text-[#FC3D03] font-bold">$1</b>').replace(/\n/g, '<br/>') }} />
                    <div className="text-[8px] mt-2.5 opacity-40 font-mono tracking-widest">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start px-2">
                  <div className="flex gap-2 items-end h-5 opacity-60">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [4, 18, 4] }} 
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} 
                        className="w-[2.5px] bg-cyan-500" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && !isTyping && (
                <div className="flex flex-wrap gap-2.5 pt-4">
                  {suggestions.map((s, i) => (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      key={s}
                      onClick={() => onSend(s)}
                      className="px-4 py-2 bg-white/[0.03] border border-white/10 hover:border-[#FC3D03] hover:bg-[#FC3D03]/10 rounded-lg text-[10px] text-white/80 hover:text-white font-bold transition-all flex items-center gap-2 group"
                    >
                      <Sparkles size={12} className="text-[#FC3D03]"/>
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Compact Input Form */}
            <div className="p-4 bg-[#0a0a0a] border-t border-white/10 relative z-10">
              <form 
                onSubmit={(e) => { e.preventDefault(); onSend(inputText); }} 
                className="flex gap-2 bg-white/[0.04] border border-white/10 rounded-xl p-1 focus-within:border-[#FC3D03] transition-all"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={current.placeholder}
                  className="flex-1 bg-transparent px-3 py-1.5 text-[11px] text-white placeholder:text-white/20 focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="w-9 h-9 bg-[#FC3D03] rounded-lg flex items-center justify-center text-white shadow-xl hover:brightness-125 disabled:opacity-20 transition-all"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="mt-3 flex justify-between items-center opacity-20 px-1">
                 <span className="text-[7px] font-mono tracking-[0.3em] text-white uppercase italic">Active Connection // AI Mode</span>
                 <div className="w-1 h-1 bg-[#FC3D03] rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-2xl text-white group relative"
      >
        <div className="absolute inset-0 bg-[#FC3D03] opacity-0 group-hover:opacity-[0.1] transition-opacity rounded-full" />
        <div className="z-10 text-white/50 group-hover:text-[#FC3D03] transition-all">
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </div>
      </motion.button>
    </div>
  );
}
