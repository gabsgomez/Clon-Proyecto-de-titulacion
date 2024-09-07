

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
