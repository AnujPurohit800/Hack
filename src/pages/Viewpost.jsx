import React from 'react';
import { MapPin, Calendar, MessageCircle, X } from 'lucide-react';

function ViewPost({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              post.type === 'lost' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
            }`}>
              {post.type.toUpperCase()}
            </span>
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{post.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Image */}
          <div className="mb-6">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6 whitespace-pre-wrap">
            {post.description}
          </p>

          {/* User Info */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="w-10 h-10 rounded-full bg-gray-600"
              />
              <div>
                <div className="text-white font-medium">{post.user.name}</div>
                <div className="text-gray-400 text-sm">Posted by</div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <MessageCircle size={20} />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;