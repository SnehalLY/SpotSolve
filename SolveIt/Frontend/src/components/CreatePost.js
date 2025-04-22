import React, { useState, useRef, useEffect } from 'react';
import "../global.css";

export default function CreatePost() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="create-post-container">
      {/* Header */}
      <div className="post-header">
        <h2>Create New Post</h2>
        <button className="share-button" disabled={!imageUrl}>
          <span>Share</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
      </div>

      {/* Image Upload Area */}
      <div className="upload-section" ref={containerRef}>
        <div 
          className={`upload-area ${imageUrl ? 'has-image' : ''}`}
          onClick={() => fileInputRef.current.click()}
        >
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="preview-image"
            />
          ) : (
            <div className="upload-prompts">
              <svg className="upload-icon" viewBox="0 0 24 24">
                <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"/>
              </svg>
              <p>Drag photos here or click to upload</p>
              <small>Recommended format: JPEG, PNG (Max 5MB)</small>
            </div>
          )}
          
          {/* Floating Add Photo Button */}
          {imageUrl && (
            <div className="change-photo-button">
              <svg viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden-input"
        />
      </div>

      {/* Post Details */}
      <div className="post-details">
        <div className="author-info">
          <img 
            src="https://images.unsplash.com/photo-1586299485759-f62264d6b63f?w=600&auto=format&fit=crop&q=60" 
            alt="Profile"
            className="profile-pic"
          />
          <span className="author-name">Snehal</span>
        </div>
        <textarea
          placeholder="Write your story..."
          className="caption-input"
          rows="4"
        />
      </div>
    </div>
  );
}