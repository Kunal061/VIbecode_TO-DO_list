import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center arch-grid overflow-hidden pt-32">
            <div className="px-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-2 h-2 bg-[var(--accent)]" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-50">TaskFlow System 2026</span>
                    </div>

                    <h1 className="mega-text">
                        Architecting <br />
                        <span className="text-white/20">Production</span>
                    </h1>

                    <div className="flex items-center gap-12 mt-12 pb-24 border-b border-white/5">
                        <p className="max-w-md text-sm font-medium leading-relaxed opacity-60">
                            The technical approach to personal productivity. Designed with architectural precision for those who build the future.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/register" className="btn-pill btn-pill-primary">
                                <span>Get Started</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/login" className="btn-pill btn-pill-outline">
                                <span>View Demo</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Numbered Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 mt-12">
                    {[
                        { num: '01', title: 'Modular Structure', desc: 'Engineered for high-performance task management.' },
                        { num: '02', title: 'Core Speed', desc: 'Near-instant synchronization across all project nodes.' },
                        { num: '03', title: 'Encrypted Data', desc: 'Secure architecture protecting your internal assets.' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 border-r border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                        >
                            <span className="text-[var(--accent)] font-black text-xs block mb-6">{item.num}</span>
                            <h3 className="text-lg font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                            <p className="text-xs opacity-50 leading-relaxed max-w-[200px]">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scrolling Banner */}
            <div className="mt-auto py-12 border-t border-white/5 bg-[var(--bg-dark)] overflow-hidden flex whitespace-nowrap">
                <div className="animate-scroll flex gap-24 text-[80px] font-black text-white/5 uppercase select-none">
                    <span>Precision</span>
                    <span>Architecture</span>
                    <span>Performance</span>
                    <span>Design</span>
                    <span>Precision</span>
                    <span>Architecture</span>
                    <span>Performance</span>
                    <span>Design</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
