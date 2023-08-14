import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";
import { client } from "../sanity";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdNotificationsActive, MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  // State for cart and navigation menu
  const cart = useStore((state) => state.cart);
  const [nav, setNav] = useState(false);
  const [data, setData] = useState(null);

  // Toggle navigation menu
  const handleClick = () => {
    setNav(!nav);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == 'collection']`;

      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total items in cart
  const cartCount = cart.reduce((total, cartItem) => {
    const foundItem = data.find((item) => item._id === cartItem._id);
    return total + (foundItem ? cartItem.quantity : 0);
  }, 0);

  return (
    <>
      <div>
        {/* Navigation Bar */}
        <div className="sm:p-4 p-2 flex items-center px-4 sm:px-10 border-b border-gray-300">
          {/* Hamburger Menu */}
          {!nav ? (
            <AiOutlineMenu
              size={25}
              onClick={handleClick}
              className="sm:hidden flex"
            />
          ) : (
            <AiOutlineClose
              size={25}
              onClick={handleClick}
              className="sm:hidden flex"
            />
          )}

          {/* Navigation Links */}
          <ul
            onClick={handleClick}
            className={
              nav
                ? "fixed left-0 top-0 w-[100%] z-10 h-full text-black bg-white font-semibold items-center text-center ease-in-out duration-500"
                : "ease-in-out duration-500 fixed left-[-100%]"
            }
          >
            {/* Close Button */}
            <AiOutlineClose
              onClick={handleClick}
              className="absolute top-7 left-4"
              size={30}
            />

            {/* Navigation Items */}
            <li className="hover:text-amber-600 text-lg p-4 mt-24">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="hover:text-amber-600 text-lg p-4">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-amber-600 text-lg p-4">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="hover:text-amber-600 text-lg p-4">
              <p>Best Sellers</p>
            </li>
          </ul>

          {/* Notification and Cart Icons */}
          <div className="hidden sm:flex lg:hidden mr-auto space-x-10">
            <MdNotificationsActive size={25} />
            <Link to="/Cart">
              <MdOutlineShoppingCart size={25} className="relative" />
            </Link>
            <p className="text-lg absolute -top-1 left-20">{cartCount}</p>
          </div>

          {/* Return, Help, Sign In Links */}
          <div className="hidden sm:flex justify-end ml-auto space-x-4">
            <p>Return</p>
            <p>Help</p>
            <p>Register/Sign In</p>
          </div>

          {/* Brand Logo */}
          <Link
            to="/"
            className="flex sm:hidden justify-start italic font-semibold ml-4 items-center text-xl flex-col text-red-700"
          >
            MARC <span className="text-blue-700">ESSENTIALS</span>
          </Link>

          {/* Profile and Cart Icons (Mobile) */}
          <div className="flex sm:hidden ml-auto space-x-4">
            <BsFillPersonFill size={25} />
            <Link to="/Cart">
              <MdOutlineShoppingCart size={25} className="relative" />
            </Link>
            <p className="text-lg absolute top-1 right-4">{cartCount}</p>
          </div>
        </div>

        {/* Search and Navigation Links (Desktop) */}
        <div className="flex items-center cursor-pointer mt-6 mx-7">
          <AiOutlineSearch size={25} className="hidden lg:flex" />

          <div className="hidden sm:flex mx-auto space-x-10 items-center ">
            <Link to="/Shop">SHOP</Link>
            <p>ESSENTIALS</p>

            <Link
              to="/"
              className="flex italic hover:bg-slate-100 font-semibold items-center text-2xl flex-col text-red-700"
            >
              MARC{" "}
              <span className="text-blue-700 hover:bg-slate-100">
                ESSENTIALS
              </span>
            </Link>

            <p>BEST SELLERS</p>
            <p>ABOUT US</p>
          </div>

          {/* Profile, Notification, Cart Icons (Desktop) */}
          <p className="hidden sm:hidden lg:flex space-x-10 items-baseline">
            <BsFillPersonFill size={25} />
            <MdNotificationsActive size={25} />
            <Link to="/Cart">
              <MdOutlineShoppingCart size={25} className="relative" />
            </Link>
            <p className="text-lg absolute top-20 right-6">{cartCount}</p>
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
