import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fetchSubCategories } from "../../../redux/subCategorySlice";
import { fetchCategories } from "../../../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu, HiX } from "react-icons/hi";

function Categories({ selectedSubCategories, setSelectedSubCategories }) {
  const [openCategory, setOpenCategory] = useState("Laptop"); // default open
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu toggle
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.subCategory);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchSubCategories());
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleCategory = (name) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  const toggleSubCategory = (id) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex justify-between items-center p-4">
        <button
          className="text-black text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full bg-white w-60 p-4  z-50
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-[#003F62] font-medium mb-3 text-[16px] hidden md:block">
          Categories
        </h2>
        <p
          className="cursor-pointer flex justify-between items-center text-black mb-2 text-[16px]"
          onClick={() => setSelectedSubCategories([])}
        >
          All categories
        </p>

        {categories?.map((cat) => {
          const subs = subCategories.filter(
            (sub) => sub.category?._id === cat._id
          );

          return (
            <div key={cat._id} className="mb-2">
              <div
                className="cursor-pointer flex justify-between items-center text-black"
                onClick={() => toggleCategory(cat.name)}
              >
                {cat.name}
                {subs.length > 0 &&
                  (openCategory === cat.name ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </div>

              {openCategory === cat.name && subs.length > 0 && (
                <div className="ml-4 mt-2 space-y-1">
                  {subs.map((sub) => (
                    <label
                      key={sub._id}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.includes(sub._id)}
                        onChange={() => toggleSubCategory(sub._id)}
                        className="w-4 h-4"
                      />
                      <span>{sub.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Categories;
