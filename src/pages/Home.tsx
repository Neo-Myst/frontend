import { Brain, Target } from "lucide-react";
import React, { useState, useEffect } from "react";

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
  return (
    <div
      className="min-h-screen bg-slate-900 text-white p-1 mt-24"
      style={{ backgroundColor: "#001A27" }}
    >
      <div className="max-w-5xl mx-auto">
        <main className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12 mt-5 space-y-8">
            <h1 className="text-5xl font-bold">
              Learn Machine Learning{" "}
              <span className="text-cyan-500">The Interactive Way</span>
            </h1>
            <p className="text-xl text-slate-00 space-y-8">
              Master ML concepts through hands-on experiments and real-time
              visualizations. No prior experience needed.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                Start Learning
                <span className="text-lg">→</span>
              </button>
              <button className="border border-slate-600 hover:bg-slate-800 px-6 py-3 rounded-lg font-medium transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Video Container Section */}
          <div className="bg-slate-800/10 rounded-2xl border border-slate-700/30 aspect-video w-full mb-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <DotGrid />
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-cyan-400" />}
              title="Interactive Learning"
              description="Experiment with ML models in real-time and see immediate results"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-green-400" />}
              title="Guided Modules"
              description="Step-by-step modules with practical Applications"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
