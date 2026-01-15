import React, { useEffect, useState } from "react";
import Menu from "../components/user-components/menuPage-components/Menu";
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from "../utils/appContext";

const Menupage = () => {
  const { pizzaMenu } = useAppContext();
  const placeholders = ["pizza", "flavour", "satisftaction"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let filtered = pizzaMenu;

    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();

      filtered = filtered.filter(
        (pizza) =>
          pizza?.name?.toLowerCase().includes(search) ||
          pizza?.flavour?.toLowerCase().includes(search) ||
          pizza?.category?.toLowerCase().includes(search)
      );
    }

    if (filter !== "") {
      filtered = filtered.filter(
        (pizza) => pizza?.category?.toLowerCase() === filter.toLowerCase()
      );
    }

    if (filtered.length === 0) {
      alert("No products found!");
    }

    setMenu(filtered);
  }, [searchValue, filter, pizzaMenu]);

  return (
    <div className="pt-24 px-10">
      <div className="flex items-center gap-5 flex-col">
        <div className="w-full flex items-center justify-between p-2 bg-gray-200 hover:cursor-pointer rounded-full px-3 shadow-lg shadow-blue-500 text-[0.85rem]">
          <input
            type="text"
            className="outline-none w-full px-2 text-gray-500"
            placeholder={`Search for a ${placeholders[index]}`}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IoSearchOutline className="text-gray-500" size={18} />
        </div>
        <select
          className="text-[0.85rem] bg-gray-200 outline-none px-3 rounded-sm text-start pb-1 pt-0.5 shadow-lg shadow-blue-500 hover:cursor-pointer"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option className="text-[0.85rem] text-start" value="">
            Filter
          </option>
          <option className="text-[0.85rem] text-start" value="single">
            Single
          </option>
          <option className="text-[0.85rem] text-start" value="double">
            Double Decker
          </option>
        </select>
      </div>
      <Menu menu={menu} />
    </div>
  );
};

export default Menupage;
