import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";
import { Sparkles, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const [user] = useAuthState(auth);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform"
          >
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Learning AI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Platform</a>
          <a href="#solutions" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Solutions</a>
          <a href="#pricing" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2 text-gray-300 hover:text-white">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={logout} 
                className="hidden border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 md:flex rounded-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <button 
                onClick={login}
                className="hidden md:block px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Log in
              </button>
              <Button 
                onClick={login} 
                className="bg-white text-black font-semibold rounded-full px-6 hover:bg-gray-100 shadow-lg shadow-white/10"
              >
                Get Started Free
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
