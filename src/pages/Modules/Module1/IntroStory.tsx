import React from "react";
import LeftPanel from "../../../components/Modules/Module1/IntroStory/LeftPanel";
import RightPanel from "../../../components/Modules/Module1/IntroStory/RightPanel";

const IntroStory: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default IntroStory;
