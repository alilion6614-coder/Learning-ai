import { motion } from "motion/react";
import { 
  Plus, 
  Upload, 
  Clock, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Target,
  FileText,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DashboardHome() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your learning.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl">
            Import Files
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-xl gap-2 shadow-lg shadow-cyan-500/20">
            <Plus className="h-4 w-4" />
            New Workspace
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Notes", value: "142", icon: BookOpen, color: "text-cyan-400", bg: "bg-cyan-400/10" },
          { title: "Study Hours", value: "48.5", icon: Clock, color: "text-indigo-400", bg: "bg-indigo-400/10" },
          { title: "Quiz Accuracy", value: "84%", icon: Target, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { title: "Network", value: "12", icon: Users, color: "text-rose-400", bg: "bg-rose-400/10" },
        ].map((stat, i) => (
          <Card key={i} className="bg-white/5 border-white/5 backdrop-blur-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span>+12% from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
           {/* Upload Area */}
           <motion.div
             whileHover={{ scale: 1.005 }}
             className="relative p-10 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center group cursor-pointer transition-colors hover:bg-white/[0.04] hover:border-white/10"
           >
              <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <Upload className="h-8 w-8 text-white group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Drop study materials here</h3>
              <p className="text-gray-500 max-w-sm text-sm">Support for PDF, DOCX, MP3, MP4, and direct URLs. Max 50MB per file.</p>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
           </motion.div>

           {/* Recent Work */}
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-white tracking-tight">Recent Work</h3>
               <Button variant="link" className="text-cyan-400 no-underline hover:text-cyan-300">View All</Button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { title: "Neuroscience Chapter 4", date: "2 hours ago", type: "AI Note" },
                 { title: "Macroeconomics Lecture 12", date: "Yesterday", type: "Transcription" },
                 { title: "Calculus III Flashcards", date: "3 days ago", type: "Quiz" },
                 { title: "Modernist Literature Essay", date: "5 days ago", type: "AI Note" },
               ].map((item, i) => (
                 <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center gap-4 hover:border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer group">
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider px-1.5 py-0.5 rounded bg-white/5">{item.type}</span>
                        <span className="text-[10px] text-gray-500 italic">{item.date}</span>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8 text-white">
           <Card className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border-white/10 rounded-2xl overflow-hidden relative shadow-2xl shadow-cyan-500/5">
              <div className="absolute top-[-20%] right-[-20%] w-[150px] h-[150px] bg-cyan-500/10 blur-3xl" />
              <CardHeader>
                <CardTitle className="text-white text-lg tracking-tight">Pro Upgrade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <p className="text-gray-400 text-sm leading-relaxed">Unlock unlimited AI generations, Claude 3.5 Sonnet access, and 50GB storage.</p>
                <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-xl shadow-lg">Upgrade Now</Button>
              </CardContent>
           </Card>

           <div className="space-y-4">
             <h3 className="text-lg font-bold tracking-tight">Learning Streak</h3>
             <div className="flex gap-2">
                {['M','T','W','T','F','S','S'].map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full aspect-square rounded ${i < 4 ? 'bg-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'bg-white/10'}`} />
                    <span className="text-[10px] font-bold text-gray-500">{day}</span>
                  </div>
                ))}
             </div>
             <p className="text-xs text-center text-gray-500 italic">You're on a <span className="text-cyan-400 font-bold">4 day streak</span>! Keep it up.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
