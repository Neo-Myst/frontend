import React from "react";
import TwoPanelLayout from "../../../layouts/TwoPanelLayout";
import LeftPanel from "../../../components/Modules/Module2/EDA1/LeftPanel";
import RightPanel from "../../../components/Modules/Module2/common/RightPanelTemplate";

const Eda1: React.FC = () => {
  return (
    <TwoPanelLayout 
      leftPanel={<LeftPanel />} 
      rightPanel={<RightPanel />} 
    />
  );
};

export default Eda1;
