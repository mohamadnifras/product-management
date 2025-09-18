import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Wishlist from "./Wishlist";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-[#003F62] shadow-md fixed w-full top-0 left-0 z-50 p-2">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* search */}
          <div className="md:w-[50%] flex justify-end items-center">
            <input
              type="search"
              id="search"
              placeholder="Serach any things..."
              className="relative w-full md:w-[438px] md:h-[50px] bg-white rounded-2xl px-2 text-sm placeholder:text-[#292D32] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <h3 className="absolute md:px-11 md:py-3.5  bg-[#EDA415] text-white rounded-[19px]">Search</h3>
          </div>

          <div className="hidden md:flex space-x-6 md:w-[50%] justify-end text-white">
               {/* Wishlist */}
        <button 
        onClick={() => setIsWishlistOpen(true)}
        className="hover:text-blue-600 flex items-center gap-1">
          <GoHeart size={22} />
          <span className="text-sm">Wishlist</span>
        </button>

        {/* Cart */}
        <button className="hover:text-blue-600 flex items-center gap-1">
          <FaShoppingCart size={22} />
          <span className="text-sm">Cart</span>
        </button>

        {/* Sign In */}
        <button className="hover:text-blue-600 flex items-center gap-1">
          <FiLogIn size={22} />
          <span className="text-sm">Sign In</span>
        </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <FiX size={28} /> : <IoMdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            About
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Services
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Contact
          </a>
        </div>
      )}
      <Wishlist 
      isWishlistOpen={isWishlistOpen}
        setIsWishlistOpen={setIsWishlistOpen}
      />
    </nav>
  );
}

export default Navbar;
