import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Lista de productos
const products = [
  { id: 1, description: "Curso de principiantes.", price: "24000.00", tipo: "P" },
  { id: 2, description: "Curso avanzado.", price: "45000.00", tipo: "Av" },
  { id: 3, description: "Asesoría financiera personalizada.", price: "7000.00", tipo: "F" },
];

const Caja = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado inicialmente nulo
  const [userType, setUserType] = useState(""); // Tipo del usuario
  const navigate = useNavigate();

  // Inicializa Mercado Pago
  initMercadoPago("TEST-144027e0-809b-4e58-a14c-0d2eb320a78d", {
    locale: "es-MX",
  });

  // Función para obtener el tipo de usuario más reciente desde el backend
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        // Llamada al backend para obtener el tipo de usuario más reciente
        const response = await axios.get("http://localhost:5000/api/latest-user-type");
        setUserType(response.data.tipo); // Guarda el tipo de usuario

        // Establece el producto predeterminado basado en el tipo de usuario
        const defaultProduct = products.find(product => product.tipo === response.data.tipo);
        setSelectedProduct(defaultProduct); // Asigna el producto predeterminado según el tipo de usuario
      } catch (error) {
        console.error("Error al obtener el tipo de usuario:", error);
      }
    };

    fetchUserType(); // Obtiene el tipo de usuario más reciente al cargar el componente
  }, []); // Vacío para ejecutarse solo al cargar el componente por primera vez

  // Verifica que el producto esté seleccionado correctamente
  console.log("userType:", userType); 
  console.log("selectedProduct:", selectedProduct);

  const createPreference = async (product) => {
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
    }
  };

  return (
    <>
      <div className="contenedor-caja">
        <h1 className="Formas-de-pago">Selecciona un producto:</h1>

        <select
          className="select-a-pagar"
          onChange={(e) => {
            const product = products.find((p) => p.id === parseInt(e.target.value));
            setSelectedProduct(product); // Actualiza el producto seleccionado
            setPreferenceId(null); // Reinicia el preferenceId si se cambia el producto
          }}
          value={selectedProduct ? selectedProduct.id : ""}
        >
          {products
            .filter((product) => product.tipo === userType) // Solo muestra productos relacionados con el tipo de usuario
            .map((product) => (
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

