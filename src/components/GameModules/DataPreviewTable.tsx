import React from "react";

const DataPreviewTable: React.FC = () => {
  
  const dummyData = [
    {
      playerId: "P1001",
      hoursPlayed: 120,
      moneySpent: 50,
      criminalScore: 20,
      missionsCompleted: 15,
      playerRank: "Beginner",
      vipStatus: "No",
      cashOnHand: 30,
      syncStability: 95,
      questExploitScore: 10,
      playerLevel: "Cosmic Initiate",
      darkMarketTransactions: 3,
      transactionAmount: 40,
      neuralLinkStability: 90,
    },
    {
      playerId: "P1002",
      hoursPlayed: 250,
      moneySpent: 80,
      criminalScore: 35,
      missionsCompleted: 25,
      playerRank: "Stellar Scout",
      vipStatus: "Yes",
      cashOnHand: 60,
      syncStability: 88,
      questExploitScore: 20,
      playerLevel: "Galactic Cadet",
      darkMarketTransactions: 5,
      transactionAmount: 60,
      neuralLinkStability: 85,
    },
    {
      playerId: "P1003",
      hoursPlayed: 180,
      moneySpent: 70,
      criminalScore: 40,
      missionsCompleted: 20,
      playerRank: "Cosmic Ensign",
      vipStatus: "No",
      cashOnHand: 45,
      syncStability: 92,
      questExploitScore: 15,
      playerLevel: "Starborne Operative",
      darkMarketTransactions: 4,
      transactionAmount: 55,
      neuralLinkStability: 88,
    },
    {
      playerId: "P1004",
      hoursPlayed: 300,
      moneySpent: 100,
      criminalScore: 50,
      missionsCompleted: 30,
      playerRank: "Interstellar Agent",
      vipStatus: "Yes",
      cashOnHand: 80,
      syncStability: 85,
      questExploitScore: 25,
      playerLevel: "Celestial Vanguard",
      darkMarketTransactions: 6,
      transactionAmount: 70,
      neuralLinkStability: 82,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="px-4 py-2">Player ID</th>
            <th className="px-4 py-2">Hours Played</th>
            <th className="px-4 py-2">Money Spent ($)</th>
            <th className="px-4 py-2">Criminal Score</th>
            <th className="px-4 py-2">Missions Completed</th>
            <th className="px-4 py-2">Player Rank</th>
            <th className="px-4 py-2">VIP Status</th>
            <th className="px-4 py-2">Cash on Hand ($)</th>
            <th className="px-4 py-2">Sync Stability (%)</th>
            <th className="px-4 py-2">Quest Exploit Score</th>
            <th className="px-4 py-2">Player Level</th>
            <th className="px-4 py-2">Dark Market Transactions</th>
            <th className="px-4 py-2">Transaction Amount ($)</th>
            <th className="px-4 py-2">Neural Link Stability (%)</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row, idx) => (
            <tr key={idx} className="bg-gray-800 border-b border-gray-700">
              <td className="px-4 py-2">{row.playerId}</td>
              <td className="px-4 py-2">{row.hoursPlayed}</td>
              <td className="px-4 py-2">{row.moneySpent}</td>
              <td className="px-4 py-2">{row.criminalScore}</td>
              <td className="px-4 py-2">{row.missionsCompleted}</td>
              <td className="px-4 py-2">{row.playerRank}</td>
              <td className="px-4 py-2">{row.vipStatus}</td>
              <td className="px-4 py-2">{row.cashOnHand}</td>
              <td className="px-4 py-2">{row.syncStability}</td>
              <td className="px-4 py-2">{row.questExploitScore}</td>
              <td className="px-4 py-2">{row.playerLevel}</td>
              <td className="px-4 py-2">{row.darkMarketTransactions}</td>
              <td className="px-4 py-2">{row.transactionAmount}</td>
              <td className="px-4 py-2">{row.neuralLinkStability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPreviewTable;
