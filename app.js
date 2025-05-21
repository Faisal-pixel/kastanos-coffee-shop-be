import express from 'express';
import menuRoutes from "./src/routes/v1/menu/menu.js"

const app = express();

app.use(express.json());

//Routes

app.use('/v1/menu', menuRoutes);
// app.use('/v1/orders')

app.get('/', (req, res) => {
  res.send('Welcome to Kastanos Coffee Backend API');
});


export default app;