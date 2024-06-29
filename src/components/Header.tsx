import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

function Header() {
  const [showSearch, setShowSearchBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center bg-[#4A5972] h-[65px] px-[40px] py-[30px]">
      <div className="flex justify-normal gap-3">
        <FaFacebookF className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
        <FaXTwitter className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
        <FaInstagram className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
        <FaYoutube className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
      </div>
      <div className=" flex gap-3 divide-x divide-solid  justify-between items-center">
        <span className="text-white">Francais</span>
        <span className="text-white pl-2">العربية</span>
        <span className="text-white pl-2 text-[14px]">ⵜⴰⵎⴰⵣⵉⵖⵜ</span>
      </div>
      <div className="flex justify-between items-center gap-[65px]">
        <div
          className="flex justify-center items-center gap-3"
          onMouseEnter={() => {
            setShowDropdown(true);
          }}
          onMouseLeave={() => {
            setShowDropdown(false);
          }}
        >
          <span className="text-[17px] text-white">Contact</span>
          <MdOutlineArrowDropDown className="text-white text-[22px]" />
          {showDropdown && (
            <div className="absolute top-[45px] right-[60px] bg-[#4A5972] p-3 pt-5 shadow-lg rounded-b-lg w-[180px]">
              <ul className="flex flex-col gap-4">
                <li className="text-white text-sm px-[10px]">Contactez-nous</li>
                <li className="text-white text-sm px-[10px]">
                  Accès à l’information
                </li>
              </ul>
            </div>
          )}
        </div>

        {showSearch ? (
          <FaTimes
            onClick={toggleSearchBar}
            className="text-white text-[17px] cursor-pointer"
          />
        ) : (
          <FaSearch
            onClick={toggleSearchBar}
            className="text-white text-[17px] cursor-pointer"
          />
        )}
      </div>
      {showSearch && (
        <div className="absolute top-[65px] right-[40px] bg-white p-3 rounded shadow-lg w-[400px] ">
          <input
            type="text"
            placeholder="Rechercher..."
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      )}
    </div>
  );
}

export default Header;
