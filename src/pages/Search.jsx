import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Filter, ChevronDown } from "lucide-react";
import Post from "./Post";
import { useAuth } from "../Hooks/api/context/useAuth";

function Search() {
  const [filters, setFilters] = useState({
    itemType: "all",
    category: "all",
    dateRange: "all",
    location: "",
    sortBy: "newest",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [keyWord, setKeyWord] = useState(""); // keyword for search

  const { posts } = useAuth();
  console.log(posts);
  const posts2 = posts.map((post, index) => ({
    id: index + 1,
    title: post.title,
    description: post.description,
    location: post.location,
    date: new Date(post.createdAt).toISOString().split("T")[0],
    type: post.type,
    category: post.category,
    user: {
      name: post.postedBy.name,
      avatar:  `https://robohash.org/${post.postedBy.name}`,
    },
    image: post.image || "/placeholder.svg",
  }));

  const [searchActive, setSearchActive] = useState(false);

  // Filter posts based on filters state
  const filteredPosts = posts2.filter((post) => {
    return (
      (filters.itemType === "all" || post.type === filters.itemType) &&
      (filters.category === "all" || post.category === filters.category) &&
      (filters.location === "" ||
        post.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.dateRange === "all" ||
        filterByDate(post.date, filters.dateRange))
    );
  });

  // Filter by date range helper function
  const filterByDate = (postDate, range) => {
    const date = new Date(postDate);
    const now = new Date();
    const daysDiff = (now - date) / (1000 * 60 * 60 * 24);

    switch (range) {
      case "today":
        return daysDiff < 1;
      case "week":
        return daysDiff < 7;
      case "month":
        return daysDiff < 30;
      default:
        return true;
    }
  };

  // Function to search posts based on the keyWord
  const searchPosts = (keyWord) => {
    if (keyWord.trim() === "") {
      return filteredPosts;
    }

    const lowerKeyword = keyWord.toLowerCase();
    return filteredPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(lowerKeyword);
      const descriptionWords = post.description.toLowerCase().split(" ");
      const descriptionMatch = descriptionWords.some((word) =>
        word.includes(lowerKeyword)
      );
      return titleMatch || descriptionMatch;
    });
  };

  // Sort posts based on filters
  const sortedPosts = (posts) => {
    return posts.sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "newest":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });
  };

  // Update the posts whenever keyword or filters change
  const displayedPosts = sortedPosts(searchPosts(keyWord));

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchActive(true);
    setKeyWord(searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-6">
        Search Lost & Found Items
      </h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for lost or found items..."
            className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={(e) => handleSearchSubmit(e)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition-colors"
        >
          Search
        </button>
      </div>

      {/* Filters and Sort Buttons */}
      <div className="flex gap-4 mb-6 justify-end">
        {/* Filters Button */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg"
          >
            <Filter size={20} />
            <span>Filters</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>

          {/* Filters Dropdown */}
          {showFilters && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800 rounded-lg p-4 shadow-lg z-10">
              <div className="space-y-4">
                {/* Item Type */}
                <div>
                  <label className="block text-gray-300 mb-2">Item Type</label>
                  <select
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                    value={filters.itemType}
                    onChange={(e) => setFilters({ ...filters, itemType: e.target.value })}
                  >
                    <option value="all">All</option>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="all">All Categories</option>
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="ids">IDs & Cards</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-gray-300 mb-2">Date Range</label>
                  <select
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sort Button */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg"
          >
            <span>Sort by: {filters.sortBy}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${showSort ? "rotate-180" : ""}`}
            />
          </button>

          {/* Sort Dropdown */}
          {showSort && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg p-2 shadow-lg z-10">
              {['newest', 'oldest', 'relevant'].map(option => (
                <button
                  key={option}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    filters.sortBy === option ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setFilters({ ...filters, sortBy: option });
                    setShowSort(false);
                  }}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)} First
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-300">
          <span className="font-semibold text-white">{displayedPosts.length}</span> results found
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchActive ? (
          displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
              <Post
                key={post.id}
                {...post}
                onMessageClick={(id) => console.log("Message clicked:", id)}
                onViewClick={(id) => console.log("View clicked:", id)}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No results found.</p>
          )
        ) : (
          displayedPosts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onMessageClick={(id) => console.log("Message clicked:", id)}
              onViewClick={(id) => console.log("View clicked:", id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
