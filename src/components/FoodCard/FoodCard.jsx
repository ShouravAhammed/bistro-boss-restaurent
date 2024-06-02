import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({food}) => {
    const {_id, name, image, recipe, price} = food
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    const handleAddCart = () => {
      // console.log(foodCart, user.email);
      if(user && user?.email) {
        // send cart item to the database
        const cartItem = {
          menuId: _id,
          email: user.email,
          name,
          image,
          price,
        }
      axiosSecure.post(`/carts`, cartItem)
      .then(res => {
        console.log(res.data)
        if(res.data.insertedId){
          Toast.fire({
            icon: "success",
            title: `${name} added to cart`,
            timer: 1500,
          });
        }
        // refetch count update data 
        refetch();
      })

      }else{
        Swal.fire({
          title: "You are not Logged In",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state: {from: location}})
          }
        });
        
      }
    }


    return (
        <div className="card shadow-xl bg-[#F3F3F3] rounded-none col-span-1 flex justify-center items-center flex-col text-center pb-5">
  <figure><img className="w-full" src={image} alt="Shoes" /></figure>
  <p className="absolute top-0 right-0 mt-3 mr-3 bg-[#151515] px-2 py-1 text-white font-bold">${price}</p>
  <div className="p-5 space-y-2 flex-grow">
    <h2 className="font-semibold text-xl">{name}</h2>
    <p>{recipe}</p>
  </div>
  <button onClick={handleAddCart}
              to={"/menu"}
              className=" text-center px-7 pt-3 pb-2 relative rounded-lg group font-bold overflow-hidden border-b-4 border-black bg-white text-black inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full"></span>
              <span className="relative group-hover:text-white">
                Add Cart
              </span>
    </button>
</div>
    );
};

export default FoodCard;