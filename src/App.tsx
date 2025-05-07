import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";

// Core pages
const Home = lazy(() => import("./pages/Home"));
const LearningPath = lazy(() => import("./pages/LearningPath"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const GoogleLogin = lazy(() => import("./pages/GoogleLogin"));

// Module 1: Preprocessing
const IntroStory = lazy(() => import("./pages/Modules/Module1/IntroStory"));
// const DataPreprocessing = lazy(() => import("./pages/GameModules/GameModule1/Preprocessing"));
const PreProc1 = lazy(() => import("./pages/Modules/Module1/PreProc1"));
const PreProc2 = lazy(() => import("./pages/Modules/Module1/PreProc2"));
const PreProc3 = lazy(() => import("./pages/Modules/Module1/PreProc3"));
const PreProc4 = lazy(() => import("./pages/Modules/Module1/PreProc4"));
const PreProc5 = lazy(() => import("./pages/Modules/Module1/PreProc5"));
const PreProc6 = lazy(() => import("./pages/Modules/Module1/PreProc6"));
const PreProc7 = lazy(() => import("./pages/Modules/Module1/PreProc7"));
const PreProc8 = lazy(() => import("./pages/Modules/Module1/PreProc8"));
const OutroPreProc = lazy(() => import("./pages/Modules/Module1/OutroPreProc"));

// Module 2: Exploratory Data Analysis (EDA)
const EdaIntro = lazy(() => import("./pages/Modules/Module2/EdaIntro"));
const Eda1 = lazy(() => import("./pages/Modules/Module2/Eda1"));
const Eda2 = lazy(() => import("./pages/Modules/Module2/Eda2"));
const Eda3 = lazy(() => import("./pages/Modules/Module2/Eda3"));
const EdaOuter = lazy(() => import("./pages/Modules/Module2/EdaOuter"));

// Game Module 1: Predictive Modeling
const GameModule1Intro = lazy(
  () => import("./pages/GameModules/GameModule1/Intro")
);
const GameModule1Preprocessing = lazy(
  () => import("./pages/GameModules/GameModule1/Preprocessing")
);
const GameModule1Outliers = lazy(
  () => import("./pages/GameModules/GameModule1/OutlierDetection")
);
const GameModule1HeatMaps = lazy(
  () => import("./pages/GameModules/GameModule1/HeatMaps")
);
const GameModule1RandomForest = lazy(
  () => import("./pages/GameModules/GameModule1/RandomForest")
);
const GameModule1Outro = lazy(
  () => import("./pages/GameModules/GameModule1/Outro")
);

// Module 3: Predictive Analytics
const Module3DataSplitting = lazy(
  () => import("./pages/Modules/Module3/DataSplittingPage")
);
const Module3Intro = lazy(() => import("./pages/Modules/Module3/IntroPage"));
const Module3Regression = lazy(
  () => import("./pages/Modules/Module3/RegressionPage")
);

// Game Module 2: Regression
const GameModule2Regression = lazy(
  () => import("./pages/GameModules/GameModule2/LinearRegression")
);

const LogisticRegression = lazy(
  () => import("./pages/Modules/LogisticReg/LogisticRegression")
);

// Completion Screen
const CompletionScreen = lazy(() => import("./pages/Modules/CompletionScreen"));

// Component to conditionally render Navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const showNavbarPaths = ["/", "/login", "/signup"];

  // Only show navbar on home, login, and signup pages
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  return shouldShowNavbar ? <Navbar /> : null;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <NavbarWrapper />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Core pages */}
            <Route path="/" element={<Home />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/google-login" element={<GoogleLogin />} />

            {/* Module 1 Routes */}
            <Route path="/pages/IntroStory" element={<IntroStory />} />
            {/* <Route path="/pages/data-preprocessing" element={<DataPreprocessing />} /> */}
            <Route path="/pages/PreProc1" element={<PreProc1 />} />
            <Route path="/pages/PreProc2" element={<PreProc2 />} />
            <Route path="/pages/PreProc3" element={<PreProc3 />} />
            <Route path="/pages/PreProc4" element={<PreProc4 />} />
            <Route path="/pages/PreProc5" element={<PreProc5 />} />
            <Route path="/pages/PreProc6" element={<PreProc6 />} />
            <Route path="/pages/PreProc7" element={<PreProc7 />} />
            <Route path="/pages/PreProc8" element={<PreProc8 />} />
            <Route path="/pages/OutroPreProc" element={<OutroPreProc />} />

            {/* Module 2 Routes */}
            <Route path="/pages/EdaIntro" element={<EdaIntro />} />
            <Route path="/pages/Eda1" element={<Eda1 />} />
            <Route path="/pages/Eda2" element={<Eda2 />} />
            <Route path="/pages/Eda3" element={<Eda3 />} />
            <Route path="/pages/EdaOuter" element={<EdaOuter />} />
            {/* Game Module 1 Routes */}
            <Route
              path="/modules/game-module1/intro"
              element={<GameModule1Intro />}
            />
            <Route
              path="/modules/game-module1/preprocessing"
              element={<GameModule1Preprocessing />}
            />
            <Route
              path="/modules/game-module1/outliers"
              element={<GameModule1Outliers />}
            />
            <Route
              path="/modules/game-module1/heatmaps"
              element={<GameModule1HeatMaps />}
            />
            <Route
              path="/modules/game-module1/randomforest"
              element={<GameModule1RandomForest />}
            />
            <Route
              path="/modules/game-module1/outro"
              element={<GameModule1Outro />}
            />

            {/* Module 3 Routes */}
            <Route
              path="/module3/data-splitting"
              element={<Module3DataSplitting />}
            />
            <Route path="/module3/intro" element={<Module3Intro />} />
            <Route path="/module3/regression" element={<Module3Regression />} />

            {/* Game Module 2 Route */}
            <Route
              path="/modules/game-module2/regression"
              element={<GameModule2Regression />}
            />

            {/* Logistic Regression Route */}
            <Route
              path="/modules/logistic-regression"
              element={<LogisticRegression />}
            />

            {/* Completion Screen Route */}
            <Route path="/completion" element={<CompletionScreen />} />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
};

export default App;
