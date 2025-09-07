const request = require('supertest');
const app = require('../server');

describe('ChronoClash Arena API', () => {
  describe('Health Check', () => {
    test('GET /health should return 200 and service status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('service', 'ChronoClash Arena API');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Player Greeting', () => {
    test('POST /api/greet should greet player with valid name', async () => {
      const playerName = 'TestPlayer';
      const response = await request(app)
        .post('/api/greet')
        .send({ name: playerName })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain(playerName);
      expect(response.body).toHaveProperty('playerName', playerName);
      expect(response.body).toHaveProperty('timestamp');
    });

    test('POST /api/greet should return 400 for missing name', async () => {
      const response = await request(app)
        .post('/api/greet')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Nama tidak boleh kosong');
      expect(response.body).toHaveProperty('error', 'MISSING_NAME');
    });

    test('POST /api/greet should return 400 for empty name', async () => {
      const response = await request(app)
        .post('/api/greet')
        .send({ name: '' })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Nama tidak boleh kosong');
      expect(response.body).toHaveProperty('error', 'MISSING_NAME');
    });

    test('POST /api/greet should return 400 for name too long', async () => {
      const longName = 'a'.repeat(51); // 51 characters
      const response = await request(app)
        .post('/api/greet')
        .send({ name: longName })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Nama terlalu panjang (maksimal 50 karakter)');
      expect(response.body).toHaveProperty('error', 'NAME_TOO_LONG');
    });

    test('POST /api/greet should return 400 for invalid name format', async () => {
      const invalidName = 'Test@Player!';
      const response = await request(app)
        .post('/api/greet')
        .send({ name: invalidName })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'INVALID_NAME_FORMAT');
    });

    test('POST /api/greet should accept valid name formats', async () => {
      const validNames = [
        'TestPlayer',
        'Test Player',
        'Test-Player',
        'Test_Player',
        'Player123',
        'Test Player-123_ABC'
      ];

      for (const name of validNames) {
        const response = await request(app)
          .post('/api/greet')
          .send({ name })
          .expect(200);

        expect(response.body).toHaveProperty('playerName', name);
      }
    });
  });

  describe('Player Statistics', () => {
    test('GET /api/player/:name/stats should return player stats', async () => {
      const playerName = 'TestPlayer';
      const response = await request(app)
        .get(`/api/player/${playerName}/stats`)
        .expect(200);

      expect(response.body).toHaveProperty('playerName', playerName);
      expect(response.body).toHaveProperty('level');
      expect(response.body).toHaveProperty('wins');
      expect(response.body).toHaveProperty('losses');
      expect(response.body).toHaveProperty('totalMatches');
      expect(response.body).toHaveProperty('winRate');
      expect(response.body).toHaveProperty('rank');
      expect(response.body).toHaveProperty('experience');
      expect(response.body).toHaveProperty('achievements');

      // Validate data types
      expect(typeof response.body.level).toBe('number');
      expect(typeof response.body.wins).toBe('number');
      expect(typeof response.body.losses).toBe('number');
      expect(typeof response.body.winRate).toBe('number');
      expect(Array.isArray(response.body.achievements)).toBe(true);

      // Validate business logic
      expect(response.body.totalMatches).toBe(response.body.wins + response.body.losses);
      expect(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']).toContain(response.body.rank);
    });
  });

  describe('Tournament Management', () => {
    test('GET /api/tournaments should return tournament list', async () => {
      const response = await request(app)
        .get('/api/tournaments')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // Validate tournament structure
      const tournament = response.body[0];
      expect(tournament).toHaveProperty('id');
      expect(tournament).toHaveProperty('name');
      expect(tournament).toHaveProperty('status');
      expect(tournament).toHaveProperty('participants');
      expect(tournament).toHaveProperty('maxParticipants');
      expect(tournament).toHaveProperty('prize');
      expect(tournament).toHaveProperty('startTime');
      expect(tournament).toHaveProperty('duration');

      // Validate status values
      expect(['active', 'upcoming', 'completed']).toContain(tournament.status);
    });

    test('POST /api/tournaments/:id/join should join tournament', async () => {
      const tournamentId = 1;
      const playerName = 'TestPlayer';
      
      const response = await request(app)
        .post(`/api/tournaments/${tournamentId}/join`)
        .send({ playerName })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain(playerName);
      expect(response.body).toHaveProperty('tournamentId', tournamentId);
      expect(response.body).toHaveProperty('playerName', playerName);
      expect(response.body).toHaveProperty('joinedAt');
      expect(response.body).toHaveProperty('position');
    });

    test('POST /api/tournaments/:id/join should return 400 for missing player name', async () => {
      const tournamentId = 1;
      
      const response = await request(app)
        .post(`/api/tournaments/${tournamentId}/join`)
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Nama pemain diperlukan');
      expect(response.body).toHaveProperty('error', 'MISSING_PLAYER_NAME');
    });
  });

  describe('Error Handling', () => {
    test('GET /nonexistent should return 404', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Endpoint tidak ditemukan');
      expect(response.body).toHaveProperty('error', 'NOT_FOUND');
    });
  });
});
