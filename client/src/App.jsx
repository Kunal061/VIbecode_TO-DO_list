import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import TaskList from './components/tasks/TaskList';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/landing/Landing';
import About from './pages/landing/About';
import Footer from './components/layout/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes = () => {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/"
                    element={
                        user ? <TaskList /> : <Landing />
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    );
};


function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col relative">
                <div className="viewport-frame" />
                <Navbar />
                <main className="flex-1 w-full">
                    <AppRoutes />
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
