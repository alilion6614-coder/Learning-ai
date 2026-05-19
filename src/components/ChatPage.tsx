import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2, Eraser, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { chatWithAI } from "../lib/ai";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your Learning AI Tutor. I can help you understand complex topics, explain your notes, or quiz you on any subject. What's on your mind today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatWithAI([...messages, userMsg]);
      const content = response.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", content }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error: Failed to connect to the brain. Please check your credentials." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between px-6">
         <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
               <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
               <h2 className="text-white font-bold text-sm">AI Study Tutor</h2>
               <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Online & Thinking</span>
               </div>
            </div>
         </div>
         <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => setMessages([messages[0]])}>
            <Eraser className="h-4 w-4" />
         </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
         <div className="space-y-6 max-w-4xl mx-auto pb-10">
            {messages.map((m, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
               >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    m.role === 'user' ? 'bg-purple-600' : 'bg-blue-600'
                  }`}>
                     {m.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    m.role === 'user' 
                      ? 'bg-purple-600/10 border border-purple-600/20 text-white' 
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed">
                       <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
               </motion.div>
            ))}
            {loading && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                     <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                     <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                     <span className="text-sm text-gray-500 italic">Thinking...</span>
                  </div>
               </motion.div>
            )}
         </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-white/5">
         <div className="max-w-4xl mx-auto relative flex items-center">
            <Input 
              placeholder="Ask anything about your studies..."
              className="w-full bg-black border-white/10 text-white rounded-2xl h-14 pl-12 pr-16 focus-visible:ring-blue-500/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Sparkles className="absolute left-4 h-5 w-5 text-gray-500" />
            <Button 
               className="absolute right-2 bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0 rounded-xl"
               onClick={handleSend}
               disabled={!input.trim() || loading}
            >
               <Send className="h-4 w-4" />
            </Button>
         </div>
         <p className="text-[10px] text-center text-gray-600 mt-2">AI can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
