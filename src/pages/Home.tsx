import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Footer from "../components/Footer";
import {
  Brain,
  Code,
  Shield,
  Zap,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  X,
  PartyPopper,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  // const statsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showPricingPopup, setShowPricingPopup] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
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

      {/* Pricing Popup */}
      {showPricingPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#021722] border border-[#06384f] rounded-xl overflow-hidden shadow-2xl max-w-md w-full relative animate-fadeIn">
            <button 
              onClick={() => setShowPricingPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#F2B138]/20 flex items-center justify-center text-[#F2B138]">
                  <PartyPopper size={32} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center text-white mb-4">
                Hooray!
              </h3>
              
              <p className="text-center text-gray-300 mb-6">
                Since NeoMyst is still in development mode, it's <span className="text-[#F2B138] font-bold">free for all</span> users for now!
              </p>
              
              <p className="text-center text-gray-400 text-sm mb-8">
                Join our community today and be among the first to experience our revolutionary ML learning platform.
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowPricingPopup(false);
                    navigate(user ? "/pages/IntroStory" : "/register");
                  }}
                  className="bg-gradient-to-r from-[#F2B138] to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black py-3 px-6 rounded-md font-medium flex items-center justify-center group transition-all duration-300"
                >
                  <span className="flex items-center">
                    {user ? "Continue Learning" : "Start Free Trial"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
            
            <div className="bg-[#052740]/50 p-4 border-t border-[#06384f]">
              <p className="text-center text-teal-400 text-sm">
                Premium features will be available in the future
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`w-full max-w-none px-6 py-12 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1 bg-teal-900/30 rounded-full text-teal-400 text-sm font-medium mb-2">
                REVOLUTIONARY AI LEARNING PLATFORM
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Master <span className="text-[#F2B138]">Machine Learning</span>{" "}
                Through Immersive Storytelling
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                NeoMyst transforms complex ML concepts into an engaging
                narrative experience. Learn by solving real challenges in our
                sci-fi universe.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() =>
                    navigate(user ? "/pages/IntroStory" : "/register")
                  }
                  className="bg-gradient-to-r from-[#F2B138] to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black py-4 px-8 rounded-md text-lg font-medium flex items-center justify-center group transition-all duration-300"
                >
                  <span className="flex items-center">
                    {user ? "Continue Learning" : "Start Free Trial"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => navigate("/about")}
                  className="bg-transparent border border-teal-500 text-teal-400 hover:bg-teal-900/30 py-4 px-8 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-2">
                  {/* Replace numbered circles with user avatars */}
                  <div className="w-10 h-10 rounded-full bg-[#052740] border-2 border-[#011A27] flex items-center justify-center text-teal-300">
                    <Users size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#052740] border-2 border-[#011A27] flex items-center justify-center text-teal-300">
                    <Users size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#052740] border-2 border-[#011A27] flex items-center justify-center text-teal-300">
                    <Users size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#052740] border-2 border-[#011A27] flex items-center justify-center text-teal-300">
                    <Users size={18} />
                  </div>
                </div>
                <div className="text-gray-400">
                  <span className="text-teal-400 font-bold">
                    Join our community
                  </span>{" "}
                  of ML enthusiasts
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-[#021722] border border-[#06384f] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#052740] px-4 py-2 flex items-center border-b border-[#06384f]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-center flex-1 font-mono text-teal-300">
                    NeoMyst Learning Interface
                  </div>
                </div>

                <div className="relative">
                  <video
                    className="w-full h-auto object-cover rounded-b-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/dashboard-preview.png"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "300px";
                      target.style.background = "#052740";
                      target.style.display = "flex";
                      target.style.alignItems = "center";
                      target.style.justifyContent = "center";
                    }}
                  >
                    <source src="/DemoModule1.mp4" type="video/mp4" />
                    <p className="text-teal-300 text-center">
                      Your browser doesn't support HTML5 video
                    </p>
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021722] to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <span className="inline-block px-3 py-1 bg-teal-900/80 text-teal-400 text-xs font-medium rounded-full mb-2">
                      INTERACTIVE LEARNING
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Hands-on ML Experience
                    </h3>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F2B138]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="w-full max-w-none px-6 py-24 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-teal-900/30 rounded-full text-teal-400 text-sm font-medium mb-4">
              WHY CHOOSE NEOMYST
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Learn ML Like Never Before
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our unique approach combines storytelling with practical ML
              skills, creating an immersive learning experience that keeps you
              engaged.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-[#F2B138]" />}
              title="Narrative-Driven Learning"
              description="Immerse yourself in the NeoVerse story where each ML concept is tied to a compelling plot point."
            />
            <FeatureCard
              icon={<Code className="w-8 h-8 text-[#F2B138]" />}
              title="Hands-On Projects"
              description="Apply ML techniques to solve real challenges within our interactive environment."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-[#F2B138]" />}
              title="Community Support"
              description="Join thousands of learners in our community forums to share insights and get help."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-[#F2B138]" />}
              title="Accelerated Learning"
              description="Master complex concepts faster through our engaging, contextual approach to education."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-[#F2B138]" />}
              title="Industry-Recognized Skills"
              description="Develop the exact ML skills that top employers are looking for in today's market."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-[#F2B138]" />}
              title="Structured Progression"
              description="Follow a carefully designed learning path that builds your skills from fundamentals to advanced."
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div
        ref={statsRef}
        className="w-full bg-[#021722] border-y border-[#06384f] py-16 reveal opacity-0 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#F2B138]">
                5
              </div>
              <div className="text-gray-300">Learning Chapters</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#F2B138]">
                10+
              </div>
              <div className="text-gray-300">Interactive Exercises</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#F2B138]">
                2
              </div>
              <div className="text-gray-300">Game Modules</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#F2B138]">
                2
              </div>
              <div className="text-gray-300">Project Scenarios</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Course Content Preview */}
      <div className="w-full max-w-none px-6 py-24 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1 bg-teal-900/30 rounded-full text-teal-400 text-sm font-medium mb-4">
                COURSE CURRICULUM
              </span>
              <h2 className="text-4xl font-bold text-white mb-6">
                Comprehensive ML Curriculum Inside an Epic Narrative
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our curriculum covers all essential ML concepts while keeping
                you engaged through an immersive storyline where you're the
                hero.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Data Cleaning & Preprocessing",
                  "Regression Analysis & Prediction",
                  "Classification & Pattern Recognition",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

            </div>

            <div className="lg:w-1/2">
              <div className="bg-[#021722] border border-[#06384f] rounded-xl overflow-hidden shadow-xl">
                <div className="border-b border-[#06384f] p-4">
                  <div className="flex space-x-4">
                    {["The Story", "ML Concepts", "Projects"].map((tab, i) => (
                      <button
                        key={i}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          activeTab === i
                            ? "bg-teal-900/50 text-teal-400"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => setActiveTab(i)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 min-h-[300px]">
                  {activeTab === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-[#F2B138]">
                        The NeoVerse Conspiracy
                      </h3>
                      <p className="text-gray-300">
                        As a data scientist recruited by the mysterious Riley
                        Carter, you'll uncover a digital conspiracy threatening
                        the world's most advanced virtual reality platform. Your
                        ML skills are the key to exposing the Shadow Collective
                        and saving millions of users.
                      </p>
                      <div className="pt-4">
                        <span className="text-teal-400 font-medium">
                          Featured Characters:
                        </span>
                        <ul className="list-disc pl-5 text-gray-300 mt-2 space-y-1">
                          <li>Riley Carter - Lead Data Scientist</li>
                          <li>The Security Chief - Your Mission Handler</li>
                          <li>
                            The Shadow Collective - Mysterious Antagonists
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-[#F2B138]">
                        Core ML Concepts
                      </h3>
                      <p className="text-gray-300">
                        Each module teaches essential ML techniques through
                        practical application. You'll master regression,
                        classification, neural networks, and more - all while
                        solving challenges within the NeoVerse narrative.
                      </p>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {[
                          "Data Preprocessing",
                          "Linear Regression",
                          "Logistic Regression",
                          "Decision Trees",
                          "Neural Networks",
                          "Anomaly Detection",
                        ].map((concept, i) => (
                          <div
                            key={i}
                            className="bg-[#052740]/50 p-3 rounded-md text-teal-300 text-sm"
                          >
                            {concept}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-[#F2B138]">
                        Hands-On Projects
                      </h3>
                      <p className="text-gray-300">
                        Apply your knowledge through interactive projects that
                        advance the storyline. Each project reinforces ML
                        concepts while developing your portfolio of real-world
                        skills.
                      </p>
                      <div className="space-y-3 pt-2">
                        {[
                          "Anomaly Detection in User Data",
                          "Predictive Model for System Failures",
                          "Classification of Compromised Accounts",
                        ].map((project, i) => (
                          <div
                            key={i}
                            className="bg-[#052740]/50 p-3 rounded-md flex items-center gap-3"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#F2B138]/20 flex items-center justify-center text-[#F2B138]">
                              {i + 1}
                            </div>
                            <span className="text-gray-200">{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="w-full bg-[#010A17]/80 py-24 reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-teal-900/30 rounded-full text-teal-400 text-sm font-medium mb-4">
              STUDENT SUCCESS STORIES
            </span>
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied learners who have transformed their ML
              skills through our immersive platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="The narrative approach made learning ML concepts so much more engaging. I actually looked forward to each new module!"
              author="Alex Chen"
              role="Data Scientist at TechCorp"
              image="/src/assets/testimonial1.jpg"
            />
            <Testimonial
              quote="I tried multiple ML courses before, but NeoMyst's storytelling approach finally made everything click for me."
              author="Sarah Johnson"
              role="ML Engineer"
              image="/src/assets/testimonial2.jpg"
            />
            <Testimonial
              quote="The hands-on projects within the narrative framework gave me practical skills I could immediately apply in my job."
              author="Michael Rodriguez"
              role="AI Researcher"
              image="/src/assets/testimonial3.jpg"
            />
          </div>
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="w-full max-w-none px-6 py-24 reveal">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#052740] to-[#021722] p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-[#F2B138]"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#F2B138]/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Begin Your ML Journey Today
              </h2>

              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join thousands of students who are mastering machine learning
                through our immersive, story-driven platform. Start your
                adventure now.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    navigate(user ? "/learning-path" : "/register")
                  }
                  className="bg-gradient-to-r from-[#F2B138] to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black py-4 px-8 rounded-md text-lg font-medium flex items-center justify-center group transition-all duration-300"
                >
                  <span className="flex items-center">
                    {user ? "Continue Your Journey" : "Start Free Trial"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => setShowPricingPopup(true)}
                  className="bg-transparent border border-teal-500 text-teal-400 hover:bg-teal-900/30 py-4 px-8 rounded-md text-lg font-medium transition-all duration-300"
                >
                  View Pricing
                </button>
              </div>

              <p className="text-gray-400 mt-6">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
      `}</style>

      <Footer />
    </div>
  );
};

// Feature card component
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-[#021722] rounded-lg p-8 hover:bg-[#052740] transition-all duration-300 border border-[#06384f] hover:border-teal-500/30 group">
    <div className="w-16 h-16 bg-[#052740] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F2B138]/20 transition-all duration-300">
      {icon}
    </div>

    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#F2B138] transition-colors duration-300">
      {title}
    </h3>

    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
);

// Testimonial component

export default Home;
