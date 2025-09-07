import React, { useState, useEffect } from 'react'
import { Crown, Shield, Sword, Zap } from 'lucide-react'

const ArenaGrid = () => {
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [players, setPlayers] = useState([])

  const playerTypes = [
    { icon: Crown, color: 'text-yellow-400', name: 'Champion' },
    { icon: Shield, color: 'text-blue-400', name: 'Guardian' },
    { icon: Sword, color: 'text-red-400', name: 'Warrior' },
    { icon: Zap, color: 'text-purple-400', name: 'Mage' },
  ]

  useEffect(() => {
    // Initialize with some random players
    const initialPlayers = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      position: Math.floor(Math.random() * 9),
      type: playerTypes[Math.floor(Math.random() * playerTypes.length)],
      level: Math.floor(Math.random() * 50) + 1,
      active: Math.random() > 0.5
    }))
    setPlayers(initialPlayers)
  }, [])

  const handlePositionClick = (position) => {
    setSelectedPosition(position === selectedPosition ? null : position)
  }

  const getPlayerAtPosition = (position) => {
    return players.find(player => player.position === position)
  }

  return (
    <div className="arena-card rounded-xl p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-arena-pink to-arena-cyan bg-clip-text text-transparent">
          Arena Battlefield
        </h2>
        <p className="text-gray-400 text-sm mt-1">Click positions to deploy fighters</p>
      </div>

      <div className="relative">
        {/* Arena Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {Array.from({ length: 9 }, (_, i) => {
            const player = getPlayerAtPosition(i)
            const isSelected = selectedPosition === i
            
            return (
              <div
                key={i}
                onClick={() => handlePositionClick(i)}
                className={`
                  aspect-square rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-2
                  ${isSelected 
                    ? 'border-arena-pink bg-arena-pink/20 shadow-lg shadow-arena-pink/30' 
                    : 'border-white/20 bg-white/5 hover:border-arena-cyan/50 hover:bg-arena-cyan/10'
                  }
                  ${player ? 'animate-float' : ''}
                `}
              >
                {player ? (
                  <div className="text-center">
                    <player.type.icon className={`w-8 h-8 mx-auto mb-1 ${player.type.color}`} />
                    <div className="text-xs">
                      <div className="font-medium">{player.type.name}</div>
                      <div className="text-gray-400">Lv.{player.level}</div>
                    </div>
                    {player.active && (
                      <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1 animate-pulse"></div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-2xl">+</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Battle Status */}
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">Active: {players.filter(p => p.active).length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-gray-400">Standby: {players.filter(p => !p.active).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArenaGrid