import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const provinces = [
  "Tanger-Tétouan-Al Hoceïma",
  "L'Oriental",
  "Fès-Meknès",
  "Rabat-Salé-Kénitra",
  "Béni Mellal-Khénifra",
  "Casablanca-Settat",
  "Marrakech-Safi",
  "Drâa-Tafilalet",
  "Souss-Massa",
  "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab",
];
const departements = [""];
const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const halfLength = Math.ceil(provinces.length / 2);
  const firstColumn = provinces.slice(0, halfLength);
  const secondColumn = provinces.slice(halfLength);

  return (
    <nav className="flex justify-between items-center px-4 py-2 shadow-lg">
      <div>
        <Link to="/">
          <img
            className="h-20 w-auto"
            src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
            alt="MJCC Logo"
          />
        </Link>
      </div>
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/actualites" className="text-blue-500 hover:text-blue-700">
            Actualités
          </Link>
        </li>
        <li>
          <Link
            to="/departements"
            className="text-blue-500 hover:text-blue-700"
          >
            Départements
          </Link>
        </li>
        <li className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-blue-500 hover:text-blue-700"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            Régions <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-96 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="grid grid-cols-2 gap-4 p-4">
                <ul>
                  {firstColumn.map((province) => (
                    <li key={province} className="py-1">
                      <Link
                        to={`/province/${province
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {province}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul>
                  {secondColumn.map((province) => (
                    <li key={province} className="py-1">
                      <Link
                        to={`/province/${province
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {province}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
        <li>
          <Link
            to="/appels-offres-concours"
            className="text-blue-500 hover:text-blue-700"
          >
            Appels d'offres et concours
          </Link>
        </li>
      </ul>
      <div>
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300"
        >
          Se connecter
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
