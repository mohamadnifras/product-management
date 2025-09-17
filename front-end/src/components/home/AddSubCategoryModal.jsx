import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSubCategory } from "../../redux/subCategorySlice";
import {fetchCategories} from "../../redux/categorySlice"

function AddSubCategoryModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  console.log(categories,"aaaa")

   useEffect(() => {
    if (isOpen) {
      dispatch(fetchCategories()); 
    }
  }, [isOpen, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !name) {
      alert("Please select a category and enter a sub category name.");
      return;
    }
    try {
      // Dispatch async thunk
      const resultAction = await dispatch(
        createSubCategory({ categoryName, name })
      );

      // Check if request was successful
      if (createSubCategory.fulfilled.match(resultAction)) {
        alert(
          resultAction.payload.message || "Sub Category created successfully!"
        );
        setName("");
        setCategoryName("");
        onClose();
      } else {
        // Handle backend error
        alert(resultAction.payload?.message || "Failed to create sub category");
      }
    } catch (error) {
      console.error("Error creating sub category:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg- backdrop-blur-sm bg-black/40 bg-opacity-10  z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Add Sub Category
        </h2>

        {/* Select Category */}
        <select
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
        >
          <option value="">Select category</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter sub category name"
          className="w-full border  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            ADD
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategoryModal;
