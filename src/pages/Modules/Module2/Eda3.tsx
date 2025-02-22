import React from "react";
import LeftPanel from "../../../components/Modules/Module2/EDA3/LeftPanel";
import RightPanel from "../../../components/Modules/Module2/EDA3/RightPanel";

const Eda3: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default Eda3;
