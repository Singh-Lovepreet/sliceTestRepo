const express = require('express');

const bodyParser = require('body-parser');

const wordRouter = require('./routers/words_api_router');
const app = express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}));


let httpLogger = (req, res, next) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] ${method}:${url} ${status}`;
  console.log(log);
  next();
};
app.use(httpLogger);


app.use('/word', wordRouter);

const PORT = 7007;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
module.exports = app;
