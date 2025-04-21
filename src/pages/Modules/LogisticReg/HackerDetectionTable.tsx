import React, { useState, useEffect } from "react";
import Papa from "papaparse";

// Add this at the top of your file after the imports
// Update the scrollbar styles at the top of your file
const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Custom Sci-Fi Scrollbars */
  .scifi-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .scifi-scrollbar::-webkit-scrollbar-track {
    background: rgba(1, 26, 39, 0.8);
    border-radius: 4px;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
  }
  
  .scifi-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #05f2db, #06384f);
    border-radius: 4px;
    border: 1px solid rgba(5, 242, 219, 0.3);
    box-shadow: 0 0 5px rgba(5, 242, 219, 0.5);
  }
  
  .scifi-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #05f2db, #06384f);
    box-shadow: 0 0 8px rgba(5, 242, 219, 0.8);
  }
  
  .scifi-scrollbar::-webkit-scrollbar-corner {
    background: rgba(1, 26, 39, 0.8);
  }
  
  /* Horizontal scrollbar specific */
  .scifi-scrollbar-x::-webkit-scrollbar {
    height: 6px;
  }
  
  .scifi-scrollbar-x::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #F2B138, #f27b38);
    border: 1px solid rgba(242, 177, 56, 0.3);
    box-shadow: 0 0 5px rgba(242, 177, 56, 0.5);
  }
  
  .scifi-scrollbar-x::-webkit-scrollbar-thumb:hover {
    box-shadow: 0 0 8px rgba(242, 177, 56, 0.8);
  }
  
  /* Animated scanner effect for scrollbars */
  @keyframes scanline {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  }
  
  .scifi-scrollbar-animated::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #05f2db, #06384f, #05f2db);
    background-size: 200% 100%;
    animation: scanline 3s linear infinite;
  }
  
  .scifi-scrollbar-x.scifi-scrollbar-animated::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #F2B138, #f27b38, #F2B138);
    background-size: 200% 100%;
    animation: scanline 3s linear infinite;
  }
