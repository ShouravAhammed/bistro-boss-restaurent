import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useSweetAlert from '../hooks/useSweetAlert';
import { IoClose } from 'react-icons/io5';
import ModalReviewDetails from './ModalReviewDetails/ModalReviewDetails';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AddReviews = ({ closeModal, isOpen, id, name, getReview, refetch, averageRating }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const Toast = useSweetAlert();
  const [rating, setRating] = useState(averageRating);
  const [comment, setComment] = useState('');


  const handleReview = async (e) => {
    e.preventDefault();

    const ratingInfo = {
      itemId: id,
      name: user.displayName,
      image: user.photoURL,
      email: user.email,
      itemName: name,
      rating,
      details: comment,
    };

    const res = await axiosPublic.post('/addReview', ratingInfo);
    if (res.data.insertedId) {
      Toast.fire({
        icon: 'success',
        title: 'Review Added Successfully',
      });
      // Update the reviews list by refetching
      refetch();
      // Clear the form fields
      setRating(3);
      setComment('');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-none bg-white p-10 text-left align-middle shadow-xl transition-all relative overflow-y-auto h-96'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                    className='p-2 text-2xl absolute top-0 right-0 bg-red-500 text-white hover:bg-red-900 duration-300'
                  >
                    <IoClose />
                  </button>
                  <h3 className='text-xl font-Cinzel font-bold pb-5'>
                    Rating & Reviews
                  </h3>
                </DialogTitle>
                <div className='mt-2'>
                  <form action='' onSubmit={handleReview} className='space-y-3'>
                    <div className='flex justify-center'>
                      <Rating style={{ maxWidth: 170 }} value={rating} onChange={setRating} />
                    </div>
                    <textarea
                      className='w-full h-30 p-4 border-2 hover:border-[#D1A054] duration-300 outline-2 outline-[#D1A054]'
                      name=''
                      id=''
                      placeholder='Write a comment'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <button
                      className='btn text-center px-5 pt-0.5 pb-0 relative rounded-none group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase'
                    >
                      <span className='absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full'></span>
                      <span className='relative group-hover:text-[#D1A054]'>
                        Add Review
                      </span>
                    </button>
                  </form>
                  <div className='divider text-sm'>Reviews</div>
                  <div className='space-y-5'>
                    {getReview.map((itemReview) => (
                      <ModalReviewDetails key={itemReview._id} itemReview={itemReview} />
                    ))}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddReviews;
