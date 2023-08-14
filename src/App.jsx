import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewProducts from "./components/NewProducts";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Productdetails from "./pages/Productdetails";
import "./index.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> {/* Navbar will appear on every page */}
          <Hero />
          <NewProducts />
          <Footer />
        </>
      ),
    },
    {
      path: "/shop",
      element: (
        <>
          <Navbar /> {/* Navbar will appear on every page */}
          <Shop />
        </>
      ),
    },
    {
      path: "/item/:id",
      element: (
        <>
          <Navbar /> {/* Navbar will appear on every page */}
          <Productdetails />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar /> {/* Navbar will appear on every page */}
          <Cart />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
