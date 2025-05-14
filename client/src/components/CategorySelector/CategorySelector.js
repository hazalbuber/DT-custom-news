import React from "react";

const categories = ["sports", "technology", "health", "business", "science", "entertainment"];

const CategorySelector = ({ selectedCategories, setSelectedCategories }) => {
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label"><strong>Select your interests:</strong></label>
      {categories.map((category, index) => (
        <div className="form-check" key={category}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`category-${index}`}
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
          <label className="form-check-label" htmlFor={`category-${index}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
