import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-z]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
            setLoading(false);
            return;
        }

        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen arch-grid flex items-center justify-center p-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl bg-[var(--bg-dark)] border border-white/10 p-16 relative"
            >
                <div className="absolute top-0 right-0 p-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Auth Node 02</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
                        Request <br />
                        <span className="text-[var(--accent)]">Protocol</span>
                    </h1>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-40">Establish new identity in the system</p>
                </div>

                {error && (
                    <div className="mb-8 p-4 border-l-4 border-[var(--accent)] bg-white/5 text-[var(--accent)] text-xs font-bold uppercase tracking-widest">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Alias (Username)</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="input-arch"
                            placeholder="YOUR NAME"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Identity (Email)</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-arch"
                            placeholder="USER@DOMAIN.COM"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Access Key (Password)</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="input-arch"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex flex-col gap-6 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-pill btn-pill-primary w-full justify-center text-sm uppercase tracking-widest py-4"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Identity'}
                        </button>

                        <Link to="/login" className="text-center text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                            Already Have Access? <span className="text-[var(--accent)] ml-2">Sign In</span>
                        </Link>
                    </div>
                </form>
            </motion.div>
        </section>
    );
};

export default Register;
