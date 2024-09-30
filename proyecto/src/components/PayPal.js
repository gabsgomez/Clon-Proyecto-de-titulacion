
/*
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PayPal = () => {
  const paypal = useRef();
  const buttonRendered = useRef(false); // Ref para verificar si los botones ya fueron renderizados
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  useEffect(() => {
    if (selectedProduct && !buttonRendered.current) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: selectedProduct.description,
                  amount: {
                    currency_code: "MXN",
                    value: selectedProduct.price,
                  },
                },
              ],
            });
          },

          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);

      buttonRendered.current = true; // Marcar como renderizado
    }
  }, [selectedProduct]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div ref={paypal}></div>
      {!selectedProduct && <p>Selecciona un producto primero.</p>}
    </div>
  );
};

export default PayPal;
*/





// Funciona con el WEBHOOK//
/*
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PayPal = () => {
  const paypal = useRef();
  const buttonRendered = useRef(false); 
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  useEffect(() => {
    if (selectedProduct && !buttonRendered.current) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: selectedProduct.description,
                  amount: {
                    currency_code: "MXN",
                    value: selectedProduct.price,
                  },
                },
              ],
            });
          },

          onApprove: async (data, actions) => {
            // Capturar el pago
            const order = await actions.order.capture();
            
            // Obtener el correo del pagador (usuario que paga)
            const payerEmail = order.payer.email_address; // Correo del pagador
            const payerName = order.payer.name.given_name + " " + order.payer.name.surname; // Nombre del pagador
            const orderId = order.id;

            console.log("Correo del pagador:", payerEmail);
            console.log("Nombre del pagador:", payerName);

            // Enviar el correo al backend
            fetch('/api/store-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: payerEmail, orderId }),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Correo almacenado en el servidor:', data);
            })
            .catch(error => {
              console.error('Error al almacenar el correo:', error);
            });
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);

      buttonRendered.current = true;
    }
  }, [selectedProduct]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div ref={paypal}></div>
      {!selectedProduct && <p>Selecciona un producto primero.</p>}
    </div>
  );
};

export default PayPal;
*/












import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PayPal = () => {
  const paypal = useRef();
  const buttonRendered = useRef(false); 
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  useEffect(() => {
    if (selectedProduct && !buttonRendered.current) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: selectedProduct.description,
                  amount: {
                    currency_code: "MXN",
                    value: selectedProduct.price,
                  },
                },
              ],
            });
          },

          onApprove: async (data, actions) => {
            // Capturar el pago
            const order = await actions.order.capture();
            
            // Obtener el correo del pagador (usuario que paga)
            const payerEmail = order.payer.email_address; // Correo del pagador
            const payerName = order.payer.name.given_name + " " + order.payer.name.surname; // Nombre del pagador
            const orderId = order.id;

            console.log("Correo del pagador:", payerEmail);
            console.log("Nombre del pagador:", payerName);

            // Enviar el correo al backend
            fetch('/api/store-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: payerEmail, orderId }),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Correo almacenado en el servidor:', data);
            })
            .catch(error => {
              console.error('Error al almacenar el correo:', error);
            });
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);

      buttonRendered.current = true;
    }
  }, [selectedProduct]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div ref={paypal}></div>
      {!selectedProduct && <p>Selecciona un producto primero.</p>}
    </div>
  );
};

export default PayPal;

