import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface Source {
  id: string | null; // Changed to allow null
  name: string;
}

interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ArticlesContextProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  filterArticles: (query: string) => Article[];
}

const ArticlesContext = createContext<ArticlesContextProps | undefined>(
  undefined
);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        if (!apiKey) {
          throw new Error("API key is not defined in environment variables");
        }
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=morocco&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        console.log("test", data);
        setArticles(data.articles);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filterArticles = (query: string) => {
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <ArticlesContext.Provider
      value={{ articles, loading, error, filterArticles }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticlesContext = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      "useArticlesContext must be used within an ArticleProvider"
    );
  }
  return context;
};
