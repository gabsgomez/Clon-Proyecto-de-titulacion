

import express from "express";
import cors from "cors";
import Stripe from "stripe";

// Pon tu clave secreta de Stripe directamente aquí
const stripe = new Stripe('sk_test_51PuzKyRx0ZyVg5Xvc7HdKlV1DtAWdyAR0qX2RKNpFIWbmDzt2KfqEv7m7mxqpuTHx7Gzo2tRZENq4tcgAY24e1B700hm2K8rrN');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkout", async (req, res) => {
    try {
      console.log(req.body.lineItems);  // Agrega este log para verificar qué está recibiendo el servidor
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: "payment",
        payment_method_types: ["card"],
        success_url: "http://localhost:3000/AulaInteractiva",
        cancel_url: "http://localhost:3000/cancel",
      });
  
      res.status(201).json(session);
    } catch (error) {
      console.error(error);  // Agrega este log para ver el error detallado
      res.status(500).json({ message: "Error creando la sesión", error });
    }
  });
  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
