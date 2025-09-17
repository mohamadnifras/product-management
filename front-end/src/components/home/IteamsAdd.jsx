import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import AddCategoryModal from "./AddCategoryModal";
import AddSubCategoryModal from "./AddSubCategoryModal";
import AddProduct from "./AddProduct";

function IteamsAdd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issubModalOpen, setIsSubModalOpen] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false)
  return (
    <nav className="">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* homePage */}
          <div className="text-[18px] text-black flex items-center gap-2">
            Home{" "}
            <span className="text-[16px]">
              <SlArrowRight />
            </span>
          </div>

          {/* Add iteam */}
          <div className="hidden md:flex space-x-6 font-medium">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#EDA415] text-white px-4 py-3 rounded-[20px] hover:bg-[#d39313] transition"
            >
              Add Category
            </button>
            <button
              onClick={() => setIsSubModalOpen(true)}
              className="bg-[#EDA415] text-white px-4 py-3 rounded-[20px] hover:bg-[#d39313]  transition"
            >
              Add Sub Category
            </button>
            <button 
            onClick={setIsAddProduct}
            className="bg-[#EDA415] text-white px-4 py-3 rounded-[20px] hover:bg-[#d39313]  transition">
              Add Product
            </button>
          </div>
        </div>
      </div>
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AddSubCategoryModal
        isOpen={issubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />
      <AddProduct
        isOpen={isAddProduct}
        onClose={() => setIsAddProduct(false)}
      />
    </nav>
  );
}

export default IteamsAdd;
