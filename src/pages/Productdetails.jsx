// Import necessary modules and components
import { useState, useEffect } from "react";
import ImageUrlBuilder from "@sanity/image-url";
import { useParams } from "react-router-dom";
import { client } from "../sanity";
import useStore from "../store/useStore";

// Define the Productdetails component
const Productdetails = () => {
  // Initialize image URL builder
  const builder = ImageUrlBuilder(client);

  // Get the 'id' parameter from the URL
  const { id } = useParams();

  // Initialize state to hold the product data
  const [product, setProduct] = useState(null);

  // Access the 'add' function from the store using custom hook
  const add = useStore((state) => state.add);

  // Fetch product data based on the 'id' parameter
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == 'collection' && _id == $id]`;
      try {
        // Fetch data from Sanity using the client
        const result = await client.fetch(query, { id });
        if (result.length > 0) {
          // Set the fetched product data
          setProduct(result[0]);
        } else {
          console.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Call the fetchData function when 'id' changes
    fetchData();
  }, [id]);

  // Display loading message if product data is not available
  if (!product) {
    return (
      <div className="flex justify-center mx-auto text-xl mt-10">
        Loading...
      </div>
    );
  }

  // Render product details
  return (
    <div className="mx-4 sm:mt-5 pb-5">
      {/* Breadcrumbs */}
      <div className="flex space-x-3">
        <p>Home</p>
        <p>/</p>
        <p>Products</p>
        <p>/</p>
        <p>Product</p>
      </div>

      {/* Product details layout */}
      <div className="flex flex-col sm:flex-row mx-4 sm:mx-20 mt-6">
        {/* Thumbnail images */}
        <div className="w-[15%] hidden sm:inline space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <img
              key={index}
              src={builder.image(product.image).url()}
              alt={product.name}
              className="h-[15%] rounded-xl"
            />
          ))}
        </div>

        {/* Main product image */}
        <div className="sm:w-[42.5%] w-full">
          <img
            src={builder.image(product.image).url()}
            alt={product.name}
            className="h-[70%] rounded-xl"
          />
        </div>

        {/* Product details and buttons */}
        <div className="sm:w-[42.5%] w-full sm:space-y-3 space-y-2">
          {/* Product name */}
          <h1 className="sm:text-3xl text-xl font-bold">{product.name}</h1>
          {/* Product price */}
          <p className="text-red-700 font-bold text-xl">${product.price}</p>

          {/* Color options */}
          <div className="flex space-x-3">
            <button className="py-2 px-4 rounded-md border border-gray-500">
              Black
            </button>
            <button className="py-2 px-4 rounded-md border border-gray-500">
              Gold
            </button>
            <button className="py-2 px-4 rounded-md border border-gray-500">
              White
            </button>
          </div>

          {/* Add to cart button */}
          <button
            key={product.id} // Add a unique key for each mapped item
            onClick={() => add(product)}
            className="bg-blue-900 w-full text-blue-50 rounded-md text-lg py-2 px-4"
          >
            ADD TO CART
          </button>

          {/* Product description */}
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit...</p>

          {/* Buttons for additional information */}
          <button className="py-2 px-4 w-full rounded-md border border-gray-500">
            DESCRIPTION
          </button>
          <button className="py-2 px-4 w-full rounded-md border border-gray-500">
            RETURN POLICY
          </button>
          <button className="py-2 px-4 w-full rounded-md border border-gray-500">
            CITIZEN POLICY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
