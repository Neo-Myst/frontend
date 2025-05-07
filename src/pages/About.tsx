import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Code, Users, Zap, Shield } from "lucide-react";
import Footer from "../components/Footer";

const About: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010A17] to-[#011A27] text-gray-200 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        
        {/* Digital particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" className="opacity-10">
            <pattern
              id="circuit-pattern"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 H90 V90 H10 Z"
                fill="none"
                stroke="#4ade80"
                strokeWidth="0.5"
              />
              <circle cx="10" cy="10" r="2" fill="#4ade80" />
              <circle cx="90" cy="90" r="2" fill="#4ade80" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
        
        {/* Animated glowing orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F2B138] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-teal-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            <span>Back</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-none px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-teal-900/30 rounded-full text-teal-400 text-sm font-medium mb-4">
              ABOUT NEOMYST
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Revolutionizing <span className="text-[#F2B138]">ML Education</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              NeoMyst transforms complex machine learning concepts into an engaging narrative experience, making learning both effective and enjoyable.
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Project Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#021722]/70 border border-[#06384f] rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F2B138] mb-4">
                Project Overview
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                NeoMyst is an immersive educational platform designed to teach machine learning concepts through interactive storytelling. Set in a futuristic sci-fi universe, NeoMyst transforms complex data science and machine learning concepts into engaging narrative experiences.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our platform combines theoretical knowledge with practical application, allowing learners to understand ML concepts in context while developing real-world skills that can be applied to their own projects and careers.
              </p>
            </motion.section>

            {/* The NeoMyst Story */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#021722]/70 border border-[#06384f] rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F2B138] mb-4">
                The NeoMyst Story
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In the year 2045, the world is obsessed with NeoVerse, a hyper-immersive virtual reality game where players can live out their wildest dreams. NeoVerse isn't just a game - it's a second reality, a thriving digital universe with its own economy, politics, and culture.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                But one day, disaster strikes. NeoVerse goes offline without warning, leaving millions of players stranded and confused. The developers are baffled, and rumors of a cyberattack begin to spread.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Enter Riley Carter, a brilliant young data scientist and amateur hacker. Riley is recruited by the creators of NeoVerse to investigate the shutdown. The only clues are fragmented server logs, corrupted user data, and cryptic error messages. To solve the mystery, Riley must dive deep into the data, clean it, organize it, and uncover the truth behind the disappearance of NeoVerse.
              </p>
            </motion.section>

            {/* Learning Modules */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#021722]/70 border border-[#06384f] rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F2B138] mb-6">
                Learning Modules
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                NeoMyst offers a comprehensive learning path that covers essential machine learning concepts:
              </p>
              
              <div className="space-y-6">
                <div className="bg-[#052740]/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-teal-400 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center mr-3 text-teal-400">1</span>
                    Data Purification (Preprocessing)
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Learn how to clean and prepare raw data for analysis through Riley's journey of:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
                    <li>Understanding raw data structures</li>
                    <li>Handling missing data</li>
                    <li>Data encoding techniques</li>
                    <li>Outlier detection</li>
                    <li>Feature scaling and normalization</li>
                    <li>Dimensionality reduction</li>
                  </ul>
                </div>
                
                <div className="bg-[#052740]/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-teal-400 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center mr-3 text-teal-400">2</span>
                    Pattern Discovery (Exploratory Data Analysis)
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Visualize and understand data relationships through:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
                    <li>Data visualization techniques</li>
                    <li>Correlation analysis</li>
                    <li>Feature importance</li>
                    <li>Statistical analysis</li>
                    <li>Trend identification</li>
                  </ul>
                </div>
                
                <div className="bg-[#052740]/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-teal-400 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center mr-3 text-teal-400">3</span>
                    Future Forecasting (Regression)
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Predict continuous values using:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
                    <li>Linear regression models</li>
                    <li>Model evaluation metrics</li>
                    <li>Feature selection techniques</li>
                    <li>Regression analysis</li>
                  </ul>
                </div>
                
                <div className="bg-[#052740]/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-teal-400 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center mr-3 text-teal-400">4</span>
                    Truth Identification (Classification)
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Categorize data into discrete classes with:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
                    <li>Logistic regression</li>
                    <li>Classification metrics</li>
                    <li>Decision boundaries</li>
                    <li>Probability estimation</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Interactive Learning Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#021722]/70 border border-[#06384f] rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F2B138] mb-6">
                Interactive Learning Experience
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                NeoMyst combines theoretical knowledge with practical application through:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#052740]/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <Brain className="w-12 h-12 text-[#F2B138] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Narrative-driven learning</h3>
                  <p className="text-gray-300">
                    Follow Riley's journey to solve the NeoVerse mystery
                  </p>
                </div>
                
                <div className="bg-[#052740]/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <Code className="w-12 h-12 text-[#F2B138] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Interactive visualizations</h3>
                  <p className="text-gray-300">
                    Explore data through dynamic charts and graphs
                  </p>
                </div>
                
                <div className="bg-[#052740]/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <Zap className="w-12 h-12 text-[#F2B138] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Hands-on challenges</h3>
                  <p className="text-gray-300">
                    Apply concepts in game-like missions
                  </p>
                </div>
                
                <div className="bg-[#052740]/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <Shield className="w-12 h-12 text-[#F2B138] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Progressive difficulty</h3>
                  <p className="text-gray-300">
                    Build skills gradually through structured modules
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Technology Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#021722]/70 border border-[#06384f] rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F2B138] mb-4">
                Technology Stack
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                NeoMyst is built using modern web technologies:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
                <li>Frontend: React with TypeScript</li>
                <li>Styling: Tailwind CSS</li>
                <li>Data Visualization: Recharts, Plotly, Chart.js, D3.js</li>
                <li>Backend: FastAPI</li>
                <li>Database: PostgreSQL</li>
              </ul>
            </motion.section>

            {/* Project Team */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#021722]/70 border border-[#06384f] rounded-xl p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F2B138] mb-4">
                Project Team
              </h2>
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-teal-400 mr-3" />
                <p className="text-gray-300 leading-relaxed">
                  NeoMyst was developed by:
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
                <li>Dhruv Vaghasiya</li>
                <li>Vedant Mhatre</li>
                <li>Shubam Khantwal</li>
              </ul>
            </motion.section>

            {/* Call to Action */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center py-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Get Started
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                Join our community of ML enthusiasts and begin your journey into the world of machine learning through an engaging narrative experience. Whether you're a beginner looking to understand the basics or an experienced practitioner wanting to reinforce your knowledge, NeoMyst offers a unique approach to learning that makes complex concepts accessible and enjoyable.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-[#F2B138] to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black py-4 px-8 rounded-md text-lg font-medium transition-all duration-300"
              >
                Start your adventure today!
              </button>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;