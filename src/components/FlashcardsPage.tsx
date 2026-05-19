import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, Loader2, ChevronLeft, ChevronRight, RotateCcw, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { generateFlashcards } from "../lib/ai";
import { toast } from "sonner";

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currIdx, setCurrIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const generated = await generateFlashcards(input);
      if (generated.length > 0) {
        setCards(generated);
        setCurrIdx(0);
        setIsFlipped(false);
        toast.success(`Generated ${generated.length} flashcards!`);
      } else {
        toast.error("AI couldn't generate cards from that content.");
      }
    } catch (e) {
      toast.error("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
     setCurrIdx((prev) => (prev + 1) % cards.length);
     setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrIdx((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Flashcards</h1>
          <p className="text-gray-400">Master concepts through AI-powered active recall.</p>
        </div>
        {cards.length > 0 && (
           <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl" onClick={() => setCards([])}>
              <Plus className="h-4 w-4 mr-2" /> New Deck
           </Button>
        )}
      </div>

      <div className="max-w-3xl mx-auto w-full">
         {!cards.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center space-y-6"
            >
               <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto">
                 <Brain className="h-8 w-8 text-blue-500" />
               </div>
               <div className="space-y-2">
                 <h2 className="text-2xl font-bold text-white">Generate a Study Deck</h2>
                 <p className="text-gray-400">Paste your course materials below to automatically create a high-quality study deck.</p>
               </div>
               <Textarea 
                 placeholder="Paste any text, notes, or concept definitions..."
                 className="bg-black/50 border-white/10 rounded-xl min-h-[200px] text-white p-4 focus:border-blue-500/50"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
               />
               <Button 
                 className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-lg font-bold"
                 onClick={handleGenerate}
                 disabled={loading || !input.trim()}
               >
                 {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Sparkles className="h-5 w-5 mr-2" />}
                 Create Flashcards
               </Button>
            </motion.div>
         ) : (
            <div className="space-y-8">
               <div className="flex items-center justify-between text-gray-500 font-bold text-xs uppercase tracking-widest">
                  <span>Card {currIdx + 1} of {cards.length}</span>
                  <div className="flex gap-1">
                     <div className="h-1 flex-1 min-w-[30px] rounded-full bg-blue-600" />
                     <div className="h-1 flex-1 min-w-[30px] rounded-full bg-white/10" />
                  </div>
               </div>

               <div 
                 className="relative h-96 [perspective:1000px] group cursor-pointer"
                 onClick={() => setIsFlipped(!isFlipped)}
               >
                 <motion.div
                   className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-700"
                   animate={{ rotateY: isFlipped ? 180 : 0 }}
                 >
                   {/* Front */}
                   <div className="absolute inset-0 w-full h-full border border-white/10 bg-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                      <span className="absolute top-8 left-8 text-xs font-bold text-blue-500 uppercase tracking-widest">Question</span>
                      <p className="text-2xl font-bold text-white">{cards[currIdx].question}</p>
                      <div className="absolute bottom-8 text-gray-500 text-sm flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" /> Click to flip
                      </div>
                   </div>

                   {/* Back */}
                   <div className="absolute inset-0 w-full h-full border border-blue-500/30 bg-blue-600/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="absolute top-8 left-8 text-xs font-bold text-green-500 uppercase tracking-widest">Answer</span>
                      <p className="text-2xl font-medium text-white leading-relaxed">{cards[currIdx].answer}</p>
                   </div>
                 </motion.div>
               </div>

               <div className="flex justify-between gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-14 border-white/10 bg-white/5 text-white rounded-2xl"
                    onClick={(e) => { e.stopPropagation(); prevCard(); }}
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" /> Previous
                  </Button>
                  <Button 
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold"
                    onClick={(e) => { e.stopPropagation(); nextCard(); }}
                  >
                    Next Card <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
