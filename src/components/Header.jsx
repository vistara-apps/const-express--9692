import React from 'react'
import { Crown, Users, Trophy, Settings } from 'lucide-react'

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'arena', label: 'Arena', icon: Crown },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-arena-pink to-arena-cyan rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-arena-pink to-arena-cyan bg-clip-text text-transparent">
                ChronoClash Arena
              </h1>
              <p className="text-xs sm:text-sm text-gray-400">Battle for Glory</p>
            </div>
          </div>

          <nav className="flex space-x-1 bg-white/5 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-arena-pink text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header