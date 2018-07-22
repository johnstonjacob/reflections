const express = require('express');
const dotenv = require('dotenv');

require('./database/index');
require('./api/slack');

dotenv.config({ silent: true });

const app = express();
const PORT = process.env.PORT || 8085;

app.use((req, _, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

if (process.env.BUILD === 'PRODUCTION') {
  app.use('/reflections', express.static(`${__dirname}/../dist`));
}

require('./authentication')(app);

app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
