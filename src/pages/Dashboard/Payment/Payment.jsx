
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../../components/CheckOutForm/CheckOutForm";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const Payment = () => {
    const {user} = useAuth();
    const [cart] = useCart();
    const axiosSecure = useAxiosSecure();
    // : added publishable key and .env file
        const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`)
        const totalPrice = cart.reduce((total, item) => total + item.price, 0)

        const handlePayment = async() => {
            console.log("Payment Successfull")

            // now save the payment in the database 
            const payment = {
                email: user?.email,
                price: totalPrice,
                date: new Date(),  // utc date convert. use moment js 
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
              }

            const res = await axiosSecure.post('/sslPayments', payment)
            window.location.replace(res.data?.url)
            console.log(res.data)
        }

    return (
        <section className="container mx-auto px-4">
            <div className="my-20">
            <SectionTitle subHeading={"---Please pay to eat---"} heading={"Payment"}></SectionTitle>
            </div>
            <div className="md:w-4/5 w-full mx-auto p-10 bg-white">
                <div className="my-10">
                    <button onClick={handlePayment} className="btn">Bkash</button>
                </div>
                <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
                </div>
            </div>
        </section>
    );
};

export default Payment;