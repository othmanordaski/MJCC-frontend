import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarimage from "../assets/avatarimage.png";

const provinces: string[] = [
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

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  items: string[];
  linkPrefix: string;
  className?: string;
  twoColumns?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  setIsOpen,
  title,
  items,
  linkPrefix,
  className,
  twoColumns = false,
}) => {
  const halfLength = Math.ceil(items.length / 2);
  const firstColumn = items.slice(0, halfLength);
  const secondColumn = items.slice(halfLength);

  return (
    <li className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-blue-500 hover:text-blue-700"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {title} <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${className}`}
        >
          {twoColumns ? (
            <div className="grid grid-cols-2 gap-4 p-4">
              {[firstColumn, secondColumn].map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-1">
                  {column.map((item) => (
                    <li key={item}>
                      <Link
                        to={`${linkPrefix}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ) : (
            <ul className="py-1">
              {items.map((item) => (
                <li key={item} className="py-1">
                  <Link
                    to={`${linkPrefix}/${item
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

const NavBar: React.FC = () => {
  const [isRegionsOpen, setIsRegionsOpen] = useState<boolean>(false);

  const { openModal, isAuthenticated } = useAuthContext();

  return (
    <header className="shadow-lg">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex-shrink-0">
          <img
            className="h-20 w-auto"
            src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
            alt="MJCC Logo"
          />
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/actualites"
              className="text-blue-500 hover:text-blue-700"
            >
              Actualités
            </Link>
          </li>
          <Dropdown
            isOpen={isRegionsOpen}
            setIsOpen={setIsRegionsOpen}
            title="Régions"
            items={provinces}
            linkPrefix="/province"
            className="w-96"
            twoColumns={true}
          />
          <li>
            <Link
              to="/appels-offres-concours"
              className="text-blue-500 hover:text-blue-700"
            >
              Appels d'offres et concours
            </Link>
          </li>
        </ul>
        {isAuthenticated ? (
          <Avatar>
            <AvatarImage src={avatarimage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <button
            className="px-4 py-2 rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300"
            onClick={openModal}
          >
            Se connecter
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
