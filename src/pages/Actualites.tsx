import React from "react";
import { ExternalLink } from "lucide-react";
import { useArticlesContext } from "../context/ArticalsContext";
// interface Source {
//   id: string | null;
//   name: string;
// }

const NewsItem: React.FC<{ article: any; isMain?: boolean }> = ({
  article,
  isMain,
}) => (
  <div
    className={`relative overflow-hidden rounded-lg shadow-md ${
      isMain ? "col-span-2 row-span-2" : ""
    }`}
  >
    <img
      src={article.urlToImage || "/api/placeholder/400/300"}
      alt={article.title}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 className={`text-white font-bold ${isMain ? "text-2xl" : "text-lg"}`}>
        {article.title}
      </h3>
      <p className="text-gray-300 text-sm mt-2 line-clamp-2">
        {article.description}
      </p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-300 text-sm">{article.source.name}</span>
        <span className="text-gray-300 text-sm">
          {new Date(article.publishedAt).toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);

const Actualites: React.FC = () => {
  const { articles } = useArticlesContext();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article, index) => (
          <NewsItem key={article.url} article={article} isMain={index === 0} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <a
          href="#"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          View all news <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default Actualites;
