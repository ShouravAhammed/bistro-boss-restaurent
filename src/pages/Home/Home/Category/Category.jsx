import { Swiper, SwiperSlide } from 'swiper/react';
import slideImg1 from '../../../../assets/home/slide1.jpg'
import slideImg2 from '../../../../assets/home/slide2.jpg'
import slideImg3 from '../../../../assets/home/slide3.jpg'
import slideImg4 from '../../../../assets/home/slide4.jpg'
import slideImg5 from '../../../../assets/home/slide5.jpg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
        <SectionTitle subHeading={"---From 11:00am to 10:00pm---"} heading={"ORDER ONLINE"}></SectionTitle>
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mt-8"
      >
        <SwiperSlide>
            <img src={slideImg1} alt="" />
            <h3 className='font-bold font-Cinzel text-center text-3xl text-white -mt-10'>Salads</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slideImg2} alt="" />
            <h3 className='font-bold font-Cinzel text-center text-3xl text-white -mt-10'>Pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slideImg3} alt="" />
            <h3 className='font-bold font-Cinzel text-center text-3xl text-white -mt-10'>Soups</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slideImg4} alt="" />
            <h3 className='font-bold font-Cinzel text-center text-3xl text-white -mt-10'>Deserts</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slideImg5} alt="" />
            <h3 className='font-bold font-Cinzel text-center text-3xl text-white -mt-10'>Salads</h3>
        </SwiperSlide>
      </Swiper>
      </section>
    );
};

export default Category;