import React from 'react';

interface TableProps {
  headers: string[];
  rows: string[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      {/* Table Container */}
      <div className="border border-[#32404e] rounded-lg overflow-hidden">
        {/* Headers */}
        <div className="bg-[#1a2332]">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
            {headers.map((header, index) => (
              <div
                key={index}
                className="p-3 text-[#66c0f4] font-bold text-center border-r border-b border-[#32404e] last:border-r-0"
              >
                {header}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="bg-[#1a2332]">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid hover:bg-[#2c4159] transition-colors"
              style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
            >
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`
                    p-3 text-[#8ba5bc] text-center border-r border-[#32404e]
                    ${rowIndex !== rows.length - 1 ? 'border-b' : ''}
                    last:border-r-0
                    ${cell === '---' ? 'text-red-400 italic' : ''}
                    ${cellIndex === 0 ? 'text-[#66c0f4] font-semibold' : ''}
                    ${cell === '1' ? 'text-green-400 font-bold' : ''}
                    ${cell === '0' ? 'text-gray-500' : ''}
                  `}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
