import React, { useEffect } from "react";
import { fetchProduct } from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../../../redux/authSlice";


function Products({ selectedSubCategories }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, page, pages } = useSelector(
    (state) => state.products
  );
  const {user} = useSelector((state)=> state.auth)
  console.log(pages,page, "product sugamano");
  useEffect(() => {
    dispatch(fetchProduct({ page: 1, limit: 10, subCategoryIds: selectedSubCategories || [], }));
  }, [dispatch, selectedSubCategories]);

  useEffect(()=>{
  dispatch(fetchUserDetails())
  },[dispatch])

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pages) {
      dispatch(fetchProduct({ page: newPage, limit: 10 }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Pleas Login🔐</p>;
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            onClick={()=> navigate(`/${product._id}`)}
            className="w-48 border border-[#B6B6B6] rounded-xl shadow-sm p-3 relative hover:shadow-md transition"
          >
            {/* Wishlist Icon */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 rounded-full bg-[#B3D4E5] p-1">
              <Heart size={18} />
            </button>

            {/* Product Image */}
            <div 
            className="flex justify-center">
              <img
                src={product?.images?.[0]}
                alt={product?.title}
                className="w-40 h-20 object-contain"
              />
            </div>

            {/* Product Name */}
            <p className="mt-2 text-sm font-medium text-[#003F62] truncate">
              {product?.title}
            </p>

            {/* Price */}
            <p className="text-sm font-semibold text-black mt-1">
              ${product?.variants?.[0]?.price || "N/A"}
            </p>

            {/* Ratings */}
            <div className="flex space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gray-300 text-lg">
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
       {/* Pagination */}
     {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">

        {/* Page Numbers */}
        {[...Array(pages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-full ${
              page === index + 1
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

       
      </div>
    </div>
  );
}

export default Products;
