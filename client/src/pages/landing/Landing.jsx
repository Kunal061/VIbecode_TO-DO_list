import React from 'react';
import Hero from '../../components/hero/Hero';
import { motion } from 'framer-motion';

const Landing = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col"
        >
            <Hero />

            {/* Light Section Sample */}
            <section className="section-light py-32 px-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <h2 className="text-[80px] font-black uppercase leading-none max-w-xl">
                        Designed for <br />
                        <span className="opacity-20">Scale</span>
                    </h2>
                    <p className="max-w-sm text-sm font-semibold opacity-60 pb-4">
                        Our infrastructure is built to handle complex project trees with minimal latency. Every interaction is measured in milliseconds.
                    </p>
                </div>
            </section>

        </motion.div>
    );
};

export default Landing;
