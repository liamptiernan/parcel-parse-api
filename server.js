const express = require('express');
const compression = require('compression');
const cors = require('cors');

const ids = require('./handlers/ids');
const parcels = require('./handlers/parcels');
const lists = require('./handlers/lists');

const app = express();
let port = process.env.PORT;

if (!port || port === "") {
  port = 5000;
}

app.use(express.json());
app.use(compression());

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.headers.authorization === 'ZunderBunder2558') {
    next()
  } else {
    res.sendStatus(401);
  }
})

app.post('/api/headers', (req, res) => {
  try {
    parcels.writeHeaders(req.body).then(headers => {
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
    parcels.writeParcels(req.body).then(updates => {
      res.send(updates)
      console.log('complete')
    })
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/parcels', (req, res) => {
  parcels.getParcels(req.query).then(parcelRes => {
    if (parcelRes.records.queryError) { throw new Error() }
    res.send(parcelRes);
    console.log('complete')
  }).catch(err => {
    res.sendStatus(404)
    console.log(err);
  })
});

app.post('/api/list', (req, res) => {
  lists.updateList(req.body).then(list => {
    if (list && !list.error) {
      res.status(201).send(list);
    } else {
      throw new Error();
    }
  }).catch(err => {
    res.status(500).send('Error Occurred.');
  });
});

app.get('/api/list', (req, res) => {
  lists.getListParcels(req.body).then(parcels => {
    if (parcels && !parcels.error) {
      res.send(parcels)
    } else {
      throw new Error();
    }
  }).catch(err => {
    res.status(404).send('Error Occurred')
  });
});

app.get('/api/list-names', (req, res) => {
  // TODO: add list names endpoint
})

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
