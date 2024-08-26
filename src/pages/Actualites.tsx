import React from "react";
import { useArticlesContext } from "../context/ArticalsContext";
import NewsCard from "@/components/NewsCard";

const Actualites: React.FC = () => {
  const { articles } = useArticlesContext();
  const newActualites = articles.slice(0, 5);
  const additionalNews = articles.slice(5, 17);
  return (
    <div className="container mx-auto p-4">
      {/* Additional News Cards in a 3-column grid */}
      <div className="mt-8 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {additionalNews.map((article, index) => (
          <NewsCard
            key={article.url}
            imageUrl={article.urlToImage || "/api/placeholder/400/300"}
            title={article.title}
            description={article.description}
            tag="News" // You might want to derive this from the article data if available
            source={article.source.name}
            timeAgo={new Date(article.publishedAt).toLocaleString()}
            id={index.toString()} // Assuming each article has a unique id
          />
        ))}
      </div>
    </div>
  );
};

export default Actualites;
