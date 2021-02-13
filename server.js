const express = require('express');

const bodyParser = require('body-parser');

const wordRouter = require('./routers/words_api_router');
const app = express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}));


app.use('/word', wordRouter);

const PORT = 7007;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
module.exports = app;
