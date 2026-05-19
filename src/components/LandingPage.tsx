import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Check, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Features />

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">Choose the plan that fits your study velocity.</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
            {[
              { name: "Starter", price: "$0", features: ["10 AI Notes / mo", "Basic Chat", "Mobile Access", "Cloud Sync"] },
              { name: "Pro", price: "$19", highlight: true, features: ["Unlimited AI Notes", "Claude 3.5 Sonnet", "PDF Intelligence", "Audio Transcription", "Priority Support"] },
              { name: "Team", price: "$49", features: ["Shared Workspaces", "Member Management", "API Access", "SSO & Security", "Dedicated Success Manager"] },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -10 }}
                className={`rounded-3xl p-8 ring-1 transition-all ${
                  plan.highlight 
                    ? "bg-gradient-to-b from-blue-600/20 to-purple-600/20 ring-blue-500/50 shadow-2xl shadow-blue-500/20 border border-blue-500/20" 
                    : "bg-white/5 ring-white/10"
                }`}
              >
                <h3 className="text-lg font-semibold leading-8 text-white">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-400">/month</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`mt-8 w-full rounded-full ${plan.highlight ? "bg-blue-600 hover:bg-blue-700" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                  Get started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-12">Trusted by students at leading universities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Rivera", role: "Medical Student at Stanford", body: "Learning AI cut my lecture review time in half. The PDF summaries are life-changing for dense medical texts." },
              { name: "Sarah Chen", role: "CS Major at MIT", body: "The flashcard generator is scarily good. It picks up nuances in my code snippets that I would have missed." },
              { name: "Marcus Thorne", role: "MBA Candidate at Harvard", body: "A premium tool for premium learning. It's the only AI study assistant that actually feels like it gets the context." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl bg-black border border-white/10 p-8 text-left">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-gray-300 mb-6 font-medium italic">"{t.body}"</p>
                <div className="flex flex-col">
                  <span className="text-white font-bold">{t.name}</span>
                  <span className="text-gray-500 text-sm">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">Frequently Asked Questions</h2>
          <Accordion className="w-full">
            {[
              { q: "How does the AI note generation work?", a: "We use Claude 3.5 Sonnet to analyze your inputs (text, audio, or PDF) and create a structured, hierarchical set of notes that highlight key concepts, definitions, and action items." },
              { q: "Is my data secure and private?", a: "Yes. We encrypt all data at rest and in transit. Your study materials are only accessible to you and are never used to train global AI models." },
              { q: "Can I use it on my phone?", a: "Absolutely. Learning AI is a progressive web app that works beautifully on any mobile browser, with a dedicated app coming soon." },
              { q: "What's the difference between Free and Pro?", a: "Free users get basic chat and limited AI note generation. Pro users get unlimited access, our highest-tier models, audio transcription, and deep PDF analysis." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-white hover:text-blue-400">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600" />
            <span className="text-lg font-bold text-white tracking-tight">Learning AI</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
          <p className="text-sm text-gray-600">© 2026 Learning AI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
