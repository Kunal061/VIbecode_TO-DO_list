import React from 'react';
import { Layout, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[60] py-6 px-12">
            <div className="flex items-center justify-between glass-blur px-8 py-4 rounded-full">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center rounded-lg rotate-45 transform transition-transform group-hover:rotate-0">
                        <Layout className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter text-[var(--text-light)]">
                        TaskFlow
                    </span>
                </Link>

                <div className="flex items-center gap-8 font-semibold uppercase text-xs tracking-widest text-[var(--text-light)]">
                    <Link to="/" className="link-hover">Overview</Link>
                    <Link to="/about" className="link-hover">About</Link>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <span className="opacity-50 lowercase">{user.username}</span>
                            <button
                                onClick={logout}
                                className="btn-pill btn-pill-outline py-2 px-6"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="opacity-70 hover:opacity-100 transition-opacity">Sign In</Link>
                            <Link to="/register" className="btn-pill btn-pill-primary py-2 px-6">
                                <span>Get Started</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
