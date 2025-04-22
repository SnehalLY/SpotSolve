import React, { useEffect, useState } from "react";
import "../global.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }
  }, []);

  const posts = [
    {
      id: 1,
      username: "Snehal",
      userPic:
        "https://images.unsplash.com/photo-1586299485759-f62264d6b63f?w=600&auto=format&fit=crop&q=60",
      postImage:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      likes: 300,
      comment: "This needs to be resolved early.",
    },
  ];

  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      {/* Search Box */}
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or comment"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      {/* Cards */}
      {filteredPosts.map((post) => (
        <div className="card" key={post.id}>
          {/* Card Header */}
          <div className="card-header">
            <div className="card-pic">
              <img src={post.userPic} alt="profile" />
            </div>
            <h5>{post.username}</h5>
          </div>

          {/* Card Image */}
          <div className="card-image">
            <img src={post.postImage} alt="card content" />
          </div>

          {/* Card Content */}
          <div className="card-content">
            <span className="material-symbols-outlined">thumb_up</span>
            <p>{post.likes} Yes</p>
            <p>{post.comment}</p>
          </div>

          {/* Add Comment */}
          <div className="add-comment">
            <span className="material-symbols-outlined">reviews</span>
            <input type="text" placeholder="Add your thoughts" />
            <button className="comment">Post</button>
          </div>
        </div>
      ))}
    </div>
  );
}