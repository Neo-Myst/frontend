// Types for hackers table
export interface Hacker {
  id: string;
  hoursPlayed: number;
  moneySpent: string;
  darkMarket: string;
  hackerProb: string;
  suspScore: string;
  rank: number;
  suspFactors: string;
  // Additional fields that might be in the CSV
  questsCompleted?: number;
  questEfficiency?: string;
  loginPatterns?: string;
  crimeRatio?: string;
  ipChanges?: number;
  accountAge?: string;
  moneyPerHour?: string;
  [key: string]: string | number | boolean | undefined;
}

// Define a type for CSV row data
export interface CSVRow {
  [key: string]: string;
}