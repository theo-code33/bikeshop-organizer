import axios from 'axios';

describe('GET /api', () => {
  const url = axios.defaults.baseURL;

  it('should return a message', async () => {
    try {
      const res = await axios.get(url);

      expect(res.status).toBe(200);
      expect(res.data).toEqual({ message: 'Hello API' });
    } catch (error) {
      console.error(error);
      expect(error).toBeUndefined();
    }
  });
});
