
import { Link } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useBookings from '../../../hooks/useBookings';
import { ImBin } from 'react-icons/im';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyBookings = () => {

    const [bookings, refetch] = useBookings();
    const axiosSecure = useAxiosSecure();
    console.log(bookings);
    const totalPrice = bookings.reduce((total, items) => total + items.totalPrice, 0)


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
              axiosSecure.delete(`/myBookings/${id}`)
              .then(res => {
                  console.log(res.data)
                  if(res.data.deletedCount > 0){
                      Swal.fire({
                          title: "Deleted!",
                          text: "Your Item has been deleted.",
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
        <section className='container mx-auto px-4 my-10'>
            <div>
                <SectionTitle subHeading={'---Excellent Ambience---'} heading={'My Booking'}></SectionTitle>
            </div>
            <div className="bg-white lg:p-10 lg:m-10 md:p-5 md:m-5 p-2 m-2">
            <div className="flex justify-between items-center">
                    <h3 className="md:text-2xl text-base font-Cinzel text-[#151515] font-bold">Total Orders: {bookings.length}</h3>
                    <h3 className="md:text-2xl text-base font-Cinzel text-[#151515] font-bold">Total Price: ${totalPrice}</h3>
                    {
                      bookings.length ?
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
        <th>Guest Number</th>
        <th>Price</th>
        <th>Total Price</th>
        <th>Date & time</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        bookings.map((item, index) => <tr key={item._id} className="text-base font-normal text-[#737373]">
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
        <td>
          Person {item.personQuantity}
        </td>
        <td>${item.price}</td>
        <td>${item.totalPrice}</td>
        <td><span>{item.date}</span> <span>{item.time}</span></td>
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

export default MyBookings;