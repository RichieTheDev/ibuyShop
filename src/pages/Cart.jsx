import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { HiMinusSm } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { BsCartPlusFill } from "react-icons/bs";
import useStore from "../store/useStore";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Cart = () => {
  // Initialize ImageUrlBuilder and get cart data from custom hook
  const builder = ImageUrlBuilder(client);
  const cart = useStore((state) => state.cart);
  const add = useStore((state) => state.add);
  const minus = useStore((state) => state.minus);

  // State for modal and fetched data
  const [openModal, setopenModal] = useState(false);
  const [data, setData] = useState([]);

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch the data when the component mounts
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

  // Update total price when cart changes
  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  // Calculate the total number of items in the cart
  const cartCount = cart.reduce((total, cartItem) => {
    const foundItem = data.find((item) => item._id === cartItem._id);
    return total + (foundItem ? cartItem.quantity : 0);
  }, 0);

  return (
    <>
      <div className="sm:mt-6 sm:px-9 px-4">
        <h2 className="sm:text-3xl text-2xl font-bold">Cart {cartCount}</h2>
        <div className="mt-5 sm:space-y-6 sm:relative">
          {/* Render cart items or empty cart message */}
          {cart.length === 0 ? (
            <div className="flex flex-col justify-center mx-auto items-center space-y-4">
              {/* Empty cart icon */}
              <BsCartPlusFill size={55} className="text-yellow-500" />
              <p className="font-bold text-lg sm:text-xl">
                Your cart is empty. Go and shop!
              </p>
              {/* Start shopping link */}
              <Link
                to="/shop"
                className="py-2 px-4 rounded-lg hover:bg-orange-300 bg-orange-500 text-orange-50"
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            // Render cart items
            <>
              {cart.map((item) => (
                <div key={item._id} className="flex space-x-4">
                  {/* Item image and remove button */}
                  <div className="flex flex-col">
                    <img
                      src={builder.image(item.image).url()}
                      alt={item.name}
                      className="h-28 w-28 object-cover rounded-xl"
                    />
                    {/* Remove button */}
                    <p
                      onClick={() => setopenModal(true)}
                      className="text-yellow-600 hover:bg-amber-200 flex space-x-3 items-center mt-2 cursor-pointer"
                    >
                      <AiFillDelete size={20} />
                      Remove
                    </p>
                    {/* Quantity buttons */}
                    <p className="flex lg:hidden items-center mt-2 pb-4 space-x-3">
                      {/* Decrease quantity button */}
                      <button
                        onClick={() => minus(item)}
                        className={`p-1 sm:p-2 rounded bg-yellow-${
                          item.quantity < 2 ? "200" : "400"
                        } text-yellow-50`}
                      >
                        <HiMinusSm size={25} />
                      </button>
                      {/* Quantity */}
                      <p className="text-center text-lg sm:text-2xl">
                        {item.quantity}
                      </p>
                      {/* Increase quantity button */}
                      <button
                        onClick={() => add(item)}
                        className="p-1 sm:p-2 rounded bg-yellow-400  text-yellow-50"
                      >
                        <IoAddOutline size={25} />
                      </button>
                    </p>
                  </div>

                  {/* Item details */}
                  <div className="flex flex-col sm:relative">
                    <p className="sm:text-xl text-base">{item.name}</p>
                    <p className="sm:text-lg text-base">Seller: ex Store</p>
                    <p className="text-red-600 text-sm sm:text-base">
                      1 unit left
                    </p>
                    <p className="text-xs sm:text-base">Richie Express</p>
                  </div>

                  {/* Price and quantity buttons */}
                  <div className="sm:absolute sm:left-[36rem] lg:flex lg:flex-col hidden mx-auto items-center text-center">
                    <p className="text-2xl font-bold">${item.price}</p>
                    <p className="flex items-center space-x-3">
                      {/* Decrease quantity button */}
                      <button
                        onClick={() => minus(item)}
                        className={`p-2 rounded bg-yellow-${
                          item.quantity < 2 ? "200" : "400"
                        } text-yellow-50`}
                      >
                        <HiMinusSm size={25} />
                      </button>
                      {/* Quantity */}
                      <p className="text-center text-2xl">{item.quantity}</p>
                      {/* Increase quantity button */}
                      <button
                        onClick={() => add(item)}
                        className="p-2 rounded bg-yellow-400  text-yellow-50"
                      >
                        <IoAddOutline size={25} />
                      </button>
                    </p>
                  </div>
                </div>
              ))}
              {/* Cart summary */}
              <div className="sm:absolute sm:-top-14 xl:left-[55rem] lg:left-[50rem] left-[35rem] mt-4 space-y-2">
                <p className="xl:text-3xl text-xl sm:text-2xl">CART SUMMARY</p>
                <p className="flex sm:text-xl text-lg">
                  Total:
                  <span className="ml-2">${totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-sm italics">
                  Delivery fees not included yet.
                </p>
                <button className="py-2 px-4 bg-orange-600 w-1/2 sm:w-full text-orange-50 rounded-md">
                  CHECKOUT
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Render modal if openModal is true */}
      {openModal && <Modal setopenModal={setopenModal} />}
    </>
  );
};

export default Cart;
