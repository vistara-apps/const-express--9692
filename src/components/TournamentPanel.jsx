import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Trophy, Clock, Users, Star, Loader, Play } from 'lucide-react'

const TournamentPanel = () => {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [joiningTournament, setJoiningTournament] = useState(null)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('http://localhost:3000/api/tournaments')
      setTournaments(response.data)
    } catch (error) {
      setError('Failed to load tournaments')
      console.error('Error fetching tournaments:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinTournament = async (tournamentId, playerName) => {
    if (!playerName) {
      alert('Please enter your name first!')
      return
    }

    setJoiningTournament(tournamentId)
    try {
      const response = await axios.post(`http://localhost:3000/api/tournaments/${tournamentId}/join`, {
        playerName
      })
      alert(response.data.message)
      // Refresh tournaments to get updated participant count
      fetchTournaments()
    } catch (error) {
      alert('Failed to join tournament: ' + (error.response?.data?.message || error.message))
    } finally {
      setJoiningTournament(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20'
      case 'upcoming': return 'text-yellow-400 bg-yellow-400/20'
      case 'completed': return 'text-gray-400 bg-gray-400/20'
      default: return 'text-blue-400 bg-blue-400/20'
    }
  }

  const formatTimeUntilStart = (startTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const diff = start - now

    if (diff <= 0) return 'Started'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="arena-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-arena-cyan rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Tournaments</h3>
        </div>
        <button 
          onClick={fetchTournaments}
          className="text-arena-cyan hover:text-arena-pink transition-colors"
          disabled={loading}
        >
          <Loader className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && tournaments.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-arena-cyan" />
          <span className="ml-2 text-gray-400">Loading tournaments...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-arena-cyan/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-sm">{tournament.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tournament.status)}`}>
                    {tournament.status.toUpperCase()}
                  </span>
                  {tournament.winner && (
                    <span className="text-xs text-yellow-400">
                      <Star className="w-3 h-3 inline mr-1" />
                      Winner: {tournament.winner}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-arena-pink font-semibold text-sm">{tournament.prize}</div>
                <div className="text-xs text-gray-400">{tournament.duration}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{tournament.participants}/{tournament.maxParticipants}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {tournament.status === 'completed' 
                    ? 'Finished' 
                    : formatTimeUntilStart(tournament.startTime)
                  }
                </span>
              </div>
            </div>

            {tournament.status !== 'completed' && (
              <button 
                onClick={() => {
                  const playerName = prompt('Enter your player name:')
                  if (playerName) joinTournament(tournament.id, playerName)
                }}
                disabled={joiningTournament === tournament.id}
                className="w-full arena-button py-2 rounded-lg text-white font-medium text-sm disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {joiningTournament === tournament.id ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>
                      {tournament.status === 'active' ? 'Join Battle' : 'Register'}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        ))}

        {tournaments.length === 0 && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-400">No tournaments available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TournamentPanel
