const express = require('express');
const db = require('./db/insert');
const ids = require('./handlers/ids');
const parcels = require('./handlers/parcels');

const app = express();
let port = process.env.PORT;

if (!port || port === "") {
  port = 5000;
}

app.use(express.json());

app.post('/api/headers', (req, res) => {
  try {
    parcels.getHeaders(req.body).then(headers => {
      res.send('OK');
      // console.log(headers)
    })
    console.log('complete')
  } catch (err) {
    res.send('no')
    console.error(err);
  }
})

app.post('/api/ids', (req, res) => {
  try {    
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

app.post('/api/parcels', (req, res) => {
  try {
    console.log('need to build')
    parcels.getParcels({ids: req.body.ids}).then(html => {
      res.send('ok')
    })
    console.log('complete')
  } catch (err) {
    console.error(err);
  }
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
