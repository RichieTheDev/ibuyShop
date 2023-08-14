import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";

const Footer = () => {
  return (
    <footer>
      <div className="text-center  mt-6 sm:mt-14">
        <p className="sm:text-3xl text-xl font-bold">
          <span className="text-red-700">COVID-19</span> GUIDELINES
        </p>
        <p className="mt-2 sm:text-lg">
          Please remember to adhere to all COVID-19 guidelines. Precaution is
          key to survive this pandemic, stay home and stay safe.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row font-bold items-center justify-around mt-5 sm:mt-14">
        <div className="flex flex-col items-center text-2xl sm:text-3xl italic">
          <p className="text-red-700">MACC</p>
          <p className="text-blue-700">ESSENTIALS</p>
        </div>
        <div className="flex flex-col space-y-4 items-center  sm:items-start mt-2 sm:mt-0">
          <p>Home</p>
          <p>Collection</p>
          <p>Products</p>
        </div>
        <div className="flex flex-col space-y-4 mt-2 sm:mt-0 items-center  sm:items-start">
          <p>About</p>
          <p>Contact</p>
          <p>FAQ</p>
        </div>
        <div className="flex flex-col mx-4 sm:mx-0">
          <p>Be the first to know about our biggest and best sales.</p>
          <p>We never send more than one email a month</p>
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="placeholder-slate-600 border-b mt-5"
          />
          <div className="flex items-center justify-center space-x-4 text-blue-900 mt-4">
            <SlSocialLinkedin size={25} />
            <SlSocialFacebook size={25} />
            <SlSocialTwitter size={25} />
            <SlSocialInstagram size={25} />
          </div>
        </div>
      </div>
      <p className="text-center mt-6 mb-6">All rights are reserved</p>
    </footer>
  );
};

export default Footer;
