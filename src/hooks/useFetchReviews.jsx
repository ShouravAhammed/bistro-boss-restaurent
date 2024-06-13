
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const fetchReviews = async (axiosPublic, id) => {
  const { data } = await axiosPublic.get(`/perticulerReview/${id}`);
  return data;
};

const useFetchReviews = (id) => {
  const axiosPublic = useAxiosPublic();
  return useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviews(axiosPublic, id),
  });
};

export default useFetchReviews;

