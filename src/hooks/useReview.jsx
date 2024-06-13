import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useReview = () => {
    const axiosPublic = useAxiosPublic();
    const {refetch, data: reviews=[]} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews`)
            return res.data;
        }
    })
    
    return [reviews, refetch];
    
};

export default useReview;