import React from "react";
import TwoPanelLayout from "../../../layouts/TwoPanelLayout";
import LeftPanel from "../../../components/Modules/Module2/EDA1/LeftPanel";
import RightPanelTemplate from "../../../components/Modules/Module2/common/RightPanelTemplate";

const Eda1: React.FC = () => {
  return (
    <TwoPanelLayout 
      leftPanel={<LeftPanel />} 
      rightPanel={<RightPanelTemplate quizId={9} />} 
    />
  );
};

export default Eda1;
