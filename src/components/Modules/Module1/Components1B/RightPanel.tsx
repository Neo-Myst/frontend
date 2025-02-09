import React, { useState, useEffect } from 'react';

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

  // Fetch quiz data for chapter 1 on mount
  useEffect(() => {
    fetch("http://localhost:8000/quiz/1")
      .then((res) => res.json())
      .then((data: Quiz[]) => {
         if (data && data.length > 0) {
            // Set the first quiz from the returned list
            setQuiz(data[0]);
         }
      })
      .catch((err) => console.error("Error fetching quiz data:", err));
  }, []);

  const handleCheckAnswer = () => {
    if (!quiz || !selectedAnswer) return;
    // For validation, pass the quiz id and the answer (using uppercase letters for consistency)
    fetch(`http://localhost:8000/quiz/validate/${quiz.id}?user_answer=${selectedAnswer}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
         if (data.result === "correct") {
            setFeedback("Correct!");
         } else {
            setFeedback(`Incorrect: ${data.hint}`);
         }
      })
      .catch((err) => console.error("Error validating answer:", err));
  };

  return (
    <div className="w-full md:w-1/2 p-10 bg-[#0d0f16] text-white min-h-screen flex flex-col justify-between">
      {/* Quiz Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Quiz!</h2>
        {quiz ? (
          <>
            <p className="text-lg md:text-xl mb-6 text-gray-300">{quiz.question}</p>
            <div className="space-y-4">
              {[
                { text: quiz.option_a, value: "A" },
                { text: quiz.option_b, value: "B" },
                { text: quiz.option_c, value: "C" },
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option.value)}
                  className={`block w-full text-left p-4 rounded-lg border border-gray-500 text-lg md:text-xl 
                    ${selectedAnswer === option.value ? "bg-green-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300 transition"}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <button 
              onClick={handleCheckAnswer}
              className="block w-full mt-6 py-4 bg-blue-600 text-lg font-bold text-white rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Check your knowledge
            </button>
            {feedback && <p className="mt-4 text-xl">{feedback}</p>}
          </>
        ) : (
          <p>Loading quiz...</p>
        )}
      </div>

      {/* Footer */}
      <p className="text-gray-400 text-sm border-t border-gray-500 pt-4 mt-6">
        Data Preprocessing - Riley’s Digital Toolkit | <span className="text-white font-bold">Introduction</span>
      </p>
    </div>
  );
};

export default RightPanel;
