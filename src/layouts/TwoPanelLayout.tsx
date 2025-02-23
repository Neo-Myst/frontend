import React from "react";

interface TwoPanelLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

const TwoPanelLayout: React.FC<TwoPanelLayoutProps> = ({ leftPanel, rightPanel }) => {

  return (
    <div className="flex flex-col h-screen">
      {/* The flex container directly renders the panels */}
      <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
        {leftPanel}
        {rightPanel}
      </div>
    </div>
  );
};

export default TwoPanelLayout;
