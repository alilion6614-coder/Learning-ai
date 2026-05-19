import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, FileText, Send, Loader2, Save, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { generateNotes } from "../lib/ai";
import { toast } from "sonner";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function NotesPage() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await generateNotes(input);
      const content = response.choices?.[0]?.message?.content || "";
      setNotes(content);
      toast.success("Notes generated successfully!");
    } catch (e) {
      toast.error("Failed to generate notes. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!notes || !auth.currentUser) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
        content: notes,
        source: input.substring(0, 100) + "...",
        createdAt: serverTimestamp(),
      });
      toast.success("Notes saved to your library!");
    } catch (e) {
      toast.error("Failed to save notes.");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Notes</h1>
          <p className="text-gray-400">Paste your content and let AI create structured notes.</p>
        </div>
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl" 
            disabled={!notes || saving}
            onClick={handleSave}
           >
             {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
             Save to Library
           </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Input Area */}
        <Card className="flex flex-col bg-white/5 border-white/10 rounded-2xl overflow-hidden p-6 gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <FileText className="h-5 w-5 text-blue-400" />
            Input Content
          </div>
          <ScrollArea className="flex-1">
            <Textarea
              placeholder="Paste lecture transcript, textbook content, or raw notes here..."
              className="min-h-full bg-transparent border-none text-white focus-visible:ring-0 resize-none text-base placeholder:text-gray-600 p-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </ScrollArea>
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-500">{input.length} characters</span>
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Generate Now
            </Button>
          </div>
        </Card>

        {/* Output Area */}
        <Card className="flex flex-col bg-neutral-900 border-white/10 rounded-2xl overflow-hidden relative">
          {!notes && !loading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="h-20 w-20 rounded-full bg-blue-600/5 flex items-center justify-center mb-6">
                   <Sparkles className="h-10 w-10 text-blue-500/20" />
                </div>
                <h3 className="text-lg font-bold text-white">No notes generated yet</h3>
                <p className="text-gray-500 mt-2">Your AI-structured notes will appear here once you hit generate.</p>
             </div>
          ) : (
            <>
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                 <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Result</span>
                 </div>
                 <Button variant="ghost" size="icon" className="text-gray-400">
                    <MoreVertical className="h-4 w-4" />
                 </Button>
              </div>
              <ScrollArea className="flex-1 p-8">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                      <div className="h-32 w-full bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                      <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="prose prose-invert max-w-none prose-p:text-gray-400 prose-headings:text-white prose-strong:text-blue-400"
                    >
                      <ReactMarkdown>{notes || ""}</ReactMarkdown>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
