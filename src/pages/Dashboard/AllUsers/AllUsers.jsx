import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const {refetch, data : users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure(`/allUsers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return res.data;
        }
    })

    const handleUserDelete = async (id) => {
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
                axiosSecure.delete(`/deleteUser/${id}`)
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

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, admin!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                .then(res => {
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "admin!",
                            text: "Your user to be Admin.",
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
                <SectionTitle subHeading={'---How Many?---'} heading={'Manage All Users'}></SectionTitle>
            </div>

            <div className="bg-white p-10 m-10">
                <div className="flex justify-start items-center">
                    <h3 className="text-2xl font-Cinzel text-[#151515] font-bold">Total Users: {users.length}</h3>
                </div>
                <div className="overflow-x-auto">
  <table className="table mt-5 ">
    {/* head */}
    <thead>
      <tr className="bg-[#D1A054] text-base text-white uppercase rounded-t-xl">
        <th></th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user, index) => <tr key={user._id} className="text-base font-normal text-[#737373]">
            <th>
          <p className="text-[#151515] font-bold">{index + 1}</p>
        </th>
        <td>
          {user.name}
        </td>
        <td>{user.email}</td>
        <td>
        {
            user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="p-3 rounded-lg text-white bg-[#D1A054] text-xl hover:bg-yellow-800 duration-300"><FaUsers /></button>
        }
        </td>
        <th>
          <button onClick={() => handleUserDelete(user._id)} className="p-3 rounded-lg text-white bg-red-600 text-xl hover:bg-red-800 duration-300"><ImBin /></button>
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

export default AllUsers;