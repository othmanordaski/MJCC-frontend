import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useArticlesContext } from "../context/ArticalsContext";
// interface Article {
//   title: string;
//   description: string;
//   urlToImage: string;
//   content: string;
//   publishedAt: string;
//   url: string;
// }

const HeroSection: React.FC = () => {
  // const [articles, setArticles] = useState<Article[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { articles, loading, error } = useArticlesContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const articlesItems = articles.slice(21, 26);

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  //       if (!apiKey) {
  //         throw new Error("API key is not defined in environment variables");
  //       }
  //       const response = await fetch(
  //         `https://newsapi.org/v2/everything?q=morocco&apiKey=${apiKey}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch articles");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       setArticles(data.articles.slice(21, 26));
  //     } catch (err) {
  //       setError("Failed to fetch articles. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchArticles();
  // }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articlesItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articlesItems.length - 1 : prevIndex - 1
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[600px]">
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[600px]">{error}</div>
    );

  return (
    <div className="relative max-w-8xl h-[500px] px-4 py-5 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {articlesItems.map((Item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex flex-col md:flex-row gap-4 items-center  rounded-lg overflow-hidden p-8"
          >
            <div className="md:w-1/2 h-full">
              <img
                src={Item.urlToImage || "/api/placeholder/400/300"}
                alt={Item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-2 flex flex-col justify-between  items-centerh-full">
              <div>
                <h3 className="text-3xl font-semibold mb-4">{Item.title}</h3>
                <p className="text-gray-600 mb-4">{Item.description}</p>
                <p className="text-gray-600 mb-4">{Item.content}</p>
              </div>
              <Link
                to={`/article/${index}`}
                className="flex gap-2 items-center text-orange-500 hover:underline self-start"
              >
                Read more
                <FaArrowRightLong className="text-orange-500" />
              </Link>
              {/* <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex gap-2 items-center text-orange-500 hover:underline self-start"
              >
                Lire la suite
                <FaArrowRightLong className="text-orange-500" />
              </a> */}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroSection;
