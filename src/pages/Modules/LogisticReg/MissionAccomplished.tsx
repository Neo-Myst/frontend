import React, { useState } from "react";
import HackerDetectionTable from "./HackerDetectionTable";
import NextButton from "./NextButton";

interface MissionAccomplishedProps {
  nextPath: string;
}

const MissionAccomplished: React.FC<MissionAccomplishedProps> = ({
  nextPath,
}) => {
  const [isHackerTableOpen, setIsHackerTableOpen] = useState<boolean>(false);

  return (
    <section className="mb-12">
      <h3 className="text-xl text-[#F2B138] mb-6 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
        <span className="font-mono tracking-wider text-2xl">
          MISSION ACCOMPLISHED
        </span>
      </h3>

      <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#F2B138]/10 to-transparent rounded-tr-full"></div>

        <div className="mb-6 text-left leading-7">
          <p className="mb-4">
            The logistic regression model had done its job. Riley's team now had
            a clear list of the most suspicious players in NeoVerse, ranked by
            their probability of being hackers.
          </p>

          <div className="bg-[#031520] p-4 rounded-md border-l-4 border-[#F2B138] my-4">
            <p className="italic text-[#F2B138]">
              "We've identified the infiltrators. Now we can take action before
              they cause more damage to the game economy."
            </p>
            <p className="text-sm text-gray-400 mt-1">— Riley</p>
          </div>

          <p>
            The security team immediately began investigating the flagged
            accounts, finding sophisticated hacking tools and exploits that
            confirmed the model's predictions. Thanks to logistic regression,
            NeoVerse was one step closer to becoming a fair playing field for
            all.
          </p>
        </div>

        {/* View Hackers Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsHackerTableOpen(true)}
            className="group relative px-6 py-3 bg-[#031520] border border-[#06384f] rounded-md font-mono text-teal-300 hover:bg-[#052740] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute h-full w-1 bg-teal-400/60 blur-[2px] -left-10 transform -skew-x-12 opacity-0 group-hover:animate-[scanline_1.5s_ease-in-out_infinite] group-hover:opacity-100"></div>
            </div>
            <div className="relative flex items-center">
              <span className="mr-2">VIEW IDENTIFIED HACKERS</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Next Mission Button */}
        <div className="flex justify-center mt-8">
          <NextButton to={nextPath} />
        </div>

        {/* Scanning animation at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="h-full bg-teal-400/50 animate-[scan_3s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Hacker Detection Table Modal */}
      {isHackerTableOpen && (
        <HackerDetectionTable
          isOpen={isHackerTableOpen}
          onClose={() => setIsHackerTableOpen(false)}
        />
      )}
    </section>
  );
};

export default MissionAccomplished;
