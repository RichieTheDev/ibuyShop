// Import necessary modules and assets
import React from "react";
import { Link } from "react-router-dom";
import Heroimg from "../assets/Heroimg.jpg";

// Hero component definition
const Hero = () => {
  return (
    <div className="bg-purple-100 text-lg sm:text-xl">
      {/* Container for layout */}
      <div className="flex flex-col-reverse sm:flex-row lg:justify-between lg:mx-32 sm:mt-8 p-4">
        {/* Left column for text content */}
        <div className="flex flex-col w-full">
          {/* Title */}
          <p className="sm:text-4xl text-2xl text-purple-700 font-bold">
            PROVIDING SERVICES
          </p>
          <p className="sm:text-4xl text-2xl text-purple-700 font-bold">
            AT YOUR DOOR
          </p>
          {/* Subtitle */}
          <p className="font-bold">
            Macc Essentials{" "}
            <span className="font-normal">has an important role in making</span>
          </p>
          <p>supplies and services available to customers and their</p>
          <p>patients during this critical time. This includes services</p>
          <p>from various domains. Our aim is to aid you. As much as we can</p>
          {/* "Shop Now" button */}
          <Link
            to="/shop"
            className="py-2 px-4 rounded-lg bg-red-800 text-red-100 mt-6 w-fit"
          >
            SHOP NOW
          </Link>
        </div>

        {/* Right column for the image */}
        <img
          src={Heroimg}
          alt=""
          className="flex flex-col w-full h-full sm:w-[45%] sm:h-[45%] rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

// Export the Hero component
export default Hero;
