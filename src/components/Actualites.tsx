import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";

interface NewsItemProps {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <img
      src={urlToImage || "/api"}
      alt={title}
      className="w-full h-40 object-cover rounded-t-lg"
    />
    <p className="text-sm text-gray-500 mt-2">
      {new Date(publishedAt).toLocaleDateString()}
    </p>
    <h3 className="text-lg font-semibold mt-1">{title}</h3>
    <p className="text-sm text-gray-700 mt-2">{description}</p>
    <div className="mt-4 text-orange-500 flex items-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  </div>
);

interface QuickAccessItemProps {
  urlToImage: string;
  title: string;
  url: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
  urlToImage,
  title,
  url,
}) => (
  <div className="flex items-center space-x-4 py-2">
    <img src={urlToImage} alt={title} className="w-8 h-8" />
    <div>
      <h4 className="font-semibold">{title}</h4>
      <a href={url} className="text-orange-500 flex items-center">
        Learn more <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </div>
  </div>
);

const NewsDashboard: React.FC = () => {
  const [articles, setArticles] = useState<NewsItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quickAccessItems, setquickAccessItems] = useState<
    QuickAccessItemProps[]
  >([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not defined in environment variables");
      }
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=morocco&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data.articles.slice(0, 4));
        setquickAccessItems(data.articles.slice(16, 26));
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[600px]">
        <CircularProgress />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Actualités à la Une</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </div>
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-orange-500 flex items-center justify-end "
            >
              Voir toutes les actualités <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Accès rapides</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {quickAccessItems.map((item, index) => (
              <QuickAccessItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDashboard;
