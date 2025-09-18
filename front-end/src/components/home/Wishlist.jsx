import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoHeart } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { getWishlist,removeWishlist } from "../../redux/productSlice";
import { MdDeleteForever } from "react-icons/md";


function Wishlist({ isWishlistOpen, setIsWishlistOpen }) {
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.products);
  console.log(wishlist, "wishlist");
  useEffect(() => {
    if (isWishlistOpen) {
      dispatch(getWishlist());
    }
  }, [dispatch, isWishlistOpen]);

  return (
    <div className="">
      <div
        className={`fixed top-0 right-0 h-full w-90 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${isWishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-5 border-b bg-[#003F62]">
          <div className="flex justify-between items-center space-x-3">
            <h2 className="text-lg font-semibold p-3 bg-[#FFFFFF] rounded-full">
              {" "}
              <GoHeart />
            </h2>
            <h2 className="text-lg font-semibold text-white">Items</h2>
          </div>
          <button
            className="text-white hover:text-black"
            onClick={() => setIsWishlistOpen(false)}
          >
            <SlArrowRight />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-full">
          {wishlist.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty</p>
          ) : (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 border-b border-[#ACACAC] pb-3"
              >
                <img
                  src={
                    item.product?.images?.[0] ||
                    "https://via.placeholder.com/60"
                  }
                  alt={item.product?.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium">{item.product?.title}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.product?.variants?.[0]?.price}
                  </p>
                  <button 
                //   onClick={()=> dispatch(removeWishlist(item._id))}
                onClick={async () => {
    await dispatch(removeWishlist(item.product?._id));
    dispatch(getWishlist());
  }}
                  className="text-[20px] hover:text-red-600"><MdDeleteForever /></button>
                </div>
               
                
                
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overlay */}
      {isWishlistOpen && (
        <div
          className="fixed inset-0 bg- backdrop-blur-sm bg-black/40 bg-opacity-10 z-40"
          onClick={() => setIsWishlistOpen(false)}
        />
      )}
    </div>
  );
}

export default Wishlist;