`;

interface Hacker {
  "Player ID": string;
  Timestamps: string;
  "Hours Played": number;
  "Money Spent ($)": string;
  "Criminal Score": string;
  "Missions Completed": string;
  "Player Rank": string;
  "Team Affiliation": string;
  "VIP Status": string;
  "Cash on Hand ($)": string;
  "Sync Stability (%)": string;
  "Quest Exploit Score": string;
  "Player Level": string;
  "Dark Market Transactions": string;
  "Transaction Amount ($)": string;
  "Neural Link Stability (%)": string;
  Hacker_Probability: string;
  Actual_Label: string;
  Suspicion_Score: string;
  Hacker_Rank: number;
  Suspicion_Factors: string;
  [key: string]: string | number | undefined;
}

// Define a type for CSV row data
interface CSVRow {
  [key: string]: string;
}

// Define an intermediate type for the mapped data
interface MappedHacker {
  [key: string]: string | number;
  Hacker_Rank: number;
  "Hours Played": number;
}

interface HackerDetectionTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const HackerDetectionTable: React.FC<HackerDetectionTableProps> = ({
  isOpen,
  onClose,
}) => {
  const [hackers, setHackers] = useState<Hacker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/src/assets/logistic_reg/true_positive_hackers_logistic_regression.csv"
        );
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            // Filter to only include the top hackers (those with a rank)
            const parsedHackers = (results.data as CSVRow[])
              .filter(
                (row: CSVRow) => row["Hacker_Rank"] && row["Hacker_Rank"] !== ""
              )
              .map(
                (row: CSVRow): MappedHacker => ({
                  ...row,
                  Hacker_Rank: Number(row["Hacker_Rank"]),
                  "Hours Played": Number(row["Hours Played"]),
                })
              )
              .sort(
                (a: MappedHacker, b: MappedHacker) =>
                  a["Hacker_Rank"] - b["Hacker_Rank"]
              );

            setHackers(parsedHackers as unknown as Hacker[]);
            setIsLoading(false);
          },
          error: (error: Error) => {
            console.error("Error parsing CSV:", error);
            setIsLoading(false);
            // Fallback to empty array
            setHackers([]);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
        setIsLoading(false);
        setHackers([]);
      }
    };

    if (isOpen) {
      fetchCSV();
    }
  }, [isOpen]);

  // Remove the backdrop click handler since we don't want that functionality
  // const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  if (!isOpen) return null;

  return (
    <>
      <style>{scrollbarHideStyles}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="relative w-[95%] max-w-6xl max-h-[90vh] bg-[#021722] border-2 border-teal-400/50 rounded-lg shadow-2xl overflow-hidden">
          {/* Sci-fi header with close button */}
          <div className="bg-gradient-to-r from-[#052740] to-[#031520] p-4 border-b border-teal-400/30 flex items-center justify-between">
            <div className="flex items-center">
              {/* Make the red dot clickable to close the overlay */}
              <div
                className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2 cursor-pointer hover:bg-red-400 transition-colors duration-200"
                onClick={onClose}
                title="Close"
              ></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <h3 className="text-teal-300 font-mono text-xl ml-2">
                NEOVERSE SECURITY // TOP THREAT ANALYSIS
              </h3>
            </div>
            {/* Remove the close button from the right side */}
          </div>

          {/* Content area */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)] scifi-scrollbar scifi-scrollbar-animated">
            {/* Intro text */}
            <div className="mb-6 border-l-4 border-[#F2B138] pl-4 py-2">
              <p className="text-[#F2B138] italic">
                "These players have been identified as the highest-risk threats
                to NeoVerse integrity. Our logistic regression model has flagged
                them with 99.8% confidence based on multiple behavioral
                anomalies. Immediate action is recommended."
              </p>
              <p className="text-sm text-gray-400 mt-1">
                — Riley, Security Lead
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-12 h-12 border-4 border-teal-400/30 border-t-teal-400 rounded-full animate-spin"></div>
                <span className="ml-3 text-teal-300 font-mono">
                  LOADING DATA...
                </span>
              </div>
            ) : (
              <>
                {/* Table explanation */}
                <div className="mb-4 bg-[#031520] p-3 rounded-md border border-[#06384f]">
                  <h4 className="text-teal-300 font-semibold mb-2 flex items-center">
                    <span className="mr-2">🔍</span>Detection Metrics Explained
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-teal-300 font-semibold">
                          Hacker Probability:
                        </span>{" "}
                        Raw probability score from our logistic regression model
                        (0-1)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-teal-300 font-semibold">
                          Suspicion Score:
                        </span>{" "}
                        Weighted composite score incorporating multiple
                        behavioral factors
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-teal-300 font-semibold">
                          Suspicion Factors:
                        </span>{" "}
                        Key anomalies that contributed to the high threat
                        assessment
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Scrollable table */}
                <div className="overflow-x-auto rounded-lg border border-[#06384f] shadow-inner bg-[#011A27] scifi-scrollbar-x scifi-scrollbar-animated">
                  <table className="min-w-full divide-y divide-[#06384f] table-fixed">
                    <thead className="bg-[#052740]">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider sticky left-0 bg-[#052740] z-10 w-28">
                          Player ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-20">
                          Rank
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-28">
                          Hacker Prob.
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-32">
                          Suspicion Score
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-28">
                          Dark Market
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-28">
                          Hours Played
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-32">
                          Money Spent ($)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-96">
                          Suspicion Factors
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-36">
                          Timestamps
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-28">
                          Criminal Score
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-28">
                          Missions Completed
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-28">
                          Player Rank
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-32">
                          Team Affiliation
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-24">
                          VIP Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-32">
                          Cash on Hand ($)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-32">
                          Sync Stability (%)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-32">
                          Quest Exploit Score
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-24">
                          Player Level
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-36">
                          Transaction Amount ($)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-36">
                          Neural Link Stability (%)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-teal-300 uppercase tracking-wider w-24">
                          Actual Label
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#06384f]">
                      {hackers.map((hacker, index) => (
                        <tr
                          key={hacker["Player ID"]}
                          className={`${
                            index % 2 === 0 ? "bg-[#021722]" : "bg-[#011A27]"
                          } hover:bg-[#052740] transition-colors duration-150`}
                        >
                          <td
                            className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white sticky left-0 z-10"
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? "#021722" : "#011A27",
                            }}
                          >
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                              {hacker["Player ID"]}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full text-xs">
                              #{hacker["Hacker_Rank"]}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            <span className="text-red-300 font-mono">
                              {Number(hacker["Hacker_Probability"]).toFixed(4)}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full"
                                style={{
                                  width: `${
                                    Number(hacker["Suspicion_Score"]) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-teal-300 font-mono">
                              {Number(hacker["Suspicion_Score"]).toFixed(4)}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            <span className="text-yellow-300">
                              {hacker["Dark Market Transactions"]}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Hours Played"]}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Money Spent ($)"]}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-300">
                            <div
                              className="flex overflow-x-auto pb-1 scifi-scrollbar-x scifi-scrollbar-animated"
                              style={{ maxWidth: "100%" }}
                            >
                              {hacker["Suspicion_Factors"]
                                .split(", ")
                                .map((factor, i) => (
                                  <span
                                    key={i}
                                    className="inline-block bg-[#052740] px-2 py-0.5 rounded text-xs text-teal-300 whitespace-nowrap mr-1 flex-shrink-0"
                                  >
                                    {factor}
                                  </span>
                                ))}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Timestamps"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Criminal Score"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Missions Completed"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Player Rank"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Team Affiliation"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["VIP Status"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Cash on Hand ($)"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Sync Stability (%)"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Quest Exploit Score"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Player Level"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Transaction Amount ($)"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Neural Link Stability (%)"]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                            {hacker["Actual_Label"] === "1"
                              ? "Hacker"
                              : "Normal"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add horizontal scroll instruction with sci-fi styling */}
                <div className="mt-3 text-xs text-teal-300/70 text-center">
                  <span className="inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    <span className="relative">
                      Scroll horizontally to view all data fields
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-50 animate-[scan_3s_ease-in-out_infinite]" style={{ width: '200%', left: '-50%' }}></span>
                    </span>
                  </span>
                </div>

                {/* Footer note */}
                <div className="mt-6 text-xs text-gray-400 italic text-center">
                  Data classified level 5 - authorized personnel only - NeoVerse
                  Security Protocol 9.8.4
                </div>
              </>
            )}
          </div>

          {/* Sci-fi decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#F2B138]/10 to-transparent rounded-tr-full"></div>

          {/* Scanning animation at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
            <div className="h-full bg-teal-400/50 animate-[scan_3s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HackerDetectionTable;
