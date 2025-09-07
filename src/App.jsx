import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ArenaGrid from './components/ArenaGrid'
import TournamentPanel from './components/TournamentPanel'
import StatsPanel from './components/StatsPanel'
import PlayerGreeting from './components/PlayerGreeting'

function App() {
  const [activeTab, setActiveTab] = useState('arena')
  const [playerName, setPlayerName] = useState('')

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-arena-pink rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-arena-cyan rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-purple-900/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Panel */}
            <div className="lg:col-span-3 space-y-6">
              <PlayerGreeting 
                playerName={playerName} 
                setPlayerName={setPlayerName} 
              />
              <TournamentPanel />
            </div>

            {/* Center Arena */}
            <div className="lg:col-span-6">
              <ArenaGrid />
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-3">
              <StatsPanel playerName={playerName} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App