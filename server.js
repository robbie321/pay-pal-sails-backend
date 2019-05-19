const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

const history = require('connect-history-api-fallback');

app.use(history());
app.use(express.static(`${__dirname}/dist/`));
app.get(/.*/, (req, res) => {
  res.sendfile(`${__dirname}/dist/index.html`);
});
app.listen(port);

console.log('Server started...');
