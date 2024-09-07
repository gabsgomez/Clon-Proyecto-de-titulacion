import express from "express";
import cors from "cors";



// Configura las credenciales de Mercado Pago

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-5671825137719752-090515-ccee7549724eb1f9776d0b0affa84d5b-672353286",
});

//ACCESS TOKEN QUE COTTAGGEE= TEST-5671825137719752-090515-ccee7549724eb1f9776d0b0affa84d5b-672353286
const app = express();
const port = 4000; // Asegúrate de que el puerto sea 5000

app.use(cors());
app.use(express.json());

app.get("/mercadopago", (req, res) => {
  res.send("soy el servidor :)");
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
        },
      ],
      back_urls: {
        success: "https://mercadopago.com",
        failure: "https://localhost:3000/cancel",
        pending: "https://localhost:3000/Caja",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error.response ? error.response.data : error.message);

    res.status(500).send("Error al crear la preferencia");
  }
});



app.listen(port, () => {
  console.log(`El servidor corre en el puerto ${port}`);
});


///////////////////////////////////////////////////////////////



