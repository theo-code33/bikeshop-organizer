import axios from 'axios';
import 'dotenv/config';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';

  // Login the admin user to test the admin role
  await axios
    .post('http://localhost:8000/api/auth/login', {
      email: process.env.ADMIN_USER_EMAIL,
      password: process.env.ADMIN_USER_PASSWORD,
    })
    .then((res) => {
      process.env.ADMIN_USER_TOKEN = res.data.token;
      console.log('✅ Admin user correctly logged in');
    })
    .catch((error) => {
      console.error(error);
    });

  // Create this test user to test the shop role
  await axios
    .post('http://localhost:8000/api/auth/register', {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    })
    .then((res) => {
      process.env.TEST_USER_ID = res.data.user.id;
      process.env.TEST_USER_TOKEN = res.data.token;
      console.log('✅ Test user correctly registered');
    })
    .catch((error) => {
      console.error(error);
    });

  // Create this test user to test the user role
  await axios
    .post('http://localhost:8000/api/auth/register', {
      email: process.env.TEST_USER_EMAIL_2,
      password: process.env.TEST_USER_PASSWORD_2,
    })
    .then((res) => {
      process.env.TEST_USER_ID_2 = res.data.user.id;
      process.env.TEST_USER_TOKEN_2 = res.data.token;
      console.log('✅ Test user 2 correctly registered');
    })
    .catch((error) => {
      console.error(error);
    });
};
