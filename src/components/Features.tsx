import { motion } from "motion/react";
import { 
  FileText, 
  Mic2, 
  Layers, 
  MessageSquareCode, 
  Users, 
  Cloud, 
  Share2, 
  BookOpen 
} from "lucide-react";

const features = [
  {
    title: "AI Note Generation",
    description: "Convert chaotic lectures into structured, beautiful markdown notes instantly.",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Lecture & Audio Sync",
    description: "Drop audio or video files and get perfect transcriptions with timestamped insights.",
    icon: Mic2,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Smart Flashcards",
    description: "AI automatically identifies key concepts and creates high-retention flashcards.",
    icon: Layers,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    title: "AI Chat Assistant",
    description: "Chat with your knowledge base. Ask questions about your own study materials.",
    icon: MessageSquareCode,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Team Collaboration",
    description: "Work with peers in real-time. Share workspaces, notes, and collections.",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    title: "PDF Intelligence",
    description: "Upload dense textbooks and get concise summaries and interactive Q&A.",
    icon: BookOpen,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    title: "Cloud Continuity",
    description: "Everything is synced across web, mobile, and desktop in milliseconds.",
    icon: Cloud,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    title: "Instant Exporting",
    description: "Export your AI-enhanced notes to PDF, Notion, Obsidian, or Google Docs.",
    icon: Share2,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-blue-500 uppercase tracking-widest"
          >
            Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Everything you need to learn faster.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:border-white/10 hover:bg-white/10 group"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg} ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
