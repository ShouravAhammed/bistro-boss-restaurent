import { ImBin } from "react-icons/im";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ManageItems = () => {

    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();


    const handleItemDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data)
                if(res.data.deletedCount > 0){
                    // refetch data
                    refetch()
                    // alert successfully deleted item
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                  
                }
            }
          })
    }

    return (
        <section>
            <div className="text-center my-10">
                <SectionTitle subHeading={'---Hurry Up---'} heading={'Manage all items'}></SectionTitle>
            </div>

            <div className="bg-white p-10 m-10">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-Cinzel text-[#151515] font-bold">Total Items: {menu.length}</h3>
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
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        menu.map((item, index) => <tr key={item._id} className="text-base font-normal text-[#737373]">
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
        <th><Link to={`/dashboard/updateItems/${item._id}`} className="btn rounded-lg text-white bg-[#D1A054] text-xl hover:bg-yellow-800 duration-300"><FaRegEdit /></Link></th>
        <th>
          <button onClick={() => handleItemDelete(item)} className="btn rounded-lg text-white bg-red-600 text-xl hover:bg-red-800 duration-300"><ImBin /></button>
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

export default ManageItems;