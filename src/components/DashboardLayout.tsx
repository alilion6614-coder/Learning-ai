import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { name: "AI Notes", icon: FileText, path: "/dashboard/notes" },
  { name: "Flashcards", icon: Layers, path: "/dashboard/flashcards" },
  { name: "AI Tutor", icon: MessageCircle, path: "/dashboard/chat" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-56 flex-col border-r border-white/5 bg-[#030304] z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Learning AI</span>
        </div>
        
        <nav className="flex-1 px-3 mt-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                  isActive 
                    ? "bg-white/5 text-white shadow-sm" 
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'opacity-50'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-white/5">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Pro Status</p>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 italic">75% AI Credits Used</p>
          </div>
          <div className="mt-4 space-y-1">
            <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="w-full justify-start gap-3 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg text-sm h-9"
            >
                <LogOut className="h-4 w-4" />
                Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950 border-r border-white/10 p-6 md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Learning AI</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6 text-gray-400" />
                </Button>
              </div>
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-sm md:hidden">
           <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
             <Menu className="h-6 w-6 text-white" />
           </Button>
           <span className="text-lg font-bold text-white">Learning AI</span>
           <div className="w-10 h-10 rounded-full bg-blue-600/20" />
        </header>

        <div className="flex-1 overflow-y-auto bg-[#030304]">
           <div className="container mx-auto p-6 lg:p-10 max-w-7xl relative">
             {/* Subtle ambient light */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />
             <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
}
