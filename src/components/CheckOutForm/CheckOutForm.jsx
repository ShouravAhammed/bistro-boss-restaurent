import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useSweetAlert from "../../hooks/useSweetAlert";
import useCart from "../../hooks/useCart";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";



const CheckOutForm = () => {

    const navigate = useNavigate();
    const Toast = useSweetAlert();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState();
    const [transactionId , setTransactionId] = useState();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() =>{
      if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
      })
      }
    }, [axiosSecure, totalPrice])



    const handlePayment = async (e) => {
        e.preventDefault();
        console.log("Payment button clicked");

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement)

        if(card === null){
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log("payment method error",error);
            if(error.message){
              Toast.fire({
                icon: "error",
                title: `${error.message}`
              });
            }
        }else{
            console.log("payment method",paymentMethod);
        }

        const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user.displayName || 'anonymous',
              email: user.email || 'anonymous',
            }
          }
        })
        if(confirmError){
          console.log('payment error', confirmError);
        }
        if(paymentIntent){
          console.log('payment success', paymentIntent);
          if(paymentIntent.status === 'succeeded'){
            console.log('transaction Id', paymentIntent.id);
            setTransactionId(paymentIntent.id)

            // now save the payment in the database 
            const payment = {
              email: user.email,
              price: totalPrice,
              transactionId: paymentIntent.id, 
              date: new Date(),  // utc date convert. use moment js 
              cartIds: cart.map(item => item._id),
              menuItemIds: cart.map(item => item.menuId),
              status: 'pending'
            }

            const res = await axiosSecure.post('/payments', payment)
            console.log('payment saved' , res.data);
            refetch();
            if(res.data?.paymentResult?.insertedId){
              Toast.fire({
                icon: "success",
                title: "Payment Successful"
              });
              // navigate
            navigate('/dashboard/paymentHistory')
            }
            

          }
        }

    }
    return (
        <form onSubmit={handlePayment} className="space-y-5">
        <CardElement className="border-2 border-red-400 p-4"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="text-center">
      <button type="submit" disabled={!stripe || !clientSecret}
              className="btn text-center px-7 pt-3 pb-2 relative rounded-none group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
              <span className="relative group-hover:text-[#D1A054]">
                 Payment
              </span>
            </button>
            <p className="text-base text-blue-600 mt-5">
            {
              transactionId &&
              `Your transaction Id: ${transactionId}`
            }
            </p>
      </div>
        </form>
    );
};

export default CheckOutForm;