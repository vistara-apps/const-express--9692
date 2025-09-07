import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart3, TrendingUp, Award, Target, Loader } from 'lucide-react'

const StatsPanel = ({ playerName }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [recentMatches] = useState([
    { id: 1, opponent: 'ShadowHunter', result: 'win', time: '2m ago' },
    { id: 2, opponent: 'FireMage', result: 'win', time: '15m ago' },
    { id: 3, opponent: 'IceKnight', result: 'loss', time: '1h ago' },
    { id: 4, opponent: 'StormLord', result: 'win', time: '2h ago' },
  ])

  useEffect(() => {
    if (playerName) {
      fetchPlayerStats()
    }
  }, [playerName])

  const fetchPlayerStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`http://localhost:3000/api/player/${playerName}/stats`)
      const apiStats = response.data
      setStats({
        rank: Math.floor(Math.random() * 2000) + 100, // Mock global rank
        winRate: apiStats.winRate,
        totalBattles: apiStats.totalMatches,
        victories: apiStats.wins,
        losses: apiStats.losses,
        currentStreak: Math.floor(Math.random() * 10) + 1, // Mock streak
        highestStreak: Math.floor(Math.random() * 20) + 5, // Mock highest streak
        level: apiStats.level,
        xp: apiStats.experience,
        nextLevelXp: (apiStats.level + 1) * 1000,
        playerRank: apiStats.rank,
        achievements: apiStats.achievements
      })
    } catch (error) {
      setError('Failed to load player stats')
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const xpPercentage = stats ? (stats.xp / stats.nextLevelXp) * 100 : 0

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

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-arena-pink" />
            <span className="ml-2 text-gray-400">Loading stats...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!playerName && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">Enter your name to view stats</p>
          </div>
        )}

        {stats && !loading && (
          <div className="space-y-4">
            {/* Player Rank Badge */}
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-arena-cyan">{stats.playerRank} Rank</div>
              <div className="text-xs text-gray-400">Current Tier</div>
            </div>

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
                <div className="text-2xl font-bold text-red-400">{stats.losses}</div>
                <div className="text-xs text-gray-400">Losses</div>
              </div>
            </div>

            {/* Achievements */}
            {stats.achievements && stats.achievements.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-400" />
                  Achievements
                </h4>
                <div className="space-y-2">
                  {stats.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-xs text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
