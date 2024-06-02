

const MenuItem = ({item}) => {
    const {name, recipe, category, price, image} = item
    return (
        <div className=''>
            <div className='flex gap-3'>

                <img style={{borderRadius: '0px 200px 200px 200px'}} className='w-[20%]' src={image} alt="" />

                <div className='flex-1 space-y-2'>
                    <div className='flex justify-between items-center gap-1'>
                    <h4 className='font-Cinzel font-normal text-xl text-[#151515]'>{name}--------</h4>
                    <p className='font-normal text-xl text-[#BB8506]'>{price}</p>
                    </div>
                    <p className='text-base text-[#737373] font-normal'>{recipe}</p>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;