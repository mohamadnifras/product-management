import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import AddCategoryModal from "./iteamsAdd/AddCategoryModal";
import AddSubCategoryModal from "./iteamsAdd/AddSubCategoryModal";
import AddProduct from "./iteamsAdd/AddProduct";

function IteamsAdd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issubModalOpen, setIsSubModalOpen] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);

  return (
    <div className="bg-white py-4">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          {/* Home breadcrumb */}
          <div className="text-[18px] text-black flex items-center gap-2">
            Home{" "}
            <span className="text-[16px]">
              <SlArrowRight />
            </span>
          </div>

          {/* Add Item Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#EDA415] text-white px-4 py-2 rounded-[20px] hover:bg-[#d39313] transition w-full sm:w-auto"
            >
              Add Category
            </button>
            <button
              onClick={() => setIsSubModalOpen(true)}
              className="bg-[#EDA415] text-white px-4 py-2 rounded-[20px] hover:bg-[#d39313] transition w-full sm:w-auto"
            >
              Add Sub Category
            </button>
            <button
              onClick={() => setIsAddProduct(true)}
              className="bg-[#EDA415] text-white px-4 py-2 rounded-[20px] hover:bg-[#d39313] transition w-full sm:w-auto"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
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
    </div>
  );
}

export default IteamsAdd;
