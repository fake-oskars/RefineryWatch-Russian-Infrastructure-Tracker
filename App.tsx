
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import Map from './Map';
import Sidebar from './Sidebar';
import { INITIAL_REFINERIES, MAJOR_PIPELINES } from './constants';
import { Refinery, GroundingChunk, Pipeline } from './types';

const API_KEY = process.env.API_KEY || '';

export default function App() {
  const [refineries] = useState<Refinery[]>(INITIAL_REFINERIES);
  const [pipelines] = useState<Pipeline[]>(MAJOR_PIPELINES);
  const [selectedRefineryId, setSelectedRefineryId] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedRefinery = refineries.find(r => r.id === selectedRefineryId) || null;

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setSelectedRefineryId(null); // Close detail view to show report
    setAiReport(null);
    setGroundingChunks(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      // Gemini 2.5 Flash is excellent for fast, grounded queries
      const modelId = 'gemini-2.5-flash';
      
      const prompt = `
        Conduct a comprehensive OSINT status check on major Russian oil refineries affecting the war effort in Ukraine. 
        Focus specifically on: Ryazan, Syzran, Tuapse, Nizhny Novgorod (NORSI), Slavyansk, and Volgograd.
        
        Search for reports from the last 6 months regarding:
        1. Drone attacks (UAV strikes)
        2. Confirmed fires or sabotage
        3. Current operational status (Offline, Damaged, or Operational)
        
        Format the output as a clean, readable briefing. For each refinery, clearly state its status and list the most recent major incident date and details.
        Conclude with a brief summary of the overall impact on Russia's refining capacity.
      `;

      const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setAiReport(response.text);
      
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

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden flex">
      {/* Map Layer */}
      <div className="flex-grow h-full relative">
        <Map 
          refineries={refineries}
          pipelines={pipelines}
          selectedId={selectedRefineryId}
          onSelect={(id) => {
              setSelectedRefineryId(id);
              setAiReport(null); // Clear report when selecting a specific refinery
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
        onAnalyze={handleAnalyze}
        onClose={() => {
          setSelectedRefineryId(null);
          setAiReport(null);
        }}
      />
    </div>
  );
}
