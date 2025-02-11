import React, { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";

interface Quiz {
  id: number;
  chapter_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_option: string;
  hint_a?: string | null;
  hint_b?: string | null;
  hint_c?: string | null;
}

const RightPanel: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Fetch quiz data for chapter 1 on mount
  useEffect(() => {
    fetch("http://localhost:8000/quiz/1")
      .then((res) => res.json())
      .then((data: Quiz[]) => {
        if (data && data.length > 0) {
          setQuiz(data[2]);
        }
      })
      .catch((err) => console.error("Error fetching quiz data:", err));
  }, []);

  const getHintForAnswer = (answer: string): string | null => {
    if (!quiz) return null;

    switch (answer) {
      case "A":
        return quiz.hint_a || null;
      case "B":
        return quiz.hint_b || null;
      case "C":
        return quiz.hint_c || null;
      default:
        return null;
    }
  };

  const handleCheckAnswer = () => {
    if (!quiz || !selectedAnswer) return;

    fetch(
      `http://localhost:8000/quiz/validate/${quiz.id}?user_answer=${selectedAnswer}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const isAnswerCorrect = data.result === "correct";
        setIsCorrect(isAnswerCorrect);

        const hint = getHintForAnswer(selectedAnswer);
        if (isAnswerCorrect) {
          setFeedback(hint ? `✅ ${hint}` : "Correct!");
        } else {
          setFeedback(hint ? `❌ ${hint}` : "Incorrect!");
        }
      })
      .catch((err) => console.error("Error validating answer:", err));
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="w-full md:w-1/2 p-10 bg-[#0d0f16] text-white min-h-screen flex flex-col justify-between relative">
      {/* Locked Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/50 flex flex-col items-center justify-center z-10">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
            <div className="mb-6 bg-gray-700 p-4 rounded-full inline-block">
              <Lock className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Quiz Locked</h3>
            <p className="text-gray-300 mb-6">
              Click the button below to unlock this quiz and test your
              knowledge!
            </p>
            <button
              onClick={handleUnlock}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 w-full"
            >
              <Unlock className="w-5 h-5" />
              Unlock Quiz
            </button>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <div className={`mt-10 ${!isUnlocked ? "blur-sm" : ""}`}>
        <h2 className="text-3xl font-bold mb-4">Quiz!</h2>
        {quiz ? (
          <>
            <p className="text-lg md:text-xl mb-6 text-gray-300">
              {quiz.question}
            </p>
            <div className="space-y-4">
              {[
                { text: quiz.option_a, value: "A" },
                { text: quiz.option_b, value: "B" },
                { text: quiz.option_c, value: "C" },
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => isUnlocked && setSelectedAnswer(option.value)}
                  disabled={!isUnlocked}
                  className={`block w-full text-left p-4 rounded-lg border border-gray-500 text-lg md:text-xl 
                    ${
                      selectedAnswer === option.value
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-black hover:bg-gray-300 transition"
                    }
                    ${!isUnlocked ? "cursor-not-allowed opacity-75" : ""}`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`block w-full text-left p-4 rounded-lg border border-gray-500 text-lg md:text-xl mt-4 
                  ${
                    isCorrect
                      ? "bg-green-300 text-green-700"
                      : "bg-red-300 text-red-700"
                  }`}
              >
                {feedback}
              </div>
            )}

            <button
              onClick={handleCheckAnswer}
              disabled={!isUnlocked}
              className={`block w-full mt-6 py-4 bg-blue-600 text-lg font-bold text-white rounded-lg transition duration-300
                ${
                  isUnlocked
                    ? "hover:bg-blue-500"
                    : "opacity-75 cursor-not-allowed"
                }`}
            >
              Check your knowledge
            </button>
          </>
        ) : (
          <p>Loading quiz...</p>
        )}
      </div>

      {/* Footer */}
      <p className="text-gray-400 text-sm border-t border-gray-500 pt-4 mt-6">
        Data Preprocessing - Riley's Digital Toolkit |{" "}
        <span className="text-white font-bold">Introduction</span>
      </p>
    </div>
  );
};

export default RightPanel;
