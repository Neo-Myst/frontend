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
            Chapter 6: Finding the Hackers of NeoVerse
          </h1>
          <p className="text-left">Using Logistic Regression</p>
        </header>

        <section>
          <p className="mb-4 text-left">
            Things were finally settling down in NeoVerse after we figured out
            how players were spending their credits. Our linear regression tools
            had done the job. But just when we thought we could relax, a new
            alert came in:
          </p>

          <div className="bg-[#052740] border-l-4 border-teal-400 p-3 my-4">
            <p className="m-0">
              ⚠️ Warning: Suspicious activity detected. Multiple users showing
              signs of hacking.
            </p>
          </div>

          <p className="mb-4 text-left">
            This time, it wasn't about how much someone spent. It was a yes or
            no situation: Is this player a hacker or not?
          </p>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4">
            🧠 Why Logistic Regression?
          </h3>

          <p className="mb-4 text-left">
            We needed a way to classify players into two groups—hackers and
            non-hackers. That's where <strong>logistic regression</strong> came
            in. It helps answer simple questions:
          </p>

          <p className="mb-4 text-left">Is this a hacker?</p>
          <ul className="list-none pl-0 mb-4 text-left">
            <BulletPoint>Yes or No.</BulletPoint>
          </ul>

          <p className="mb-4 text-left">
            Unlike linear regression, which gives us a number, logistic
            regression gives us a probability. That means we could rank players
            based on how suspicious they were.
          </p>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4">
            🛠️ How We Built Our Model
          </h3>

          <p className="mb-4 text-left">We started by improving our data:</p>

          <div className="border border-[#06384f] p-4 my-5 bg-[#052740]">
            <h3 className="text-xl text-[#F2B138] mb-3">
              🧩 Feature Engineering
            </h3>
            <ul className="list-none pl-0 mb-4 text-left">
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  money_per_hour
                </code>
                : Big spenders with short playtime? Could be a red flag.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  quest_efficiency
                </code>
                : Completing too many quests too quickly? Another sign.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  crime_to_play_ratio
                </code>
                : Lots of crime in little time? Suspicious.
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  has_dark_market
                </code>
                : Were they involved in black market trades?
              </BulletPoint>
              <BulletPoint>
                <code className="bg-[#021722] px-1 rounded">
                  suspicion_score
                </code>
                : Combined all of this into a single score.
              </BulletPoint>
            </ul>
          </div>

          <div className="border border-[#06384f] p-4 my-5 bg-[#052740]">
            <h3 className="text-xl text-[#F2B138] mb-3">🔐 Labeling</h3>
            <p className="mb-4 text-left">
              We combined all of this into a single score:{" "}
              <strong>suspicion_score</strong>. Then, we marked the top 0.2% as
              potential hackers and used that as our target.
            </p>
          </div>

          <div className="border border-[#06384f] p-4 my-5 bg-[#052740]">
            <h3 className="text-xl text-[#F2B138] mb-3">
              🧪 Training the Model
            </h3>
            <p className="mb-4 text-left">
              We trained a logistic regression model on this data using 12
              features. Instead of using a fixed threshold, we picked the top 10
              most suspicious players. This helped reduce false alarms.
            </p>
          </div>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section>
          <h3 className="text-xl text-[#F2B138] mb-4">
            📊 How Well Did It Work?
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
            We caught 9 real hackers. Only 1 innocent player was wrongly
            flagged, and they were cleared immediately.
          </p>
        </section>

        <div className="border-t border-[#06384f] my-8"></div>

        <section className="my-8">
          <h3 className="text-xl text-[#F2B138] mb-4 text-left">
            📷 Hacker Truth Table
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

          <p className="mb-4 text-left">All of them had a mix of:</p>
          <ul className="list-none pl-0 mb-4 text-left">
            <BulletPoint>High quest scores</BulletPoint>
            <BulletPoint>Big spending</BulletPoint>
            <BulletPoint>Dark market activity</BulletPoint>
            <BulletPoint>Long hours of play</BulletPoint>
          </ul>
        </section>

        <section className="my-8">
          <h3 className="text-xl text-[#F2B138] mb-4 text-left">
            🧭 Logistic Regression Boundary
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
          <h3 className="text-xl text-[#F2B138] mb-4 text-left">
            🧮 Precision-Recall Curve
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
          <h3 className="text-xl text-[#F2B138] mb-4 text-left">
            📈 ROC Curve
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
          <h3 className="text-xl text-[#F2B138] mb-4">📘 Final Thoughts</h3>

          <p className="mb-4 text-left">
            We didn't just build a model. We built a system to protect NeoVerse.
          </p>

          <p className="mb-4 text-left">We:</p>
          <ul className="list-none pl-0 mb-4 text-left">
            <BulletPoint>
              Made smart features to detect suspicious activity
            </BulletPoint>
            <BulletPoint>
              Used logistic regression to identify hackers
            </BulletPoint>
            <BulletPoint>Visualized our findings clearly</BulletPoint>
            <BulletPoint>Found 9 real infiltrators</BulletPoint>
          </ul>

          <p className="mb-4 text-left">
            Now, NeoVerse is safer. And with this model in place, any future
            threat can be caught before it spreads.
          </p>

          <p className="mb-4 text-left">
            Riley Carter—the analyst who led the charge—finally leans back,
            files closed, case solved. She packs her things, walks outside, and
            looks up at the clear night sky. It's quiet. Peaceful.
          </p>

          <blockquote className="bg-[#052740] border-l-4 border-teal-400 p-3 my-4 italic">
            <p className="m-0">"Time for a break."</p>
          </blockquote>

          <p className="mb-4 text-left">NeoVerse is safe again.</p>
        </section>
      </div>
    </div>
  );
};

export default LogisticRegression;
