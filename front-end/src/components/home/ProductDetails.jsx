import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  createWishlist,
  removeWishlist,
} from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { Heart } from "lucide-react";
import { SlArrowRight } from "react-icons/sl";
import EditProduct from "./iteamsAdd/EditProduct";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, wishlist } = useSelector((state) => state.products);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isEditModal,setIsEditModal] = useState(false)

  
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);


  const navigate = useNavigate();

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeWishlist(product._id));
      setIsWishlisted(false);
    } else {
      dispatch(createWishlist(product._id));
      setIsWishlisted(true);
    }
  };

  useEffect(() => {
    if (
      product &&
      wishlist?.some((item) => item.product?._id === product._id)
    ) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  }, [wishlist, product]);

  if (loading) return <p className="p-10 text-lg">Loading...</p>;
  if (!product) return <p className="p-10 text-lg">No product found</p>;

  return (
    <div>
      {/* Breadcrumb */}
      <div
        onClick={() => navigate(-1)}
        className="text-[18px] text-black flex items-center gap-2 p-5 pt-10"
      >
        Home{" "}
        <span className="text-[16px]">
          <SlArrowRight />
        </span>
        Product details
        <span className="text-[16px]">
          <SlArrowRight />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-20">
        {/* Left: Product Images */}
        <div>
          <img
            src={selectedImage || product?.images?.[0]}
            alt={product?.title}
            className="rounded-xl border-2 border-blue-500 w-full h-[400px] object-contain"
          />
          <div className="flex gap-4 mt-4">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-28 h-20 border rounded-lg cursor-pointer object-contain ${
                  selectedImage === img ? "border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {product?.title}
          </h2>
          <p className="text-2xl font-bold mt-2">
            ₹{selectedVariant?.price || "N/A"}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="font-medium">Availability:</span>
            <span
              className={`font-medium ${
                selectedVariant?.qty > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedVariant?.qty > 0
                ? `In stock (${selectedVariant.qty} available)`
                : "Out of stock"}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">{product?.description}</p>

          <hr className="my-4 border-t-2 border-[#BDBDBD]" />

          {/* RAM options (example) */}
          {product?.variants?.length > 0 && (
            <div className="mb-4">
              <span className="font-medium">Ram: </span>
              {product.variants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-1 border rounded-md mx-1 ${
                    selectedVariant?._id === variant._id
                      ? "bg-gray-800 text-white"
                      : "bg-white"
                  }`}
                >
                  {variant.ram}
                </button>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center mb-6">
            <span className="font-medium mr-4">Quantity:</span>
            <button
              className="px-3 py-1 border rounded-l-md"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b">{quantity}</span>
            <button
              className="px-3 py-1 border rounded-r-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button 
            onClick={()=>setIsEditModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-full">
              Edit product
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-full">
              Buy it now
            </button>
            <button onClick={handleWishlistToggle} className="ml-2">
              <Heart
                className={`w-6 h-6 cursor-pointer ${
                  isWishlisted ? "text-red-500" : "text-gray-600"
                }`}
                fill={isWishlisted ? "red" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
      <EditProduct 
      isOpen={isEditModal}
        onClose={() => setIsEditModal(false)}
        productData={product}
      />
    </div>
  );
}

export default ProductDetails;
