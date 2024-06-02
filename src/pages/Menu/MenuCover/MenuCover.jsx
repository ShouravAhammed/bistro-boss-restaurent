import { Parallax } from 'react-parallax';



const MenuCover = ({title, description}) => {
    return (
        <Parallax
        blur={{ min: -15, max: 16 }}
        bgImage={('https://i.ibb.co/HBpmyNx/service.jpg')}
        bgImageAlt="the Parallax"
        
    >
        <div className="h-[60vh] bg-cover bg-bottom object-cover bg-no-repeat my-10 flex justify-center items-center">
            <div className='md:w-2/3 w-5/6 py-20 bg-[#00000080] px-5'>
                     <div className='text-center space-y-2 text-white'>
                            <h1 className='font-Cinzel font-bold text-3xl'>{title}</h1>
                            <p className='text-base font-semibold'>{description}</p>
                     </div>
                </div>
        </div>
    </Parallax>
        
    );
};

export default MenuCover;