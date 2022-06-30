import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { NotificationAtom } from "../SharedState/NotificationAtom"
import { useRecoilState } from "recoil"
import { useCookies } from "react-cookie"
import { cartAtom } from "../SharedState/cartAtom";
import React, { useContext } from "react"
import { context } from "../../index"
import axios from "axios"
export default function Paypal({ total, orderData }) {
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const [productNumber, setProductNumber] = useRecoilState(cartAtom)
    const [cookie, setCookie] = useCookies()
    const { url } = useContext(context)
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
            if (details.status === "COMPLETED") {
                axios.post(url + "/createOrder.php", orderData)
                setCookie("c_r", [], { maxAge: 7 * 24 * 60 * 60 })
                setProductNumber(0)
                setNotification({
                    ...notification,
                    visible: true,
                    message: "Payment was successful",
                    type: "success"
                })
            }
        });
    }

    const cancelPurchase = () => {
        setNotification({
            ...notification,
            visible: true,
            message: "You canceled the payment",
            type: "warning"
        })
    }

    return (
        <PayPalScriptProvider options={{ "client-id": "AeA04uqFWzPgWhrG-cx0BJuhxX3oy428csaKkMbP1HK68Myp4MrjIsFnC6FHWFRzlm4L-dLKVKvuaTuF" }}>

            {Number(total) !== 0 && <PayPalButtons
                createOrder={createOrder}
                onApprove={getResponse} onCancel={cancelPurchase}
            />}

        </PayPalScriptProvider>
    );
}
