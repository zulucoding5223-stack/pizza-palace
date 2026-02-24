import React, { useEffect, useState } from "react";
import logo from "../assets/Pizza-Slice-in-Tango-Colors.svg";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/appContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState("home");
  const location = useLocation();
  const page =
    location.pathname.slice(1) === "" ? "/" : location.pathname.slice(1);

  useEffect(() => {
    setIsClicked(page);
  }, [location]);

  const {
    logout,
    user,
    cartData,
    setCart,
    cartQuantity,
    setCartQuantity,
    setCartState,
  } = useAppContext();

  const userLinks = [
  { name: user?.name || "Profile", direction: "profile" },
  { name: "My Cart", direction: "my-cart" },
  { name: "My Orders", direction: "my-orders" },
  { name: "Logout", direction: "logout" },
];

  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    const userCart = cartData?.find((cart) => cart.user === user?.name);
    setCart(userCart);
    const handleQuantityDisplay = () => {
      let cartTotal = 0;
      if (!userCart) {
        setCartQuantity(0);
        return;
      }
      for (let i = 0; i < userCart?.items?.length; i++) {
        const currentItem = userCart.items[i];
        let currentItemQuantity = 0;
        for (let j = 0; j < currentItem.sizes?.length; j++) {
          currentItemQuantity += currentItem.sizes[j].quantity;
        }
        cartTotal += currentItemQuantity;
      }

      setCartQuantity(cartTotal);
    };

    handleQuantityDisplay();
  }, [user, cartData]);

  console.log();
  const navLinks = ["Home", "Menu", "Location", "Communications"];
  const navigate = useNavigate();
  return (
    <div>
      <section className="px-2 md:px-10 py-5 shadow flex items-center justify-between fixed bg-white z-1 w-full">
        <div>
          <Link
            to="/"
            className="w-fit text-lg sm:text-2xl flex items-center gap-1 text-blue-400"
          >
            <img src={logo} alt="" className="object-center -rotate-20 w-15" />
            <p>Slice&Stack</p>
          </Link>
        </div>
        <div className="text-[0.85rem] hidden lg:block">
          <ul className="flex items-center gap-5">
            {navLinks.map((navLink, index) => {
              const path =
                navLink.toLocaleLowerCase() === "home"
                  ? "/"
                  : `/${navLink.toLocaleLowerCase()}`;
              return (
                <Link
                  to={`${path}`}
                  key={index}
                  className={`flex items-center flex-col gap-0.5 text-red-500 group hover:cursor-pointer ${
                    isClicked ===
                    (path === "/" ? "/" : `${navLink.toLocaleLowerCase()}`)
                      ? "hover:text-red-500"
                      : "hover:text-blue-950"
                  }`}
                  onClick={() => {
                    setIsClicked(path);
                  }}
                >
                  <span>{navLink}</span>
                  <span
                    className={`h-0.5 rounded w-0 bg-blue-400  group transition-all duration-500 ease-in-out ${
                      isClicked ===
                      (path === "/" ? "/" : `${navLink.toLocaleLowerCase()}`)
                        ? "w-full"
                        : ""
                    }`}
                  ></span>
                </Link>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/my-cart");
                    setCartState("");
                  }}
                  className="hover:cursor-pointer relative rounded-full p-2.5 text-center  bg-gray-300/40 backdrop-blur-md border border-white/30 shadow-lg text-blue-950"
                >
                  <TiShoppingCart />
                  <span className="absolute -top-2 -right-1.5 text-center py-1 px-2 rounded-full text-[0.6rem] text-white bg-blue-950 shadow-lg">
                    {cartQuantity}
                  </span>
                </button>
                <button
                  onClick={() => {
                    user && setIsProfileMenuOpen((prev) => !prev);
                  }}
                  className="hover:cursor-pointer relative rounded-full w-8.5 h-8.5 text-center bg-gray-300 text-blue-950 lg:block overflow-hidden"
                >
                  <img
                    className="object-center w-full"
                    src={user.image}
                    alt="profile-image"
                  />
                </button>

                {user && (
                  <p
                    onClick={() => {
                      setIsProfileMenuOpen((prev) => !prev);
                    }}
                    className="hover:cursor-pointer text-[0.85rem] w-fit text-red-500 px-2 pt-1 pb-1.5 text-center rounded-lg border border-blue-950 hidden md:block"
                  >
                    Welcome user {user.name}!
                  </p>
                )}
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="hover:cursor-pointer rounded-lg pt-1 pb-1.5 px-3 text-center text-blue-950 lg:hidden"
                >
                  <IoMenu size={"1.8rem"} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:cursor-pointer rounded-lg pt-1 pb-1.5 px-3 text-center bg-red-500 text-blue-950 hidden lg:block"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="hover:cursor-pointer rounded-lg pt-1 pb-1.5 px-3 text-center text-blue-950 lg:hidden"
                >
                  <IoMenu size={"1.8rem"} />
                </button>
              </>
            )}
          </div>
        </div>

        <ul
          className={`absolute top-20 right-0 bg-white z-5 w-screen flex items-start flex-col gap-1 lg:hidden text-[0.85rem] ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {navLinks.map((navLink, index) => {
            const path =
              navLink.toLocaleLowerCase() === "home"
                ? "/"
                : `/${navLink.toLocaleLowerCase()}`;
            return (
              <Link
                key={index}
                onClick={() => {
                  setIsClicked(path);
                  setIsOpen(false);
                }}
                to={`${path}`}
                className={`text-start pt-1 pb-1.5 w-full  px-10 transition-all duration-300
                  ${
                    isClicked ===
                    (path === "/" ? "/" : `${navLink.toLocaleLowerCase()}`)
                      ? "bg-orange-500 text-blue-950 hover:bg-orange-500 hover:text-blue-950"
                      : "hover:bg-blue-950 hover:text-red-500"
                  }`}
              >
                {navLink}
              </Link>
            );
          })}
          <li
            onClick={() => {
              user && logout();
              setIsOpen(false);
              user ? navigate("/") : navigate("/login");
            }}
            className="text-center pt-1 pb-1.5 w-full hover:bg-red-500 hover:text-blue-950 border border-b-blue-950 border-t-blue-950 text-red-500"
          >
            {user ? "Logout" : "Login"}
          </li>
        </ul>

        {user && isProfileMenuOpen && (
          <div className="z-50 absolute top-15.25 right-6.5 lg:w-48 bg-gray-200 flex items-center flex-col text-sm">
            {userLinks.map((link, index) => {
              const linkName = link.name;
              return (
                <div
                  key={index}
                  className={`py-1 w-48 text-center ${linkName === "Logout" ? "bg-orange-500 text-blue-950 text-center" : ""} `}
                >
                  <NavLink
                    onClick={() => {
                      setIsOpen(false);
                      setIsProfileMenuOpen(false);
                      if (linkName === "Logout") {
                        logout();
                        return;
                      }
                    }}
                    to={`${link.direction}`}
                    className={({ isActive }) =>
                      `block w-full  ${isActive ? "bg-blue-950 text-white" : ""} `
                    }
                  >
                    {linkName}
                  </NavLink>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
