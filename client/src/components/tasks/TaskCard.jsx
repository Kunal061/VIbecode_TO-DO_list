import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit3, ChevronRight } from 'lucide-react';

const TaskCard = ({ task, onDelete, onUpdate, onEdit }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-r border-b border-white/5 p-12 group hover:bg-white/5 transition-colors relative flex flex-col h-full min-h-[400px]"
        >
            <div className="flex justify-between items-start mb-8">
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

            <div className="flex-1">
                <h3 className={`text-4xl font-black uppercase tracking-tighter mb-4 leading-none ${task.status === 'completed' ? 'opacity-20 line-through' : 'text-white'}`}>
                    {task.title}
                </h3>
                <p className="text-xs font-medium opacity-40 leading-relaxed max-w-xs">
                    {task.description || "No technical description provided for this node."}
                </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">Created</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                        {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>

                <button
                    onClick={() => {
                        const nextStatus = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'todo';
                        onUpdate(task._id, { status: nextStatus });
                    }}
                    className="group/btn text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 px-6 py-3 hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all flex items-center gap-2"
                >
                    <span>Promote Stage</span>
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
