
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Refinery, RefineryStatus, GroundingChunk, Pipeline } from './types';

interface SidebarProps {
  refineries: Refinery[];
  pipelines: Pipeline[];
  selectedRefinery: Refinery | null;
  aiReport: string | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onClose: () => void;
  groundingChunks: GroundingChunk[] | null;
}

// Reusable badge component for consistent status display
const StatusBadge = ({ status }: { status: RefineryStatus }) => {
  let colorClasses = '';
  let dotColor = '';

  switch (status) {
    case RefineryStatus.OFFLINE:
      colorClasses = 'text-red-400 border-red-500/30 bg-red-500/10';
      dotColor = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      break;
    case RefineryStatus.DAMAGED:
      colorClasses = 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      dotColor = 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]';
      break;
    case RefineryStatus.OPERATIONAL:
      colorClasses = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      dotColor = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
      break;
    default:
      colorClasses = 'text-slate-400 border-slate-700 bg-slate-800';
      dotColor = 'bg-slate-500';
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colorClasses}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

// A compact legend visible when the sidebar is minimized
const MiniLegend = () => (
  <div className="absolute z-[900] pointer-events-none 
    bottom-24 left-4 md:bottom-8 md:left-8
    animate-fade-in">
    <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-lg border border-slate-700/50 shadow-xl pointer-events-auto">
       <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Map Key</h3>
       <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
            <span>Offline / Destroyed</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
            <span>Damaged</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span>Operational</span>
          </div>
          <div className="w-full h-px bg-slate-700 my-2"></div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span className="w-4 h-1 rounded-full bg-sky-500"></span>
            <span>Gas Pipeline</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span className="w-4 h-1 rounded-full bg-amber-500"></span>
            <span>Oil Pipeline</span>
          </div>
       </div>
    </div>
  </div>
);

