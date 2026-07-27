import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
const reviews = [
    { i: 'SK', name: 'Siddharth K.', role: 'Software Engineer, 24', color: 'bg-blue-600',
        text: "FinMentor showed me I was spending 42% of my salary on dining. Fixed it in a month. My savings went from ₹5,000 to ₹18,000 per month." },
    { i: 'PA', name: 'Priya A.', role: 'MBA Student, 22', color: 'bg-indigo-600',
        text: "The AI explained expense ratios using my own SIP amount. I actually understood it for the first time. The personalisation is what makes it different." },
    { i: 'RM', name: 'Rahul M.', role: 'Fresh Graduate, 21', color: 'bg-blue-500',
        text: "Built my first emergency fund of ₹90,000 in 4 months. Never thought this was possible on my first job salary. The goal planner kept me on track." },
    { i: 'AK', name: 'Ananya K.', role: 'UX Designer, 26', color: 'bg-indigo-500',
        text: "Went from not knowing what ELSS means to confidently investing for 80C deductions—all within the app. The learning hub is genuinely world-class." },
    { i: 'VN', name: 'Vikram N.', role: 'Startup Founder, 28', color: 'bg-blue-600',
        text: "Finally an app that teaches instead of judging. The AI doesn't give advice—it gives you the knowledge to make better decisions yourself." },
    { i: 'TJ', name: 'Tanvi J.', role: 'Doctor, 29', color: 'bg-indigo-600',
        text: "2 minutes a day is all it takes. The analytics dashboard helped me see my money clearly for the first time despite 80-hour work weeks in residency." },
];
export const TestimonialsSection = () => (<section id="testimonials" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-14">
        <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Testimonials</p>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Real people. Real results.</h2>
        <p className="text-[15px] text-slate-500 mt-4">Join thousands transforming their financial future.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (<motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }} className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-lg transition-all duration-200 flex flex-col">
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (<Star key={idx} className="w-4 h-4 text-blue-400 fill-blue-400"/>))}
            </div>

            <p className="text-[14px] text-slate-600 leading-relaxed flex-1">"{r.text}"</p>

            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-50">
              <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center shrink-0`}>
                <span className="text-[11px] font-black text-white">{r.i}</span>
              </div>
              <div>
                <p className="text-[13px] font-black text-slate-900">{r.name}</p>
                <p className="text-[11px] text-slate-400">{r.role}</p>
              </div>
            </div>
          </motion.div>))}
      </div>
    </div>
  </section>);
