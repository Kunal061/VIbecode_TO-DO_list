import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2 } from 'lucide-react';
import taskService from '../../services/taskService';

const TaskForm = ({ onTaskAdded, onTaskUpdated, isOpen, setIsOpen, editTask }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo'
    });

    useEffect(() => {
        if (editTask) {
            setFormData({
                title: editTask.title,
                description: editTask.description,
                status: editTask.status
            });
        } else {
            setFormData({ title: '', description: '', status: 'todo' });
        }
    }, [editTask, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (editTask) {
                const data = await taskService.updateTask(editTask._id, formData);
                onTaskUpdated(data);
            } else {
                const data = await taskService.createTask(formData);
                onTaskAdded(data);
            }
            setFormData({ title: '', description: '', status: 'todo' });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || `Failed to ${editTask ? 'update' : 'add'} task node`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-24 btn-pill btn-pill-primary px-10 py-5 z-40 border-4 border-[var(--bg-dark)] shadow-2xl"
            >
                <Plus className="w-6 h-6" />
                <span className="font-black uppercase tracking-widest text-sm">Add Node</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-end p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="w-full max-w-2xl bg-[var(--bg-dark)] h-full p-24 relative z-10 border-l border-white/10 flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-12 left-12 p-4 hover:bg-white/5 rounded-full transition-colors opacity-40 hover:opacity-100"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <div className="mb-24">
                                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                                    {editTask ? 'Configure' : 'Initialize'} <br />
                                    <span className="text-[var(--accent)]">Node</span>
                                </h2>
                                <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-30">
                                    {editTask ? 'Update existing project component' : 'Configure new project component'}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-12 p-4 border-l-4 border-[var(--accent)] bg-white/5 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest">
                                    System Error :: {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-16 flex-1">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">System Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="input-arch text-4xl"
                                        placeholder="NODE_NAME.EXE"
                                    />
                                </div>

                                <div className="space-y-6">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Technical Notes</label>
                                    <textarea
                                        rows="6"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="input-arch resize-none"
                                        placeholder="Define core objectives and parameters..."
                                    />
                                </div>

                                <div className="pt-12 mt-auto">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-pill btn-pill-primary w-full justify-center py-6 text-lg uppercase tracking-[0.3em] font-black"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : editTask ? 'Save Configuration' : 'Confirm Initialization'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TaskForm;
