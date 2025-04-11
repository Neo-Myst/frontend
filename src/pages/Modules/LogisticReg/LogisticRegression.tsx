import React, { useState, useEffect } from "react";
import Papa from "papaparse";

// Types for hackers table
interface Hacker {
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
  [key: string]: string | number | boolean | undefined; // More specific index signature instead of any
}

// Define a type for CSV row data
interface CSVRow {
  [key: string]: string;
}

// Component for Neoverse Logistic Regression Chapter
const LogisticRegression: React.FC = () => {
  // We're only using the setter functions, not the state values themselves
  const [, setHackers] = useState<Hacker[]>([]);
  const [, setHeaders] = useState<string[]>([]);
  const [, setIsLoading] = useState<boolean>(true);

  // Load CSV data on component mount
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
            // Get headers from the first row
            if (results.data && results.data.length > 0) {
              // Type assertion for the first row to handle unknown type
              const firstRow = results.data[0] as Record<string, unknown>;
              setHeaders(Object.keys(firstRow));
            }

            // Map CSV data to Hacker interface
            const parsedHackers = (results.data as CSVRow[])
              .filter((row) => Object.keys(row).length > 1) // Filter out empty rows
              .map((row, index) => ({
                ...row,
                // Convert numeric fields to numbers
                hoursPlayed: Number(row.hoursPlayed || 0),
                questsCompleted: row.questsCompleted
                  ? Number(row.questsCompleted)
                  : undefined,
                ipChanges: row.ipChanges ? Number(row.ipChanges) : undefined,
                rank: index + 1, // Add rank based on position
              })) as Hacker[]; // Explicitly cast to Hacker[]

            setHackers(parsedHackers);
            setIsLoading(false);
          },
          error: (error: Error) => {
            console.error("Error parsing CSV:", error);
            setIsLoading(false);
            // Fallback to hardcoded data
            setHackers([
              {
                id: "P21810",
                hoursPlayed: 259,
                moneySpent: "24,355",
                darkMarket: "RealityBender",
                hackerProb: "0.998",
                suspScore: "0.948",
                rank: 1,
                suspFactors:
                  "Unusual quest patterns, Dark market, Excessive spending",
                questsCompleted: 156,
                questEfficiency: "0.602",
                loginPatterns: "Irregular",
                crimeRatio: "0.89",
                ipChanges: 12,
                accountAge: "3 months",
                moneyPerHour: "94.03",
              },
              // ... other hardcoded hackers would be here
            ]);

            // Set default headers if CSV loading fails
            setHeaders([
              "id",
              "hoursPlayed",
              "moneySpent",
              "darkMarket",
              "hackerProb",
              "suspScore",
              "rank",
              "suspFactors",
              "questsCompleted",
              "questEfficiency",
              "loginPatterns",
              "crimeRatio",
              "ipChanges",
              "accountAge",
              "moneyPerHour",
            ]);
          },
        });
      } catch (error: unknown) {
        console.error(
          "Error fetching CSV:",
          error instanceof Error ? error.message : String(error)
        );
        setIsLoading(false);
        // Use the existing hardcoded data as fallback
        // ... (same fallback code as in the error handler above)
      }
    };

    fetchCSV();
  }, []);

  // Custom bullet point component
  const BulletPoint: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <li className="mb-2 relative pl-5">
      <span className="absolute left-0 top-0 text-teal-400">•</span>
      {children}
    </li>
  );

  return (
    <div className="bg-[#011A27] text-gray-200 p-5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header remains the same */}
        <header className="text-center py-8 mb-10 border-b border-[#06384f] relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-400 via-[#F2B138] to-teal-400"></div>
          <h1 className="text-4xl text-[#F2B138] mb-3 font-bold tracking-wide">
            The Infiltrators: Hunting Hackers in NeoVerse
          </h1>
          <p className="text-left font-light italic text-teal-300 opacity-80">
            A logistic regression adventure
          </p>
        </header>

        {/* Improved intro section with better spacing */}
        <section className="mb-12 bg-gradient-to-b from-[#052740] to-[#011A27] p-6 rounded-lg shadow-lg border border-[#06384f]">
          <p className="mb-5 text-left leading-7">
            The NeoVerse control room was quiet, the glow of monitors casting
            blue light across Riley's face. After successfully modeling player
            spending with linear regression, the team had earned a moment of
            peace. The economy was stable, players were happy, and the virtual
            world hummed along smoothly.
          </p>

          <p className="mb-5 text-left leading-7">
            Then, a red alert flashed across the main screen:
          </p>

          {/* Alert box remains the same */}
          <div className="bg-[#1a0505] border-l-4 border-red-500 p-4 my-6 shadow-lg animate-pulse">
            <p className="m-0 flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              <span className="text-red-400 font-bold mr-2">
                SECURITY BREACH DETECTED:
              </span>
              <span>
                Multiple accounts exhibiting impossible gameplay patterns.
                Suspected hacking activity in sectors 7 through 12.
              </span>
            </p>
          </div>

          <p className="mb-4 text-left leading-7">
            Riley's fingers flew across the keyboard. This wasn't about
            predicting continuous values anymore. This was binary: either a
            player was a hacker, or they weren't. A completely different kind of
            problem that called for a completely different solution.
          </p>
        </section>

        {/* Section divider remains the same */}
        <div className="border-t border-[#06384f] my-12 relative">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-[#011A27] px-4">
            <span className="text-teal-400 text-2xl">✧</span>
          </div>
        </div>

        {/* Improved WHY LOGISTIC REGRESSION section with dialogue formatting */}
        <section className="mb-12">
          <h3 className="text-xl text-[#F2B138] mb-6 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              WHY LOGISTIC REGRESSION
            </span>
          </h3>

          {/* Content with improved dialogue formatting */}
          <div className="bg-[#021722] bg-opacity-60 p-6 rounded-lg shadow-lg border border-[#06384f]">
            <div className="mb-5 text-left leading-7 border-l-2 border-teal-400 pl-4">
              <span className="text-teal-300 font-semibold">Riley:</span> We
              need a classification model. Linear regression won't work here
              because we're not predicting a continuous value. We need to
              separate players into two distinct categories.
            </div>

            <p className="mb-5 text-left leading-7">
              He pulled up a visualization showing two clusters of data points,
              then continued his explanation.
            </p>

            <div className="mb-5 text-left leading-7 border-l-2 border-teal-400 pl-4">
              <span className="text-teal-300 font-semibold">Riley:</span>{" "}
              Logistic regression will give us exactly what we need—a
              probability score between 0 and 1 that tells us how likely each
              player is to be a hacker. We can then set a threshold to make our
              final decision.
            </div>

            <div className="mb-5 text-left leading-7 border-l-2 border-[#F2B138] pl-4">
              <span className="text-[#F2B138] font-semibold">
                Security Chief:
              </span>{" "}
              So instead of predicting how much someone will spend, we're
              predicting the likelihood they're breaking into our systems?
            </div>

            <div className="mb-4 text-left leading-7 border-l-2 border-teal-400 pl-4">
              <span className="text-teal-300 font-semibold">Riley:</span>{" "}
              Precisely. And the beauty of logistic regression is that it not
              only classifies but also ranks players by suspicion level, letting
              us prioritize our investigation.
            </div>
          </div>
        </section>

        {/* Section divider remains the same */}
        <div className="border-t border-[#06384f] my-12 relative">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-[#011A27] px-4">
            <span className="text-teal-400 text-2xl">✧</span>
          </div>
        </div>

        {/* BUILDING THE DETECTION SYSTEM section with improved formatting */}
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

          <div className="border border-[#06384f] p-6 my-5 bg-gradient-to-b from-[#052740] to-[#031520] rounded-lg shadow-lg">
            <h3 className="text-xl text-[#F2B138] mb-6 font-mono tracking-wide flex items-center">
              <span className="text-teal-400 mr-2">⚙️</span>
              FEATURE ENGINEERING
            </h3>
            
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">money_per_hour</code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">Economic Pattern</div>
                </div>
                <p className="leading-7 text-gray-300">
                  Riley's eyes narrowed at a data point on his screen.{" "}
                  <span className="italic text-teal-300">
                    "Look at this player—they've spent 50,000 credits in just three hours of gameplay."
                  </span>{" "}
                  He created a ratio dividing total spending by hours played, instantly revealing suspicious economic patterns that would have been invisible in the raw data.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">quest_efficiency</code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">Gameplay Anomaly</div>
                </div>
                <p className="leading-7 text-gray-300">
                  <span className="italic text-[#F2B138]">
                    "This player completed the Dragon's Lair quest in two minutes,"
                  </span>{" "}
                  Riley noted, pointing to another anomaly.{" "}
                  <span className="italic text-[#F2B138]">
                    "That's physically impossible without code manipulation."
                  </span>{" "}
                  By dividing quest completion scores by time played, the team created a metric that highlighted players moving through content at superhuman speeds.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">crime_to_play_ratio</code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">Behavioral Signal</div>
                </div>
                <p className="leading-7 text-gray-300">
                  The security officer pointed to a cluster of accounts.{" "}
                  <span className="italic text-teal-300">
                    "These players have criminal activity scores that don't match their playtime."
                  </span>{" "}
                  Riley nodded, creating a new feature that normalized criminal activity against hours played, revealing accounts with disproportionate illegal actions.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">has_dark_market</code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">Binary Flag</div>
                </div>
                <p className="leading-7 text-gray-300">
                  <span className="italic text-[#F2B138]">
                    "The Dark Market leaves traces,"
                  </span>{" "}
                  Riley explained, creating a binary flag in the system.{" "}
                  <span className="italic text-[#F2B138]">
                    "Every transaction there has a digital signature we can detect."
                  </span>{" "}
                  This simple 0/1 feature immediately highlighted players connected to NeoVerse's underground economy.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">suspicious_activity</code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">Composite Metric</div>
                </div>
                <p className="leading-7 text-gray-300">
                  Riley combined multiple signals, flagging players who ranked in both the top 5% for crime ratios and quest exploits.{" "}
                  <span className="italic text-teal-300">
                    "If they're outliers in both categories, that's no coincidence,"
                  </span>{" "}
                  he explained as the system automatically tagged these high-risk accounts.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">suspicion_score</code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">Master Metric</div>
                </div>
                <p className="leading-7 text-gray-300">
                  <span className="italic text-[#F2B138]">"Our master metric,"</span> Riley said, unveiling his final creation. 
                  The team watched as the algorithm weighted criminal activity (30%), quest exploits (20%), 
                  spending patterns (20%), and dark market presence (30%) into a single comprehensive score 
                  that quantified how suspicious each player's behavior truly was.
                </p>
              </div>
            </div>
          </div>

          {/* Removing the first LABELING section and keeping only the improved one */}
          
          {/* Improved Labeling section with fixed suspicion threshold visualization */}
          <div className="border border-[#06384f] p-6 my-5 bg-gradient-to-b from-[#052740] to-[#031520] rounded-lg shadow-lg">
            <h3 className="text-xl text-[#F2B138] mb-6 font-mono tracking-wide flex items-center">
              <span className="text-teal-400 mr-2">🏷️</span>
              LABELING
            </h3>
            
            <div className="bg-[#021722] bg-opacity-80 p-5 rounded-lg border border-[#06384f] relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#F2B138]/10 to-transparent rounded-tr-full"></div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Left side - visualization with fixed threshold */}
                <div className="w-full md:w-1/3 bg-[#011A27] p-4 rounded-lg border border-[#06384f] shadow-inner">
                  <div className="text-center mb-3 text-sm text-gray-400">SUSPICION THRESHOLD</div>
                  <div className="h-40 relative bg-gradient-to-t from-[#021722] to-[#052740] rounded-md overflow-hidden">
                    {/* Normal players area (99.8%) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-[#021722] to-[#031520]"></div>
                    
                    {/* Threshold line */}
                    <div className="absolute bottom-[80%] left-0 right-0 flex items-center">
                      <div className="h-px w-full bg-red-500"></div>
                      <div className="absolute right-0 bg-red-500 text-xs text-white px-1 py-0.5 rounded-sm transform translate-x-1/2">99.8%</div>
                    </div>
                    
                    {/* Suspicious area (0.2%) */}
                    <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-red-500/10 to-transparent"></div>
                    
                    {/* Dots representing suspicious players */}
                    <div className="absolute bottom-[85%] left-[20%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[90%] left-[70%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[87%] left-[40%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-3 text-xs text-center text-gray-400">Top 0.2% flagged as potential hackers</div>
                </div>
                
                {/* Right side - explanation */}
                <div className="w-full md:w-2/3">
                  <p className="mb-4 text-left leading-7">
                    With the suspicion score in hand, Riley identified the top 0.2% most suspicious players—those lurking above the 99.8th percentile.
                  </p>
                  
                  <div className="bg-[#031520] p-3 rounded-md border-l-4 border-[#F2B138] mb-4">
                    <p className="italic text-[#F2B138]">
                      "These are our targets," 
                    </p>
                    <p className="text-sm text-gray-400 mt-1">— Riley, pointing to the red dots above the threshold</p>
                  </div>
                  
                  <p className="text-left leading-7">
                    By marking these outliers in the system as potential hackers, Riley created a <span className="text-teal-300 font-semibold">target variable</span> that the model could learn to recognize, separating the digital wheat from the chaff.
                  </p>
                  
                  <div className="mt-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Normal Players (99.8%)</span>
                    <div className="w-3 h-3 rounded-full bg-red-500 mx-4 mr-2"></div>
                    <span className="text-sm">Potential Hackers (0.2%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Improved Training The Model section with new design */}
          <div className="border border-[#06384f] p-6 my-5 bg-gradient-to-b from-[#052740] to-[#031520] rounded-lg shadow-lg">
            <h3 className="text-xl text-[#F2B138] mb-6 font-mono tracking-wide flex items-center">
              <span className="text-teal-400 mr-2">🧠</span>
              TRAINING THE MODEL
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Feature Selection */}
              <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">1</div>
                  <h4 className="text-teal-300 font-semibold">Feature Selection</h4>
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  Riley fed 12 carefully selected features into his logistic regression model, each one chosen to highlight different aspects of suspicious behavior.
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">money_per_hour</span>
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">quest_efficiency</span>
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">has_dark_market</span>
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">+9 more</span>
                </div>
              </div>
              
              {/* Step 2: Class Balancing */}
              <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">2</div>
                  <h4 className="text-teal-300 font-semibold">Class Balancing</h4>
                </div>
                <div className="italic text-[#F2B138] mb-2 text-sm">
                  "Hackers are rare. They're needles in NeoVerse's digital haystack."
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  To account for this imbalance, Riley balanced the class weights, giving these outliers proper attention in the training process.
                </p>
                <div className="mt-3 h-6 w-full bg-[#031520] rounded-full overflow-hidden">
                  <div className="h-full w-[0.2%] bg-red-500"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0.2% Hackers</span>
                  <span>99.8% Normal</span>
                </div>
              </div>
              
              {/* Step 3: Threshold Setting */}
              <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">3</div>
                  <h4 className="text-teal-300 font-semibold">Precision Focus</h4>
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  Rather than setting an arbitrary threshold, Riley programmed the system to flag exactly the top 10 players with the highest predicted probabilities.
                </p>
                <div className="italic text-[#F2B138] my-2 text-sm">
                  "A precise strike force is better than a wide net. We'll focus our investigation on the most suspicious cases first."
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 font-bold">10</div>
                  <div className="h-px w-12 bg-gray-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-500 font-bold">?</div>
                  <div className="h-px w-12 bg-gray-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-500 font-bold">?</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-[#031520] p-4 rounded-lg border border-[#06384f] text-center">
              <p className="text-sm text-gray-300">
                The model was trained on historical data with known hackers, then deployed to scan the entire player base in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Continue with similar formatting improvements for other sections */}

        {/* Enhanced metrics display - remains mostly the same */}
        <section className="mb-12">
          <h3 className="text-xl text-[#F2B138] mb-6 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              HOW WELL DID IT WORK
            </span>
          </h3>

          <div className="bg-[#021722] bg-opacity-60 p-6 rounded-lg shadow-lg border border-[#06384f]">
            <p className="mb-6 text-left leading-7">The model gave us:</p>

            {/* Metrics cards - adding these back */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
                <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                <div className="text-teal-400 font-bold text-2xl">99.91%</div>
              </div>
              <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
                <div className="text-sm text-gray-400 mb-1">Precision</div>
                <div className="text-teal-400 font-bold text-2xl">90%</div>
              </div>
              <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
                <div className="text-sm text-gray-400 mb-1">Recall</div>
                <div className="text-teal-400 font-bold text-2xl">60%</div>
              </div>
              <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
                <div className="text-sm text-gray-400 mb-1">AUC</div>
                <div className="text-teal-400 font-bold text-2xl">0.9996</div>
              </div>
            </div>

            <p className="mb-4 text-left leading-7">
              The team caught 9 real hackers. Only 1 innocent player was wrongly
              flagged, and they were cleared after further investigation.
            </p>
          </div>
        </section>

        {/* Enhanced image displays */}
        <section className="my-12">
          <h3 className="text-xl text-[#F2B138] mb-6 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              LOGISTIC REGRESSION BOUNDARY
            </span>
          </h3>
          <div className="bg-[#021722] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <img
              src="/src/assets/logistic_reg/logistic_regression_boundary.png"
              alt="Decision Boundary showing the classification regions"
              className="w-full block rounded-md transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="mb-4 text-left leading-7">
              This image shows how the model sees the world:
            </p>

            <ul className="list-none pl-0 mb-4 text-left">
              <BulletPoint>
                Background color shows what the model thinks
              </BulletPoint>
              <BulletPoint>Dots are players</BulletPoint>
              <BulletPoint>
                Green outlines? Players we caught as hackers
              </BulletPoint>
            </ul>
          </div>
        </section>

        {/* Improved formatting for the curves sections */}
        <section className="my-12">
          <h3 className="text-xl text-[#F2B138] mb-6 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              PRECISION-RECALL CURVE
            </span>
          </h3>
          <div className="bg-[#021722] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <img
              src="/src/assets/logistic_reg/precision_recall_curve.png"
              alt="Precision-Recall Curve showing model performance"
              className="w-full block rounded-md transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="mb-4 text-left leading-7">
              Riley explained that this curve shows they can catch hackers while
              avoiding too many false alarms. Even if they adjust how strict
              they are, the model still performs well. The precision stays high
              even as they increase recall, meaning they're consistently finding
              real hackers.
            </p>
          </div>
        </section>

        {/* Adding back the ROC CURVE section */}
        <section className="my-12">
          <h3 className="text-xl text-[#F2B138] mb-6 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">ROC CURVE</span>
          </h3>
          <div className="bg-[#021722] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <img
              src="/src/assets/logistic_reg/roc_curve.png"
              alt="ROC Curve showing true positive vs. false positive rate"
              className="w-full block rounded-md transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="mb-4 text-left leading-7">
              Riley pointed out that this curve tells us that their model is
              very good at telling hackers apart from innocent players. The area
              under the curve is nearly perfect at 0.9996. In practical terms,
              that means if they randomly select a hacker and a non-hacker,
              their model will correctly identify which is which 99.96% of the
              time.
            </p>
          </div>
        </section>

        {/* Section divider before final section */}
        <div className="border-t border-[#06384f] my-12 relative">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-[#011A27] px-4">
            <span className="text-teal-400 text-2xl">✧</span>
          </div>
        </div>

        {/* Final section with improved formatting */}
        <section className="my-12">
          <h3 className="text-xl text-[#F2B138] mb-6 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              MISSION ACCOMPLISHED
            </span>
          </h3>

          <div className="bg-[#021722] bg-opacity-60 p-6 rounded-lg shadow-lg border border-[#06384f]">
            <p className="mb-5 text-left leading-7">
              The NeoVerse control room erupted in applause as the final hacker
              was removed from the system. What had begun as a security Crisis
              had transformed into a triumph of data science and machine
              learning.
            </p>

            <p className="mb-4 text-left leading-7">Riley's team had:</p>
            <ul className="list-none pl-0 mb-6 text-left space-y-3">
              <BulletPoint>
                Transformed raw gameplay data into powerful predictive features
                that exposed hidden patterns
              </BulletPoint>
              <BulletPoint>
                Deployed logistic regression to calculate the precise
                probability of each player being a hacker
              </BulletPoint>
              <BulletPoint>
                Created intuitive visualizations that made complex statistical
                concepts clear to everyone
              </BulletPoint>
              <BulletPoint>
                Successfully identified and removed 9 sophisticated hackers who
                had been damaging the game economy
              </BulletPoint>
            </ul>

            <p className="mb-6 text-left leading-7">
              <span className="italic">
                "The system is now self-sustaining,"
              </span>{" "}
              Riley explained to the executive team.{" "}
              <span className="italic">
                "It will continuously monitor player behavior and flag
                suspicious accounts before they can do significant damage.
                NeoVerse is more secure than it's ever been."
              </span>
            </p>

            <p className="mb-6 text-left leading-7">
              As the meeting ended, Riley walked to the observation deck
              overlooking the virtual cityscape of NeoVerse. Millions of players
              were going about their digital lives, unaware of how close their
              world had come to chaos—or how a mathematical model had saved it.
            </p>

            <blockquote className="bg-gradient-to-r from-[#052740] to-[#021722] border-l-4 border-teal-400 p-5 my-6 italic rounded-r-lg shadow-lg">
              <p className="m-0 text-lg">
                Sometimes the most powerful weapons aren't the flashiest.
                Sometimes they're just elegant equations that separate truth
                from deception.
              </p>
            </blockquote>

            <p className="mb-4 text-left leading-7 text-teal-300">
              As the virtual sun set over NeoVerse, Riley knew the game was safe
              once more.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogisticRegression;
