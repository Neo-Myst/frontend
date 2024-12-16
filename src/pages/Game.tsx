import React from "react";

const Game: React.FC = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to the MVP Page!</h1>
      <p className="text-lg mt-4">
        This page is only accessible to logged-in users.
      </p>
    </div>
  );
};

export default Game;
