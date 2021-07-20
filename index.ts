import express from 'express';
import { requests } from './my-class';

const app = express();
const port = 3001;

app.get('/', async (req, res) => {
  try {
    const response = await requests.randomFunctionOne();

    res.send({ message: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

app.get('/conciliation/transactions', (req, res) => {
  console.log(req.query);

  res.send({ message: 'ok' });
})

app.get('/conciliation/transactions/summary', (req, res) => {
  console.log(req.query);

  res.send({ message: 'ok' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
