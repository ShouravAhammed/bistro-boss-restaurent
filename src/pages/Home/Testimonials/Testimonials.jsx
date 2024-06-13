
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Navigation, } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import useReview from '../../../hooks/useReview';


const Testimonials = () => {
    const [reviews] = useReview();

    return (
        <section className='space-y-8'>
        <SectionTitle subHeading={"---What Our Clients Say---"} heading={"TESTIMONIALS"}></SectionTitle>
        <Swiper navigation={true} autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}  modules={[Navigation, Autoplay]} className="mySwiper">
        {
            reviews.map(review => 
            <SwiperSlide key={review._id}>
                <div className='mx-auto text-center space-y-3 w-3/4'>
                <div className='flex justify-center items-center gap-1'>
                <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
                </div>

                    <p className='text-base text-[#444444] font-normal'>{review?.details}</p>
                    <h3 className='text-2xl text-[#CD9003] font-medium'>{review?.name}</h3>
                </div>
            </SwiperSlide>)
        }
      </Swiper>
        </section>
    );
};

export default Testimonials;