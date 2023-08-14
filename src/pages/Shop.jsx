// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageUrlBuilder from "@sanity/image-url";
import useStore from "../store/useStore"; // Assuming this is a custom hook to manage state
import { client } from "../sanity"; // Assuming this is the Sanity client configuration

// Component for displaying a shop page
const Shop = () => {
  // Initialize the Sanity Image URL builder
  const builder = ImageUrlBuilder(client);

  // Function to create image URLs using the builder
  function urlFor(source) {
    return builder.image(source);
  }

  // Get the 'add' function from the custom store hook
  const add = useStore((state) => state.add);

  // State to hold the fetched data from Sanity
  const [data, setData] = useState(null);

  // Fetch data from Sanity on component mount
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

  // Display loading message if data is not yet fetched
  if (!data) {
    return (
      <div className="flex justify-center mx-auto text-xl mt-10">
        Loading...
      </div>
    );
  }

  // Render the shop items once data is available
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mx-4 sm:mx-10 sm:mt-10 mt-5">
      {data.map((item) => (
        <Link
          to={`/item/${item._id}`}
          key={item._id}
          className="flex flex-col items-center"
        >
          {/* Display the item image */}
          <img
            src={urlFor(item.image).url()}
            className="sm:h-[70%] h-[50%] w-full rounded-xl object-cover"
            alt={item.name}
          />

          {/* Display the item name */}
          <div className="text-center">
            <p className="font-bold max-w-[120px] max-h-[120px] sm:max-w-[300px] sm:max-h-[300px]">
              {item.name}
            </p>
          </div>

          {/* Display the item price */}
          <p className="text-center text-red-800 text-lg font-bold">
            ${item.price}
          </p>

          {/* Add to cart button */}
          <Link
            to=""
            onClick={() => add(item)}
            className="px-4 py-2 rounded-md bg-yellow-500 w-full text-yellow-50 text-sm sm:text-base mx-auto text-center mt-2"
          >
            ADD TO CART
          </Link>
        </Link>
      ))}
    </div>
  );
};

export default Shop;
