import React from 'react';
import { Filter } from 'lucide-react';
import Post from './Post';

function Home() {
  const posts = [
    {
      id: 1,
      title: "Lost Blue Backpack",
      description:
        "I lost my blue North Face backpack near the library on Monday afternoon. It has my laptop and important notes inside.",
      location: "University Library",
      date: "2023-04-22",
      type: "lost",
      category: "accessories",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Lost Student ID Card",
      description: "Lost my student ID card somewhere in the Science Building. It has my name and student number on it.",
      location: "Science Building",
      date: "2023-04-20",
      type: "lost",
      category: "ids",
      user: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Found Water Bottle",
      description: "Found a silver Hydro Flask water bottle in Room 101 of the Engineering Building after the 2pm class.",
      location: "Engineering Building",
      date: "2023-04-21",
      type: "found",
      category: "accessories",
      user: {
        name: "Taylor Wilson",
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Found Keys",
      description:
        "Found a set of keys with a red keychain near the campus center. Has about 4 keys including what looks like a car key.",
      location: "Campus Center",
      date: "2023-04-23",
      type: "found",
      category: "accessories",
      user: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Lost Glasses",
      description: "Lost my black-framed glasses somewhere in the Student Union. They're in a blue case.",
      location: "Student Union",
      date: "2023-04-19",
      type: "lost",
      category: "accessories",
      user: {
        name: "Casey Morgan",
        avatar: "/placeholder.svg",
      },
      image: "/placeholder.svg?height=200&width=300",
    },
    
  ];

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
        {posts.map((post) => (
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