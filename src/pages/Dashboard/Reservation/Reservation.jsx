
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useCart from '../../../hooks/useCart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdTableRestaurant } from 'react-icons/md';
import useSweetAlert from '../../../hooks/useSweetAlert';
import { useLocation, useNavigate } from 'react-router-dom';

const Reservation = () => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const Toast = useSweetAlert();
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location);

    
    // const singlePrice = cart.reduce((sum, items) => sum + items.price, 0)
    // console.log(singlePrice);
    

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {

        // console.log(data)
        // slice person
        const person = data.person.slice(-1)

        // adjusted cart object
        const adjustedCart = cart.map(item => ({
            ...item,
            price: item.price,
            totalPrice: parseFloat((item.price * person).toFixed(2)),
            date: data.date,
            time: data.time,
            personQuantity: person,
        }));
        console.log(adjustedCart);


    const res = await axiosSecure.post('/myBookings', adjustedCart)
    console.log(res.data)
    if(res.data.insertedCount > 0){
        // reset form
        reset();
        // data refetch
        refetch();
        Toast.fire({
            icon: 'success',
            title: 'Table Reserved Successfully',
        })
        // navigate 
        navigate('/dashboard/myBookings')
    }
    
    }


    return (
        <section className='container mx-auto px-4'>
            <div className='my-10'>
            <SectionTitle subHeading={'---Reservation---'} heading={'Reserve a table'}></SectionTitle>
            </div>
            <div className="w-5/6 mx-auto p-14 bg-white mb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-5'>
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">Date*</label>
            <input type="date" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="recipe name" {...register("date", {required: true})}/>
        </div>
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">time*</label>
            <input type="time" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="recipe name" {...register("time", {required: true})}/>
        </div>
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">Guest*</label>
            <select defaultValue={'default'} name="person" id="" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" {...register("person", {required: true})}>
                <option disabled value="default">Person</option>
                <option value="1">Person 1</option>
                <option value="2">Person 2</option>
                <option value="3">Person 3</option>
                <option value="4">Person 4</option>
                <option value="5">Person 5</option>
                <option value="6">Person 6</option>
                <option value="7">Person 7</option>
                <option value="8">Person 8</option>
                <option value="9">Person 9</option>
                <option value="10">Person 10</option>
            </select>
        </div>
        <button
              className="btn rounded-none text-center px-7 pt-3 pb-2 relative group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
              <span className="relative group-hover:text-[#D1A054] flex justify-center items-center gap-1">
                 <span>Reserve A Table</span><span className="text-xl"><MdTableRestaurant /></span>
              </span>
            </button>
        </div>
        </form>
        </div>
        </section>
    );
};

export default Reservation;