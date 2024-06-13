import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const ModalReviewDetails = ({itemReview}) => {

    const {rating, details, name, image} = itemReview

    return (
        <div className='space-y-3 p-4 border-2'>
            <div className='flex justify-between items-center gap-5'>
            <div className='flex items-center gap-2'>
                <img src={image} alt={name} className='w-8 h-8 rounded' />
                <h4 className='text-sm font-medium'>{name}</h4>
            </div>
            <Rating
      style={{ maxWidth: 100 }}
      value={rating}
      readOnly
    />
            </div>
            
            <h2 className='font-medium text-sm'>{details}</h2>
        </div>
    );
};

export default ModalReviewDetails;