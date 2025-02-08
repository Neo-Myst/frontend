import React from 'react'
import backgroundImage from "../../../../assets/cinematic-galactic-civilization.jpg"; 

const RightPanel: React.FC = () => {
  return (
    <div className="w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      </div>
  )
}

export default RightPanel
