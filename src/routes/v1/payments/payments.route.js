import express from "express";
import { initializePayment } from "../../../controllers/v1/payments/payment.controllers.js";

const router = express.Router();

router.post("/initiate", initializePayment);

router.get("/callback", async (req, res) => {
  // Handle the callback from Paystack here
  // This is where you would verify the payment status

  const { reference } = req.query;
  if (!reference) {
    return res.status(400).json({ error: "Reference is required" });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${env.paystackApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if(!response.data.status) {
      return res.status(400).json({ error: "Invalid reference" });
    }

    const { status, data } = response.data;
    if (status && data.status === "success") {
      // Payment was successful, handle accordingly
      console.log("Payment successful:", data);
      // You can update your database or perform other actions here
    } else {
      console.log("Payment failed or pending:", data);
      // Handle failed or pending payments
    }
  } catch (error) {
    
  }
  res.status(200).json({ message: "Payment callback received" });
});

export default router;
