
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import Map from './Map';
import Sidebar from './Sidebar';
import AdminPanel from './AdminPanel';
import Login from './Login';
import { INITIAL_REFINERIES, MAJOR_PIPELINES } from './constants';
import { Refinery, GroundingChunk, Pipeline, RefineryUpdate } from './types';

const API_KEY = process.env.API_KEY || '';

export default function App() {
  // Initialize refineries with localStorage overrides
  const [refineries, setRefineries] = useState<Refinery[]>(() => {
    const saved = localStorage.getItem('refinery_published_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved refineries:', e);
      }
    }
    return INITIAL_REFINERIES;
  });
  const [pipelines] = useState<Pipeline[]>(MAJOR_PIPELINES);
  const [selectedRefineryId, setSelectedRefineryId] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Admin / Staging State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [proposedUpdates, setProposedUpdates] = useState<RefineryUpdate[]>(() => {
    const saved = localStorage.getItem('refinery_proposed_updates');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist updates whenever they change
  React.useEffect(() => {
    localStorage.setItem('refinery_proposed_updates', JSON.stringify(proposedUpdates));
  }, [proposedUpdates]);

  // Secret keyboard shortcut to open Admin Panel (Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedRefinery = refineries.find(r => r.id === selectedRefineryId) || null;

  const handleAnalyze = async () => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    setIsAdminOpen(true); // Open admin panel to show progress/results
    setAiReport(null);
    setGroundingChunks(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const modelId = 'gemini-2.0-flash';

      const refineryNames = refineries.map(r => `${r.id} (${r.name})`).join(', ');

      const prompt = `
        Conduct a comprehensive OSINT status check on major Russian oil refineries affecting the war effort in Ukraine. 
        Focus specifically on these refineries: ${refineryNames}.
        
        Search for reports from **November 21, 2013 (Euromaidan) to present** regarding:
1. Drone attacks (UAV strikes)
2. Confirmed fires or sabotage
3. Current operational status (Offline, Damaged, or Operational)
4. **Visual Evidence**: For EACH refinery, search X.com (Twitter) specifically for that refinery's NAME + "attack" OR "strike" OR "fire" OR "drone". Find direct X.com post URLs from trusted OSINT sources (e.g., @Tendar, @GeoConfirmed, @Osinttechnical) that show visual evidence (photos/videos) of damage to THAT SPECIFIC refinery. **CRITICAL: Each refinery must have its own unique, relevant evidence URLs that actually show damage to that specific facility. Do not use the same URL for multiple refineries unless the post genuinely covers multiple facilities.**

  Return a JSON object with two fields:
  1. "updates": an array of objects, each containing:
    - "id": the refinery ID from the provided list
    - "status": one of "Operational", "Damaged", "Offline"
    - "lastIncidentDate": string (YYYY-MM-DD) or null if none
    - "description": a brief 1-2 sentence update on its status
    - "incidentVideoUrls": an array of specific X.com URLs (e.g., ["https://x.com/user/status/123", ...]) showing the attack/fire **for THIS SPECIFIC refinery**. Empty array if none found. **Each URL must correspond to the refinery being described.**
  2. "summary": a brief overall summary of the impact on Russia's refining capacity.
      `;

      const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              updates: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    id: { type: 'STRING' },
                    status: { type: 'STRING', enum: ['Operational', 'Damaged', 'Offline'] },
                    lastIncidentDate: { type: 'STRING' },
                    description: { type: 'STRING' },
                    incidentVideoUrls: { type: 'ARRAY', items: { type: 'STRING' } }
                  },
                  required: ['id', 'status', 'description']
                }
              },
              summary: { type: 'STRING' }
            },
            required: ['updates', 'summary']
          }
        },
      });

      const jsonText = response.text;
      if (jsonText) {
        const data = JSON.parse(jsonText);

        if (data.updates) {
          console.log("Received updates:", data.updates);
          setAiReport(data.summary);
          setProposedUpdates(data.updates); // Store in staging instead of live
        }
      }

      // Extract grounding metadata safely
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
      if (chunks) {
        setGroundingChunks(chunks);
      }

    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiReport("Failed to retrieve intelligence report. Please check connection and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePublish = async (updates: RefineryUpdate[]) => {
    const finalData = await new Promise<Refinery[]>((resolve) => {
      setRefineries(prev => {
        const updated = [...prev];
        const newEntries: Refinery[] = [];

        updates.forEach(update => {
          const existingIndex = updated.findIndex(r => r.id === update.id);

          if (existingIndex >= 0) {
            // Update existing refinery
            updated[existingIndex] = {
              ...updated[existingIndex],
              ...update
            };
          } else {
            // Add new refinery
            newEntries.push({
              id: update.id,
              name: update.id,
              lat: 0,
              lng: 0,
              status: update.status,
              description: update.description,
              lastIncidentDate: update.lastIncidentDate,
              capacity: '',
              incidentVideoUrls: update.incidentVideoUrls
            });
          }
        });

        const finalData = [...updated, ...newEntries];

        // Save published data to localStorage permanently
        localStorage.setItem('refinery_published_data', JSON.stringify(finalData));

        resolve(finalData);
        return finalData;
      });
    });

    // Commit to GitHub
    try {
      const response = await fetch('/api/commit-refineries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refineries: finalData })
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Changes committed to GitHub!\n\nCommit: ${result.commit.substring(0, 7)}\nYour edits will be live in 2-3 minutes.`);
      } else {
        console.error('GitHub commit failed:', result);
        alert(`⚠️ Local changes saved, but GitHub commit failed:\n${result.error}\n\nYou can use the Export button to save manually.`);
      }
    } catch (error) {
      console.error('GitHub commit error:', error);
      alert(`⚠️ Local changes saved, but couldn't reach GitHub API.\n\nMake sure the API server is running:\nnpm run server\n\nOr use the Export button to save manually.`);
    }

    setIsAdminOpen(false);
    setProposedUpdates([]);
    localStorage.removeItem('refinery_proposed_updates');
  };

  const handleLogin = (username: string, password: string) => {
    // Simple client-side check - server has the real validation
    if (username === 'admin' && password === 'RefWatch2024!Secure#Admin') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setLoginError(null);
    } else {
      setLoginError('Invalid username or password');
      setTimeout(() => setLoginError(null), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    setIsAdminOpen(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <Map
          refineries={refineries}
          pipelines={pipelines}
          selectedId={selectedRefineryId}
          onSelect={(id) => {
            setSelectedRefineryId(id);
            setShowDetails(true);
          }}
        />
      </div>

      {/* UI Overlay / Sidebar */}
      <Sidebar
        refineries={refineries}
        pipelines={pipelines}
        selectedRefinery={selectedRefinery}
        aiReport={aiReport}
        isAnalyzing={isAnalyzing}
        groundingChunks={groundingChunks}
        showDetails={showDetails}
        onAnalyze={() => setIsAdminOpen(true)} // Open Admin Panel instead of direct analyze
        onSelectRefinery={(id) => {
          setSelectedRefineryId(id);
          setShowDetails(false);
        }}
        onClose={() => {
          setSelectedRefineryId(null);
          setShowDetails(false);
        }}
      />

      {/* Login Modal */}
      {!isAuthenticated && isAdminOpen && (
        <Login onLogin={handleLogin} error={loginError} />
      )}

      {/* Admin Panel Overlay - Only show if authenticated */}
      {isAuthenticated && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onFetch={handleAnalyze}
          onPublish={handlePublish}
          isAnalyzing={isAnalyzing}
          proposedUpdates={proposedUpdates}
          setProposedUpdates={setProposedUpdates}
          refineries={refineries}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
