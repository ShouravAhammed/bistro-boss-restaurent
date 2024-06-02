import { Link } from "react-router-dom";
import MenuItem from "../MenuItem";


const MenuCategory = ({items, title}) => {
    return (
        <div className="md:w-3/4 px-4 mx-auto container w-full my-20">
          <div className="my-8 grid lg:grid-cols-2 grid-cols-1 gap-5 text-center">
            {
            items.map((item) => <MenuItem key={item._id} item={item}></MenuItem>)
            
            }
          </div>
          <div className="text-center pt-10">
            <Link
              to={`/orderMenu/${title}`}
              className="text-center px-7 pt-3 pb-2 relative rounded-lg group font-bold overflow-hidden border-b-4 border-black bg-white text-black inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full"></span>
              <span className="relative group-hover:text-white">
                order your favourite food
              </span>
            </Link>
          </div>
        </div>
    );
};

export default MenuCategory;