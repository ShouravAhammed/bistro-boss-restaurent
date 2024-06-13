import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import AddReviews from "../AddReviews";
import useFetchReviews from "../../hooks/useFetchReviews";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const FoodCard = ({ food }) => {
  const { _id, name, image, recipe, price } = food;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  // Use the useFetchReviews hook to get the reviews
  const { data: reviews = [], refetch } = useFetchReviews(_id);

  // Calculate average rating
  const reviewCount = reviews.reduce((total, item) => total + item.rating, 0);
  const averageRating = reviews.length > 0 ? reviewCount / reviews.length : 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleAddCart = () => {
    if (user && user?.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post(`/carts`, cartItem).then((res) => {
        if (res.data.insertedId) {
          Toast.fire({
            icon: "success",
            title: `${name} added to cart`,
            timer: 1500,
          });
        }
        refetch();
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card shadow-xl bg-[#F3F3F3] rounded-none col-span-1 flex justify-center items-center flex-col text-center pb-5">
      <figure>
        <img className="w-full" src={image} alt={name} />
      </figure>
      <div className="flex justify-between top-2 left-2 right-2 absolute">
        <p className="bg-[#F3F3F3CC] px-2 py-1 text-[#151515] font-bold">${price}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#F3F3F3CC] px-2 py-1 text-[#151515] font-bold"
        >
          <Rating
      style={{ maxWidth: 80 }}
      value={averageRating}
      readOnly
    />
        </button>
        <AddReviews isOpen={isOpen} closeModal={closeModal} refetch={refetch} averageRating={averageRating} id={_id} getReview={reviews} name={name} />
      </div>
      <div className="p-5 space-y-2 flex-grow">
        <h2 className="font-semibold text-xl">{name}</h2>
        <p>{recipe}</p>
      </div>
      <button
        onClick={handleAddCart}
        className="text-center px-7 pt-3 pb-2 relative rounded-lg group font-bold overflow-hidden border-b-4 border-black bg-white text-black inline-block uppercase"
      >
        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full"></span>
        <span className="relative group-hover:text-white">Add Cart</span>
      </button>
    </div>
  );
};

export default FoodCard;
