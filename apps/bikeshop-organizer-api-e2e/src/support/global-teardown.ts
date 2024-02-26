/* eslint-disable */

import axios from 'axios';
import 'dotenv/config';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  console.log(globalThis.__TEARDOWN_MESSAGE__);
  try {
    await axios.delete(
      `http://localhost:8000/api/user/${process.env.TEST_USER_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
        },
      }
    );
    await axios.delete(
      `http://localhost:8000/api/user/${process.env.TEST_USER_ID_2}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
        },
      }
    );
    console.log('✅ Users test correctly deleted');
  } catch (error) {
    console.error(error);
  }
};
