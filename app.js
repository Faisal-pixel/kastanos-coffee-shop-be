import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Kastanos Coffee Backend API');
});

export default app;