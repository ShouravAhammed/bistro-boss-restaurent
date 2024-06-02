import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import { useState } from "react";


const OrderMenu = () => {
    const [menu, loading] = useMenu();
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const dessert = menu.filter((item) => item.category === "dessert");
    // const offered = menu.filter((item) => item.category === "offered");
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')


    return (
        <div>
            <Helmet>
        <title>Bistro | Order Menu</title>
      </Helmet>
      <div className='bg-[url("https://i.ibb.co/qdK3C24/banner2.jpg")] h-screen bg-cover bg-center flex justify-center items-center bg-fixed'>
        <div className="md:w-2/3 w-5/6 py-20 bg-[#00000080]">
          <div className="text-center space-y-2 text-white">
            <h1 className="font-Cinzel font-bold md:text-6xl text-4xl">
              Order Menu
            </h1>
            <p className="text-base font-Cinzel font-semibold">
              Would You Like to Try a Dish
            </p>
          </div>
        </div>
      </div>
      {/* Order Menu Tabs */}

      <div className="container mx-auto px-4 my-16 w-3/4 text-center">
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
    <TabList className={'flex justify-center items-center gap-5 text-base font-semibold uppercase'}>
      <Tab>Salad</Tab>
      <Tab>Pizza</Tab>
      <Tab>Soups</Tab>
      <Tab>Desserts</Tab>
      <Tab>Drinks</Tab>
    </TabList>

    <TabPanel>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {
                salad.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
            }
        </div>
    </TabPanel>
    <TabPanel>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {
                pizza.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
            }
        </div>
    </TabPanel>
    <TabPanel>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {
                soup.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
            }
        </div>
    </TabPanel>
    <TabPanel>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {
                dessert.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
            }
        </div>
    </TabPanel>
    <TabPanel>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {
                drinks.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
            }
        </div>
    </TabPanel>
  </Tabs>
      </div>

        </div>
    );
};

export default OrderMenu;