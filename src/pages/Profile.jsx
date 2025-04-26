import React, { useState,useEffect } from 'react';
import { Mail, Key, User, Trash2, Edit2 } from 'lucide-react';
import Post from './Post';
import { useAuth } from '../Hooks/api/context/useAuth';

function Profile() {
   const { auth,posts} = useAuth();
  const [isEditing, setIsEditing] = useState(false);

const [userDetails, setUserDetails] = useState({
  fullName: '',
  studentId: '',
  email: '',
  password: '********',
});

useEffect(() => {
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log("User from localStorage:", user);

    setUserDetails({
      fullName: user?.data?.name || '',
      studentId: user?.data?.studentId || '',
      email: user?.data?.email || '',
      password: '********'
    });
  }
}, []);

  //  user posts
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const filteredPosts = posts
      .filter(post => post.postedBy.name === userDetails.fullName)
      .map((post, index) => ({
        id: index + 1, // or post.id if you already have an id
        title: post.title || "No Title", // or whatever field your post has
        description: post.description || "No Description",
        location: post.location || "Unknown Location",
        date: post.date || new Date().toISOString().split('T')[0], // today's date if missing
        type: post.type || "lost",
        category: post.category || "others",
        user: {
          name: post.postedBy.name,
          avatar: post.postedBy.avatar || "/placeholder.svg",
        },
        image: post.image || "/placeholder.svg",
      }));
  
    setUserPosts(filteredPosts);
  }, [posts, userDetails.fullName]);
  const handleUpdateDetails = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle update logic here
  };
  
  const handleDeletePost = (postId) => {
    setUserPosts(posts => posts.filter(post => post.id !== postId));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-xl overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="px-6 pb-6">
          <div className="relative flex items-end -mt-12 mb-4">
            <img
              src={`https://robohash.org/${userDetails.fullName}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-800 bg-gray-700"
            />
            <div className="ml-4 mb-2">
              <h1 className="text-2xl font-bold text-white">{userDetails.fullName}</h1>
              <p className="text-gray-400">Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Section */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">User Details</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-400"
          >
            <Edit2 size={20} />
          </button>
        </div>

        <form onSubmit={handleUpdateDetails} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={userDetails.fullName}
                disabled={!isEditing}
                onChange={(e) => setUserDetails({...userDetails, fullName: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-gray-300 mb-2">Student ID</label>
            <input
              type="text"
              value={userDetails.studentId}
              disabled={!isEditing}
              onChange={(e) => setUserDetails({...userDetails, studentId: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={userDetails.email}
                disabled={!isEditing}
                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={userDetails.password}
                disabled={!isEditing}
                onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>

      {/* User Posts Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">My Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div key={post.id} className="relative">
              <Post {...post} />
              <button
                onClick={() => handleDeletePost(post.id)}
                className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/30 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;