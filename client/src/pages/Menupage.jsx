import React, { useEffect, useState } from "react";
import Menu from "../components/user-components/menuPage-components/Menu";
import { IoSearchOutline } from "react-icons/io5";
import single from "../assets/pictures-of-pizza-23-1.jpg";
import double from "../assets/OIP.webp";

const Menupage = () => {
  const pizzaMenu = [
    {
      id: "1",
      name: "Super pizza",
      flavour: "chicken and mashroom",
      category: "single",
      image: single,
      sizes: [
        { price: 60, size: "S" },
        { price: 80, size: "M" },
        { price: 100, size: "L" },
      ],
    },
    {
      id: "2",
      name: "Super pizza 2",
      flavour: "beef",
      category: "double",
      image: double,
      sizes: [
        { price: 120, size: "S" },
        { price: 160, size: "M" },
        { price: 200, size: "L" },
      ],
    },
    {
      id: "3",
      name: "Burger Pizza",
      flavour: "beef",
      category: "double",
      image: double,
      sizes: [
        { price: 120, size: "S" },
        { price: 160, size: "M" },
        { price: 200, size: "L" },
      ],
    },
    {
      id: "4",
      name: "Vegetarian",
      flavour: "mashroom",
      category: "single",
      image: single,
      sizes: [
        { price: 60, size: "S" },
        { price: 80, size: "M" },
        { price: 100, size: "L" },
      ],
    },
    {
      id: "5",
      name: "Vegetarian",
      flavour: "mashroom",
      category: "double",
      image: double,
      sizes: [
        { price: 120, size: "S" },
        { price: 160, size: "M" },
        { price: 200, size: "L" },
      ],
    },
    {
      id: "6",
      name: "Beef and mashroom",
      flavour: "beef",
      category: "single",
      image: single,
      sizes: [
        { price: 60, size: "S" },
        { price: 80, size: "M" },
        { price: 100, size: "L" },
      ],
    },
  ];

  const placeholders = ["pizza", "flavour", "satisftaction"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [menu, setMenu] = useState([]);

  const handleMenuDisplay = () => {
    searchValue.trim().length > 0
      ? setMenu(
          pizzaMenu.filter(
            (pizza) =>
              pizza.name
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ||
              pizza.flavour
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
          )
        )
      : setMenu(pizzaMenu);
  };

  useEffect(() => {
    setMenu(pizzaMenu);
  }, []);

  return (
    <div className="pt-24 px-10">
      <div className="flex justify-center">
        <div className="w-100 sm:w-120 md:w-130 lg:w-150 flex items-center justify-between p-2 bg-gray-200 hover:cursor-pointer rounded-full px-3 shadow-lg shadow-blue-500 text-[0.85rem]">
          <input
            type="text"
            className="outline-none w-full px-2 text-gray-500"
            placeholder={`Search for a ${placeholders[index]}`}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IoSearchOutline
            className="text-gray-500"
            size={18}
            onClick={() => {
              handleMenuDisplay();
            }}
          />
        </div>
      </div>
      <Menu menu={menu} />
    </div>
  );
};

export default Menupage;
