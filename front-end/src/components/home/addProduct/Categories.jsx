import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fetchSubCategories } from "../../../redux/subCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/categorySlice";
// import { fetchProduct } from "../../../redux/productSlice";


function Categories({ selectedSubCategories, setSelectedSubCategories }) {
  const [openCategory, setOpenCategory] = useState("Laptop"); // default open
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.subCategory);
  const { categories } = useSelector((state) => state.category);
  
  console.log(subCategories, "hello");
  console.log(categories, "sugam");
  useEffect(() => {
    dispatch(fetchSubCategories());
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleCategory = (name) => {
    setOpenCategory(openCategory === name ? null : name);
  };



//   const toggleSubCategory = (item) => {
//     setSelected((prev) =>
//       prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
//     );
//   };
  const toggleSubCategory = (id) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };


  return (
    <div className="w-60 border rounded p-4">
      <h2 className="text-[#003F62] font-medium mb-3 text-[16px]">
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
  );
}

export default Categories;
