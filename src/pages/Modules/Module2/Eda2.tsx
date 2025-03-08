import React from "react";
import TwoPanelLayout from "../../../layouts/TwoPanelLayout";
import LeftPanel from "../../../components/Modules/Module2/EDA2/LeftPanel";
import RightPanelTemplate from "../../../components/Modules/Module2/common/RightPanelTemplate";

const Eda2: React.FC = () => {
  return (
    <TwoPanelLayout 
      leftPanel={<LeftPanel />} 
      rightPanel={<RightPanelTemplate quizId={10} />} 
    />
  );
};

export default Eda2;
