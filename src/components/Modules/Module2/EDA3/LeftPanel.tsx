import React from "react";
import { useNavigate } from "react-router-dom";
import PageNavigation from "../../../navigation/PageNavigation";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col h-screen overflow-y-auto font-oxanium">
      <div className="flex-grow space-y-8">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">NeoMyst</span>
        </button>

        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>| Feature Selection: Uncovering the Key Clues</span>
          <span className="text-blue-400 underline italic">Archive 2.3</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          Riley leaned back in their chair, staring at the sprawling dataset on the screen. Amidst all the numbers and trends, it was clear that not every piece of information was equally important.
          <span className="text-yellow-400"> “There’s too much noise here,” </span>
          Riley mused. <span className="text-yellow-400">“To crack the NeoVerse mystery, I need to focus on the clues that truly matter.”</span>
        </h2>

        <hr className="border-gray-500 w-full" />

        <h3 className="text-lg md:text-xl font-semibold text-yellow-400">The Challenge:</h3>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          Imagine being at a crime scene with hundreds of pieces of evidence. Some are red herrings, while others are the critical hints that will crack the case wide open. Riley's job now was to sift through all the data to find the most telling features—the essential clues that would lead directly to the culprit behind the virtual world’s collapse.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-yellow-400">Enter PCA – The Detective’s Magnifying Glass:</h3>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          Riley first reached for a tool called Principal Component Analysis (PCA). In the world of data, PCA is like a magnifying glass that condenses multiple subtle clues into one clear, composite indicator. It transforms the original, messy clues into a few principal components that capture most of the story. Riley studied a scree plot, watching as the first few components explained most of the variance in the data.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          <span className="text-yellow-400">“These few components tell me the essence of the evidence,”</span> Riley thought. <span className="text-yellow-400">“I can now focus on just these major clues instead of getting lost in every detail.”</span>
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-yellow-400">Enlisting Random Forest – The Trusted Sidekick:</h3>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          But Riley wasn’t satisfied with just one tool. To double-check the findings, they called upon another trusted ally: the Random Forest model. This method was like having a seasoned detective who ranks every piece of evidence by its importance. The Random Forest produced a feature importance plot—a hit list that clearly ranked clues like Hours Played, Transaction Amount, and Player Level based on how much they contributed to the story.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          <span className="text-yellow-400">“Now I know which clues are the real game-changers,”</span> Riley noted, marking the top-ranked features as the ones to focus on.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-yellow-400">The Outcome:</h3>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          By combining the insights from PCA and Random Forest, Riley distilled a mountain of data into a shortlist of high-impact features. This refined selection meant that the subsequent machine learning models would be trained only on the most critical clues—ensuring a more accurate and insightful analysis of the NeoVerse mystery.
        </p>
      </div>

      <PageNavigation 
        goBackRoute="/pages/Eda2" 
        investigateRoute="/pages/EdaOuter" 
        checkInvestigate={true}
      />
    </div>
  );
};

export default LeftPanel;
