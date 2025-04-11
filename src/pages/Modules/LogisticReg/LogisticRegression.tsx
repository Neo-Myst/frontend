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
  // State to store hackers data
  const [hackers, setHackers] = useState<Hacker[]>([]);
  // State to store CSV headers
  const [headers, setHeaders] = useState<string[]>([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <div className="bg-[#011A27] text-gray-200 p-5">
      <div className="max-w-3xl mx-auto">
        <header className="text-center py-5 mb-8 border-b border-[#06384f]">
          <h1 className="text-3xl text-[#F2B138] mb-2">
            The Infiltrators: Hunting Hackers in NeoVerse
          </h1>
          <p className="text-left font-light italic">A logistic regression adventure</p>
        </header>

        <section>
          <p className="mb-4 text-left">
            The NeoVerse control room was quiet, the glow of monitors casting blue light across Riley's face. 
            After successfully modeling player spending with linear regression, the team had earned a moment of peace. 
            The economy was stable, players were happy, and the virtual world hummed along smoothly.
          </p>

          <p className="mb-4 text-left">
            Then, a red alert flashed across the main screen:
          </p>

          <div className="bg-[#052740] border-l-4 border-teal-400 p-3 my-4">
            <p className="m-0">
              ⚠️ <span className="text-red-400 font-bold">SECURITY BREACH DETECTED:</span> Multiple accounts exhibiting impossible gameplay patterns. Suspected hacking activity in sectors 7 through 12.
            </p>
          </div>

          <p className="mb-4 text-left">
            Riley's fingers flew across the keyboard. This wasn't about predicting continuous values anymore. 
            This was binary: either a player was a hacker, or they weren't. A completely different kind of problem 
            that called for a completely different solution.
          </p>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">
              WHY LOGISTIC REGRESSION
            </span>
          </h3>

          <p className="mb-4 text-left">
            "We need a classification model," Riley explained to the team gathered around the holographic display. 
            "Linear regression won't work here because we're not predicting a continuous value. We need to separate 
            players into two distinct categories."
          </p>

          <p className="mb-4 text-left">
            He pulled up a visualization showing two clusters of data points.
          </p>

          <p className="mb-4 text-left">
            "Logistic regression will give us exactly what we need—a probability score between 0 and 1 that tells us 
            how likely each player is to be a hacker. We can then set a threshold to make our final decision."
          </p>

          <p className="mb-4 text-left">
            The security chief nodded. "So instead of predicting how much someone will spend, we're predicting the 
            likelihood they're breaking into our systems?"
          </p>

          <p className="mb-4 text-left">
            "Precisely," Riley confirmed. "And the beauty of logistic regression is that it not only classifies but 
            also ranks players by suspicion level, letting us prioritize our investigation."
          </p>
        </section>

        {/* Continue with the rest of the sections with enhanced storytelling */}
        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">
              BUILDING THE DETECTION SYSTEM
            </span>
          </h3>

          <p className="mb-4 text-left">
            Riley projected a holographic timeline onto the wall. "First, we need to engineer features that will help 
            our model distinguish between normal players and hackers. Raw data won't be enough—we need to transform it 
            into meaningful signals."
          </p>

          <div className="border border-[#06384f] p-4 my-5 bg-[#052740]">
            <h3 className="text-xl text-[#F2B138] mb-3 font-mono tracking-wide">
              FEATURE ENGINEERING
            </h3>
            <ul className="list-none pl-0 mb-4 text-left">
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  money_per_hour
                </code>
                : Riley's eyes narrowed at a data point on his screen. "Look at this player—they've spent 50,000 credits in just 
                three hours of gameplay." He created a ratio dividing total spending by hours played, instantly revealing 
                suspicious economic patterns that would have been invisible in the raw data.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  quest_efficiency
                </code>
                : "This player completed the Dragon's Lair quest in two minutes," Riley noted, pointing to another anomaly. 
                "That's physically impossible without code manipulation." By dividing quest completion scores by time played, 
                the team created a metric that highlighted players moving through content at superhuman speeds.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  crime_to_play_ratio
                </code>
                : The security officer pointed to a cluster of accounts. "These players have criminal activity scores that 
                don't match their playtime." Riley nodded, creating a new feature that normalized criminal activity against 
                hours played, revealing accounts with disproportionate illegal actions.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  has_dark_market
                </code>
                : "The Dark Market leaves traces," Riley explained, creating a binary flag in the system. "Every transaction 
                there has a digital signature we can detect." This simple 0/1 feature immediately highlighted players 
                connected to NeoVerse's underground economy.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  suspicious_activity
                </code>
                : Riley combined multiple signals, flagging players who ranked in both the top 5% for crime ratios and quest 
                exploits. "If they're outliers in both categories, that's no coincidence," he explained as the system 
                automatically tagged these high-risk accounts.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  suspicion_score
                </code>
                : "Our master metric," Riley said, unveiling his final creation. The team watched as the algorithm weighted 
                criminal activity (30%), quest exploits (20%), spending patterns (20%), and dark market presence (30%) into 
                a single comprehensive score that quantified how suspicious each player's behavior truly was.
              </BulletPoint>
            </ul>
          </div>

          <div className="border border-[#06384f] p-4 my-5 bg-[#052740]">
            <h3 className="text-xl text-[#F2B138] mb-3 font-mono tracking-wide relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
              <span className="font-mono tracking-wider">LABELING</span>
            </h3>
            <p className="mb-4 text-left">
              With the suspicion score in hand, Riley identified the top 0.2%
              most suspicious players—those lurking above the 99.8th percentile.
              He marked these players in the system as potential hackers,
              creating a target that the model could learn to recognize.
            </p>
          </div>

          <div className="border border-[#06384f] p-4 my-5 bg-[#052740]">
            <h3 className="text-xl text-[#F2B138] mb-3 font-mono tracking-wide relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
              <span className="font-mono tracking-wider">
                TRAINING THE MODEL
              </span>
            </h3>
            <p className="mb-4 text-left">
              Riley fed 12 carefully selected features into his logistic
              regression model. He knew hackers were rare—a needle in NeoVerse's
              digital haystack—so he balanced the class weights to give these
              outliers proper attention. Rather than setting an arbitrary
              threshold, Riley programmed the system to flag exactly the top 10
              players with the highest predicted probabilities. A precise strike
              force was better than a wide net.
            </p>
          </div>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">
              HOW WELL DID IT WORK
            </span>
          </h3>

          <p className="mb-4 text-left">The model gave us:</p>

          <div className="flex flex-wrap gap-3 my-4">
            <div className="inline-block bg-[#052740] py-1 px-3 rounded">
              Accuracy: <span className="text-teal-400 font-bold">99.91%</span>
            </div>
            <div className="inline-block bg-[#052740] py-1 px-3 rounded">
              Precision: <span className="text-teal-400 font-bold">90%</span>
            </div>
            <div className="inline-block bg-[#052740] py-1 px-3 rounded">
              Recall: <span className="text-teal-400 font-bold">60%</span>
            </div>
            <div className="inline-block bg-[#052740] py-1 px-3 rounded">
              AUC: <span className="text-teal-400 font-bold">0.9996</span>
            </div>
          </div>

          <p className="mb-4 text-left">
            The team caught 9 real hackers. Only 1 innocent player was wrongly
            flagged, and they were cleared after further investigation.
          </p>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section className="my-8">
          <h3 className="text-xl text-[#F2B138] mb-4 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">HACKER TRUTH TABLE</span>
          </h3>
          <div className="bg-[#052740] p-4 rounded-md mb-4">
            <img
              src="/src/assets/logistic_reg/hacker_truth_table.png"
              alt="Truth Table showing the confusion matrix of caught vs. missed hackers"
              className="w-full block"
            />
          </div>

          <p className="mb-4 text-left">
            This image shows how well our model worked:
          </p>
          <ul className="list-none pl-0 mb-4 text-left">
            <BulletPoint>
              <strong>True Positives (TP)</strong>: 9 hackers correctly
              identified
            </BulletPoint>
            <BulletPoint>
              <strong>True Negatives (TN)</strong>: 7484 innocent players
              correctly ignored
            </BulletPoint>
            <BulletPoint>
              <strong>False Positives (FP)</strong>: 1 innocent player flagged
            </BulletPoint>
            <BulletPoint>
              <strong>False Negatives (FN)</strong>: 6 hackers missed
            </BulletPoint>
          </ul>
        </section>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4">
            🕵️ Who Were the Hackers?
          </h3>

          <div className="bg-[#021722] p-3 font-mono my-4 border border-[#06384f]">
            <p className="text-teal-400 whitespace-pre-wrap break-words">
              Accessing SynchroCore Database... Decrypting Infiltrator
              Records... Authorization: GRANTED File:
              true_positive_hackers_logistic_regression.csv Status: CLASSIFIED
            </p>
          </div>

          {isLoading ? (
            <div className="text-center p-4">
              <p className="text-teal-400">Loading hacker data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto max-w-full max-h-72 overflow-y-auto border border-[#06384f] bg-[#021722] mb-5">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header}
                        className="bg-[#052740] font-bold text-teal-400 p-2 text-left border-b border-[#06384f] whitespace-nowrap sticky top-0"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hackers.map((hacker, index) => (
                    <tr key={index} className="hover:bg-[#052740]">
                      {headers.map((header) => (
                        <td
                          key={`${index}-${header}`}
                          className="p-2 text-left border-b border-[#06384f] whitespace-nowrap"
                        >
                          {hacker[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mb-4 text-left">
            Riley's analysis showed all hackers had a mix of:
          </p>
          <ul className="list-none pl-0 mb-4 text-left">
            <BulletPoint>Abnormally high quest efficiency</BulletPoint>
            <BulletPoint>Suspicious spending patterns</BulletPoint>
            <BulletPoint>Dark market connections</BulletPoint>
            <BulletPoint>Irregular login patterns</BulletPoint>
          </ul>
        </section>

        <section className="my-8">
          <h3 className="text-xl text-[#F2B138] mb-4 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">
              LOGISTIC REGRESSION BOUNDARY
            </span>
          </h3>
          <div className="bg-[#052740] p-4 rounded-md mb-4">
            <img
              src="/src/assets/logistic_reg/logistic_regression_boundary.png"
              alt="Decision Boundary showing the classification regions"
              className="w-full block"
            />
          </div>

          <p className="mb-4 text-left">
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
        </section>

        <section className="my-8">
          <h3 className="text-xl text-[#F2B138] mb-4 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">
              PRECISION-RECALL CURVE
            </span>
          </h3>
          <div className="bg-[#052740] p-4 rounded-md mb-4">
            <img
              src="/src/assets/logistic_reg/precision_recall_curve.png"
              alt="Precision-Recall Curve showing model performance"
              className="w-full block"
            />
          </div>

          <p className="mb-4 text-left">
            This curve shows that we can catch hackers while avoiding too many
            false alarms. Even if we adjust how strict we are, the model still
            performs well.
          </p>
        </section>

        <section className="my-8">
          <h3 className="text-xl text-[#F2B138] mb-4 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">ROC CURVE</span>
          </h3>
          <div className="bg-[#052740] p-4 rounded-md mb-4">
            <img
              src="/src/assets/logistic_reg/roc_curve.png"
              alt="ROC Curve showing true positive vs. false positive rate"
              className="w-full block"
            />
          </div>

          <p className="mb-4 text-left">
            This curve tells us that our model is very good at telling hackers
            apart from innocent players.
          </p>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400">
            <span className="font-mono tracking-wider">MISSION ACCOMPLISHED</span>
          </h3>

          <p className="mb-4 text-left">
            The NeoVerse control room erupted in applause as the final hacker was removed from the system. What had begun 
            as a security Crisis had transformed into a triumph of data science and machine learning.
          </p>

          <p className="mb-4 text-left">Riley's team had:</p>
          <ul className="list-none pl-0 mb-4 text-left">
            <BulletPoint>
              Transformed raw gameplay data into powerful predictive features that exposed hidden patterns
            </BulletPoint>
            <BulletPoint>
              Deployed logistic regression to calculate the precise probability of each player being a hacker
            </BulletPoint>
            <BulletPoint>
              Created intuitive visualizations that made complex statistical concepts clear to everyone
            </BulletPoint>
            <BulletPoint>
              Successfully identified and removed 9 sophisticated hackers who had been damaging the game economy
            </BulletPoint>
          </ul>

          <p className="mb-4 text-left">
            "The system is now self-sustaining," Riley explained to the executive team. "It will continuously monitor player 
            behavior and flag suspicious accounts before they can do significant damage. NeoVerse is more secure than it's 
            ever been."
          </p>

          <p className="mb-4 text-left">
            As the meeting ended, Riley walked to the observation deck overlooking the virtual cityscape of NeoVerse. Millions 
            of players were going about their digital lives, unaware of how close their world had come to chaos—or how a 
            mathematical model had saved it.
          </p>

          <blockquote className="bg-[#052740] border-l-4 border-teal-400 p-3 my-4 italic">
            <p className="m-0">"Sometimes the most powerful weapons aren't the flashiest," he thought. "Sometimes they're 
            just elegant equations that separate truth from deception."</p>
          </blockquote>

          <p className="mb-4 text-left">As the virtual sun set over NeoVerse, Riley knew the game was safe once more.</p>
        </section>
      </div>
    </div>
  );
};

export default LogisticRegression;
