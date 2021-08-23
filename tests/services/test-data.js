const tokenExample =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MjYxMmE2LTg2ZDktNGM0YS1hYjk3LTU3ODlkYzg5ZTg0YyIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0MkBtYWlsLmNvbSIsImlhdCI6MTYyOTUwMTE0NiwiZXhwIjoxNjI5NTE1NTQ2fQ.iy3yeci1QjbKU1rz3hC2y0HfvG3FDGSOIEOayDxjH2Y';

const submittedPassword = 'ses12345';
const hashedPassword =
  '$2a$08$hJDFnQNFK0LKglVazvqnsuHmL8u/XfuFNDFQCxKVR72kCuL2LthEi';

const candidate = {
  email: 'software@engineering.school',
  password: 'ses12345',
};

const savedUser = {
  id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
  name: 'Software Engineering School',
  email: 'software@engineering.school',
};

const currentUser = {
  id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
  name: 'Software Engineering School',
  email: 'software@engineering.school',
  token: tokenExample,
};

const ratesExample = {
  timestamp: 1629577925,
  target: 'UAH',
  rates: {
    BTC: 1304410.150852,
  },
};

module.exports = {
  candidate,
  savedUser,
  currentUser,
  tokenExample,
  submittedPassword,
  hashedPassword,
  ratesExample,
};
