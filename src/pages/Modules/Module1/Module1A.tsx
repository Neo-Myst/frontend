import React from 'react';
import LeftPanel from '../../../components/Modules/Module1/Components1A/LeftPanel';
import RightPanel from '../../../components/Modules/Module1/Components1A/RightPanel';

const Module1A: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
       <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
      <LeftPanel />
      <RightPanel />
    </div>
    </div>
  );
};

export default Module1A;