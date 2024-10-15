import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { loadStripe } from "@stripe/stripe-js";

const Caja = () => {
  const [precios, setPrecios] = useState([]); // Almacenar los productos de la base de datos
  const [preferenceId, setPreferenceId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado inicialmente nulo
  const navigate = useNavigate();

  // Inicializa Mercado Pago
  initMercadoPago("TEST-144027e0-809b-4e58-a14c-0d2eb320a78d", {
    locale: "es-MX",
  });

  // Obtener productos desde la base de datos usando Fetch
  useEffect(() => {
    const fetchPrecios = async () => {
      try {
        // Llamada a la API para obtener los precios con Fetch
        const response = await fetch("http://localhost:5000/api/auth/precios");
        const data = await response.json();
        setPrecios(data); // Almacena los productos en el estado

        // Selecciona automáticamente el primer producto si no hay ninguno seleccionado
        if (data.length > 0) {
          setSelectedProduct(data[0]); // Selecciona el primer producto
        }

        console.log("Productos obtenidos:", data); // Verificación
      } catch (error) {
        console.error("Error al obtener los precios desde la base de datos:", error);
      }
    };

    fetchPrecios(); // Llama a la función al cargar el componente
  }, []);

  const createPreference = async (product) => {
    try {
      // Usamos Fetch para crear la preferencia de pago
      const response = await fetch("http://localhost:4000/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.description,
          quantity: 1,
          price: product.price,
        }),
      });
      const data = await response.json();
      setPreferenceId(data.id); // Guarda el ID de la preferencia de Mercado Pago
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    if (selectedProduct) {
      await createPreference(selectedProduct); // Usa el producto seleccionado para Mercado Pago
    }
  };

  const stripePromise = loadStripe("pk_test_51PuzKyRx0ZyVg5Xvtxkp0mMaY1sTcoz4j6NNg6PdM6r7u8QH8UrVbQS0Jqe6yfT396Z3fEriu0Etb0VKDm9bLarR00zlvMIXH8");

  const handleCheckout = async () => {
    if (selectedProduct) {
      const lineItems = [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: selectedProduct.description, // Asegura que el producto seleccionado sea el correcto
            },
            unit_amount: parseInt(selectedProduct.price) * 100, // Precio en centavos
          },
          quantity: 1,
        },
      ];

      try {
        // Usamos Fetch para la solicitud de checkout
        const response = await fetch("http://localhost:3001/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lineItems }),
        });
        const data = await response.json();
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
    }
  };

  return (
    <>
      <div className="contenedor-caja">
        <h1 className="Formas-de-pago">Selecciona un producto:</h1>

        <select
          className="select-a-pagar"
          onChange={(e) => {
            const product = precios.find((p) => p.id === parseInt(e.target.value));
            setSelectedProduct(product); // Actualiza el producto seleccionado
            setPreferenceId(null); // Reinicia el preferenceId si se cambia el producto
          }}
          value={selectedProduct ? selectedProduct.id : ""}
        >
          {/* Muestra todos los productos disponibles */}
          {precios.map((product) => (
            <option key={product.id} value={product.id}>
              {product.description}
            </option>
          ))}
        </select>

        <div>
          <h2>Descripción: {selectedProduct ? selectedProduct.description : "Selecciona un producto"}</h2>
          <p>Monto a pagar: ${selectedProduct ? selectedProduct.price : 0} MXN</p>
        </div>

        {/* Botones de Pago - Siempre visibles */}
        <button className="stripe" onClick={handleCheckout}>Stripe</button>
        <br />
        <button onClick={handleBuy} className="mercado-pago">Mercado Pago</button>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        <br />
        <button
          className="PayPal"
          onClick={() => {
            if (selectedProduct) {
              navigate("/PayPal", { state: { selectedProduct } });
            }
          }}
        >
          PayPal
        </button>
      </div>
    </>
  );
};

export default Caja;
