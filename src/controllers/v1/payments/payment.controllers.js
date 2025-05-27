import axios from "axios";
import env from "../../../config/env_variables.js";

export const initializePayment = async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  const amountInKobo = `${amount * 100}`; // Convert amount to kobo
  console.log(
    "Amount in kobo: ",
    amountInKobo,
    "typeof amountInKobo",
    typeof amountInKobo
  );

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amountInKobo, // Paystack expects the amount in kobo
        callback_url: "http://localhost:8080/payment-completion",
        // call_back_url: `${env.baseUrl}/api/v1/payments/callback`, // Ensure this URL is correct
      },
      {
        headers: {
          Authorization: `Bearer ${env.paystackApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { status, message, data } = response.data;
    console.log("Payment status from response", status, "Message", message);
    if (status !== true) {
      return res
        .status(500)
        .json({ error: "Error initiating payment", message: message });
    }
    const { authorization_url, access_code, reference } = data;
    console.log(authorization_url);
    res.status(200).json({
      access_code,
      authorization_url,
    });
  } catch (error) {
    console.error("Error initiating payment: ", error);
    if (error.response) {
      return res.status(error.response.status).json({
        error: "Error initiating payment",
        message: error.response.data.message,
      });
    }
    return res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred",
    });
  }
};
