import axios from "axios";
import express from "express";
import env from "../../../config/env_variables.js";

const router = express.Router();

router.post('/initiate', async (req, res) => {
    console.log("Request body: ", req.body);
    const {email, amount} = req.body;
    
    if (!email || !amount) {
        return res.status(400).json({error: "Email and amount are required"});
    }

    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
        email,
        amount,
    }, {
        headers: {
            Authorization: `Bearer ${env.paystackApiKey}`,
            "Content-Type": "application/json",
        }
    })
 
    const {access_code, authorization_url, reference} = response.data;
    console.log(data);
    // We make a post reques to paystack, and we receive an access code
})


export default router;