const request = require('supertest');
const app = require('../server/index');

describe('API Gateway', () => {
  it('returns list of tickets', async () => {
    const res = await request(app).get('/tickets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('filters tickets by status', async () => {
    const res = await request(app).get('/tickets').query({ status: 'open' });
    expect(res.statusCode).toBe(200);
    // all tickets returned should have status "open"
    if (res.body.length) {
      expect(res.body.every((t) => t.status === 'open')).toBe(true);
    }
  });
});