import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit3, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const TaskCard = ({ task, onDelete, onUpdate, onEdit }) => {
    const handlePromote = () => {
        const nextStatus = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'todo';

        if (nextStatus === 'completed') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#CA262D', '#ffffff', '#000000'],
                disableForReducedMotion: true
            });
        }

        onUpdate(task._id, { status: nextStatus });
    };

    return (
        <motion.div
            layout
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
                "todo": { borderColor: 'rgba(255, 255, 255, 0.1)' },
                "in-progress": { borderColor: 'var(--accent)', boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.15)' },
                "completed": { opacity: 0.5, scale: 0.98 }
            }}
            initial="hidden"
            animate={["show", task.status]}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className="border border-white/20 p-12 transition-all relative flex flex-col h-full min-h-[400px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden"
        >
            <div className={`absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 transition-opacity duration-500 ${task.status === 'in-progress' ? 'opacity-100' : ''}`} />

            <div className="flex justify-between items-start mb-8 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                    [{task.status.replace('-', ' ')}]
                </span>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 hover:bg-[var(--accent)] rounded-full transition-colors text-white/40 hover:text-white"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative z-10">
                <h3 className={`text-4xl font-black uppercase tracking-tighter mb-4 leading-none ${task.status === 'completed' ? 'opacity-20 line-through' : 'text-white'}`}>
                    {task.title}
                </h3>
                <p className="text-xs font-medium opacity-40 leading-relaxed max-w-xs">
                    {task.description || "No description provided for this task."}
                </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">Created</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                        {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>

                <button
                    onClick={handlePromote}
                    className="group/btn text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 px-6 py-3 hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all flex items-center gap-2 bg-black/20"
                >
                    <span>Promote Stage</span>
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
