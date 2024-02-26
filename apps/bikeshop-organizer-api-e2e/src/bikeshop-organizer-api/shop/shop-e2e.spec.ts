import { Roles } from '@bikeshop-organizer/types';
import axios from 'axios';
import 'dotenv/config';

describe('e2e Shop', () => {
  const url = axios.defaults.baseURL;

  const createShopDto = {
    user: process.env.TEST_USER_ID,
    name: 'test shop',
    siret: '897 455 721 00018',
    address: '1 rue de la paix',
    postalCode: '75000',
    city: 'Paris',
    email: 'test-shop@test.com',
    phoneNumber: '0123456789',
  };

  describe('POST /shop', () => {
    it('should return unauthorized with user permission', async () => {
      try {
        await axios.post(`${url}/shop`, createShopDto, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(403);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toEqual('Forbidden resource');
      }
    });

    it('should create a shop', async () => {
      try {
        const res = await axios.post(`${url}/shop`, createShopDto, {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
          },
        });

        const resUser = await axios.get(`${url}/user/${createShopDto.user}`, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });

        process.env.TEST_SHOP_ID = res.data.id;

        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('user');
        expect(res.data.user.id).toBe(createShopDto.user);
        expect(res.data.name).toBe(createShopDto.name);
        expect(res.data.siret).toBe(createShopDto.siret);
        expect(res.data.address).toBe(createShopDto.address);
        expect(res.data.postalCode).toBe(createShopDto.postalCode);
        expect(res.data.city).toBe(createShopDto.city);
        expect(res.data.email).toBe(createShopDto.email);
        expect(res.data.phoneNumber).toBe(createShopDto.phoneNumber);

        expect(resUser.data).toHaveProperty('shop');
        expect(resUser.data.shop.id).toBe(res.data.id);
        expect(resUser.data.role).toBe(Roles.SHOP);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });

    it('should return an error', async () => {
      try {
        await axios.post(`${url}/shop`, createShopDto, {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(500);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toContain(
          'duplicate key value violates unique constraint'
        );
      }
    });
  });

  describe('GET /shop/:id', () => {
    it('should return a shop', async () => {
      try {
        const res = await axios.get(`${url}/shop/${process.env.TEST_SHOP_ID}`, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('user');
        expect(res.data.user.id).toBe(createShopDto.user);
        expect(res.data.name).toBe(createShopDto.name);
        expect(res.data.siret).toBe(createShopDto.siret);
        expect(res.data.address).toBe(createShopDto.address);
        expect(res.data.postalCode).toBe(createShopDto.postalCode);
        expect(res.data.city).toBe(createShopDto.city);
        expect(res.data.email).toBe(createShopDto.email);
        expect(res.data.phoneNumber).toBe(createShopDto.phoneNumber);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('PATCH /shop/:id', () => {
    it('should return unauthorized with user permission', async () => {
      try {
        await axios.patch(
          `${url}/shop/${process.env.TEST_SHOP_ID}`,
          { name: 'new name' },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN_2}`,
            },
          }
        );
      } catch (error) {
        expect(error.response.status).toBe(403);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toEqual('Forbidden resource');
      }
    });

    it('should update a shop', async () => {
      try {
        const res = await axios.patch(
          `${url}/shop/${process.env.TEST_SHOP_ID}`,
          { name: 'new name' },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_SHOP_ID);
        expect(res.data.name).toBe('new name');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('POST /client', () => {
    it('should create a client', async () => {
      const createClientDto = {
        firstName: 'client-1',
        lastName: 'lastname-1',
        phoneNumber: '0123456789',
        email: 'client-1@test.com',
        shop: process.env.TEST_SHOP_ID,
        address: "1 rue de l'eglise",
        postalCode: '75000',
        city: 'Paris',
      };
      const createClientDto2 = {
        firstName: 'client-2',
        lastName: 'lastname-2',
        phoneNumber: '0123456789',
        email: 'client-2@test.com',
        shop: process.env.TEST_SHOP_ID,
        address: "2 rue de l'eglise",
        postalCode: '75000',
        city: 'Paris',
      };
      try {
        const resClient1 = await axios.post(`${url}/client`, createClientDto, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
        const resClient2 = await axios.post(`${url}/client`, createClientDto2, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });

        process.env.TEST_CLIENT_ID = resClient1.data.id;
        process.env.TEST_CLIENT_ID_2 = resClient2.data.id;

        expect(resClient1.status).toBe(201);
        expect(resClient1.data).toHaveProperty('id');
        expect(resClient1.data).toHaveProperty('shop');
        expect(resClient1.data.shop.id).toBe(createClientDto.shop);
        expect(resClient1.data.firstName).toBe(createClientDto.firstName);
        expect(resClient1.data.lastName).toBe(createClientDto.lastName);
        expect(resClient1.data.phoneNumber).toBe(createClientDto.phoneNumber);
        expect(resClient1.data.email).toBe(createClientDto.email);
        expect(resClient1.data.address).toBe(createClientDto.address);
        expect(resClient1.data.postalCode).toBe(createClientDto.postalCode);
        expect(resClient1.data.city).toBe(createClientDto.city);

        expect(resClient2.status).toBe(201);
        expect(resClient2.data).toHaveProperty('id');
        expect(resClient2.data).toHaveProperty('shop');
        expect(resClient2.data.shop.id).toBe(createClientDto2.shop);
        expect(resClient2.data.firstName).toBe(createClientDto2.firstName);
        expect(resClient2.data.lastName).toBe(createClientDto2.lastName);
        expect(resClient2.data.phoneNumber).toBe(createClientDto2.phoneNumber);
        expect(resClient2.data.email).toBe(createClientDto2.email);
        expect(resClient2.data.address).toBe(createClientDto2.address);
        expect(resClient2.data.postalCode).toBe(createClientDto2.postalCode);
        expect(resClient2.data.city).toBe(createClientDto2.city);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('GET /client/shop/:shopId', () => {
    it('should return clients', async () => {
      try {
        const res = await axios.get(
          `${url}/client/shop/${process.env.TEST_SHOP_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).toBeInstanceOf(Array);
        expect(res.data).toHaveLength(2);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('GET /client/:id', () => {
    it('should return a client', async () => {
      try {
        const res = await axios.get(
          `${url}/client/${process.env.TEST_CLIENT_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_CLIENT_ID);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
    it('should return a 404 error', async () => {
      try {
        await axios.get(`${url}/client/2c631dd2-f643-4c10-b500-6f82e14a6a1a`, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toEqual('Client not found');
      }
    });
  });

  describe('PATCH /client/:id', () => {
    it('should update a client', async () => {
      try {
        const res = await axios.patch(
          `${url}/client/${process.env.TEST_CLIENT_ID}`,
          { firstName: 'new name' },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_CLIENT_ID);
        expect(res.data.firstName).toBe('new name');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
    it('should return a 404 error', async () => {
      await axios
        .patch(
          `${url}/client/2c631dd2-f643-4c10-b500-6f82e14a6a1a`,
          { firstName: 'new name' },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        )
        .catch((error) => {
          expect(error.response.status).toBe(404);
          expect(error.response.data).toHaveProperty('message');
          expect(error.response.data.message).toEqual('Client not found');
        });
    });
  });

  describe('POST /brand', () => {
    it('should create a brand', async () => {
      const createBrandDto = {
        name: 'brand-1',
        shop: process.env.TEST_SHOP_ID,
      };
      try {
        const res = await axios.post(`${url}/brand`, createBrandDto, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });

        process.env.TEST_BRAND_ID = res.data.id;

        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('shop');
        expect(res.data.shop.id).toBe(createBrandDto.shop);
        expect(res.data.name).toBe(createBrandDto.name);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('GET /brand/shop/:shopId', () => {
    it('should return brands', async () => {
      try {
        const res = await axios.get(
          `${url}/brand/shop/${process.env.TEST_SHOP_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).toBeInstanceOf(Array);
        expect(res.data).toHaveLength(1);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('GET /brand/:id', () => {
    it('should return a brand', async () => {
      try {
        const res = await axios.get(
          `${url}/brand/${process.env.TEST_BRAND_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_BRAND_ID);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
    it('should return a 403 error', async () => {
      try {
        await axios.get(`${url}/brand/2c631dd2-f643-4c10-b500-6f82e14a6a1a`, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(403);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toEqual('Forbidden access');
      }
    });
  });

  describe('PATCH /brand/:id', () => {
    it('should update a brand', async () => {
      try {
        const res = await axios.patch(
          `${url}/brand/${process.env.TEST_BRAND_ID}`,
          { name: 'new name' },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_BRAND_ID);
        expect(res.data.name).toBe('new name');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('POST /bike', () => {
    it('should create a bike', async () => {
      const createBikeDto = {
        brand: process.env.TEST_BRAND_ID,
        model: 'bike-1',
        bicycode: '123456789',
        color: 'red',
        client: process.env.TEST_CLIENT_ID,
      };
      try {
        const res = await axios.post(`${url}/bike`, createBikeDto, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });

        process.env.TEST_BIKE_ID = res.data.id;

        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('brand');
        expect(res.data).toHaveProperty('client');
        expect(res.data.brand.id).toBe(createBikeDto.brand);
        expect(res.data.model).toBe(createBikeDto.model);
        expect(res.data.bicycode).toBe(createBikeDto.bicycode);
        expect(res.data.color).toBe(createBikeDto.color);
        expect(res.data.client.id).toBe(createBikeDto.client);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('GET /bike/client/:clientId', () => {
    it('should return bikes', async () => {
      try {
        const res = await axios.get(
          `${url}/bike/client/${process.env.TEST_CLIENT_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).toBeInstanceOf(Array);
        expect(res.data).toHaveLength(1);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('GET /bike/:id', () => {
    it('should return a bike', async () => {
      try {
        const res = await axios.get(`${url}/bike/${process.env.TEST_BIKE_ID}`, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_BIKE_ID);
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
    it('should return a 404 error', async () => {
      try {
        await axios.get(`${url}/bike/2c631dd2-f643-4c10-b500-6f82e14a6a1a`, {
          headers: {
            Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toEqual('Bike not found');
      }
    });
  });

  describe('PATCH /bike/:id', () => {
    it('should update a bike', async () => {
      try {
        const res = await axios.patch(
          `${url}/bike/${process.env.TEST_BIKE_ID}`,
          { model: 'new model' },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
        expect(res.data.id).toBe(process.env.TEST_BIKE_ID);
        expect(res.data.model).toBe('new model');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  it('should shop have all clients, brands', async () => {
    try {
      const res = await axios.get(`${url}/shop/${process.env.TEST_SHOP_ID}`, {
        headers: {
          Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
        },
      });

      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('id');
      expect(res.data.id).toBe(process.env.TEST_SHOP_ID);
      expect(res.data).toHaveProperty('clients');
      expect(res.data.clients).toBeInstanceOf(Array);
      expect(res.data.clients).toHaveLength(2);
      expect(res.data).toHaveProperty('brands');
      expect(res.data.brands).toBeInstanceOf(Array);
      expect(res.data.brands).toHaveLength(1);
    } catch (error) {
      console.error(error);
      expect(error).toBeUndefined();
    }
  });

  describe('DELETE /bike/:id', () => {
    it('should delete a bike', async () => {
      try {
        const res = await axios.delete(
          `${url}/bike/${process.env.TEST_BIKE_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('affected');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('DELETE /brand/:id', () => {
    it('should delete a brand', async () => {
      try {
        const res = await axios.delete(
          `${url}/brand/${process.env.TEST_BRAND_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('affected');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('DELETE /client/:id', () => {
    it('should delete a client', async () => {
      try {
        const resClient1 = await axios.delete(
          `${url}/client/${process.env.TEST_CLIENT_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );
        const resClient2 = await axios.delete(
          `${url}/client/${process.env.TEST_CLIENT_ID_2}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
            },
          }
        );

        expect(resClient1.status).toBe(200);
        expect(resClient1.data).toHaveProperty('affected');
        expect(resClient2.status).toBe(200);
        expect(resClient2.data).toHaveProperty('affected');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });

  describe('DELETE /shop/:id', () => {
    it('should delete a shop', async () => {
      try {
        const res = await axios.delete(
          `${url}/shop/${process.env.TEST_SHOP_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
            },
          }
        );

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('affected');
      } catch (error) {
        console.error(error);
        expect(error).toBeUndefined();
      }
    });
  });
});
