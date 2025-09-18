import React, { useEffect, useState } from "react";
import { fetchSubCategories } from "../../../redux/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../../redux/productSlice";
import { RiImageAddLine } from "react-icons/ri";

function AddProduct({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [variants, setVariants] = useState([{ ram: "", price: "", qty: "" }]);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.subCategory);
  const { loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchSubCategories());
    }
  }, [isOpen, dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: 1 }]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subCategoryName", subCategory);
    formData.append("description", description);
    formData.append("variants", JSON.stringify(variants));
    images.forEach((file) => formData.append("image", file));

    try {
      const result = await dispatch(createProduct(formData)).unwrap();
      toast.success(result.message || "Product created successfully!");
      setTitle("");
      setDescription("");
      setSubCategory("");
      setVariants([{ ram: "", price: "", qty: "" }]);
      setImages([]);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create product.");
      console.error("Product creation error:", error);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setSubCategory("");
    setVariants([{ ram: "", price: "", qty: "" }]);
    setImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl w-full mx-4 overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Your form */}
        <form onSubmit={handleSubmit} className="p-6 ">
          <h2 className="text-2xl font-medium mb-4 text-center tracking-wider">
            Add Product
          </h2>
          <div className="mt-8">
            <div className="flex items-center space-x-50 mb-4">
              {/* Label */}
              <label className="w-20 text-gray-700 font-medium">Title :</label>

              {/* Input */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 "
              />
            </div>
            <div className="flex items-center space-x-50 mb-4">
              {/* Label */}
              <label className="w-20 text-gray-700 font-medium">
                Variants :
              </label>
              <div className="flex flex-col items-center">
                {variants.map((variant, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center ">
                    <label className="w-10 text-gray-700 font-medium">
                      Ram:
                    </label>
                    <input
                      type="text"
                      placeholder="RAM"
                      value={variant.ram}
                      onChange={(e) =>
                        handleVariantChange(index, "ram", e.target.value)
                      }
                      className="border p-2 rounded w-20"
                    />
                    <label className="w-10 text-gray-700 font-medium">
                      Price:
                    </label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      className="border p-2 rounded w-28"
                    />
                    <label className="w-10 text-gray-700 font-medium">
                      QTY:
                    </label>
                    <input
                      type="number"
                      placeholder="Qty"
                      value={variant.qty}
                      onChange={(e) =>
                        handleVariantChange(index, "qty", e.target.value)
                      }
                      className="border p-2 rounded w-20"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVariant}
                  className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
                >
                  Add Variant
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-40 mb-4">
              <label className="w-27 text-gray-700 font-medium">
                Sub category :
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
              >
                <option value="">Select category</option>
                {subCategories?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-33 mb-4">
              <label className="w-27 text-gray-700 font-medium">
                Description :
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 "
              />
            </div>

            <div className="flex items-center space-x-40 mb-4">
              <label className="w-27 text-gray-700 font-medium">
                Upload image:
              </label>

              {/* Image Previews */}
              <div className="flex gap-2 mb-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 border rounded flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}

                {/* Upload Box */}
                <label
                  htmlFor="upload-input"
                  className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer text-gray-400"
                >
                  <RiImageAddLine size={30} />
                </label>
                <input
                  id="upload-input"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "SUBMIT"
              )}
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              DISCARD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
