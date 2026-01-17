import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import taskService from '../../services/taskService';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [editTask, setEditTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err);
            const msg = err.response?.data?.message || err.message;
            setError(`Connection Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks(prev => [newTask, ...prev]);
        setIsFormOpen(false);
        setActionError(null);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
        setIsFormOpen(false);
        setEditTask(null);
        setActionError(null);
    };

    const handleTaskDeleted = async (id) => {
        if (!window.confirm('Terminate this task node?')) return;
        try {
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(t => t._id !== id));
            setActionError(null);
        } catch (err) {
            setActionError('Failed to delete task node');
        }
    };

    const handleInlineUpdate = async (id, updates) => {
        try {
            const data = await taskService.updateTask(id, updates);
            setTasks(prev => prev.map(t => t._id === id ? data : t));
            setActionError(null);
        } catch (err) {
            setActionError('Failed to update task node');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen arch-grid">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
                <p className="mt-4 text-[10px] uppercase font-bold tracking-widest opacity-40">Initializing Nodes...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen arch-grid pt-32 px-12 pb-24">
            {actionError && (
                <div className="fixed top-32 right-12 z-50 p-4 border-l-4 border-[var(--accent)] bg-[var(--bg-dark)] shadow-2xl text-[var(--accent)] text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-right">
                    Error :: {actionError}
                    <button onClick={() => setActionError(null)} className="ml-4 opacity-50 hover:opacity-100">✕</button>
                </div>
            )}
            <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-[var(--accent)]" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">System Dashboard</span>
                    </div>
                    <h1 className="text-8xl font-black uppercase tracking-tighter leading-none">
                        Project <br />
                        <span className="text-white/20">Control</span>
                    </h1>
                </div>

                <div className="flex gap-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-30">01 Total</span>
                        <span className="text-4xl font-black">{tasks.length}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-30">02 Finished</span>
                        <span className="text-4xl font-black text-[var(--accent)]">
                            {tasks.filter(t => t.status === 'completed').length}
                        </span>
                    </div>
                </div>
            </header>

            <AnimatePresence mode="popLayout">
                {tasks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 border border-dashed border-white/10 flex flex-col items-center justify-center bg-white/[0.02]"
                    >
                        <h3 className="text-3xl font-black uppercase tracking-tight opacity-20">No Tasks Detected</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest mt-4 opacity-10 mb-8">Waiting for system input...</p>
                        <button
                            onClick={() => {
                                setEditTask(null);
                                setIsFormOpen(true);
                            }}
                            className="btn-pill btn-pill-outline text-xs uppercase tracking-widest"
                        >
                            Initialize First Node
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-white/5"
                    >
                        {tasks.map(task => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDelete={handleTaskDeleted}
                                onUpdate={handleInlineUpdate}
                                onEdit={(t) => {
                                    setEditTask(t);
                                    setIsFormOpen(true);
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <TaskForm
                onTaskAdded={handleTaskAdded}
                onTaskUpdated={handleTaskUpdated}
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                editTask={editTask}
            />
        </div>
    );
};

export default TaskList;
