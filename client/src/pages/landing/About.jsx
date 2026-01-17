import React from 'react';
import { motion } from 'framer-motion';
import { Info, Target, Users, Zap } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Precision Management",
            desc: "Every task node is tracked with millisecond precision and cryptographic integrity."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Identity Protocol",
            desc: "Secure authentication nodes ensure that your data remains strictly within your control."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Scaling",
            desc: "Built on a modernized stack designed for high-concurrency and minimal overhead."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen arch-grid pt-48 px-12 pb-24"
        >
            <div className="max-w-6xl mx-auto">
                <header className="mb-32">
                    <div className="flex items-center gap-4 mb-8">
                        <Info className="w-5 h-5 text-[var(--accent)]" />
                        <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-40">System Background</span>
                    </div>
                    <h1 className="text-[120px] font-black uppercase tracking-tighter leading-none mb-12">
                        About <br />
                        <span className="text-white/10">TaskFlow</span>
                    </h1>
                    <p className="text-xl font-medium opacity-60 max-w-2xl leading-relaxed">
                        TaskFlow is a next-generation project orchestration system.
                        We believe that productivity is not just about checking boxes,
                        but about maintaining the flow of information across complex infrastructures.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                    {features.map((f, i) => (
                        <div key={i} className="bg-[var(--bg-dark)] p-12 flex flex-col gap-8 group hover:bg-white/[0.02] transition-colors">
                            <div className="text-[var(--accent)] group-hover:scale-110 transition-transform origin-left">
                                {f.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black uppercase tracking-tight">{f.title}</h3>
                                <p className="text-xs font-semibold opacity-40 leading-relaxed uppercase tracking-wider">
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-32 pt-12 border-t border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-20">System Version 1.0.0_STABLE</span>
                </footer>
            </div>
        </motion.div>
    );
};

export default About;
