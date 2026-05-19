import { motion } from "motion/react";
import { Button } from "./ui/button";
import { PlayCircle, ArrowRight, Sparkles, Brain, Zap, Target } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030304] pt-20">
      {/* Background Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[100px] -left-[100px] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -bottom-[100px] -right-[100px] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-400">NEW: Claude 3.5 Sonnet Integration Now Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-6xl font-bold tracking-tight leading-[1.1] text-white sm:text-7xl lg:text-8xl italic"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Accelerate your mind.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 leading-relaxed sm:text-xl"
        >
          The ultimate AI workspace for students and researchers.<br className="hidden sm:block" />
          Turn lectures into flashcards, PDFs into summaries, and audio into insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" className="h-12 rounded-full bg-white text-black font-bold px-8 hover:bg-gray-100 shadow-xl shadow-white/5">
            Get Started Free
          </Button>
          <Button size="lg" variant="ghost" className="h-12 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            Watch Demo
          </Button>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative mt-20"
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-4 shadow-2xl backdrop-blur-sm">
             <div className="aspect-[16/9] w-full rounded-xl bg-neutral-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50" />
                <div className="p-8 flex gap-6 h-full">
                  <div className="w-1/4 h-full bg-white/5 rounded-lg border border-white/5 animate-pulse" />
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="h-16 bg-white/5 rounded-lg border border-white/5 animate-pulse" />
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/5 animate-pulse" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
             </div>
          </div>
          
          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-12 top-12 hidden md:block"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-blue-400" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white">AI Analyzing...</span>
                  <span className="text-[10px] text-gray-400">Context recognized</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-12 bottom-24 hidden md:block"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-400" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white">Hyper Sync</span>
                  <span className="text-[10px] text-gray-400">All devices updated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { label: "Active Users", value: "99.9k+" },
            { label: "AI Notes Gen", value: "12M+" },
            { label: "Avg. Grade Lift", value: "24%" },
            { label: "Study Time Saved", value: "40h/mo" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col gap-1"
            >
              <span className="text-2xl font-bold text-white lg:text-3xl">{stat.value}</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
