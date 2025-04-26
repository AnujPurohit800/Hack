import React, { use, useState,useEffect } from "react";
import { MapPin, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../Hooks/api/context/useAuth";
import { toast } from "react-toastify";
function Report() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [postData, setPostData] = useState({
    type: "lost",
    title: "",
    description: "",
    location: "",
    category: "accessories",
    image: null,
  });
    const { logout, setIsLoggedIn , auth } = useAuth();
  const[token,setToken]=useState(null);
  useEffect(() => {
      setToken(localStorage.getItem("token"));
  },[])
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPostData((prev) => ({
        ...prev,
        image: file, // Update postData with the selected file
      }));
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You are not authorized. Please login first!");
      return;
    }
  
    try {
      setIsSubmitting(true); // start loading
  
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("location", postData.location);
      formData.append("category", postData.category);
      formData.append("type", postData.type);
      formData.append("image", postData.image); 
  
      const response = await axios.post("http://localhost:3000/api/posts", formData, {
        headers: {
          "x-access-header": token,
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Post created successfully!");
      
  
      // Reset form
      setPostData({
        type: "lost",
        title: "",
        description: "",
        location: "",
        category: "accessories",
        image: null,
      });
      setImageFile(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error("Error creating post", error);
      toast.error("Failed to submit post!");
    } finally {
      setIsSubmitting(false); // stop loading
    }
  };
  
  
  return (
    <div className="w-full md:max-w-2xl mx-auto p-2 md:p-6">
      <div className="border border-gray-700 rounded-xl p-3 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Create a New Post
        </h1>
        <p className="text-gray-400 mb-8">
          {postData.type === "lost"
            ? "Report an item you've lost on campus"
            : "Report an item you've found on campus"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Post Type Toggle */}
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="radio"
                name="type"
                value="lost"
                checked={postData.type === "lost"}
                onChange={handleInputChange}
                className="hidden"
              />
              <div
                className={`text-center py-3 rounded-lg cursor-pointer transition-colors ${
                  postData.type === "lost"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                Lost Item
              </div>
            </label>
            <label className="flex-1">
              <input
                type="radio"
                name="type"
                value="found"
                checked={postData.type === "found"}
                onChange={handleInputChange}
                className="hidden"
              />
              <div
                className={`text-center py-3 rounded-lg cursor-pointer transition-colors ${
                  postData.type === "found"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                Found Item
              </div>
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a descriptive title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={postData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide detailed information about the item"
            />
          </div>

          {/* Location and Category - make it stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Location</label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="location"
                  value={postData.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Where was it lost/found?"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={postData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="accessories">Accessories</option>
                <option value="electronics">Electronics</option>
                <option value="ids">IDs & Cards</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500 transition-colors relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {!imagePreview ? (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Click to upload image</span>
                </div>
              ) : (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-1/2 h-full"
                />
              )}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Report;
