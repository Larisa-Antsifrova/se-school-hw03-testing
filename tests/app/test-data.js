const candidate = {
  name: 'Software Engineering School',
  email: 'software@engineering.school',
  password: 'ses12345',
};

const candidateWithWrongCreds = {
  email: 'software@engineering.school',
  password: 'ses123456',
};

const payload = {
  id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
  name: 'Software Engineering School',
  email: 'software@engineering.school',
};

const testRates = {
  target: 'UAH',
  rates: {
    BTC: 1234,
  },
};

module.exports = { candidate, candidateWithWrongCreds, payload, testRates };
