import React, { useState } from 'react'
import { Trophy, Clock, Users, Star } from 'lucide-react'

const TournamentPanel = () => {
  const [tournaments] = useState([
    {
      id: 1,
      name: 'Weekly Championship',
      prize: '1000 Coins',
      participants: 64,
      timeLeft: '2h 30m',
      status: 'active',
      difficulty: 'Hard'
    },
    {
      id: 2,
      name: 'Rookie Battle',
      prize: '250 Coins',
      participants: 32,
      timeLeft: '5h 15m',
      status: 'joining',
      difficulty: 'Easy'
    },
    {
      id: 3,
      name: 'Elite Masters',
      prize: '5000 Coins',
      participants: 16,
      timeLeft: '1d 4h',
      status: 'upcoming',
      difficulty: 'Expert'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20'
      case 'joining': return 'text-yellow-400 bg-yellow-400/20'
      case 'upcoming': return 'text-blue-400 bg-blue-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400'
      case 'Hard': return 'text-yellow-400'
      case 'Expert': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="arena-card rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-arena-cyan rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Tournaments</h3>
      </div>

      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-arena-cyan/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-sm">{tournament.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tournament.status)}`}>
                    {tournament.status}
                  </span>
                  <span className={`text-xs ${getDifficultyColor(tournament.difficulty)}`}>
                    <Star className="w-3 h-3 inline mr-1" />
                    {tournament.difficulty}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-arena-pink font-semibold text-sm">{tournament.prize}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{tournament.participants}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{tournament.timeLeft}</span>
              </div>
            </div>

            <button className="w-full mt-3 arena-button py-2 rounded-lg text-white font-medium text-sm">
              {tournament.status === 'active' ? 'Join Battle' : tournament.status === 'joining' ? 'Register' : 'Set Reminder'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TournamentPanel