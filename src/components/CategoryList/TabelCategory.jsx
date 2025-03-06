import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { EllipsisVertical, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const TabelCategory = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(null);
  const popupRefs = useRef({});
  const itemsPerPage = 5;

  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const generatePages = () => {
    let pages = [];
    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openPopup !== null &&
        popupRefs.current[openPopup] &&
        !popupRefs.current[openPopup].contains(event.target)
      ) {
        setOpenPopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPopup]);

  const togglePopup = (id) => {
    setOpenPopup(openPopup === id ? null : id);
  };

  return (
    <div className="bg-white h-full rounded-xl p-6">
      <div>
        <div className="flex justify-between items-center py-4">
          <div className="relative">
            <input
              type="text"
              className="px-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-secondary focus:ring-secondary w-60 rounded-lg sm:text-sm focus:ring-1"
              placeholder="Search"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-3 text-gray-300"
            />
          </div>
          <button className="bg-secondary px-4 p-3 text-sm text-Tertiary rounded-lg">
            Add Category
          </button>
        </div>

        {/* Table */}
        <div className="">
          <table className="w-full">
            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="border-y hover:bg-gray-100 relative"
                >
                  <td className="px-4 py-3">{item.category_name}</td>
                  <td className="px-4 py-3 flex justify-end relative">
                    <button onClick={() => togglePopup(item.id)}>
                      <EllipsisVertical />
                    </button>
                    {openPopup === item.id && (
                      <div
                        ref={(el) => (popupRefs.current[item.id] = el)}
                        className="absolute right-4 mt-2 w-32 bg-white border shadow-md rounded-md z-10"
                      >
                        <button className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                          View
                        </button>
                        <button className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                          Edit
                        </button>
                        <button className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "border-Tertiary border text-secondary cursor-not-allowed"
                : "bg-Tertiary text-secondary"
            }`}
          >
            <ChevronLeft />
          </button>

          {generatePages().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-Tertiary text-secondary"
                    : "hover:bg-Tertiary hover:bg-opacity-50 hover:text-secondary"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "border-Tertiary border text-secondary cursor-not-allowed"
                : "bg-Tertiary text-secondary"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabelCategory;
