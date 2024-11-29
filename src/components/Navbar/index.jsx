import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center h-16 mx-10">
        <div>
          <p>Navbar</p>
        </div>
        <div className="flex items-center gap-20">
          <div className="relative">
            <input
              type="email"
              name="email"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-60 rounded-full sm:text-sm focus:ring-1"
              placeholder="Search Quiz"
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-3 top-2 text-slate-300" />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#6D9773] text-white py-2 px-3  text-sm rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
