import axios from 'axios';
import 'dotenv/config';

describe('User', () => {
  const url = axios.defaults.baseURL;

  describe('GET /user/:id', () => {
    it('should return a user', async () => {
      try {
        const res = await axios.get(`${url}/user/${process.env.TEST_USER_ID}`, {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
          },
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toEqual(process.env.TEST_USER_ID);
      } catch (error) {
        // console.error(error);
        expect(error).toBeUndefined();
      }
    });

    it('should return a 404 error', async () => {
      try {
        await axios.get(`${url}/user/2c631dd2-f643-4c10-b500-6f82e14a6a1a`, {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });
});
