import React from 'react';

const DecisionBoundary: React.FC = () => {
  return (
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

            {/* Overlay annotations */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full border-2 border-red-500 animate-ping opacity-70"></div>
            <div className="absolute top-3/4 right-1/3 w-6 h-6 rounded-full border-2 border-green-500 animate-ping opacity-70"></div>
          </div>

          {/* Right side - key insights */}
          <div className="w-full md:w-2/5 bg-[#021722] p-4 rounded-lg border border-[#06384f] shadow-inner">
            <h4 className="text-teal-300 font-semibold mb-3 flex items-center">
              <span className="mr-2">🔍</span>Understanding the Boundary
            </h4>
            
            <p className="text-sm mb-4 leading-6">
              The decision boundary created by logistic regression separates normal players (blue region) from potential hackers (red region). This S-shaped curve is the hallmark of logistic regression.
            </p>
            
            <div className="bg-[#031520] p-3 rounded-md border-l-2 border-[#F2B138] mb-4">
              <p className="italic text-[#F2B138] text-sm">
                "The beauty of logistic regression is its simplicity. It draws a clear line between normal and suspicious behavior, even when dealing with multiple features."
              </p>
              <p className="text-xs text-gray-400 mt-1">— Riley</p>
            </div>
            
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  <span className="text-blue-300">Blue region:</span> Players classified as normal, with suspicion scores below our threshold
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  <span className="text-red-300">Red region:</span> Players classified as potential hackers, with suspicion scores above our threshold
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  <span className="text-yellow-300">Boundary line:</span> The decision threshold where the model's predicted probability equals 0.5
                </span>
              </li>
            </ul>
            
            <div className="mt-4 bg-[#031520] p-3 rounded-md">
              <p className="text-sm">
                The model uses the equation: <span className="text-teal-300 font-mono">P(hacker) = 1 / (1 + e^-z)</span> where <span className="text-teal-300 font-mono">z</span> is a linear combination of our features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionBoundary;