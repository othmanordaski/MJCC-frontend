import React from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
  tag: string;
  source: string;
  timeAgo: string;
  id: string; // Assuming each article has a unique id
}

const NewsCard: React.FC<NewsCardProps> = ({
  imageUrl,
  title,
  description,
  tag,
  source,
  timeAgo,
  id, // Add id as a prop
}) => {
  return (
    <div className="news-card-container shadow-md rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="news-card-image w-full h-68 object-cover"
      />
      <div className="news-card-content p-4">
        <div className="news-card-source flex items-center text-sm text-gray-500">
          <span className="source-name">{source}</span>
          <span className="time-ago ml-auto">{timeAgo}</span>
        </div>
        <h3 className="news-card-title font-bold text-lg mt-2">{title}</h3>
        <p className="news-card-description mt-2 text-gray-700">
          {description}
        </p>
        <div className="news-card-meta flex items-center justify-between mt-4 text-sm text-gray-500">
          <span className="news-card-tag bg-red-100 text-red-600 px-2 py-1 rounded-full">
            {tag}
          </span>
          <Link
            to={`${id}`}
            className="news-card-lire-la-suite text-orange-500 hover:underline"
          >
            Lire la suite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
