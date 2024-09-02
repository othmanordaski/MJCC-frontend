import React from "react";
import { useNavigate } from "react-router-dom";
import { useArticlesContext } from "../context/ArticalsContext";
import NewsCard from "@/components/NewsCard";
import SearchInput from "@/components/Searchinput";
import Pagination from "@/components/Pagination";
import SkeletonNewsCard from "@/components/SkeletonNewscard";

const Actualites: React.FC = () => {
  const { articles, loading } = useArticlesContext();
  const additionalNews = articles.slice(5, 17);
  const navigate = useNavigate();
  const handleSearch = (searchTerm: string) => {
    navigate(`/actualites/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchInput onSearch={handleSearch} />
      <div className="mt-8 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonNewsCard key={index} />
            ))
          : additionalNews.map((article, index) => (
              <NewsCard
                key={article.url}
                imageUrl={article.urlToImage || "/api/placeholder/400/300"}
                title={article.title}
                description={article.description}
                tag="News"
                source={article.source.name}
                timeAgo={new Date(article.publishedAt).toLocaleString()}
                id={index.toString()}
              />
            ))}
      </div>
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    </div>
  );
};

export default Actualites;
