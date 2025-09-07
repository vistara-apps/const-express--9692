# ChronoClash Arena API Documentation

## Overview

The ChronoClash Arena API provides backend services for the futuristic gaming platform. This RESTful API handles player management, tournament operations, and game statistics.

**Base URL**: `http://localhost:3000`  
**API Version**: 1.0.0  
**Content-Type**: `application/json`

## Authentication

Currently, the API does not require authentication. In production, implement JWT-based authentication for secure access.

## Endpoints

### Health Check

#### GET /health
Returns the health status of the API server.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-09-07T19:27:22.000Z",
  "service": "ChronoClash Arena API"
}
```

### Player Management

#### POST /api/greet
Greets a player and validates their name for arena registration.

**Request Body:**
```json
{
  "name": "string (required, max 50 characters)"
}
```

**Validation Rules:**
- Name is required
- Maximum 50 characters
- Only alphanumeric characters, spaces, hyphens, and underscores allowed

**Success Response (200):**
```json
{
  "message": "Halo, PlayerName! Selamat datang di ChronoClash Arena!",
  "playerName": "PlayerName",
  "timestamp": "2024-09-07T19:27:22.000Z"
}
```

**Error Responses:**
- **400 Bad Request** - Missing name:
```json
{
  "message": "Nama tidak boleh kosong",
  "error": "MISSING_NAME"
}
```

- **400 Bad Request** - Name too long:
```json
{
  "message": "Nama terlalu panjang (maksimal 50 karakter)",
  "error": "NAME_TOO_LONG"
}
```

- **400 Bad Request** - Invalid name format:
```json
{
  "message": "Nama hanya boleh mengandung huruf, angka, spasi, tanda hubung, dan underscore",
  "error": "INVALID_NAME_FORMAT"
}
```

#### GET /api/player/:name/stats
Retrieves player statistics and performance data.

**Parameters:**
- `name` (path parameter): Player name

**Response (200):**
```json
{
  "playerName": "PlayerName",
  "level": 25,
  "wins": 45,
  "losses": 12,
  "totalMatches": 57,
  "winRate": 79,
  "rank": "Gold",
  "experience": 7500,
  "achievements": [
    "First Victory",
    "Arena Rookie",
    "Time Warrior"
  ]
}
```

**Rank System:**
- **Bronze**: 0-19 wins
- **Silver**: 20-39 wins
- **Gold**: 40-59 wins
- **Platinum**: 60-79 wins
- **Diamond**: 80+ wins

### Tournament Management

#### GET /api/tournaments
Retrieves all available tournaments with their current status.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Weekly Championship",
    "status": "active",
    "participants": 128,
    "maxParticipants": 256,
    "prize": "1000 Crystals",
    "startTime": "2024-09-07T20:27:22.000Z",
    "duration": "2 hours"
  },
  {
    "id": 2,
    "name": "Rookie Tournament",
    "status": "upcoming",
    "participants": 45,
    "maxParticipants": 64,
    "prize": "500 Crystals",
    "startTime": "2024-09-07T21:27:22.000Z",
    "duration": "1.5 hours"
  },
  {
    "id": 3,
    "name": "Masters Arena",
    "status": "completed",
    "participants": 32,
    "maxParticipants": 32,
    "prize": "2000 Crystals",
    "winner": "ChronoMaster",
    "completedAt": "2024-09-07T18:27:22.000Z"
  }
]
```

**Tournament Status Values:**
- `active`: Currently running
- `upcoming`: Scheduled to start
- `completed`: Finished

#### POST /api/tournaments/:id/join
Allows a player to join a specific tournament.

**Parameters:**
- `id` (path parameter): Tournament ID

**Request Body:**
```json
{
  "playerName": "string (required)"
}
```

**Success Response (200):**
```json
{
  "message": "PlayerName berhasil bergabung dengan turnamen!",
  "tournamentId": 1,
  "playerName": "PlayerName",
  "joinedAt": "2024-09-07T19:27:22.000Z",
  "position": 25
}
```

**Error Response (400):**
```json
{
  "message": "Nama pemain diperlukan",
  "error": "MISSING_PLAYER_NAME"
}
```

## Error Handling

### Global Error Responses

#### 404 Not Found
```json
{
  "message": "Endpoint tidak ditemukan",
  "error": "NOT_FOUND"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Terjadi kesalahan server",
  "error": "INTERNAL_SERVER_ERROR"
}
```

## Rate Limiting

Currently not implemented. In production, consider implementing rate limiting to prevent abuse:
- 100 requests per minute per IP for general endpoints
- 10 requests per minute for tournament join operations

## CORS Configuration

The API is configured to accept requests from all origins (`*`). In production, restrict this to your frontend domain only.

## Development

### Running the Server
```bash
# Development mode with auto-reload
npm run server:dev

# Production mode
npm run server

# Full stack development (backend + frontend)
npm run dev:full
```

### Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

## Future Enhancements

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control
   - Player session management

2. **Database Integration**
   - Replace mock data with persistent storage
   - Player profiles and statistics
   - Tournament history

3. **Real-time Features**
   - WebSocket support for live tournaments
   - Real-time player status updates
   - Live match notifications

4. **Advanced Tournament Features**
   - Tournament brackets
   - Match scheduling
   - Automated tournament progression

5. **Analytics & Monitoring**
   - API usage metrics
   - Performance monitoring
   - Error tracking and logging

## Support

For API support and questions, please contact the development team or create an issue in the project repository.
