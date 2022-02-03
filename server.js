const express = require('express');
const db = require('./db/db_test');
const ids = require('./handlers/ids');

const app = express();
let port = process.env.PORT;

if (!port || port === "") {
  port = 5000;
}

app.use(express.json());

app.get('/api/db', (req, res) => {
  try {
    db.dbTest().then(dbRes => console.log(dbRes)).catch(err => {console.log(err)})
  } catch (err) {
    console.log('nope')
  }
  res.send('ok')
});

app.post('/api/ids', (req, res) => {
  try {
    res.send('ok')
    console.log(req.body.min)
    
    let idRange
    if (req.body) {
      idRange = {
        min: req.body.min,
        max: req.body.max
      }
    }

    ids.getIds(idRange)
    res.send('Complete');
  } catch (err) {
    console.error(err);
  }
})

app.get('/health', (req, res) => {
  res.send('OK');
})

app.get('/', (req, res) => {
  console.log('this worked');
  const data = {data: "my data"};
  res.json(data);
})

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
