import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { RiRestaurantFill } from "react-icons/ri";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });


    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
    console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        
        if(res.data.success){
            // now send the data url 
            const menuItem = {
                name: data.name,
                image: res.data.data.display_url,
                recipe: data.recipe,
                category: data.category,
                price: parseFloat(data.price),
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data)
                if(menuRes.data.insertedId){
                    reset();
                    // success inserted to API
                    Toast.fire({
                        icon: "success",
                        title: `${data.name} added successfully`,
                      });
                }
        }
        console.log('with image url', res.data);
  }



    return (
        <section className="container mx-auto px-4">
        <div className="text-center my-10">
        <SectionTitle subHeading={'---What is new?---'} heading={'Add an Item'}></SectionTitle>
        </div>
        <div className="w-5/6 mx-auto p-14 bg-white mb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">Recipe Name*</label>
            <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="recipe name" {...register("name", {required: true})}/>
        </div>
        <div className="flex justify-center items-center gap-8 w-full">
        <div className="flex flex-col w-full space-y-2">
            <label className="text-base font-semibold text-[#444444]">Category*</label>
            <select defaultValue="default" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" {...register("category", {required: true})}>
                <option disabled value="default">Category</option>
                <option className="py-2" value="salad">Salad</option>
                <option className="py-2" value="dessert">Dessert</option>
                <option className="py-2" value="pizza">Pizza</option>
                <option value="soups">Soups</option>
                <option value="drinks">Drinks</option>
          </select>
        </div>
        <div className="w-full space-y-2">
            <label className="text-base font-semibold text-[#444444]">Price*</label>
            <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="price" {...register("price", {required: true})}/>
        </div>
        </div>
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">Recipe Details*</label>
            <textarea className="border-2 h-36 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="recipe details" {...register("recipe", {required: true})}></textarea>
        </div>
        <div>
        <input type="file" {...register("image", {required: true})} />
        </div>
        <button
              className="btn rounded-none text-center px-7 pt-3 pb-2 relative group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
              <span className="relative group-hover:text-[#D1A054] flex justify-center items-center gap-1">
                 <span>Add Item</span><span className="text-xl"><RiRestaurantFill /></span>
              </span>
            </button>
        </form>

            </div>
        </section>
    );
};

export default AddItems;