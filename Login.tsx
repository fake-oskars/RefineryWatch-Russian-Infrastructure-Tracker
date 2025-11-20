import React, { useState } from 'react';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
    error: string | null;
}

export default function Login({ onLogin, error }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl p-8 animate-fade-in">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        ADMIN ACCESS
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">Refinery Intelligence & Status Control</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                            placeholder="Enter username"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-red-400 font-medium">{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-6">
                    🔒 Secure access required for administrative functions
                </p>
            </div>
        </div>
    );
}
