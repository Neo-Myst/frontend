import { motion } from "framer-motion";
import styled from "styled-components";
import { useState, useMemo, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleCard } from "../components/ModuleCard";
import type { Module } from "../components/ModuleCard";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(circle at 50% 50%, #0c0c24 0%, #080816 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  padding: 2rem;
  font-family: "Inter", sans-serif;
`;

const PageTitle = styled(motion.h1)`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  background: linear-gradient(to right, #ffffff, #a8a8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 10;
`;

const Particles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

const PathSVG = styled(motion.svg)`
  width: 800px;
  height: 800px; // Adjusted for longer vertical layout
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

const RoadPath = styled(motion.path)`
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.6;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1));
`;

const ModuleGrid = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  z-index: 2;
  height: 800px; // Adjusted for longer vertical layout

  @media (max-width: 768px) {
    height: 700px;
    margin: 1rem auto;
    transform: scale(0.8);
  }
`;

// Define positions for the vertical snake-like zigzag path based on the reference image
const positions = [
  { x: 200, y: 120 }, // Data Processing (top left)
  { x: 600, y: 220 }, // EDA (right)
  { x: 200, y: 320 }, // Game Module 1 (left)
  { x: 600, y: 420 }, // Regression (right)
  { x: 200, y: 520 }, // Game Module 2 (left)
  { x: 600, y: 620 }, // Classification (right)
  { x: 200, y: 720 }, // Game Module 3 (bottom left)
];

// Define modules with positions matching the reference image
const modules: Module[] = [
  {
    id: 1,
    title: "Data Purification",
    path: "/pages/IntroStory",
    icon: "📊",
    position: 2,
    isRight: false,
    yOffset: 120,
  },
  {
    id: 2,
    title: "Pattern Discovery",
    path: "/pages/EdaIntro",
    icon: "📈",
    position: 6,
    isRight: true,
    yOffset: 220,
  },
  {
    id: 3,
    title: "Mission 1: Data Rescue",
    path: "/modules/game-module1/intro",
    icon: "🎮",
    position: 2,
    isRight: false,
    yOffset: 320,
  },
  {
    id: 4,
    title: "Future Forecasting",
    path: "/module3/regression",
    icon: "📉",
    position: 6,
    isRight: true,
    yOffset: 420,
  },
  {
    id: 5,
    title: "Mission 2: Shadow Tracking",
    path: "/modules/game-module2/regression",
    icon: "🎮",
    position: 2,
    isRight: false,
    yOffset: 520,
  },
  {
    id: 6,
    title: "Truth Identification",
    path: "/modules/logistic-regression",
    icon: "🔍",
    position: 6,
    isRight: true,
    yOffset: 620,
  },
  {
    id: 7,
    title: "Mission 3: Final Countermeasure",
    path: "/module3/intro",
    icon: "🎮",
    position: 2,
    isRight: false,
    yOffset: 720,
  },
];

const getPathCoordinates = () => {
  // Create a vertical snake-like zigzag path connecting all the modules
  let path = `M ${positions[0].x},${positions[0].y}`;

  // Use curved paths for a more natural flow as seen in the reference image
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];

    // Create smooth S-curves between each module with more pronounced curves
    const controlPoint1X = prev.x + (curr.x - prev.x) * 0.3;
    const controlPoint1Y = prev.y + (curr.y - prev.y) * 0.1;
    const controlPoint2X = prev.x + (curr.x - prev.x) * 0.7;
    const controlPoint2Y = prev.y + (curr.y - prev.y) * 0.9;

    // Use cubic Bezier curve for a smooth S-curve
    path += ` C ${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${curr.x},${curr.y}`;
  }

  return path;
};

const isModuleUnlocked = (moduleId: number) => {
  // Only the first module is unlocked for the user
  return moduleId === 1;
};

// Generate random particles for background effect
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
  }));
};

const LearningPath: FC = () => {
  const navigate = useNavigate();
  // Track the active module for progress path animation and module highlighting
  const [activeModule, setActiveModule] = useState<number>(1);
  const particles = useMemo(() => generateParticles(20), []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle module click to update active module if unlocked
  const handleModuleClick = (moduleId: number, isLocked: boolean) => {
    if (!isLocked) {
      setActiveModule(moduleId);
    }
  };

  // Removed progress path calculation function as it's no longer needed

  return (
    <Container>
      <Particles>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </Particles>

      <button
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 mb-8 font-mono self-start ml-8"
      >
        NeoMyst
        <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
          NeoMyst
        </span>
      </button>

      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-[#ff6b00]">Neural Grid:</span> Riley's Mission
        Path
      </PageTitle>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-2xl text-center mb-8 bg-black/30 p-6 rounded-lg backdrop-blur-sm"
      >
        <p className="text-yellow-400 italic">
          "The path is clear now. Each skill connects to the next, forming a
          neural grid of knowledge I'll need to navigate. Time to begin the
          journey..."
        </p>
      </motion.div>

      <ModuleGrid>
        <PathSVG
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          }}
          viewport={{ once: true }}
        >
          {/* Background path */}
          <RoadPath
            d={getPathCoordinates()}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* No progress path with gradient - removed as requested */}

          {/* Removed gradient definitions */}
        </PathSVG>

        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isLocked={!isModuleUnlocked(module.id)}
            isActive={module.id === activeModule}
            onClick={() =>
              handleModuleClick(module.id, !isModuleUnlocked(module.id))
            }
          />
        ))}
      </ModuleGrid>
    </Container>
  );
};

export default LearningPath;
