const express = require('express');
const createCSV = require('./parcel-scraper');
const htmlUpdate = require('./page-call');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());

async function getCSV(req, res) {
  const filePath = await createCSV.getData(req);
  res.sendFile(path.resolve(__dirname, filePath));
}

app.get('/api/csv', (req, res) => {
  console.log('request received')
  // res.sendFile(path.resolve(__dirname, './csv/export33.csv'));
  res.send('yes')
  console.log('complete')
})

app.post('/api/csv', (req, res) => {
  console.log(req.body)
  res.json(req.body)
  console.log('complete')
});

app.post('/api/html', (req, res) => {
  console.log(req.body);
  htmlUpdate.getHtml(req.body.qty);
  res.send('OK')
})

app.get('/', (req, res) => {
  console.log('this worked');
  const data = {data: "my data"};
  res.json(data);
})

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
