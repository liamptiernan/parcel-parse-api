const express = require('express');

const app = express();
let port = process.env.PORT;

if (port == null || port == "") {
  port = 5000;
}

app.use(express.json());

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
  res.send('OK')
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
