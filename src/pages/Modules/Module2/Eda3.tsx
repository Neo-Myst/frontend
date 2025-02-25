import React from "react";
import TwoPanelLayout from "../../../layouts/TwoPanelLayout";
import LeftPanel from "../../../components/Modules/Module2/EDA3/LeftPanel";
import RightPanelTemplate from "../../../components/Modules/Module2/common/RightPanelTemplate";

const Eda3: React.FC = () => {
  return (
    <TwoPanelLayout 
      leftPanel={<LeftPanel />} 
      rightPanel={<RightPanelTemplate quizId={11} />} 
    />
  );
};

export default Eda3;
