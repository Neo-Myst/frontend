import React from 'react';
import Table from './Table';

interface TableData {
  headers: string[];
  rows: string[][];
}

interface PopupContent {
  title: string;
  beforeTable: TableData;
  afterTable: TableData;
}

export const preprocessingPopups: Record<string, PopupContent> = {
  median: {
    title: 'Median Imputation',
    beforeTable: {
      headers: ['Player ID', 'Hours Played', 'Quest Exploit Score'],
      rows: [
        ['P1023', '250', '850'],
        ['P2048', '480', '---'],
        ['P3192', '120', '620'],
        ['P4210', '360', '---'],
      ]
    },
    afterTable: {
      headers: ['Player ID', 'Hours Played', 'Quest Exploit Score'],
      rows: [
        ['P1023', '250', '850'],
        ['P2048', '480', '735'],
        ['P3192', '120', '620'],
        ['P4210', '360', '735'],
      ]
    }
  },
  remove: {
    title: 'Remove Missing Values',
    beforeTable: {
      headers: ['Player ID', 'Hours Played', 'Quest Exploit Score'],
      rows: [
        ['P1023', '250', '850'],
        ['P2048', '480', '---'],
        ['P3192', '120', '620'],
        ['P4210', '360', '---'],
      ]
    },
    afterTable: {
      headers: ['Player ID', 'Hours Played', 'Quest Exploit Score'],
      rows: [
        ['P1023', '250', '850'],
        ['P3192', '120', '620'],
      ]
    }
  },
  labelEncoding: {
    title: 'Label Encoding',
    beforeTable: {
      headers: ['Player Level'],
      rows: [
        ['Beginner'],
        ['Intermediate'],
        ['Advanced'],
        ['Celestial Vanguard'],
        ['Quantum Sovereign'],
      ]
    },
    afterTable: {
      headers: ['Player Level'],
      rows: [
        ['0'],
        ['1'],
        ['2'],
        ['3'],
        ['4'],
      ]
    }
  },
  oneHot: {
    title: 'One-Hot Encoding',
    beforeTable: {
      headers: ['Player Level'],
      rows: [
        ['Beginner'],
        ['Intermediate'],
        ['Advanced'],
        ['Celestial Vanguard'],
        ['Quantum Sovereign'],
      ]
    },
    afterTable: {
      headers: ['Player Level', 'Beginner', 'Intermediate', 'Advanced', 'Celestial Vanguard', 'Quantum Sovereign'],
      rows: [
        ['Beginner', '1', '0', '0', '0', '0'],
        ['Intermediate', '0', '1', '0', '0', '0'],
        ['Advanced', '0', '0', '1', '0', '0'],
        ['Celestial Vanguard', '0', '0', '0', '1', '0'],
        ['Quantum Sovereign', '0', '0', '0', '0', '1'],
      ]
    }
  },
  normalized: {
    title: 'Normalization',
    beforeTable: {
      headers: ['Player ID', 'Hours Played', 'Quest Exploit Score'],
      rows: [
        ['P1023', '250', '850'],
        ['P2048', '480', '0'],
        ['P3192', '120', '620'],
      ]
    },
    afterTable: {
      headers: ['Player ID', 'Hours Played (0-1)', 'Quest Exploit Score (0-1)'],
      rows: [
        ['P1023', '0.52', '0.85'],
        ['P2048', '1.00', '0.00'],
        ['P3192', '0.25', '0.62'],
      ]
    }
  },
  standardized: {
    title: 'Standardization',
    beforeTable: {
      headers: ['Player ID', 'Hours Played'],
      rows: [
        ['P1023', '250'],
        ['P2048', '480'],
        ['P3192', '120'],
        ['P4210', '360'],
      ]
    },
    afterTable: {
      headers: ['Player ID', 'Hours Played'],
      rows: [
        ['P1023', '-0.52'],
        ['P2048', '1.55'],
        ['P3192', '-1.29'],
        ['P4210', '0.26'],
      ]
    }
  }
};

interface PreprocessingPopupProps {
  type: keyof typeof preprocessingPopups;
  onSelect: () => void;
  isSelected: boolean;
}

const PreprocessingPopup: React.FC<PreprocessingPopupProps> = ({ type, onSelect, isSelected }) => {
  const content = preprocessingPopups[type];
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-[#66c0f4] mb-3">Before:</h3>
        <Table headers={content.beforeTable.headers} rows={content.beforeTable.rows} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[#66c0f4] mb-3">After:</h3>
        <Table headers={content.afterTable.headers} rows={content.afterTable.rows} />
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={onSelect}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
            isSelected 
              ? 'bg-[#2c4159] text-[#66c0f4] border-2 border-[#66c0f4] hover:bg-[#1a2332]' 
              : 'bg-[#66c0f4] text-white hover:bg-[#4fa3e3]'
          }`}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default PreprocessingPopup;
