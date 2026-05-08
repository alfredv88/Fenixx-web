"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Sparkles, BrainCircuit } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { chatKnowledge } from '@/data/chatKnowledge';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string | number;
  text: string;
  sender: 'bot' | 'user' | 'agent';
  timestamp: Date;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const lang = pathname?.startsWith('/tr') ? 'tr' : pathname?.startsWith('/fr') ? 'fr' : 'es';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sensor de scroll para mostrar el chat después del Hero
  useEffect(() => {
    const handleScroll = () => {
      // Aparece después del 80% de la pantalla (debajo del Hero)
      const threshold = window.innerHeight * 0.8;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        if (!isOpen) setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const data = {
    es: {
      botName: "ALEX // FENIXX",
      intro: "ENLACE ESTABLECIDO. Soy **ALEX**, su asesor experto en logística y aduanas. ¿Qué operación desea gestionar hoy?",
      placeholder: "Consulte con el sistema experto...",
      initialSuggestions: ["Puerto de Guanta", "Rastrear Carga", "Gestión Aduanera", "Hablar con Agente"],
      error: "Conexión interrumpida. Reintentando sincronización...",
      status: "En línea",
      label: "Asesoría: "
    },
    tr: {
      botName: "ALEX // FENIXX",
      intro: "BAĞLANTI KURULDU. Ben **ALEX**, lojistik ve gümrük uzmanınız. Bugün hangi işlemi yönetmek istersiniz?",
      placeholder: "Uzman sisteme danışın...",
      initialSuggestions: ["Guanta Limanı", "Kargo Takibi", "Gümrük Yönetimi", "Temsilciyle Görüş"],
      error: "Bağlantı kesildi. Yeniden senkronize ediliyor...",
      status: "Çevrimiçi",
      label: "Danışman: "
    },
    fr: {
      botName: "ALEX // FENIXX",
      intro: "LIAISON ÉTABLIE. Je suis **ALEX**, votre conseiller expert en logistique et douanes. Quelle opération souhaitez-vous gérer aujourd'hui ?",
      placeholder: "Consultez le système expert...",
      initialSuggestions: ["Port de Guanta", "Suivi de Fret", "Gestion Douanière", "Parler à un Agent"],
      error: "Connexion interrompue. Tentative de synchronisation...",
      status: "En ligne",
      label: "Conseil :"
    }
  };

  const current = data[lang] || data.es;

  const handleBotResponse = async (userText: string) => {
    setIsTyping(true);
    
    const history = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    // Creamos un mensaje vacío para el bot que iremos llenando
    const botMessageId = Date.now() + Math.random();
    setMessages(prev => [...prev, { id: botMessageId, text: "", sender: 'bot', timestamp: new Date() }]);

    let fullText = "";

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

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setIsTyping(false);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '');
            if (dataStr === '[DONE]') break;
            
            try {
              const data = JSON.parse(dataStr);
              const content = data.choices[0]?.delta?.content || "";
              fullText += content;
              
              // Actualizamos el mensaje del bot en tiempo real
              setMessages(prev => prev.map(m => 
                m.id === botMessageId ? { ...m, text: fullText } : m
              ));
            } catch (e) {
              // Ignorar errores de parsing parcial
            }
          }
        }
      }

      if (fullText.toLowerCase().includes('agente') || fullText.toLowerCase().includes('humano')) {
        setIsLiveMode(true);
      }
      
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => prev.map(m => 
        m.id === botMessageId ? { ...m, text: current.error } : m
      ));
    }
    
    
    setSuggestions([current.initialSuggestions[3]]); 
    
    // Persistir respuesta final del bot
    if (fullText && sessionId) {
      await supabase.from('chat_messages').insert({
        session_id: sessionId,
        sender: 'bot',
        content: fullText
      });
    }
  };


  const addMessage = async (text: string, sender: 'bot' | 'user' | 'agent', skipSave = false) => {
    const newMessage: Message = { id: Date.now() + Math.random(), text, sender, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);

    if (!skipSave && sessionId) {
      await supabase.from('chat_messages').insert({
        session_id: sessionId,
        sender,
        content: text
      });
    }
  };

  const onSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Guardar mensaje del usuario
    addMessage(text, 'user');
    
    setInputText("");
    setSuggestions([]);

    // Plan A: Redirección a WhatsApp
    if (text.toLowerCase().includes('hablar con agente') || text.toLowerCase().includes('temsilciyle görüş') || text.toLowerCase().includes('agent')) {
      const whatsappNumber = "584129671098";
      const message = lang === 'tr' 
        ? "Merhaba Fenixx, bir danışmanla görüşmek istiyorum..." 
        : lang === 'fr'
        ? "Bonjour Fenixx, je souhaite parler à un conseiller concernant mes opérations logistiques..."
        : "Hola Fenixx, deseo hablar con un asesor sobre mis operaciones logísticas...";
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        addMessage(lang === 'tr' 
          ? "İnsan bir temsilciye bağlanmak için WhatsApp'a yönlendiriliyorsunuz..." 
          : lang === 'fr'
          ? "Entendu. **Redirection vers WhatsApp** pour contacter un agent humain..."
          : "Entendido. **Redirigiendo a WhatsApp** para conectar con un agente humano...", 'bot');
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
      }, 600);
      
      return;
    }

    handleBotResponse(text);
  };

  // Inicializar sesión y cargar historial
  useEffect(() => {
    const initSession = async () => {
      let sId = localStorage.getItem('fenixx_chat_session_id');
      
      if (!sId) {
        const { data, error } = await supabase
          .from('chat_sessions')
          .insert({ user_name: 'Visitante Web', status: 'bot' })
          .select()
          .single();
        
        if (data) {
          sId = data.id;
          localStorage.setItem('fenixx_chat_session_id', sId!);
        }
      }

      if (sId) {
        setSessionId(sId);
        // Cargar mensajes previos
        const { data: oldMessages } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', sId)
          .order('created_at', { ascending: true });
        
        if (oldMessages && oldMessages.length > 0) {
          const formatted = oldMessages.map(m => ({
            id: m.id,
            text: m.content,
            sender: m.sender as 'bot' | 'user' | 'agent',
            timestamp: new Date(m.created_at)
          }));
          setMessages(formatted);
        } else {
          // Si no hay mensajes, enviar intro inicial
          addMessage(current.intro, 'bot');
          setSuggestions(current.initialSuggestions);
        }
      }
    };

    if (isOpen && !sessionId) {
      initSession();
    }
  }, [isOpen, sessionId, current.intro]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, suggestions]);

  return (
    <div className={`fixed bottom-3 right-3 z-[9999] transition-all duration-700 ease-out ${
      isVisible || isOpen 
        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
        : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
    }`} dir="ltr">
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
            className="absolute bottom-16 right-0 w-[350px] md:w-[400px] h-[600px] md:h-[550px] bg-fenix-dark-graphite border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-inter"
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--color-fenix-red-light)]/20 flex items-center justify-between relative z-10 bg-gradient-to-r from-black via-[#1a0600] to-[var(--color-fenix-red-dark)]/30 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-2.5 h-2.5 rounded-full relative bg-[var(--color-fenix-red-light)]`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black tracking-[0.2em] text-white font-outfit uppercase">
                    {current.botName}
                  </span>
                  <span className="text-[8px] text-[var(--color-fenix-red-light)] font-mono flex items-center gap-1 mt-0.5 uppercase tracking-wider font-bold">
                    <BrainCircuit size={10} /> Enlace Activo
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5"
              >
                <X size={20}/>
              </button>
            </div>


            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide relative z-10 bg-gradient-to-b from-transparent to-black/20">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-[13px] leading-[1.6] max-w-[85%] ${
                      m.sender === 'user' 
                      ? 'bg-[var(--color-fenix-red-light)] text-white shadow-lg rounded-tr-none font-medium' 
                      : 'bg-white/[0.07] text-white/95 border-l-[3px] border-[var(--color-fenix-red-light)] rounded-tl-none shadow-md backdrop-blur-sm'
                    }`}
                    style={{ 
                      background: m.sender === 'bot' ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(252,61,3,0.03) 100%)' : undefined 
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ 
                      __html: m.text
                        .replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-black underline decoration-[var(--color-fenix-red-light)] decoration-2">$1</b>')
                        .replace(/\n/g, '<br/>') 
                    }} />
                    <div className={`text-[8px] mt-3 font-mono tracking-widest text-right ${m.sender === 'user' ? 'text-white/70' : 'text-[var(--color-fenix-red-light)]/80'}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>

                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start px-2">
                  <div className="flex gap-1.5 items-end h-4 opacity-40">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [4, 16, 4] }} 
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} 
                        className="w-[2px] bg-white" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {suggestions.length > 0 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s, i) => (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={s}
                      onClick={() => onSend(s)}
                      className="px-3 py-1.5 bg-[var(--color-fenix-red-light)]/5 border border-[var(--color-fenix-red-light)]/20 hover:border-[var(--color-fenix-red-light)] hover:bg-[var(--color-fenix-red-light)]/10 rounded-lg text-[10px] text-white/70 hover:text-white font-bold transition-all flex items-center gap-2 group shadow-sm"
                    >
                      <Sparkles size={10} className="text-[var(--color-fenix-red-light)] group-hover:animate-pulse"/>
                      {s}
                    </motion.button>

                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 backdrop-blur-2xl border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); onSend(inputText); }} 
                className="flex gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-1.5 focus-within:border-[var(--brand-red)]/50 transition-all shadow-inner"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={current.placeholder}
                  className="flex-1 bg-transparent px-3 py-1 text-[12px] text-white placeholder:text-white/40 focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="w-9 h-9 bg-[var(--color-fenix-red-light)] rounded-lg flex items-center justify-center text-white shadow-md hover:brightness-110 disabled:opacity-20 transition-all border border-white/10"
                >
                  <Send size={18} />
                </button>

              </form>
              <div className="mt-3 flex justify-between items-center opacity-40 px-1 pointer-events-none">
                 <span className="text-[7px] font-mono tracking-[0.4em] text-white uppercase italic">SISTEMA ACTIVO // FENIXX V2</span>
                 <div className="flex gap-1">
                   <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                   <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Container - Only visible when closed */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-[9999] flex flex-col-reverse items-center gap-4 group"
        >
          {/* Floating Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-fenix-red-light to-fenix-red-dark p-3 md:p-4 rounded-full text-white shadow-xl transition-all relative z-20"
          >
            <div className="relative">
              <MessageSquare size={22} className="md:w-6 md:h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </motion.button>
          
          {/* Status Capsule (Visible on Hover in Desktop) */}
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full hidden lg:block shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none mb-2 whitespace-nowrap">
              <span className="text-white font-bold text-xs tracking-wider uppercase">
                {current.label || (lang === 'tr' ? 'Danışman: ' : 'Asesoría: ')}
                <span className="text-fenix-red-light animate-pulse">{current.status || (lang === 'tr' ? 'Çevrimiçi' : 'En línea')}</span>
              </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
