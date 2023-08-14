import { useEffect, useState } from "react";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const NewProducts = () => {
  // Initialize the image URL builder
  const builder = imageUrlBuilder(client);

  // Function to generate URLs for images
  function urlFor(source) {
    return builder.image(source);
  }

  // State to hold fetched data
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from Sanity
    const fetchData = async () => {
      const query = `*[_type == 'products']`;

      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  // Display loading message while data is being fetched
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center sm:text-4xl text-2xl font-bold mt-6 text-red-700">
      New <span className="text-blue-700">Products</span>
      {/* Display smaller product cards */}
      <div className="flex flex-row justify-center space-x-4 sm:space-x-8 mt-4 mx-auto ">
        {data.slice(1, 4).map((item) => (
          <div key={item._id}>
            <p className="border rounded-xl bg-slate-50 sm:p-6">
              <img
                src={urlFor(item.image).url()}
                className="sm:w-full sm:h-64 w-fit rounded-xl h-32 object-scale-down"
              />
            </p>
            <p className="text-black sm:text-xl text-sm">{item.name}</p>
          </div>
        ))}
      </div>
      {/* Display main product images */}
      <div className="flex flex-col sm:flex-row sm:mt-16 mx-4">
        <img
          src={urlFor(data[0].image).url()}
          alt=""
          className="sm:flex-1 sm:relative sm:w-96 sm:h-96 h-64  rounded-xl object-cover "
        />
        <p className="sm:absolute sm:right-11 lg:right-72 mt-10 text-2xl ">
          MACC WEEKLY DISCOUNT{" "}
          <span className="px-4 py-2 ml-auto sm:inline hidden bg-red-700 rounded-lg text-red-100 text-base">
            VIEW ALL
          </span>
        </p>

        <img
          src={urlFor(data[5].image).url()}
          alt=""
          className="sm:flex-1 sm:ml-6 sm:mt-20 rounded-xl  h-64 object-cover"
        />

        <img
          src={urlFor(data[6].image).url()}
          alt=""
          className="sm:flex-1 ml-4 mr-4 mt-20  h-64 rounded-xl object-cover"
        />
      </div>
      {/* Display additional product images */}
      <div className="hidden sm:flex flex-col-reverse sm:flex-row sm:mt-16 mx-4">
        <img
          src={urlFor(data[4].image).url()}
          alt=""
          className="sm:flex-1 sm:relative sm:w-96 sm:h-96 h-64  rounded-xl object-cover"
        />
        <img
          src={urlFor(data[2].image).url()}
          alt=""
          className="sm:flex-1 sm:ml-6 sm:mt-20 rounded-xl sm:h-64 object-cover"
        />
        <img
          src={urlFor(data[7].image).url()}
          alt=""
          className="sm:flex-1 ml-4 mr-4 sm:mt-20 rounded-xl sm:h-64 object-cover"
        />
        <p className="sm:absolute sm:right-11 lg:right-72 mt-10 text-2xl  ">
          MACC WEEKLY DISCOUNT
        </p>
      </div>
    </div>
  );
};

export default NewProducts;
