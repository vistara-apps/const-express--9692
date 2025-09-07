import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react'

const StatsPanel = ({ playerName }) => {
  const [stats, setStats] = useState({
    rank: 1247,
    winRate: 73,
    totalBattles: 156,
    victories: 114,
    currentStreak: 5,
    highestStreak: 12,
    level: 42,
    xp: 8750,
    nextLevelXp: 10000
  })

  const [recentMatches] = useState([
    { id: 1, opponent: 'ShadowHunter', result: 'win', time: '2m ago' },
    { id: 2, opponent: 'FireMage', result: 'win', time: '15m ago' },
    { id: 3, opponent: 'IceKnight', result: 'loss', time: '1h ago' },
    { id: 4, opponent: 'StormLord', result: 'win', time: '2h ago' },
  ])

  useEffect(() => {
    if (playerName) {
      // Simulate stat changes when player name changes
      setStats(prev => ({
        ...prev,
        rank: Math.floor(Math.random() * 2000) + 100,
        winRate: Math.floor(Math.random() * 30) + 60,
        totalBattles: Math.floor(Math.random() * 200) + 50
      }))
    }
  }, [playerName])

  const xpPercentage = (stats.xp / stats.nextLevelXp) * 100

  return (
    <div className="space-y-6">
      {/* Player Stats */}
      <div className="arena-card rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-arena-pink rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Player Stats</h3>
        </div>

        <div className="space-y-4">
          {/* Level & XP */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Level {stats.level}</span>
              <span className="text-sm text-gray-400">{stats.xp}/{stats.nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-arena-pink to-arena-cyan h-2 rounded-full transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-arena-pink">#{stats.rank}</div>
              <div className="text-xs text-gray-400">Global Rank</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-arena-cyan">{stats.winRate}%</div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.victories}</div>
              <div className="text-xs text-gray-400">Victories</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.currentStreak}</div>
              <div className="text-xs text-gray-400">Win Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="arena-card rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-arena-cyan rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Recent Matches</h3>
        </div>

        <div className="space-y-3">
          {recentMatches.map((match) => (
            <div key={match.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${match.result === 'win' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <div>
                  <div className="text-sm font-medium">{match.opponent}</div>
                  <div className="text-xs text-gray-400">{match.time}</div>
                </div>
              </div>
              <div className={`text-xs font-medium ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                {match.result.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsPanel