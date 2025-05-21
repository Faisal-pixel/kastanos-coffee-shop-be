import express from 'express';
import menuRoutes from "./src/routes/v1/menu/menu.js"
import paymentsRoutes from "./src/routes/v1/payments/payments.route.js";

const app = express();

app.use(express.json());

//Routes
console.log("Routes are being used");
app.use('/v1/menu', menuRoutes);
app.use('/v1/payments', paymentsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Kastanos Coffee Backend API');
});


export default app;