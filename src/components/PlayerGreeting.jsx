import React, { useState } from 'react'
import axios from 'axios'
import { User, Send } from 'lucide-react'

const PlayerGreeting = ({ playerName, setPlayerName }) => {
  const [inputName, setInputName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGreet = async () => {
    if (!inputName.trim()) return

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/api/greet', {
        name: inputName
      })
      setGreeting(response.data.message)
      setPlayerName(inputName)
    } catch (error) {
      setGreeting('Error connecting to server')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="arena-card rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-arena-pink rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Player Profile</h3>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-arena-pink transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleGreet()}
          />
          <button
            onClick={handleGreet}
            disabled={loading}
            className="arena-button px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {greeting && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-sm">{greeting}</p>
          </div>
        )}

        {playerName && (
          <div className="bg-arena-pink/20 border border-arena-pink/30 rounded-lg p-3">
            <p className="text-arena-pink text-sm font-medium">Active Player: {playerName}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerGreeting