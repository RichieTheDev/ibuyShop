// Import the required dependencies
import React from "react";
import useStore from "../store/useStore";

// Define the Modal component
function Modal({ setopenModal }) {
  // Access the removeItem function and cart state from the store
  const removeItem = useStore((state) => state.removeItem);
  const cart = useStore((state) => state.cart);

  return (
    // Outer container for the modal
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
      {/* Modal content */}
      <div className="w-500 h-500 rounded-lg bg-white flex flex-col shadow-md p-4">
        {/* Close button */}
        <div className="flex text-2xl font-bold justify-end">
          <button
            onClick={() => {
              // Close the modal when the button is clicked
              setopenModal(false);
            }}
          >
            X
          </button>
        </div>
        {/* Modal title */}
        <div className="text-center mt-3">
          <h1 className="text-2xl font-semibold">Remove from cart</h1>
        </div>
        {/* Modal content */}
        <div className="flex-grow mt-3 text-xl text-center">
          <p>Do you really want to remove this from cart?</p>
        </div>
        {/* Remove button */}
        <div className="flex justify-center mt-3">
          <button
            onClick={() => {
              // Call removeItem function and close the modal
              removeItem(cart[0]._id);
              setopenModal(false);
            }}
            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-300 text-yellow-50 rounded-md"
          >
            REMOVE ITEM
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the Modal component
export default Modal;
