import { useNavigate } from "react-router-dom";

const Module3IntroPage: React.FC = () => {
  const navigate = useNavigate();
;

  return (
    <div className="w-full md:w p-12 bg-black text-white relative flex flex-col min-h-screen font-oxanium">
      {/* Main content wrapper */}
      <div className="flex-grow space-y-8">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">
            NeoMyst
          </span>
        </button>

      </div>

      {/* Buttons Section - Fixed at bottom with margin */}
      <div className="flex items-center justify-between mt-auto mb-0 font-oxanium font-medium">
        {/* Go Back Button - Left Aligned */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

      </div>
    </div>
  );
};

export default Module3IntroPage;
