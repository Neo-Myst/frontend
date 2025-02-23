import React from "react";
import TwoPanelLayout from "../../../layouts/TwoPanelLayout";
import LeftPanel from "../../../components/Modules/Module2/EDA3/LeftPanel";
import RightPanel from "../../../components/Modules/Module2/EDA3/RightPanel";

const EDA3: React.FC = () => {
  return (
    <TwoPanelLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />} />
  );
};

export default EDA3;
