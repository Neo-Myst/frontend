import React from "react";
import LeftPanel from "../../../components/Modules/Module1/PreProc3/LeftPanel";
import RightPanel from "../../../components/Modules/Module1/PreProc3/RightPanel";

const PreProc3: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default PreProc3;
