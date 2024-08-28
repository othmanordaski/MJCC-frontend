import React, { useState, FormEvent, ChangeEvent } from "react";
import { Search, AlertCircle } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  searchTerm: z
    .string()
    .min(3, { message: "Search term must be at least 3 characters long." })
    .max(50, { message: "Search term must not exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Search term can only contain letters, numbers, and spaces.",
    }),
});

type SearchSchema = z.infer<typeof searchSchema>;

interface SearchInputProps {
  onSearch?: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string): string | null => {
    try {
      searchSchema.parse({ searchTerm: value });
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "An unexpected error occurred.";
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateInput(searchTerm);
    if (!validationError && onSearch) {
      onSearch(searchTerm);
    } else {
      setError(validationError);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setError(validateInput(newValue));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className={`w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:border-transparent ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className="absolute right-0 top-0 mt-[5px] mr-2 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-400"
          disabled={!!error}
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
      {error && (
        <div className="mt-2 flex items-center text-red-500">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
