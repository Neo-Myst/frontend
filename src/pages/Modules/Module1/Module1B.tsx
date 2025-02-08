import React from 'react';
import LeftPanel from '../../../components/Modules/Module1/Components1B/LeftPanel';
import RightPanel from '../../../components/Modules/Module1/Components1B/RightPanel';

const Module1B: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Module1B;