export default function Sidebar({ 
  refineries,
  pipelines,
  selectedRefinery, 
  aiReport, 
  isAnalyzing, 
  onAnalyze, 
  onClose,
  groundingChunks 
}: SidebarProps) {
  // Default to minimized so the map is the primary view initially
  const [isMinimized, setIsMinimized] = useState(true);
  const [pipelineFilter, setPipelineFilter] = useState<'all' | 'operational' | 'suspended' | 'destroyed'>('all');
  const tweetRef = useRef<HTMLDivElement>(null);

  // Compute Statistics
  const stats = useMemo(() => {
    const total = refineries.length;
    const offline = refineries.filter(r => r.status === RefineryStatus.OFFLINE).length;
    const damaged = refineries.filter(r => r.status === RefineryStatus.DAMAGED).length;
    const operational = refineries.filter(r => r.status === RefineryStatus.OPERATIONAL).length;
    const impactPercentage = total > 0 ? Math.round(((offline + damaged) / total) * 100) : 0;
    
    return { total, offline, damaged, operational, impactPercentage };
  }, [refineries]);

  const filteredPipelines = useMemo(() => {
    return pipelines.filter(p => pipelineFilter === 'all' || p.status === pipelineFilter);
  }, [pipelines, pipelineFilter]);

  // Helper to extract Tweet ID from URL
  const getTweetId = (url: string) => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  };

  // Robustly load Twitter Widget using createTweet
  useEffect(() => {
    if (!selectedRefinery?.incidentVideoUrl || !tweetRef.current) return;

    const tweetId = getTweetId(selectedRefinery.incidentVideoUrl);
    if (!tweetId) return;

    // Clear container
    tweetRef.current.innerHTML = '';
    const currentContainer = tweetRef.current;

    const loadWidget = () => {
      const w = window as any;
      // Check if twttr is ready
      if (w.twttr && w.twttr.widgets) {
        w.twttr.ready(() => {
            w.twttr.widgets.createTweet(
            tweetId,
            currentContainer,
            {
                theme: 'dark',
                conversation: 'none',
                dnt: true,
                align: 'center'
            }
            ).then((el: any) => {
            if (!el && currentContainer) {
                // Fallback if widget refuses to render (e.g. age restricted or deleted)
                currentContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full min-h-[150px] text-center p-4">
                    <p class="text-slate-400 text-sm mb-2">Preview unavailable</p>
                    <p class="text-xs text-slate-500">Content may be sensitive or age-restricted.</p>
                </div>
                `;
            }
            });
        });
      }
    };

    // If script is ready, load immediately
    if ((window as any).twttr && (window as any).twttr.widgets) {
      loadWidget();
    } else {
      // Poll for the script if it hasn't loaded yet (e.g. on slow connections)
      const interval = setInterval(() => {
        if ((window as any).twttr && (window as any).twttr.widgets) {
          clearInterval(interval);
          loadWidget();
        }
      }, 200);
      
      // Stop polling after 5 seconds
      const timeout = setTimeout(() => {
          clearInterval(interval);
          if (currentContainer.innerHTML === '') {
               currentContainer.innerHTML = `
               <div class="flex flex-col items-center justify-center h-full min-h-[150px] text-center p-4">
                  <p class="text-slate-400 text-sm mb-2">Widget failed to load</p>
                  <p class="text-xs text-slate-500">Please check your connection.</p>
               </div>
             `;
          }
      }, 5000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [selectedRefinery?.incidentVideoUrl]); 

  // Initial "Landing" State (No selection, no analysis)
  if (!selectedRefinery && !aiReport && !isAnalyzing) {
    
    if (isMinimized) {
      return (
        <>
          <MiniLegend />
          <button 
            onClick={() => setIsMinimized(false)}
            className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-4 md:top-4 md:bottom-auto 
              bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-xl border border-slate-700 
              flex items-center gap-3 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 group"
          >
            <span className="font-bold tracking-tight text-sm">RefineryWatch</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </>
      );
    }

    return (
      <div className="absolute z-[1000] bg-slate-900/95 backdrop-blur-md border-slate-700 shadow-2xl text-slate-300 transition-all duration-300 
        bottom-0 left-0 w-full rounded-t-2xl border-t border-x p-6 max-h-[85vh] overflow-y-auto custom-scrollbar
        md:top-4 md:left-4 md:w-96 md:rounded-xl md:border md:bottom-auto md:max-h-[calc(100vh-2rem)] animate-slide-up">
        
        {/* Header Row */}
        <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
                {/* Drag Handle for Mobile appearance */}
                <div className="w-12 h-1.5 bg-slate-700 rounded-full mb-4 md:hidden mx-auto"></div>
                <h1 className="text-2xl font-bold text-white tracking-tight">RefineryWatch</h1>
            </div>
            <button 
                onClick={() => setIsMinimized(true)}
                className="p-2 -mr-2 -mt-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Minimize"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

        <p className="text-sm mb-6 text-slate-400">
          Interactive map tracking the status of Russian oil infrastructure during the Ukraine war.
        </p>

        {/* Damage Assessment Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-red-500">{stats.offline}</div>
            <div className="text-[10px] uppercase font-bold text-red-400/70">Offline</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-orange-500">{stats.damaged}</div>
            <div className="text-[10px] uppercase font-bold text-orange-400/70">Damaged</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-slate-300">{stats.impactPercentage}%</div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Impacted</div>
          </div>
        </div>

        {/* Strategic Pipelines Section */}
        <div className="mb-6">
           <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Strategic Pipelines</h4>
              <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                 <button 
                   onClick={() => setPipelineFilter('all')}
                   className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-all ${pipelineFilter === 'all' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-300'}`}
                 >
                   All
                 </button>
                 <button 
                   onClick={() => setPipelineFilter('operational')}
                   className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-all ${pipelineFilter === 'operational' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-300'}`}
                 >
                   Active
                 </button>
                 <button 
                   onClick={() => setPipelineFilter('destroyed')}
                   className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-all ${pipelineFilter === 'destroyed' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-slate-300'}`}
                 >
                   Hit
                 </button>
              </div>
           </div>
           
           <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {filteredPipelines.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-4 italic">No pipelines match filter</p>
              )}
              {filteredPipelines.map(pipeline => (
                <div key={pipeline.id} className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-800 hover:border-slate-700 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-8 rounded-full ${pipeline.type === 'oil' ? 'bg-amber-500' : 'bg-sky-500'}`}></div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{pipeline.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">{pipeline.type}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        pipeline.status === 'operational' ? 'bg-emerald-500' : 
                        pipeline.status === 'destroyed' ? 'bg-red-500' : 'bg-orange-500'
                      }`}></span>
                      <span className={`text-[10px] font-bold uppercase ${
                         pipeline.status === 'operational' ? 'text-emerald-500' : 
                         pipeline.status === 'destroyed' ? 'text-red-500' : 'text-orange-500'
                      }`}>
                        {pipeline.status === 'destroyed' ? 'Destroyed' : pipeline.status}
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </div>
        
        <div className="space-y-2 mb-6 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Map Legend</h4>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]"></div>
                <span>Offline / Destroyed</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-4 h-1 rounded-full bg-sky-500"></span>
                <span>Gas Pipeline</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]"></div>
                <span>Damaged</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-4 h-1 rounded-full bg-amber-500"></span>
                <span>Oil Pipeline</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
            <span>Operational</span>
          </div>
        </div>

        <button 
          onClick={onAnalyze}
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 group active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Latest Intelligence Report
        </button>
        <p className="text-xs text-center mt-3 text-slate-500">Powered by Gemini & Google Search</p>
      </div>
    );
  }

  // Active State (Detail View or Report)
  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-[1000] flex flex-col transition-transform duration-300 animate-slide-in-right">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900/95 backdrop-blur-xl z-10">
        <h2 className="text-lg font-bold text-white">
          {selectedRefinery ? 'Facility Details' : 'Intelligence Report'}
        </h2>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors active:bg-slate-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6 custom-scrollbar">
        {selectedRefinery && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <StatusBadge status={selectedRefinery.status} />
              <h3 className="text-3xl font-bold text-white mt-3 mb-1">{selectedRefinery.name}</h3>
              <div className="text-slate-500 text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {selectedRefinery.lat.toFixed(4)}, {selectedRefinery.lng.toFixed(4)}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Last Incident</h4>
              <p className="text-white font-medium">
                {selectedRefinery.lastIncidentDate || 'No recent major incidents recorded'}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Situation Report</h4>
              <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-lg border border-slate-800">
                {selectedRefinery.description}
              </p>
            </div>

            {/* Visual Evidence Section */}
            {selectedRefinery.incidentVideoUrl && (
                <div key={selectedRefinery.id}>
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Visual Evidence</h4>
                    <div className="rounded-lg overflow-hidden border border-slate-800 bg-black min-h-[250px] flex items-center justify-center mb-2 shadow-lg">
                        <div ref={tweetRef} className="w-full flex justify-center">
                            {/* Twitter Widget will inject here */}
                            <div className="text-slate-500 animate-pulse text-sm">Loading visual data...</div>
                        </div>
                    </div>
                    <a 
                      href={selectedRefinery.incidentVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 hover:text-white text-xs font-bold text-slate-300 uppercase rounded transition-all"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                      View Original on X.com
                    </a>
                </div>
            )}
          </div>
        )}

        {!selectedRefinery && (
          <div className="h-full">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/30 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-indigo-400 font-medium animate-pulse">Scanning live OSINT sources...</p>
              </div>
            ) : aiReport ? (
              <div className="animate-fade-in">
                 <div className="prose prose-invert prose-sm max-w-none mb-8">
                   <p className="whitespace-pre-line text-slate-300 leading-relaxed font-light">
                    {aiReport}
                   </p>
                 </div>
                 
                 {groundingChunks && groundingChunks.length > 0 && (
                   <div className="mt-8 pt-6 border-t border-slate-800">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Sources</h4>
                     <ul className="space-y-2">
                       {groundingChunks.map((chunk, idx) => (
                         chunk.web?.uri && (
                           <li key={idx}>
                             <a 
                               href={chunk.web.uri} 
                               target="_blank" 
                               rel="noreferrer"
                               className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                             >
                               <div className="mt-1 text-indigo-500 group-hover:text-indigo-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                 </svg>
                               </div>
                               <div className="flex-1 min-w-0">
                                 <p className="text-sm font-medium text-indigo-400 truncate group-hover:underline">{chunk.web.title}</p>
                                 <p className="text-xs text-slate-500 truncate">{chunk.web.uri}</p>
                               </div>
                             </a>
                           </li>
                         )
                       ))}
                     </ul>
                   </div>
                 )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
