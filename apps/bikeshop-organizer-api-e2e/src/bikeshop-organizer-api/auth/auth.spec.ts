import axios from 'axios';
import 'dotenv/config';

describe('Auth', () => {
  const url = axios.defaults.baseURL;
  describe('POST /auth/register', () => {
    // it('should create a user', async () => {
    //   try {
    //     const res = await axios.post(`${url}/auth/register`, {
    //       email: process.env.TEST_USER_EMAIL,
    //       password: process.env.TEST_USER_PASSWORD,
    //     });

    //     process.env.TEST_USER_ID = res.data.user.id;

    //     expect(res.status).toBe(201);
    //     expect(res.data).toHaveProperty('user');
    //     expect(res.data.user.email).toEqual(process.env.TEST_USER_EMAIL);
    //   } catch (error) {
    //     console.error(error);
    //     expect(error).toBeUndefined();
    //   }
    // });

    it('should return a 400 error', async () => {
      try {
        const res = await axios.post(`${url}/auth/register`, {
          email: process.env.TEST_USER_EMAIL,
          password: process.env.TEST_USER_PASSWORD,
        });
        expect(res.data).toHaveProperty('message');
        expect(res.data.message).toContain('duplicate key value violates');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('POST /auth/login', () => {
    it('should return a token', async () => {
      try {
        const res = await axios.post(`${url}/auth/login`, {
          email: process.env.TEST_USER_EMAIL,
          password: process.env.TEST_USER_PASSWORD,
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('token');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });

    it('should return a 401 error', async () => {
      try {
        await axios.post(`${url}/auth/login`, {
          email: process.env.TEST_USER_EMAIL,
          password: 'wrongpassword',
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toEqual('Invalid credentials');
      }
    });
  });
});
