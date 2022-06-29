import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({total}) {
  const roundPrice = (price) => {
    price = price + ""
    if (price.indexOf(".") != -1) {
        price = price.slice(0, price.indexOf(".") + 5)
    }
    return Number(price)
  }
  console.log(roundPrice(total))
    return (
        <PayPalScriptProvider options={{ "client-id": "test" }}>

            {roundPrice(total)&&<PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: 30000,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />}
        </PayPalScriptProvider>
    );
}
