// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import StoryReel from './components/StoryReel';
import StoryViewer from './components/StoryViewer';
import { resizeImage } from './utils/imageUtils';
import './App.css';

const MAX_IMAGE_WIDTH = 1080;
const MAX_IMAGE_HEIGHT = 1920;
const STORY_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const VIEW_DURATION_MS = 5000; // 5 seconds per story view

function App() {
  const [stories, setStories] = useState([]);
  const [viewingStorySet, setViewingStorySet] = useState(null); // { stories: [], startIndex: 0 }

  // Load stories from localStorage and filter out expired ones
  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem('storiesData')) || [];
    const now = Date.now();
    const validStories = storedStories.filter(story => (now - story.timestamp) < STORY_DURATION_MS);
    setStories(validStories);
    if (validStories.length < storedStories.length) {
        localStorage.setItem('storiesData', JSON.stringify(validStories));
    }
  }, []);

  const handleAddStory = async (file) => {
    if (!file) return;

    try {
      const base64Image = await resizeImage(file, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
      const newStory = {
        id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        src: base64Image,
        timestamp: Date.now(),
        viewed: false, // Each new story starts as unviewed
        // user: "You" // Could add a user concept later
      };
      // Add new story to the beginning of the list so it appears first in the reel
      const updatedStories = [newStory, ...stories.filter(s => s.id !== newStory.id)];
      setStories(updatedStories);
      localStorage.setItem('storiesData', JSON.stringify(updatedStories));
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try a different one.");
    }
  };

  const handleViewStories = (clickedStoryId) => {
    // When a story circle is clicked, we want to show all available stories in sequence,
    // starting from the one that was clicked.
    const startIndex = stories.findIndex(s => s.id === clickedStoryId);

    if (startIndex !== -1) {
      setViewingStorySet({ stories: [...stories], startIndex }); // Pass all stories, starting at the clicked one

      // Mark the clicked story as viewed in the main `stories` array for the reel
      const updatedStories = stories.map(s =>
        s.id === clickedStoryId && !s.viewed ? { ...s, viewed: true } : s
      );
      if (JSON.stringify(updatedStories) !== JSON.stringify(stories)) {
        setStories(updatedStories);
        localStorage.setItem('storiesData', JSON.stringify(updatedStories));
      }
    }
  };

  const handleCloseViewer = () => {
    setViewingStorySet(null);
  };

  const handleDeleteStory = useCallback((storyIdToDelete) => {
    const remainingStories = stories.filter(story => story.id !== storyIdToDelete);
    setStories(remainingStories);
    localStorage.setItem('storiesData', JSON.stringify(remainingStories));

    if (viewingStorySet) {
      const newViewingStories = viewingStorySet.stories.filter(s => s.id !== storyIdToDelete);

      if (newViewingStories.length === 0) {
        handleCloseViewer();
      } else {
        let newStartIndex = viewingStorySet.startIndex;
        const currentViewingStoryId = viewingStorySet.stories[viewingStorySet.startIndex]?.id;

        if (currentViewingStoryId === storyIdToDelete) {
          // If the currently viewed story was deleted, try to stay at the same index
          // if possible (a new story from the list takes its place),
          // or adjust if it was the last one.
          newStartIndex = Math.min(viewingStorySet.startIndex, newViewingStories.length - 1);
          if (newStartIndex < 0) newStartIndex = 0; // Should not happen if newViewingStories.length > 0
        } else {
          // If a *different* story in the viewer's current list was deleted,
          // find the new index of the story that *was* being viewed.
          newStartIndex = newViewingStories.findIndex(s => s.id === currentViewingStoryId);
          if (newStartIndex === -1) { // The story that was being viewed is no longer in the list (e.g. it was also deleted or list changed drastically)
             if (newViewingStories.length > 0) newStartIndex = 0; // Fallback to first story
             else {
                 handleCloseViewer(); // No stories left to view
                 return;
             }
          }
        }
        setViewingStorySet({ stories: newViewingStories, startIndex: newStartIndex });
      }
    }
  }, [stories, viewingStorySet]);

  const markStoryAsViewedInReel = (storyId) => {
    // This is called by StoryViewer when a segment is actually displayed
    const updatedStories = stories.map(s =>
      s.id === storyId && !s.viewed ? { ...s, viewed: true } : s
    );
    if (JSON.stringify(updatedStories) !== JSON.stringify(stories)) {
        setStories(updatedStories);
        localStorage.setItem('storiesData', JSON.stringify(updatedStories));
    }
  };


  return (
    <div className="app">
      <header className="app-header">
        <h1>Stories</h1>
      </header>
      <StoryReel
        stories={stories} // Pass all individual stories
        onAddStory={handleAddStory}
        onViewStories={handleViewStories} // This will be called with the ID of the specific story clicked
      />
      {viewingStorySet && viewingStorySet.stories.length > 0 && (
        <StoryViewer
          // Key helps React differentiate if the set of stories or start index changes significantly
          key={viewingStorySet.stories.map(s => s.id).join('-') + `-${viewingStorySet.startIndex}`}
          storySet={viewingStorySet} // This set will be all current stories
          onClose={handleCloseViewer}
          onDeleteStory={handleDeleteStory}
          viewDuration={VIEW_DURATION_MS}
          onStoryViewed={markStoryAsViewedInReel}
        />
      )}
      <main className="app-content">
        <p>Welcome to the Stories App!</p>
        <p>Add a story using the "+" button above. Click on a story circle to view.</p>
        <p>Stories automatically disappear after 24 hours.</p>
        <p>Inside the story viewer, you can swipe or click on edges to navigate, or click the trash icon to delete.</p>
      </main>
    </div>
  );
}

export default App;