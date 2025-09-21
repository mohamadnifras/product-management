import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import Wishlist from "./Wishlist";
import { useDispatch, useSelector } from "react-redux";
import {getWishlist} from "../../redux/productSlice"
import {logoutUser,fetchUserDetails} from "../../redux/authSlice"
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.products);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,loading} = useSelector((state)=> state.auth)
console.log(wishlist,"navbar")
useEffect(()=>{
dispatch(getWishlist())
},[dispatch])

useEffect(()=>{
dispatch(fetchUserDetails())
},[dispatch])

const handleSignIn = () => {
    navigate("/signin")
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
  };
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
              className="relative w-full md:w-[438px] h-10 md:h-[50px] bg-white rounded-2xl px-2 text-sm placeholder:text-[#292D32] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <h3 className=" absolute md:px-11   md:py-3.5 py-2 bg-[#EDA415] text-white rounded-[19px]">Search</h3>
          </div>

          <div className="hidden md:flex space-x-6 md:w-[50%] justify-end text-white">
               {/* Wishlist */}
        <button 
        onClick={() => setIsWishlistOpen(true)}
        className="relative hover:text-blue-600 flex items-center gap-1">
          <GoHeart size={22} />
          {wishlist?.length > 0 && (
        <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-semibold px-1 py-0 rounded-full">
          {wishlist.length}
        </span>
      )}
          <span className="text-sm">Wishlist</span>

        </button>

        {/* Cart */}
        <button className="hover:text-blue-600 flex items-center gap-1">
          <FaShoppingCart size={22} />
          <span className="text-sm">Cart</span>
        </button>

        {/* Sign In */}
      <div>
      {user ? (
        <button
          onClick={handleSignOut}
          className="hover:text-blue-600 flex items-center gap-1"
          disabled={loading}
        >
          <FiLogOut size={22} />
          <span className="text-sm">Sign Out</span>
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="hover:text-blue-600 flex items-center gap-1"
          disabled={loading}
        >
          <FiLogIn size={22} />
          <span className="text-sm">Sign In</span>
        </button>
      )}
    </div>
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
        <div className="md:hidden bg-white shadow-lg mt-2 rounded-md overflow-hidden">
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <GoHeart size={20} />
            <span>Wishlist ({wishlist?.length || 0})</span>
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100">
            <FaShoppingCart size={20} />
            <span>Cart</span>
          </button>
          {user ? (
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FiLogOut size={20} />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FiLogIn size={20} />
              <span>Sign In</span>
            </button>
          )}
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
