import React from "react";
import CategoryList from "../../components/CategoryList";

const Category = () => {
  return (
    <div>
      <div>
        <p className="text-lg font-semibold">Category</p>
      </div>
      <div className="mt-8">
        <CategoryList />
      </div>
    </div>
  );
};

export default Category;
