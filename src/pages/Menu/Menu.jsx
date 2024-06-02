import { Helmet } from "react-helmet-async";
import MenuCover from "./MenuCover/MenuCover";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "../Home/PopularMenu.jsx/MenuItem/MenuCategory/MenuCategory";

const Menu = () => {
  const [menu, loading] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const offered = menu.filter((item) => item.category === "offered");
  const pizza = menu.filter(item => item.category === 'pizza')
  const salad = menu.filter(item => item.category === 'salad')
  const soup = menu.filter(item => item.category === 'soup')
  return (
    <div>
      <Helmet>
        <title>Bistro | Menu</title>
      </Helmet>
      <div className='bg-[url("https://i.ibb.co/0Y95VRw/bnr.jpg")] h-screen bg-cover bg-center flex justify-center items-center bg-fixed'>
        <div className="md:w-2/3 w-5/6 py-20 bg-[#00000080]">
          <div className="text-center space-y-2 text-white">
            <h1 className="font-Cinzel font-bold md:text-6xl text-4xl">
              Our Menu
            </h1>
            <p className="text-base font-Cinzel font-semibold">
              Would You Like to Try a Dish
            </p>
          </div>
        </div>
      </div>
      <SectionTitle
            subHeading={"---Don't miss---"}
            heading={"Todays Offer"}
          ></SectionTitle>
      {/* offered */}
        <MenuCategory items={offered} title={'offered'}></MenuCategory>
        {/* dessert */}
        <div>
        <MenuCover title={"Dessert"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}>
        </MenuCover>
        <MenuCategory items={dessert} title={'dessert'}></MenuCategory>
        </div>
        {/* Pizza */}
        <MenuCover title={"Pizza"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}>
        </MenuCover>
        <MenuCategory items={pizza} title={'pizza'}></MenuCategory>

        {/* salad */}
        <MenuCover title={"salads"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}>
        </MenuCover>
        <MenuCategory items={salad} title={'salad'}></MenuCategory>

        {/* soups */}
        <MenuCover title={"Soups"} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}>
        </MenuCover>
        <MenuCategory items={soup} title={'soup'}></MenuCategory>


    </div>
  );
};

export default Menu;
