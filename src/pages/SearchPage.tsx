import SearchInput from "@/components/Searchinput";
import NewsCard from "@/components/NewsCard";
import SkeletonNewsCard from "@/components/SkeletonNewscard";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useArticlesContext } from "../context/ArticalsContext";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { articles, loading, filterArticles } = useArticlesContext();
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setFilteredArticles(filterArticles(query));
    }
  }, [query, filterArticles]);

  const handleSearch = (searchTerm: string) => {
    navigate(`/actualites/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchInput onSearch={handleSearch} />
      <div className="mt-8 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonNewsCard key={index} />
          ))
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
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
          ))
        ) : (
          // No results found
          <div className="h-[300px] flex items-center justify-center col-span-3 w-full">
            <div className="text-center">
              <h2 className="text-xl">Aucun résultat trouvé pour "{query}".</h2>
              <p>
                Assurez-vous que tous les mots sont correctement orthographiés
                ou essayez d'utiliser d'autres mots-clés.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
