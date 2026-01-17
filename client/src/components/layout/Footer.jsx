import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="section-dark py-32 px-12 border-t border-white/5 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-24">
                <div className="flex flex-col gap-8">
                    <span className="text-4xl font-black uppercase">TaskFlow</span>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest opacity-50">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link-hover">Twitter</a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link-hover">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link-hover">LinkedIn</a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-24 font-bold uppercase text-[10px] tracking-[0.2em] opacity-40">
                    <div className="flex flex-col gap-4">
                        <span className="opacity-20">Product</span>
                        <span className="hover:opacity-100 transition-opacity cursor-pointer">Features</span>
                        <span className="hover:opacity-100 transition-opacity cursor-pointer">Scale</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="opacity-20">Organization</span>
                        <Link to="/about" className="hover:opacity-100 transition-opacity cursor-pointer">About</Link>
                        <span className="hover:opacity-100 transition-opacity cursor-pointer">Contact</span>
                    </div>
                </div>
            </div>

            <div className="mt-32 pt-12 border-t border-white/5 flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-30">
                <span>© 2026 TaskFlow System</span>
                <span className="cursor-pointer hover:opacity-100 transition-opacity">Privacy Policy</span>
            </div>
        </footer>
    );
};

export default Footer;
