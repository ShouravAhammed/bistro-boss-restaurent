import { ImBin } from "react-icons/im";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, items) => total + items.price, 0)

    const handleItemDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    console.log(res.data)
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                        //   refetch the data 
                        refetch();
                    }

                })
            }
          })          
    }


    
    return (
        <section className="">
            <div className="text-center my-10">
                <SectionTitle subHeading={'---My Cart---'} heading={'Wanna Add More?'}></SectionTitle>
            </div>

            <div className="bg-white p-10 m-10">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-Cinzel text-[#151515] font-bold">Total Orders: {cart.length}</h3>
                    <h3 className="text-2xl font-Cinzel text-[#151515] font-bold">Total Price: ${totalPrice}</h3>
                    {
                      cart.length ?
                      <Link to={'/dashboard/payment'}>
                    <button className="btn btn-primary">Pay</button>
                    </Link>
                    :
                    <button disabled className="btn btn-primary">Pay</button>
                    }
                </div>
                <div className="overflow-x-auto">
  <table className="table mt-5 ">
    {/* head */}
    <thead>
      <tr className="bg-[#D1A054] text-base text-white uppercase rounded-t-xl">
        <th></th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item, index) => <tr key={item._id} className="text-base font-normal text-[#737373]">
            <th>
          <p className="text-[#151515] font-bold">{index + 1}</p>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-16 h-16">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item.name}
        </td>
        <td>{item.price}</td>
        <th>
          <button onClick={() => handleItemDelete(item._id)} className="p-3 rounded-lg text-white bg-red-600 text-xl hover:bg-red-800 duration-300"><ImBin /></button>
        </th>
        </tr>)
      }
    </tbody>
  </table>
</div>
            </div>

        </section>
    );
};

export default Cart;