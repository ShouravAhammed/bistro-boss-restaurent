import { Link } from 'react-router-dom';
import featuredImg from '../../../../assets/home/featured.jpg'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
const FeaturedMenu = () => {
    return (
        <div className='md:bg-[url("https://i.ibb.co/Wpt37m2/side-view-chicken-meatballs-with-greens-ketchup-plate.jpg")] md:h-screen bg-center bg-cover bg-no-repeat relative my-10 bg-fixed'>
            <div className='md:absolute top-0 left-0 w-full h-full md:bg-[#00000080] md:text-white text-[#151515] flex justify-center items-center flex-col md:gap-10 gap-4 py-10'>
            <SectionTitle
                subHeading={"---Check It Out---"}
                heading={"From Our Menu"}
                ></SectionTitle>

                <div className="lg:w-3/4 w-full flex md:flex-row flex-col justify-center items-center gap-4 px-4">
                <img className='md:w-[45%] w-full' src={featuredImg} alt="" />
                <div className='lg:space-y-3 space-y-2'>
                    <h3 className='lg:text-2xl text-xl'>March 20, 2023</h3>
                    <h3 className='lg:text-2xl text-xl'>WHERE CAN I GET SOME?</h3>
                    <p className='text-base font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <Link to={'/'} className="px-7 pt-2.5 pb-1.5 relative rounded-lg group overflow-hidden border-b-4 md:border-white border-black inline-block font-bold">
<span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 md:bg-white bg-black group-hover:h-full"></span>
<span className="relative md:group-hover:text-black group-hover:text-white">Read More</span>
</Link>
                </div>
            </div>
            
            </div>
        </div>
    );
};

export default FeaturedMenu;