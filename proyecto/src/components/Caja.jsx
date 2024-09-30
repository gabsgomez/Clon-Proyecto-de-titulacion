


import React, { useState, useEffect } from "react";
import "./Caja.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { loadStripe } from "@stripe/stripe-js";

const products = [
  { id: 1, description: "Curso de principiantes.", price: "24000.00", tipo: "P" },
  { id: 2, description: "Curso avanzado.", price: "45000.00", tipo: "Av" },
  { id: 3, description: "Asesoría financiera personalizada.", price: "7000.00", tipo: "F" },
];

const Caja = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [userType, setUserType] = useState(""); // Tipo del usuario
  const navigate = useNavigate();
  const userId = "id_del_usuario"; // Obtén el id del usuario desde el sistema de autenticación

  // Inicializa Mercado Pago
  initMercadoPago("TEST-144027e0-809b-4e58-a14c-0d2eb320a78d", {
    locale: "es-MX",
  }); //public key cottaggee
  

  useEffect(() => {
    // Obtén el tipo de usuario desde el backend
    axios.get(`/api/alumnos/${userId}`).then((response) => {
      setUserType(response.data.tipo);
    }).catch(error => {
      console.error("Error al obtener el tipo de usuario:", error);
    });
  }, [userId]);

  const createPreference = async (product) => {
    if (product.tipo === userType) {
      alert("Ya has pagado este curso y no puedes volver a pagarlo.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/create_preference", {
        title: product.description,
        quantity: 1,
        price: product.price,
      });
      const { id } = response.data;
      setPreferenceId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    await createPreference(selectedProduct);
  };

  ////stripe
  const stripePromise = loadStripe('pk_test_51PuzKyRx0ZyVg5Xvtxkp0mMaY1sTcoz4j6NNg6PdM6r7u8QH8UrVbQS0Jqe6yfT396Z3fEriu0Etb0VKDm9bLarR00zlvMIXH8');

  const handleCheckout = async () => {
    const lineItems = [{
      price_data: {
        currency: "mxn",
        product_data: {
          name: selectedProduct.description,  // Solo el producto seleccionado
        },
        unit_amount: parseInt(selectedProduct.price) * 100,  // Asegúrate de que el precio sea numérico y en centavos
      },
      quantity: 1,  // Puedes mantener la cantidad fija en 1 si solo es un producto
    }];

    try {
      const { data } = await axios.post("http://localhost:3001/checkout", { lineItems });
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (error) {
        console.error("Error en la redirección al checkout:", error);
      }
    } catch (error) {
      console.error("Error durante la solicitud de checkout:", error);
    }
  };

  return (
    <>
      <div className="contenedor-caja">
        <h1 className="Formas-de-pago">Selecciona un producto:</h1>

        <select
          className="select-a-pagar"
          onChange={(e) => {
            const product = products.find(
              (p) => p.id === parseInt(e.target.value)
            );
            setSelectedProduct(product);
            setPreferenceId(null); // Reinicia el preferenceId si se cambia el producto
          }}
          value={selectedProduct.id}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id} disabled={product.tipo === userType}>
              {product.description}
            </option>
          ))}
        </select>

        <div>
          <h2>Descripción: {selectedProduct.description}</h2>
          <p>Monto a pagar: ${selectedProduct.price} MXN</p>
        </div>

        <button className="stripe" onClick={handleCheckout}>Stripe</button>
        <br />
        <button onClick={handleBuy} className="mercado-pago">Mercado Pago</button>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        <br />
        <button
          className="PayPal"
          onClick={() => {
            navigate("/PayPal", { state: { selectedProduct } });
          }}
        >
          PayPal
        </button>
      </div>
    </>
  );
};

export default Caja;
