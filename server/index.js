require("dotenv").config();
const express = require("express");
const app = express();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const PORT = process.env.PORT || 5000; // 4242, 3000, 4000, 8080


app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post( "/create-payment-intent", async ( req, res ) => {
    try {
      // Getting data from client
      let { amount, name, email } = req.query; // req.body;

      // Simple validation
      if (!amount && !name)
        return res.status(400).json({ message: "All fields are required" });
      
      amount = parseInt(amount);
      // Initiate payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "gbp",
        payment_method_types: ["card"],
        metadata: { name, email },
      });
      // Extracting the client secret 
      const clientSecret = paymentIntent.client_secret;
      // Sending the client secret as response
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      // Catch any error and send error 500 to client
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });