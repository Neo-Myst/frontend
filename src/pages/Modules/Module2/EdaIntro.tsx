import React from "react";
import LeftPanel from "../../../components/Modules/Module2/Intro/LeftPanel";
import RightPanel from "../../../components/Modules/Module2/Intro/RightPanel";

const EdaIntro: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default EdaIntro;
