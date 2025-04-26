import {React , useState} from 'react';
import { Filter } from 'lucide-react';
import Post from './Post';
import { useAuth } from '../Hooks/api/context/useAuth';

function Home() {
  const{posts} = useAuth();
  const posts2 = posts.map((post, index) => ({
    id: index + 1, 
    title: post.title,
    description: post.description,
    location: post.location,
    date: new Date(post.createdAt).toISOString().split('T')[0], 
    type: post.type,
    category: post.category,
    user: {
      name: post.postedBy.name, 
      avatar: `https://robohash.org/${post.postedBy.name}`, 
    },
    image: post.image || "/placeholder.svg", 
  }));
 
  return (
    <div className="max-w-7xl">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Campus Lost & Found
        </h1>
        <p className="text-gray-400 text-lg">
          Help reunite lost items with their owners or find what you've lost on campus.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {posts2.map((post) => (
          <Post
            key={post.id}
            {...post}
            onMessageClick={(id) => console.log('Message clicked:', id)}
            onViewClick={(id) => console.log('View clicked:', id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;