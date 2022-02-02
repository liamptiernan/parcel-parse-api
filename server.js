const express = require('express');
const db = require('./db/db_test');

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
