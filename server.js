require('dotenv').config();

const app = require('./app');
const { Ports } = require('./helpers/constants');

const PORT = process.env.PORT || Ports.default;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
