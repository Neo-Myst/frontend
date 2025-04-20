import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import MissionAccomplished from "./MissionAccomplished";
import { Hacker, CSVRow } from "./types";

// Import components
import FeatureEngineering from "./components/FeatureEngineering";
import Labeling from "./components/Labeling";
import TrainingModel from "./components/TrainingModel";
import MetricsDisplay from "./components/MetricsDisplay";
import DecisionBoundary from "./components/DecisionBoundary";
import PrecisionRecallCurve from "./components/PrecisionRecallCurve";

// Component for Neoverse Logistic Regression Chapter
const LogisticRegression: React.FC = () => {
  // State management
  const [, setHackers] = useState<Hacker[]>([]);
  const [, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Load CSV data on component mount
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/src/assets/logistic_reg/hackers_data.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const parsedData = results.data as CSVRow[];
            const headerRow = results.meta.fields || [];
            
            // Transform CSV data to Hacker objects
            const hackersData = parsedData
              .filter(row => Object.keys(row).length > 1) // Filter out empty rows
              .map((row, index) => ({
                id: `hacker-${index}`,
                hoursPlayed: parseFloat(row['hours_played'] || '0'),
                moneySpent: row['money_spent'] || '0',
                darkMarket: row['dark_market_transactions'] || '0',
                hackerProb: row['hacker_probability'] || '0',
                suspScore: row['suspicion_score'] || '0',
                rank: index + 1,
                suspFactors: row['suspicious_factors'] || '',
                // Add any other fields from your CSV
              }));
            
            setHackers(hackersData);
            setHeaders(headerRow);
            setIsLoading(false);
          },
          error: (error: Error) => {
            console.error("Error parsing CSV:", error);
            setIsLoading(false);
          }
        });
      } catch (error: unknown) {
        console.error("Error loading CSV:", error instanceof Error ? error.message : String(error));
        setIsLoading(false);
      }
    };

    fetchCSV();
  }, []);

  // Add loading indicator
  if (isLoading) {
    return (
      <div className="bg-[#011A27] text-white min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-teal-400 text-xl">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#011A27] text-white min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-teal-400">
              Logistic Regression: <span className="text-[#F2B138]">Hacker Detection</span>
            </h1>
            <div className="text-sm bg-[#052740] px-3 py-1 rounded-full text-teal-300 font-mono">
              CHAPTER 2
            </div>
          </div>
          <p className="mt-4 text-gray-300 text-lg">
            Riley needs to build a system that can identify hackers in NeoVerse. 
            With thousands of players and only a handful of hackers, this is a 
            classic classification problem with imbalanced classes.
          </p>
        </header>

        {/* BUILDING THE DETECTION SYSTEM section */}
        <section className="mb-12">
          <h3 className="text-xl text-[#F2B138] mb-6 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              BUILDING THE DETECTION SYSTEM
            </span>
          </h3>

          <p className="mb-5 text-left leading-7">
            Riley projected a holographic timeline onto the wall, explaining
            that they needed to engineer features that would help their model
            distinguish between normal players and hackers. Raw data wouldn't be
            enough—they needed to transform it into meaningful signals.
          </p>

          {/* Feature Engineering Component */}
          <FeatureEngineering />

          {/* Labeling Component */}
          <Labeling />

          {/* Training Model Component */}
          <TrainingModel />
        </section>

        {/* Metrics Display Component */}
        <MetricsDisplay />

        {/* Decision Boundary Component */}
        <DecisionBoundary />

        {/* Precision-Recall Curve Component */}
        <PrecisionRecallCurve />

        {/* Mission Accomplished section */}
        <MissionAccomplished nextPath="/modules/completion" />
      </div>
    </div>
  );
};

export default LogisticRegression;