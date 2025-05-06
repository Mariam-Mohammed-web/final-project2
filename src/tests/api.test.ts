import request from 'supertest';
import app from '../app';
describe('API Endpoints', () => {
  describe('GET /api/images/process', () => {
    it('should return 400 when parametrs are missing', async () => {
      const response = await request(app).get('/api/images/process');
      expect(response.status).toBe(400);
    });
    it('should return 400 if parameters are invalid', async () => {
      const response = await request(app)
        .get('/api/images/process?filename=test&width=abc&height=200');
      expect(response.status).toBe(400);
    });
    it('should return 200 and processed image for valid request', async () => {
      const response = await request(app)
        .get('/api/images/process?filename=test&width=200&height=200');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/image\/jpeg/);
    });
  });
  describe('POST /api/upload', () => {
    it('should return 400 if no file is uploaded', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('image', '');
      expect(response.status).toBe(400);
    });
    it('should return 200 for successful upload', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('image', 'test/fixtures/test-image.jpg');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('filename');
    });
    it('should reject invalid file types', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('image', 'test/fixtures/invalid-file.txt');
      expect(response.status).toBe(400);
    });
  });
});
