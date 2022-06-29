import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({ total }) {
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: Number(total),
                    },
                },
            ],
        });
    }
    const getResponse = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }
    return (
        <PayPalScriptProvider options={{ "client-id": "AeA04uqFWzPgWhrG-cx0BJuhxX3oy428csaKkMbP1HK68Myp4MrjIsFnC6FHWFRzlm4L-dLKVKvuaTuF" }}>

            {Number(total) !== 0 && <PayPalButtons
                createOrder={createOrder}
                onApprove={getResponse}
            />}

        </PayPalScriptProvider>
    );
}
