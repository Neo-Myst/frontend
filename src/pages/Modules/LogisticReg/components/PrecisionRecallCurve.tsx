import React from 'react';

const PrecisionRecallCurve: React.FC = () => {
  return (
    <section className="my-12">
      <h3 className="text-xl text-[#F2B138] mb-6 text-left relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
        <span className="font-mono tracking-wider text-2xl">
          PRECISION-RECALL CURVE
        </span>
      </h3>

      {/* Enhanced image container with interactive elements */}
      <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Left side - image with overlay elements */}
          <div className="w-full md:w-3/5 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#011A27]/80 via-transparent to-transparent z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

            <img
              src="/src/assets/logistic_reg/precision_recall_curve.png"
              alt="Precision-Recall Curve showing model performance"
              className="w-full block rounded-md shadow-lg transform group-hover:scale-[1.02] transition-all duration-300"
            />

            {/* Overlay annotations */}
            <div className="absolute top-1/4 right-1/4 w-6 h-6 rounded-full border-2 border-yellow-500 animate-ping opacity-70"></div>
            <div className="absolute bottom-1/4 left-1/4 w-6 h-6 rounded-full border-2 border-teal-500 animate-ping opacity-70"></div>
          </div>

          {/* Right side - key insights */}
          <div className="w-full md:w-2/5 bg-[#021722] p-4 rounded-lg border border-[#06384f] shadow-inner">
            <h4 className="text-teal-300 font-semibold mb-3 flex items-center">
              <span className="mr-2">⚖️</span>Balancing Precision & Recall
            </h4>
            
            <p className="text-sm mb-4 leading-6">
              The precision-recall curve illustrates the tradeoff between catching all hackers (recall) and avoiding false accusations (precision).
            </p>
            
            <div className="bg-[#031520] p-3 rounded-md border-l-2 border-[#F2B138] mb-4">
              <p className="italic text-[#F2B138] text-sm">
                "We need to be careful about who we accuse. A false accusation damages player trust, but missing a hacker damages game integrity."
              </p>
              <p className="text-xs text-gray-400 mt-1">— Riley</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#031520] p-2 rounded-md">
                <div className="text-center text-teal-300 text-xs mb-1">PRECISION</div>
                <div className="text-center font-bold">90%</div>
                <div className="text-center text-xs text-gray-400 mt-1">Of flagged players are actual hackers</div>
              </div>
              <div className="bg-[#031520] p-2 rounded-md">
                <div className="text-center text-yellow-300 text-xs mb-1">RECALL</div>
                <div className="text-center font-bold">60%</div>
                <div className="text-center text-xs text-gray-400 mt-1">Of all hackers were caught</div>
              </div>
            </div>
            
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  <span className="text-teal-300">High precision point:</span> Where we minimize false accusations but might miss some hackers
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  <span className="text-yellow-300">High recall point:</span> Where we catch most hackers but risk accusing innocent players
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  <span className="text-purple-300">AUC (Area Under Curve):</span> 0.9996 - Indicates excellent model performance
                </span>
              </li>
            </ul>
            
            <div className="mt-4 bg-[#031520] p-3 rounded-md">
              <p className="text-sm">
                Riley chose a threshold that prioritized precision over recall, ensuring that when the system flagged someone, it was highly likely they were actually a hacker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrecisionRecallCurve;