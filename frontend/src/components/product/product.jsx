import React from "react";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div className="w-full p-2 md:w-1/3">
      <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl ">
        <div
          className="h-64 p-4 bg-gray-400 bg-center bg-no-repeat bg-cover rounded-t-lg"
          style={{
            backgroundImage: `url(${product.images[0].url})`,
            backgroundSize: "contain",
          }}
        >
          <div className="text-right">
            <button className="p-2 text-pink-500 rounded-full hover:bg-pink-200">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-start justify-between px-2 pt-2">
          <div className="flex-grow p-2">
            <h1 className="text-xl font-medium ">
              {product.name.substring(0, 20)}
            </h1>
          </div>
          <div className="p-2 text-right">
            <div className="text-lg font-semibold text-teal-500">
              EGP{product.price}
            </div>
            <div className="text-xs text-gray-500 line-through">
              EGP{(product.price * 1.1).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 pb-2">
          <div className="w-1/2 p-2">
            <Link
              to={`products/${product._id}`}
              className="block w-full px-3 py-2 font-medium text-black uppercase bg-teal-500 border-2 border-teal-500 rounded hover:bg-teal-600 hover:border-teal-600 font-poppins"
            >
              View Details
            </Link>
          </div>
          <div className="w-1/2 p-2">
            <button className="block w-full px-3 py-2 font-medium text-teal-500 uppercase bg-white border-2 border-teal-500 rounded hover:bg-gray-100 font-poppins">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
