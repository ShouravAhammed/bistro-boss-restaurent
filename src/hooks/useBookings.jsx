import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useBookings = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: bookings=[]} = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myBookings?email=${user.email}`)
            return res.data;
        }
    })
    
    return [bookings, refetch];
    
};

export default useBookings;