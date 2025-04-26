import React, { useState } from 'react';
import { Search, Download, Eye, Check, Trash2, Filter } from 'lucide-react';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all'
  });

  // Mock statistics
  const stats = {
    totalItems: 156,
    activeItems: 45,
    resolvedItems: 111,
    totalUsers: 89
  };

  // Mock items data
  const [items] = useState([
    {
      id: 1,
      title: "Lost Blue Backpack",
      type: "lost",
      location: "University Library",
      date: "2023-04-22",
      status: "active",
      user: "Alex Johnson"
    },
    {
      id: 2,
      title: "Found Water Bottle",
      type: "found",
      location: "Engineering Building",
      date: "2023-04-21",
      status: "resolved",
      user: "Taylor Wilson"
    }
  ]);

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleStatusChange = (itemId) => {
    console.log('Changing status for item:', itemId);
  };

  const handleDelete = (itemId) => {
    console.log('Deleting item:', itemId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome, Admin</h1>
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={20} />
          Export Data
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-gray-400 mb-2">Total Items</h3>
          <p className="text-3xl font-bold text-white">{stats.totalItems}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-gray-400 mb-2">Active Items</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.activeItems}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-gray-400 mb-2">Resolved Items</h3>
          <p className="text-3xl font-bold text-green-500">{stats.resolvedItems}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-gray-400 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-purple-500">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Item Management */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Item Management</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <select
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400">Item Type</th>
                <th className="pb-3 text-gray-400">Location</th>
                <th className="pb-3 text-gray-400">Date</th>
                <th className="pb-3 text-gray-400">Status</th>
                <th className="pb-3 text-gray-400">User</th>
                <th className="pb-3 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.type === 'lost' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">{item.location}</td>
                  <td className="py-4 text-gray-300">{item.date}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'active' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">{item.user}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-white">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(item.id)}
                        className="text-gray-400 hover:text-green-500"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;