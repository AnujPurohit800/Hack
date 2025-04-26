import React, { useState } from 'react';
import { MapPin, Calendar, MessageCircle, Eye } from 'lucide-react';
import ViewPost from './ViewPost';

function Post({ 
  id,
  title,
  description,
  location,
  date,
  type,
  category,
  user,
  image,
  onMessageClick,
  onViewClick 
}) {
  const [showViewPost, setShowViewPost] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                type === 'lost' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
              }`}>
                {type.toUpperCase()}
              </span>
              <h3 className="text-white font-semibold">{title}</h3>
            </div>
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {category}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-48 bg-gray-700">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="p-4">
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-gray-400 text-sm">{date}</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onMessageClick?.(id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </button>
              <button 
                onClick={() => setShowViewPost(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full bg-gray-600"
              />
              <span className="text-gray-300 text-sm">{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      {showViewPost && (
        <ViewPost 
          post={{
            id,
            title,
            description,
            location,
            date,
            type,
            category,
            user,
            image
          }}
          onClose={() => setShowViewPost(false)}
        />
      )}
    </>
  );
}

Post.defaultProps = {
  onMessageClick: () => {},
  onViewClick: () => {},
};

export default Post