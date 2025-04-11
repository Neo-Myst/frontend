import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import MissionAccomplished from "./MissionAccomplished";

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

  return (
    <div className="bg-[#011A27] text-gray-200 p-5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header remains the same */}
        <header className="text-center py-8 mb-10 border-b border-[#06384f] relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-400/10 to-teal-400"></div>
          <h1 className="text-4xl text-[#F2B138] mb-3 font-bold tracking-wide">
            The Infiltrators: Hunting Hackers in NeoVerse
          </h1>
          <p className="text-left font-light italic text-teal-300 opacity-80 text-center">
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
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">
                    money_per_hour
                  </code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">
                    Economic Pattern
                  </div>
                </div>
                <p className="leading-7 text-gray-300">
                  Riley's eyes narrowed at a data point on his screen.{" "}
                  <span className="italic text-teal-300">
                    "Look at this player—they've spent 50,000 credits in just
                    three hours of gameplay."
                  </span>{" "}
                  He created a ratio dividing total spending by hours played,
                  instantly revealing suspicious economic patterns that would
                  have been invisible in the raw data.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">
                    quest_efficiency
                  </code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">
                    Gameplay Anomaly
                  </div>
                </div>
                <p className="leading-7 text-gray-300">
                  <span className="italic text-[#F2B138]">
                    "This player completed the Dragon's Lair quest in two
                    minutes,"
                  </span>{" "}
                  Riley noted, pointing to another anomaly.{" "}
                  <span className="italic text-[#F2B138]">
                    "That's physically impossible without code manipulation."
                  </span>{" "}
                  By dividing quest completion scores by time played, the team
                  created a metric that highlighted players moving through
                  content at superhuman speeds.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">
                    crime_to_play_ratio
                  </code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">
                    Behavioral Signal
                  </div>
                </div>
                <p className="leading-7 text-gray-300">
                  The security officer pointed to a cluster of accounts.{" "}
                  <span className="italic text-teal-300">
                    "These players have criminal activity scores that don't
                    match their playtime."
                  </span>{" "}
                  Riley nodded, creating a new feature that normalized criminal
                  activity against hours played, revealing accounts with
                  disproportionate illegal actions.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">
                    has_dark_market
                  </code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">
                    Binary Flag
                  </div>
                </div>
                <p className="leading-7 text-gray-300">
                  <span className="italic text-[#F2B138]">
                    "The Dark Market leaves traces,"
                  </span>{" "}
                  Riley explained, creating a binary flag in the system.{" "}
                  <span className="italic text-[#F2B138]">
                    "Every transaction there has a digital signature we can
                    detect."
                  </span>{" "}
                  This simple 0/1 feature immediately highlighted players
                  connected to NeoVerse's underground economy.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">
                    suspicious_activity
                  </code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">
                    Composite Metric
                  </div>
                </div>
                <p className="leading-7 text-gray-300">
                  Riley combined multiple signals, flagging players who ranked
                  in both the top 5% for crime ratios and quest exploits.{" "}
                  <span className="italic text-teal-300">
                    "If they're outliers in both categories, that's no
                    coincidence,"
                  </span>{" "}
                  he explained as the system automatically tagged these
                  high-risk accounts.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">
                    suspicion_score
                  </code>
                  <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">
                    Master Metric
                  </div>
                </div>
                <p className="leading-7 text-gray-300">
                  <span className="italic text-[#F2B138]">
                    "Our master metric,"
                  </span>{" "}
                  Riley said, unveiling his final creation. The team watched as
                  the algorithm weighted criminal activity (30%), quest exploits
                  (20%), spending patterns (20%), and dark market presence (30%)
                  into a single comprehensive score that quantified how
                  suspicious each player's behavior truly was.
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
                  <div className="text-center mb-3 text-sm text-gray-400">
                    SUSPICION THRESHOLD
                  </div>
                  <div className="h-40 relative bg-gradient-to-t from-[#021722] to-[#052740] rounded-md overflow-hidden">
                    {/* Normal players area (99.8%) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-[#021722] to-[#031520]"></div>

                    {/* Threshold line */}
                    <div className="absolute bottom-[80%] left-0 right-0 flex items-center">
                      <div className="h-px w-full bg-red-500"></div>
                      <div className="absolute right-2 bg-red-500 text-xs text-white px-1 py-0.5 rounded-sm">
                        99.8%
                      </div>
                    </div>

                    {/* Suspicious area (0.2%) */}
                    <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-red-500/10 to-transparent"></div>

                    {/* Dots representing suspicious players */}
                    <div className="absolute bottom-[85%] left-[20%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[90%] left-[70%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[87%] left-[40%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-3 text-xs text-center text-gray-400">
                    Top 0.2% flagged as potential hackers
                  </div>
                </div>

                {/* Right side - explanation */}
                <div className="w-full md:w-2/3">
                  <p className="mb-4 text-left leading-7">
                    With the suspicion score in hand, Riley identified the top
                    0.2% most suspicious players—those lurking above the 99.8th
                    percentile.
                  </p>

                  <div className="bg-[#031520] p-3 rounded-md border-l-4 border-[#F2B138] mb-4">
                    <p className="italic text-[#F2B138]">
                      "These are our targets,"
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      — Riley, pointing to the red dots above the threshold
                    </p>
                  </div>

                  <p className="text-left leading-7">
                    By marking these outliers in the system as potential
                    hackers, Riley created a{" "}
                    <span className="text-teal-300 font-semibold">
                      target variable
                    </span>{" "}
                    that the model could learn to recognize, separating the
                    digital wheat from the chaff.
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
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
                    1
                  </div>
                  <h4 className="text-teal-300 font-semibold">
                    Feature Selection
                  </h4>
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  Riley fed 12 carefully selected features into his logistic
                  regression model, each one chosen to highlight different
                  aspects of suspicious behavior.
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
                    money_per_hour
                  </span>
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
                    quest_efficiency
                  </span>
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
                    has_dark_market
                  </span>
                  <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
                    +9 more
                  </span>
                </div>
              </div>

              {/* Step 2: Class Balancing */}
              <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
                    2
                  </div>
                  <h4 className="text-teal-300 font-semibold">
                    Class Balancing
                  </h4>
                </div>
                <div className="italic text-[#F2B138] mb-2 text-sm">
                  "Hackers are rare. They're needles in NeoVerse's digital
                  haystack."
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  To account for this imbalance, Riley balanced the class
                  weights, giving these outliers proper attention in the
                  training process.
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
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
                    3
                  </div>
                  <h4 className="text-teal-300 font-semibold">
                    Precision Focus
                  </h4>
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  Rather than setting an arbitrary threshold, Riley programmed
                  the system to flag exactly the top 10 players with the highest
                  predicted probabilities.
                </p>
                <div className="italic text-[#F2B138] my-2 text-sm">
                  "A precise strike force is better than a wide net. We'll focus
                  our investigation on the most suspicious cases first."
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 font-bold">
                    10
                  </div>
                  <div className="h-px w-12 bg-gray-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-500 font-bold">
                    ?
                  </div>
                  <div className="h-px w-12 bg-gray-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-500 font-bold">
                    ?
                  </div>
                </div>
              </div>
            </div>

            {/* Add Step 4: Model Validation */}
            <div className="mt-6 grid grid-cols-1 gap-6">
              <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
                    4
                  </div>
                  <h4 className="text-teal-300 font-semibold">
                    Model Validation
                  </h4>
                </div>
                <p className="text-sm leading-6 text-gray-300">
                  Riley split the data into training (80%) and testing (20%)
                  sets to ensure the model could generalize to new, unseen
                  players.
                </p>
                <div className="mt-3 flex flex-col md:flex-row gap-4 items-center">
                  <div className="bg-[#031520] p-3 rounded-md w-full md:w-1/2">
                    <div className="text-xs text-center text-gray-400 mb-2">
                      TRAINING DATA
                    </div>
                    <div className="h-16 relative bg-gradient-to-r from-teal-400/20 to-teal-400/5 rounded overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-teal-300 font-mono">80%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#031520] p-3 rounded-md w-full md:w-1/2">
                    <div className="text-xs text-center text-gray-400 mb-2">
                      TESTING DATA
                    </div>
                    <div className="h-16 relative bg-gradient-to-r from-[#F2B138]/20 to-[#F2B138]/5 rounded overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#F2B138] font-mono">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="italic text-[#F2B138] mt-3 text-sm">
                  "We need to be sure our model works on players it's never seen
                  before. That's the true test."
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#031520] p-4 rounded-lg border border-[#06384f] text-center">
              <p className="text-sm text-gray-300">
                The model was trained on historical data with known hackers,
                then deployed to scan the entire player base in real-time.
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

          <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Left side - interactive confusion matrix */}
              <div className="w-full md:w-3/5 relative group flex">
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#011A27]/80 via-transparent to-transparent z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div> */}

                {/* Interactive Confusion Matrix */}
                {/* Interactive Confusion Matrix */}
                <div className="w-full h-full flex items-center justify-center bg-[#03121A] rounded-lg border border-[#06384f] p-4 group">
                  <div className="relative w-full max-w-lg aspect-square flex flex-col">
                    {/* Matrix title */}
                    <div className="text-center text-sm text-teal-300 font-mono tracking-wider mb-6">
                      CONFUSION MATRIX
                    </div>

                    <div className="flex flex-1">
                      {/* Left column with labels */}
                      <div className="flex flex-col">
                        <div className="flex-1 flex items-center justify-end pr-4">
                          <span className="text-blue-300 text-sm">Normal</span>
                        </div>
                        <div className="flex-1 flex items-center justify-end pr-4">
                          <span className="text-red-300 text-sm">Hacker</span>
                        </div>
                      </div>

                      {/* Matrix content */}
                      <div className="flex-1 flex flex-col">
                        {/* Top headers */}
                        <div className="flex mb-2">
                          <div className="flex-1 text-center text-blue-300 text-sm">
                            Normal
                          </div>
                          <div className="flex-1 text-center text-red-300 text-sm">
                            Hacker
                          </div>
                        </div>

                        {/* Matrix cells */}
                        <div className="flex-1 flex flex-col gap-2">
                          {/* First row */}
                          <div className="flex-1 flex gap-2">
                            {/* True Negative */}
                            <div className="flex-1 bg-[#052740] border border-blue-700/30 rounded-md flex flex-col items-center justify-center p-3 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                              <div className="text-3xl font-bold text-blue-400">
                                9,981
                              </div>
                              <div className="text-xs text-blue-300 uppercase tracking-wider">
                                TRUE NEGATIVE
                              </div>
                              <div className="text-xs text-gray-400 mt-1 text-center">
                                Normal players correctly identified
                              </div>
                            </div>

                            {/* False Positive */}
                            <div className="flex-1 bg-[#3A2A22] border border-orange-700/30 rounded-md flex flex-col items-center justify-center p-3 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300">
                              <div className="text-3xl font-bold text-orange-400">
                                1
                              </div>
                              <div className="text-xs text-orange-300 uppercase tracking-wider">
                                FALSE POSITIVE
                              </div>
                              <div className="text-xs text-gray-400 mt-1 text-center">
                                Normal player wrongly flagged
                              </div>
                            </div>
                          </div>

                          {/* Second row */}
                          <div className="flex-1 flex gap-2">
                            {/* False Negative */}
                            <div className="flex-1 bg-[#2D1E1E] border border-red-700/30 rounded-md flex flex-col items-center justify-center p-3 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300">
                              <div className="text-3xl font-bold text-red-400">
                                6
                              </div>
                              <div className="text-xs text-red-300 uppercase tracking-wider">
                                FALSE NEGATIVE
                              </div>
                              <div className="text-xs text-gray-400 mt-1 text-center">
                                Hackers we missed
                              </div>
                            </div>

                            {/* True Positive */}
                            <div className="flex-1 bg-[#1A2A1A] border border-green-700/30 rounded-md flex flex-col items-center justify-center p-3 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
                              <div className="text-3xl font-bold text-green-400">
                                9
                              </div>
                              <div className="text-xs text-green-300 uppercase tracking-wider">
                                TRUE POSITIVE
                              </div>
                              <div className="text-xs text-gray-400 mt-1 text-center">
                                Hackers successfully caught
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom label */}
                        <div className="text-center text-xs text-gray-400 mt-2">
                          Predicted Class
                        </div>
                      </div>

                      {/* Right side label - pulled closer */}
                      <div className="flex items-center">
                        <div className="text-xs text-gray-400 transform rotate-90 origin-center whitespace-nowrap">
                          Actual Class
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - key insights */}
              <div className="w-full md:w-2/5 bg-[#021722] p-4 rounded-lg border border-[#06384f] shadow-inner flex flex-col justify-between">
                <div>
                  <h4 className="text-teal-300 font-semibold mb-3 flex items-center">
                    <span className="mr-2">🔍</span>Key Insights
                  </h4>

                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-green-300">
                          True Positives (9):
                        </span>{" "}
                        Hackers correctly identified by our model
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-blue-300">
                          True Negatives (9,981):
                        </span>{" "}
                        Normal players correctly classified
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-orange-300">
                          False Positives (1):
                        </span>{" "}
                        Normal player wrongly flagged as hacker
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        <span className="text-red-300">
                          False Negatives (6):
                        </span>{" "}
                        Hackers that our model missed
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-[#031520] rounded-md border-l-2 border-[#F2B138]">
                  <p className="italic text-[#F2B138] text-sm">
                    "Our priority was to minimize false positives. We'd rather
                    miss a few hackers than wrongly accuse legitimate players.
                    With only one false positive, we achieved that goal."
                  </p>
                  <p className="text-xs text-gray-400 mt-1">— Riley</p>
                </div>
              </div>
            </div>
          </div>

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

          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="text-left leading-7">
              Riley's team successfully caught 9 real hackers while only wrongly
              flagging one innocent player, who was quickly cleared after
              further investigation. The model achieved an impressive 99.91%
              accuracy, with high precision (90%) ensuring minimal false
              accusations. While the recall (60%) indicates some hackers escaped
              detection, the team prioritized avoiding false accusations over
              catching every hacker.
            </p>
          </div>
        </section>

        {/* Enhanced image displays with interactive elements */}
        <section className="my-12">
          <h3 className="text-xl text-[#F2B138] mb-6 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              LOGISTIC REGRESSION BOUNDARY
            </span>
          </h3>

          {/* Enhanced image container with interactive elements */}
          <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Left side - image with overlay elements */}
              <div className="w-full md:w-3/5 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#011A27]/80 via-transparent to-transparent z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                <img
                  src="/src/assets/logistic_reg/logistic_regression_boundary.png"
                  alt="Decision Boundary showing the classification regions"
                  className="w-full block rounded-md shadow-lg transform group-hover:scale-[1.02] transition-all duration-300"
                />

                {/* Overlay annotations that appear on hover */}
                <div className="absolute top-2 right-2 bg-[#031520]/90 text-xs text-teal-300 px-2 py-1 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Hover to explore
                </div>

                {/* Legend overlay */}
                <div className="absolute bottom-3 left-3 bg-[#031520]/90 p-2 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs text-blue-300">
                      Normal Players (Type 0)
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs text-red-300">
                      Hackers (Type 1)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-green-500 mr-2"></div>
                    <span className="text-xs text-green-300">
                      Detected Hackers
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - key insights */}
              <div className="w-full md:w-2/5 bg-[#021722] p-4 rounded-lg border border-[#06384f] shadow-inner">
                <h4 className="text-teal-300 font-semibold mb-3 flex items-center">
                  <span className="mr-2">🔍</span>Key Insights
                </h4>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>
                      The <span className="text-blue-300">blue regions</span>{" "}
                      show where normal players cluster
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>
                      The <span className="text-red-300">red regions</span>{" "}
                      indicate where hackers are likely to be found
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>
                      The <span className="text-green-300">green circles</span>{" "}
                      highlight hackers our model successfully detected
                    </span>
                  </li>
                  {/* <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>Notice how the boundary creates a clear separation between player types</span>
                  </li> */}
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>
                      One green-circled dot in the blue region is a hacker
                      disguising as normal, but our model detected it!
                    </span>
                  </li>
                </ul>

                <div className="mt-4 p-3 bg-[#031520] rounded-md border-l-2 border-[#F2B138]">
                  <p className="italic text-[#F2B138] text-sm">
                    "This visualization is a simplified 2D representation of our
                    multi-feature analysis. Even with this reduction in
                    complexity, the boundary between player types remains
                    strikingly clear."
                  </p>
                  <p className="text-xs text-gray-400 mt-1">— Riley</p>
                </div>
              </div>
            </div>
          </div>

          {/* Riley's quote about the visualization */}
          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="text-left leading-7">
              Riley pointed to the visualization with pride.{" "}
              <span className="italic text-[#F2B138]">
                "See how cleanly the model separates the two groups? Even in
                this simplified 2D view, the boundary is remarkably clear. And
                look here,"
              </span>{" "}
              he said, indicating the green-circled dot in the blue region,{" "}
              <span className="italic text-[#F2B138]">
                "this hacker was trying to blend in with normal players, but our
                model saw through the disguise. That's the power of using
                multiple features - patterns emerge that wouldn't be visible
                otherwise."
              </span>
            </p>
          </div>
        </section>

        {/* Improved formatting for the curves sections */}
        <section className="my-12">
          <h3 className="text-xl text-[#F2B138] mb-6 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
            <span className="font-mono tracking-wider text-2xl">
              PRECISION-RECALL CURVE
            </span>
          </h3>

          {/* Enhanced image container with interactive elements */}
          <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Left side - image with overlay elements */}
              <div className="w-full md:w-3/5 relative group flex">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#011A27]/80 via-transparent to-transparent z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                <img
                  src="/src/assets/logistic_reg/precision_recall_curve.png"
                  alt="Precision-Recall Curve showing model performance"
                  className="w-full h-full object-cover rounded-md shadow-lg transform group-hover:scale-[1.02] transition-all duration-300"
                />

                {/* Overlay annotations that appear on hover */}
                <div className="absolute top-2 right-2 bg-[#031520]/90 text-xs text-teal-300 px-2 py-1 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Hover to explore
                </div>

                {/* Interactive overlay elements that appear on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  {/* High Precision Zone - semi-transparent green area in top-left */}
                  <div className="absolute top-[15%] left-[10%] w-[30%] h-[30%] bg-green-500/20 border border-green-500/50 rounded-md">
                    <div className="absolute -top-6 left-0 bg-[#031520]/90 text-xs text-green-300 px-2 py-1 rounded whitespace-nowrap">
                      High Precision Zone
                    </div>
                  </div>

                  {/* Operating Point - red dot with pulsing effect */}
                  <div className="absolute top-[25%] left-[25%]">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute -top-6 left-0 bg-[#031520]/90 text-xs text-red-300 px-2 py-1 rounded whitespace-nowrap">
                      Operating Point (P=0.7, R=0.6)
                    </div>
                    {/* Dotted lines extending from operating point */}
                    <div className="absolute top-2 left-2 w-[200px] h-px border-t border-dashed border-red-400/70"></div>
                    <div className="absolute top-2 left-2 w-px h-[150px] border-l border-dashed border-red-400/70"></div>
                  </div>
                </div>

                {/* Legend overlay */}
                <div className="absolute bottom-3 left-3 bg-[#031520]/90 p-2 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs text-blue-300">
                      Precision-Recall Curve
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-green-300">
                      High Precision Zone
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs text-red-300">
                      Operating Point
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - key insights */}
              <div className="w-full md:w-2/5 bg-[#021722] p-4 rounded-lg border border-[#06384f] shadow-inner flex flex-col justify-between">
                <div>
                  <h4 className="text-teal-300 font-semibold mb-3 flex items-center">
                    <span className="mr-2">🔍</span>Key Insights
                  </h4>

                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        The curve shows the trade-off between precision
                        (accuracy of positive predictions) and recall (ability
                        to find all positives)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        Our model maintains high precision even as recall
                        increases, showing strong performance
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        The{" "}
                        <span className="text-green-300">
                          high precision zone
                        </span>{" "}
                        allows us to catch hackers with minimal false alarms
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        The{" "}
                        <span className="text-red-300">operating point</span> we
                        selected balances catching hackers while minimizing
                        false accusations
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-[#031520] rounded-md border-l-2 border-[#F2B138]">
                  <p className="italic text-[#F2B138] text-sm">
                    "This curve is critical for our security team. It shows we
                    can reliably identify hackers without disrupting the
                    experience for legitimate players."
                  </p>
                  <p className="text-xs text-gray-400 mt-1">— Riley</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="text-left leading-7">
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

          {/* Enhanced image container with interactive elements */}
          <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Left side - image with overlay elements */}
              <div className="w-full md:w-3/5 relative group flex">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#011A27]/80 via-transparent to-transparent z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                <img
                  src="/src/assets/logistic_reg/roc_curve.png"
                  alt="ROC Curve showing model performance"
                  className="w-full h-full object-cover rounded-md shadow-lg transform group-hover:scale-[1.02] transition-all duration-300"
                />

                {/* Overlay annotations that appear on hover */}
                <div className="absolute top-2 right-2 bg-[#031520]/90 text-xs text-teal-300 px-2 py-1 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Hover to explore
                </div>

                {/* Interactive overlay elements that appear on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  {/* Random Classifier Line - diagonal line from bottom-left to top-right */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full border-b border-dashed border-red-500/70 transform rotate-45 origin-bottom-left"></div>
                    </div>
                    <div className="absolute top-[40%] left-[40%] bg-[#031520]/90 text-xs text-red-300 px-2 py-1 rounded whitespace-nowrap">
                      Random Classifier Line
                    </div>
                  </div>
                </div>

                {/* Legend overlay */}
                <div className="absolute bottom-3 left-3 bg-[#031520]/90 p-2 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs text-blue-300">ROC Curve</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs text-red-300">
                      Random Classifier Line
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-green-300">AUC = 0.9996</span>
                  </div>
                </div>
              </div>

              {/* Right side - key insights */}
              <div className="w-full md:w-2/5 bg-[#021722] p-4 rounded-lg border border-[#06384f] shadow-inner flex flex-col justify-between">
                <div>
                  <h4 className="text-teal-300 font-semibold mb-3 flex items-center">
                    <span className="mr-2">🔍</span>Key Insights
                  </h4>

                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        The ROC curve plots true positive rate against false
                        positive rate at various thresholds
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        Our curve hugs the top-left corner, showing near-perfect
                        classification
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        The{" "}
                        <span className="text-green-300">AUC of 0.9996</span>{" "}
                        means our model is 99.96% effective at ranking hackers
                        higher than normal players
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>
                        The <span className="text-red-300">diagonal line</span>{" "}
                        represents a random classifier (50% accuracy)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-[#031520] rounded-md border-l-2 border-[#F2B138]">
                  <p className="italic text-[#F2B138] text-sm">
                    "This curve confirms our model's exceptional discriminative
                    power. It can separate hackers from normal players with
                    remarkable accuracy."
                  </p>
                  <p className="text-xs text-gray-400 mt-1">— Riley</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#052740] bg-opacity-60 p-4 rounded-lg shadow-inner">
            <p className="text-left leading-7">
              Riley explained that the ROC curve shows how well the model can
              distinguish between hackers and normal players. The curve's
              proximity to the top-left corner and the high AUC value of 0.9996
              demonstrate that the model has exceptional discriminative power,
              even at different threshold settings.
            </p>
          </div>
        </section>

        {/* Section divider before final section */}
        <div className="border-t border-[#06384f] my-12 relative">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-[#011A27] px-4">
            <span className="text-teal-400 text-2xl">✧</span>
          </div>
        </div>

        <MissionAccomplished nextPath="/completion" />
      </div>
    </div>
  );
};

export default LogisticRegression;
