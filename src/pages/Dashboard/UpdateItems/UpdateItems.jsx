import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateItems = () => {

    const axiosSecure = useAxiosSecure();
    const {_id, name, recipe, category, price} = useLoaderData();

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

    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)

        const menuItem = {
            name: data.name,
            recipe: data.recipe,
            category: data.category,
            price: parseFloat(data.price),
        }

        const res = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            Toast.fire({
                icon: "success",
                title: `${data.name} added successfully`,
              });
        }

    }





    return (
        <section>
            <div className="text-center my-10">
                <SectionTitle heading={'Update Item'}></SectionTitle>
            </div>

            <div className="w-5/6 mx-auto p-14 bg-white mb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">Recipe Name*</label>
            <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="recipe name" defaultValue={name} {...register("name", {required: true})}/>
        </div>
        <div className="flex justify-center items-center gap-8 w-full">
        <div className="flex flex-col w-full space-y-2">
            <label className="text-base font-semibold text-[#444444]">Category*</label>
            <select defaultValue={category} className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" {...register("category", {required: true})}>
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
            <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="price" defaultValue={price} {...register("price", {required: true})}/>
        </div>
        </div>
        <div className="space-y-2">
            <label className="text-base font-semibold text-[#444444]">Recipe Details*</label>
            <textarea className="border-2 h-36 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="recipe details" defaultValue={recipe} {...register("recipe", {required: true})}></textarea>
        </div>
        <button
              className="btn rounded-none text-center px-7 pt-3 pb-2 relative group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
              <span className="relative group-hover:text-[#D1A054]">
                    Update Recipe Details
              </span>
            </button>
        </form>

            </div>

        </section>
    );
};

export default UpdateItems;