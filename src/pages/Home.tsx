import { Brain, ChevronRight, BarChart2, Play, Code, Database } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Footer from "../components/Footer";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
}) => (
  <div className="bg-[#011A27]/70 rounded-xl p-6 hover:bg-[#011A27]/90 transition-all cursor-pointer flex flex-col items-center text-center group hover:shadow-lg hover:shadow-teal-500/10 border border-[#063A52]/50 hover:border-teal-500/30">
    <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all`}>
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-300 text-lg">{description}</p>
  </div>
);

// Animated background component with NeoVerse theme
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F2B138] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
    
    {/* Digital grid overlay */}
    <div className="absolute inset-0 bg-[url('/src/assets/grid-pattern.png')] bg-repeat opacity-5"></div>
  </div>
);

// Story highlight component
const StoryHighlight = () => (
  <div className="bg-[#011A27] border border-teal-500/20 rounded-xl p-8 my-12 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-[#F2B138]"></div>
    <h3 className="text-2xl font-bold text-teal-400 mb-4">The NeoVerse Crisis</h3>
    <p className="text-gray-300 leading-relaxed mb-6">
      In 2045, NeoVerse a hyper-immersive virtual reality universe with millions of users suddenly goes offline. 
      As Riley Carter, a brilliant data scientist recruited to investigate the shutdown, you'll use machine learning 
      techniques to analyze fragmented data, identify patterns, and uncover the truth behind the digital catastrophe.
    </p>
    <div className="flex justify-end">
      <div className="text-[#F2B138] text-sm font-mono">// System Status: Critical</div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#011A27] to-[#063A52] relative">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="inline-block bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
            Interactive ML Learning Experience
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to NeoMyst
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join Riley Carter in the year 2045 as you navigate the mysteries of NeoVerse, 
            a hyper-immersive virtual universe that has suddenly gone offline. Learn machine 
            learning concepts as you help Riley analyze data, identify patterns, and solve the digital crisis.
          </p>
          
          <StoryHighlight />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate(user ? "/pages/IntroStory" : "/login")}
              className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-lg text-lg font-medium flex items-center justify-center group"
            >
              {user ? "Continue Your Journey" : "Begin Your Adventure"}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate("/demo")}
              className="bg-[#011A27] hover:bg-[#063A52] text-white py-3 px-8 rounded-lg text-lg font-medium border border-teal-500/30 flex items-center justify-center"
            >
              <Play className="mr-2 w-4 h-4" /> Watch Demo
            </button>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Your Mission in NeoVerse</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            Master these skills to help Riley solve the mystery and bring NeoVerse back online
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Database className="w-8 h-8 text-white" />}
              title="Data Preprocessing"
              description="Clean and prepare corrupted NeoVerse data to uncover hidden patterns and anomalies."
              color="bg-gradient-to-br from-teal-500 to-teal-400"
            />
            <FeatureCard
              icon={<BarChart2 className="w-8 h-8 text-white" />}
              title="Exploratory Analysis"
              description="Visualize complex datasets to identify suspicious activity patterns within the virtual world."
              color="bg-gradient-to-br from-[#F2B138] to-amber-400"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-white" />}
              title="Predictive Modeling"
              description="Build machine learning models to detect anomalies and predict where the system failure originated."
              color="bg-gradient-to-br from-teal-500 to-cyan-400"
            />
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center py-16 bg-[#011A27]/90 rounded-2xl border border-teal-500/20 mt-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F2B138]/10 rounded-full blur-2xl"></div>
          
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Save NeoVerse?</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            The clock is ticking. Millions of users are counting on Riley—and you—to solve 
            this digital mystery. Apply real machine learning techniques in an immersive 
            storyline where your decisions shape the future of this virtual world.
          </p>
          <div className="inline-block text-xs font-mono text-white mb-8 bg-teal-700 px-4 py-2 rounded-md border border-teal-500/30">
            System Alert: Critical data fragments detected. Immediate analysis required.
          </div>
          <div>
            <button
              onClick={() => navigate(user ? "/pages/IntroStory" : "/login")}
              className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-lg text-lg font-medium"
            >
              {user ? "Resume Mission" : "Accept Mission"}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
