import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "./MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {

    const [menu, loading] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    


    return (
        <section className="py-10">
            <SectionTitle
            subHeading={"---Check it Out---"}
            heading={"From Our Menu"}
            ></SectionTitle>
            
            {/* menu */}
            <div className="my-8 grid lg:grid-cols-2 grid-cols-1 gap-5">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>

        </section>
    );
};

export default PopularMenu;