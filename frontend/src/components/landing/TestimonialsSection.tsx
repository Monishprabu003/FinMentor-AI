import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    initials: 'SK',
    name: 'Siddharth K.',
    role: 'Software Engineer, 24',
    review:
      'FinMentor completely changed how I think about my salary. The 50/30/20 tracker showed me I was spending 42% on dining alone. Fixed it in a month.',
    color: 'bg-blue-500',
  },
  {
    initials: 'PA',
    name: 'Priya A.',
    role: 'MBA Student, 22',
    review:
      'I finally understand what a mutual fund expense ratio means—the AI explained it using my own SIP amount. That personal touch makes all the difference.',
    color: 'bg-violet-500',
  },
  {
    initials: 'RM',
    name: 'Rahul M.',
    role: 'Fresh Graduate, 21',
    review:
      'Built my first emergency fund in 4 months using the savings goal planner. Never thought I could save ₹90,000 on my first salary.',
    color: 'bg-emerald-500',
  },
  {
    initials: 'AK',
    name: 'Ananya K.',
    role: 'UX Designer, 26',
    review:
      "The learning hub is the best part. I went from not knowing what ELSS means to confidently investing for 80C deductions—all within the app.",
    color: 'bg-rose-500',
  },
  {
    initials: 'VN',
    name: 'Vikram N.',
    role: 'Early-stage Startup Founder, 28',
    review:
      "Finally an app that doesn't talk down to you. The AI doesn't give financial advice—it teaches you so you make better decisions yourself.",
    color: 'bg-amber-500',
  },
  {
    initials: 'TJ',
    name: 'Tanvi J.',
    role: 'Doctor, 29',
    review:
      'Between residency hours, I had zero time to manage money. FinMentor makes it take literally 2 minutes a day. The analytics dashboard is stunning.',
    color: 'bg-teal-500',
  },
];

export const TestimonialsSection: React.FC = () => (
  <section id="testimonials" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-14"
      >
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Testimonials</p>
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Real people. Real financial transformations.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-[14px] text-gray-600 leading-relaxed mb-5">"{t.review}"</p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center shrink-0`}>
                <span className="text-[11px] font-bold text-white">{t.initials}</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800">{t.name}</p>
                <p className="text-[11px] text-gray-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
