import React, { useState } from 'react';
import { Refinery, RefineryUpdate, RefineryStatus } from './types';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onFetch: () => void;
    onPublish: (updates: RefineryUpdate[]) => void;
    isAnalyzing: boolean;
    proposedUpdates: RefineryUpdate[];
    setProposedUpdates: React.Dispatch<React.SetStateAction<RefineryUpdate[]>>;
    refineries: Refinery[];
    onLogout: () => void;
}

export default function AdminPanel({
    isOpen,
    onClose,
    onFetch,
    onPublish,
    isAnalyzing,
    proposedUpdates,
    setProposedUpdates,
    refineries,
    onLogout
}: AdminPanelProps) {
    const [activeTab, setActiveTab] = useState<'staging' | 'raw'>('staging');

    // Merge refineries with proposed updates and detect change type
    type MergedEntry = RefineryUpdate & {
        changeType: 'NEW' | 'UPDATED' | 'EXISTING';
        name?: string;
    };

    const mergedData: MergedEntry[] = React.useMemo(() => {
        const result: MergedEntry[] = [];
        const processedIds = new Set<string>();

        // Add all proposed updates (either NEW or UPDATED)
        proposedUpdates.forEach(update => {
            const existing = refineries.find(r => r.id === update.id);
            result.push({
                ...update,
                name: existing?.name,
                changeType: existing ? 'UPDATED' : 'NEW'
            });
            processedIds.add(update.id);
        });

        // Add all existing refineries that don't have updates
        refineries.forEach(refinery => {
            if (!processedIds.has(refinery.id)) {
                result.push({
                    id: refinery.id,
                    name: refinery.name,
                    status: refinery.status,
                    description: refinery.description,
                    lastIncidentDate: refinery.lastIncidentDate,
                    incidentVideoUrls: refinery.incidentVideoUrls || [],
                    changeType: 'EXISTING'
                });
            }
        });

        return result;
    }, [refineries, proposedUpdates]);

    if (!isOpen) return null;

    const handleUpdateChange = (index: number, field: keyof RefineryUpdate, value: any) => {
        const entry = mergedData[index];
        const existingIndex = proposedUpdates.findIndex(u => u.id === entry.id);

        if (existingIndex >= 0) {
            // Update existing proposed update
            const newUpdates = [...proposedUpdates];
            newUpdates[existingIndex] = { ...newUpdates[existingIndex], [field]: value };
            setProposedUpdates(newUpdates);
        } else {
            // Create new proposed update for EXISTING entry
            const newUpdate: RefineryUpdate = {
                id: entry.id,
                status: entry.status,
                description: entry.description,
                lastIncidentDate: entry.lastIncidentDate,
                incidentVideoUrls: entry.incidentVideoUrls || [],
                [field]: value
            };
            setProposedUpdates([...proposedUpdates, newUpdate]);
        }
    };

    const handleVideoUrlChange = (index: number, urlIndex: number, value: string) => {
        const entry = mergedData[index];
        const existingIndex = proposedUpdates.findIndex(u => u.id === entry.id);

        if (existingIndex >= 0) {
            const newUpdates = [...proposedUpdates];
            const newUrls = [...(newUpdates[existingIndex].incidentVideoUrls || [])];
            newUrls[urlIndex] = value;
            newUpdates[existingIndex] = { ...newUpdates[existingIndex], incidentVideoUrls: newUrls };
            setProposedUpdates(newUpdates);
        } else {
            const newUrls = [...(entry.incidentVideoUrls || [])];
            newUrls[urlIndex] = value;
            const newUpdate: RefineryUpdate = {
                id: entry.id,
                status: entry.status,
                description: entry.description,
                lastIncidentDate: entry.lastIncidentDate,
                incidentVideoUrls: newUrls
            };
            setProposedUpdates([...proposedUpdates, newUpdate]);
        }
    };

    const addVideoUrl = (index: number) => {
        const entry = mergedData[index];
        const existingIndex = proposedUpdates.findIndex(u => u.id === entry.id);

        if (existingIndex >= 0) {
            const newUpdates = [...proposedUpdates];
            const newUrls = [...(newUpdates[existingIndex].incidentVideoUrls || []), ''];
            newUpdates[existingIndex] = { ...newUpdates[existingIndex], incidentVideoUrls: newUrls };
            setProposedUpdates(newUpdates);
        } else {
            const newUrls = [...(entry.incidentVideoUrls || []), ''];
            const newUpdate: RefineryUpdate = {
                id: entry.id,
                status: entry.status,
                description: entry.description,
                lastIncidentDate: entry.lastIncidentDate,
                incidentVideoUrls: newUrls
            };
            setProposedUpdates([...proposedUpdates, newUpdate]);
        }
    };

    const removeVideoUrl = (index: number, urlIndex: number) => {
        const entry = mergedData[index];
        const existingIndex = proposedUpdates.findIndex(u => u.id === entry.id);

        if (existingIndex >= 0) {
            const newUpdates = [...proposedUpdates];
            const newUrls = [...(newUpdates[existingIndex].incidentVideoUrls || [])];
            newUrls.splice(urlIndex, 1);
            newUpdates[existingIndex] = { ...newUpdates[existingIndex], incidentVideoUrls: newUrls };
            setProposedUpdates(newUpdates);
        } else {
            const newUrls = [...(entry.incidentVideoUrls || [])];
            newUrls.splice(urlIndex, 1);
            const newUpdate: RefineryUpdate = {
                id: entry.id,
                status: entry.status,
                description: entry.description,
                lastIncidentDate: entry.lastIncidentDate,
                incidentVideoUrls: newUrls
            };
            setProposedUpdates([...proposedUpdates, newUpdate]);
        }
    };

    const handleExport = () => {
        const dataToExport = JSON.stringify(refineries, null, 2);
        navigator.clipboard.writeText(dataToExport).then(() => {
            alert("Data copied to clipboard! Paste it into the chat to update the source code.");
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert("Failed to copy data. Check console for details.");
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            <span className="text-indigo-500">///</span> ADMIN CONSOLE
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Refinery Intelligence & Status Control</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                if (confirm('Reset all edits and reload original data from source code?')) {
                                    localStorage.removeItem('refinery_published_data');
                                    localStorage.removeItem('refinery_proposed_updates');
                                    window.location.reload();
                                }
                            }}
                            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                            title="Clear all localStorage and reload from source code"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset
                        </button>
                        <button
                            onClick={onLogout}
                            className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                            title="Logout and close admin panel"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                            title="Copy current data to clipboard for saving to source code"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Export Data
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button
                            onClick={onFetch}
                            disabled={isAnalyzing}
                            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${isAnalyzing
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20'
                                }`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Fetching Intelligence...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    Fetch Latest Data
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <div className="text-sm text-slate-400 flex items-center px-3">
                            {proposedUpdates.length} updates pending
                        </div>
                        <button
                            onClick={() => onPublish(proposedUpdates)}
                            disabled={proposedUpdates.length === 0}
                            className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${proposedUpdates.length === 0
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/20'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Publish to Live Map
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-6 bg-slate-950">
                    {mergedData.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500">
                            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            <p className="text-lg">No refineries found.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {mergedData.map((entry, index) => {
                                return (
                                    <div key={entry.id} className="bg-slate-900 border border-slate-700 rounded-lg p-4 shadow-sm hover:border-slate-600 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold text-white">{entry.name || entry.id}</h3>
                                                    {entry.changeType === 'NEW' && (
                                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                                                            🔴 NEW
                                                        </span>
                                                    )}
                                                    {entry.changeType === 'UPDATED' && (
                                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded">
                                                            🟠 UPDATED
                                                        </span>
                                                    )}
                                                    {entry.changeType === 'EXISTING' && (
                                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-slate-700/20 text-slate-400 border border-slate-600/30 rounded">
                                                            ⚪ EXISTING
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-slate-500 font-mono uppercase">{entry.id}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={entry.status}
                                                    onChange={(e) => handleUpdateChange(index, 'status', e.target.value)}
                                                    className={`text-xs font-bold px-2 py-1 rounded border bg-slate-800 ${entry.status === RefineryStatus.OPERATIONAL ? 'text-emerald-400 border-emerald-900' :
                                                        entry.status === RefineryStatus.DAMAGED ? 'text-orange-400 border-orange-900' :
                                                            'text-red-400 border-red-900'
                                                        }`}
                                                >
                                                    <option value={RefineryStatus.OPERATIONAL}>OPERATIONAL</option>
                                                    <option value={RefineryStatus.DAMAGED}>DAMAGED</option>
                                                    <option value={RefineryStatus.OFFLINE}>OFFLINE</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs text-slate-400 mb-1 uppercase font-semibold">Status Update / Description</label>
                                                    <textarea
                                                        value={entry.description}
                                                        onChange={(e) => handleUpdateChange(index, 'description', e.target.value)}
                                                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none h-24 resize-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-slate-400 mb-1 uppercase font-semibold">Last Incident Date</label>
                                                    <input
                                                        type="date"
                                                        value={entry.lastIncidentDate || ''}
                                                        onChange={(e) => handleUpdateChange(index, 'lastIncidentDate', e.target.value)}
                                                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-xs text-slate-400 mb-1 uppercase font-semibold">Visual Evidence URLs (X.com)</label>
                                                <div className="space-y-2">
                                                    {entry.incidentVideoUrls?.map((url, urlIndex) => (
                                                        <div key={urlIndex} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={url}
                                                                onChange={(e) => handleVideoUrlChange(index, urlIndex, e.target.value)}
                                                                placeholder="https://x.com/..."
                                                                className="flex-grow bg-slate-800 border border-slate-700 rounded p-2 text-xs text-slate-300 focus:border-blue-500 focus:outline-none font-mono"
                                                            />
                                                            <button
                                                                onClick={() => removeVideoUrl(index, urlIndex)}
                                                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => addVideoUrl(index)}
                                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                        Add Evidence URL
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
