import { Brain, Target } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Footer from "../components/Footer";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/40 transition-all cursor-pointer flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-slate-400 text-lg">{description}</p>
  </div>
);

const DotGrid = () => {
  const [colorShift, setColorShift] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorShift((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 w-fit mx-auto">
      {[...Array(9)].map((_, i) => {
        const row = Math.floor(i / 3);
        const opacity = 1 - row * 0.2;
        const colorIndex = ((i % 3) + colorShift) % 3;

        return (
          <div
            key={i}
            role="gridcell"
            className={`w-5 h-5 rounded-full animate-bounce transition-colors duration-500 ${
              colorIndex === 0
                ? "bg-cyan-400"
                : colorIndex === 1
                ? "bg-green-400"
                : "bg-red-400"
            }`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to NeoMyst</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Your interactive learning platform for mastering machine learning concepts
            through engaging, hands-on experiences.
          </p>
          
          <DotGrid />
          
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-cyan-400" />}
              title="Interactive Learning"
              description="Learn machine learning concepts through interactive exercises and real-world scenarios."
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-green-400" />}
              title="Practical Applications"
              description="Apply your knowledge to solve practical problems in a guided environment."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-red-400" />}
              title="Progress Tracking"
              description="Track your learning progress and see how far you've come."
            />
          </div>
          
          <div className="mt-16">
            <button
              onClick={() => navigate(user ? "/pages/IntroStory" : "/login")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-8 rounded-lg text-lg font-medium"
            >
              {user ? "Start Learning" : "Login to Begin"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
