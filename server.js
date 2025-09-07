const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    service: "ChronoClash Arena API"
  });
});

// API endpoint for greeting players
app.post("/api/greet", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ 
      message: "Nama tidak boleh kosong",
      error: "MISSING_NAME"
    });
  }

  // Validate name length and characters
  if (name.length > 50) {
    return res.status(400).json({ 
      message: "Nama terlalu panjang (maksimal 50 karakter)",
      error: "NAME_TOO_LONG"
    });
  }

  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
    return res.status(400).json({ 
      message: "Nama hanya boleh mengandung huruf, angka, spasi, tanda hubung, dan underscore",
      error: "INVALID_NAME_FORMAT"
    });
  }

  res.json({ 
    message: `Halo, ${name}! Selamat datang di ChronoClash Arena!`,
    playerName: name,
    timestamp: new Date().toISOString()
  });
});

// API endpoint for player stats
app.get("/api/player/:name/stats", (req, res) => {
  const { name } = req.params;
  
  // Mock player stats - in production this would come from a database
  const mockStats = {
    playerName: name,
    level: Math.floor(Math.random() * 50) + 1,
    wins: Math.floor(Math.random() * 100),
    losses: Math.floor(Math.random() * 50),
    totalMatches: 0,
    winRate: 0,
    rank: "Bronze",
    experience: Math.floor(Math.random() * 10000),
    achievements: [
      "First Victory",
      "Arena Rookie",
      "Time Warrior"
    ]
  };

  mockStats.totalMatches = mockStats.wins + mockStats.losses;
  mockStats.winRate = mockStats.totalMatches > 0 ? 
    Math.round((mockStats.wins / mockStats.totalMatches) * 100) : 0;

  // Determine rank based on wins
  if (mockStats.wins >= 80) mockStats.rank = "Diamond";
  else if (mockStats.wins >= 60) mockStats.rank = "Platinum";
  else if (mockStats.wins >= 40) mockStats.rank = "Gold";
  else if (mockStats.wins >= 20) mockStats.rank = "Silver";

  res.json(mockStats);
});

// API endpoint for tournament data
app.get("/api/tournaments", (req, res) => {
  const tournaments = [
    {
      id: 1,
      name: "Weekly Championship",
      status: "active",
      participants: 128,
      maxParticipants: 256,
      prize: "1000 Crystals",
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      duration: "2 hours"
    },
    {
      id: 2,
      name: "Rookie Tournament",
      status: "upcoming",
      participants: 45,
      maxParticipants: 64,
      prize: "500 Crystals",
      startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
      duration: "1.5 hours"
    },
    {
      id: 3,
      name: "Masters Arena",
      status: "completed",
      participants: 32,
      maxParticipants: 32,
      prize: "2000 Crystals",
      winner: "ChronoMaster",
      completedAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    }
  ];

  res.json(tournaments);
});

// API endpoint for joining tournaments
app.post("/api/tournaments/:id/join", (req, res) => {
  const { id } = req.params;
  const { playerName } = req.body;

  if (!playerName) {
    return res.status(400).json({ 
      message: "Nama pemain diperlukan",
      error: "MISSING_PLAYER_NAME"
    });
  }

  // Mock tournament join logic
  res.json({
    message: `${playerName} berhasil bergabung dengan turnamen!`,
    tournamentId: parseInt(id),
    playerName,
    joinedAt: new Date().toISOString(),
    position: Math.floor(Math.random() * 50) + 1
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Terjadi kesalahan server",
    error: "INTERNAL_SERVER_ERROR"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Endpoint tidak ditemukan",
    error: "NOT_FOUND"
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
