let express = require('express');
let moment = require('moment');
let jsonHtml = require('json-pretty-html').default;


let app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let db = [];

app.get('/', (req, res) => {
  let html = jsonHtml(db);
  res.send(html);
});

app.post('/', (req, res) => {
  let telemetry = req.body;
  db.push({...telemetry, created:Date.now()});
  res.send(`Telemetry received on ${moment().format()}`);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});