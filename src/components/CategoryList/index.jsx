import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/categories')
      .then((response) => {
        setCategories(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Something went wrong');
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto py-4">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">No</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Kategori</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id} className="border-b">
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{category.category_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
