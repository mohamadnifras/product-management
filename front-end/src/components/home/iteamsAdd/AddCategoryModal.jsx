import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../redux/categorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddCategoryModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  console.log("category:",name)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return;

    try {
      console.log("sub:",name)
      const resultAction = await dispatch(createCategory(name));
      if (createCategory.fulfilled.match(resultAction)) {
          setName("");
          onClose();
       toast.success(resultAction.payload || "Category added successfully!");
      } else {
        console.log(resultAction)
        toast.error(resultAction.payload || "Failed to add category");
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg- backdrop-blur-sm bg-black/40 bg-opacity-10  z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4">Add Category</h2>

        {/* Input */}
        <input
          type="text"
          value={name}
          placeholder="Enter category name"
          onChange={(e) => setName(e.target.value)}
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
      <ToastContainer position="top-right" autoClose={11000} />
    </div>
  );
}

export default AddCategoryModal;
