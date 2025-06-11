// src/components/StoryReel.jsx
import React, { useRef } from 'react';
import './StoryReel.css';

// Plus Icon SVG
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const StoryReel = ({ stories, onAddStory, onViewStories }) => {
  const fileInputRef = useRef(null);

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onAddStory(file);
    }
    event.target.value = null; // Reset file input
  };

  return (
    <div className="story-reel-container">
      <div className="story-reel">
        <div className="story-item add-story-button" onClick={handleAddClick} role="button" tabIndex="0" aria-label="Add new story">
          <div className="story-circle add-circle">
            <PlusIcon />
          </div>
          <span className="story-username">Add Story</span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Map over each story to create its own circle in the reel */}
        {stories.map((story, index) => ( // Added index for a more descriptive aria-label if needed
          <div
            key={story.id}
            className="story-item"
            onClick={() => onViewStories(story.id)} // Pass the specific story's ID
            role="button"
            tabIndex="0"
            aria-label={`View story ${index + 1}`} // Simple aria-label
          >
            <div className={`story-circle ${story.viewed ? 'viewed' : ''}`}>
              <img src={story.src} alt={`Story ${index + 1} thumbnail`} className="story-thumbnail" />
            </div>
            {/* For now, all stories are "Your Story". Could be dynamic if users existed */}
            <span className="story-username">Your Story</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryReel;