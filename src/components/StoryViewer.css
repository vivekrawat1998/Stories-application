.story-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-dark); /* Dark background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
  -webkit-tap-highlight-color: transparent; /* Prevent flash on tap */
}

.story-viewer-content {
  width: 100%;
  height: 100%;
  max-width: 450px; /* Max width for story, common for mobile-first views */
  max-height: 90vh; /* Max height, leaving some space */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden; /* To contain the image */
  background-color: #000; /* Black background for the image area */
  border-radius: 10px; /* Optional: slight rounding on desktop */
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.story-progress-bars {
  position: absolute;
  top: 12px; /* Increased spacing */
  left: 12px;
  right: 12px;
  display: flex;
  gap: 3px;
  height: 3px; /* Thin progress bars */
  z-index: 10;
}

.progress-bar-segment {
  flex-grow: 1;
  background-color: var(--progress-bar-background);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--progress-bar-fill);
  border-radius: 3px;
  transition: width 0.05s linear; /* Smooth progress animation */
}

.story-header {
  position: absolute;
  top: 25px; /* Below progress bars + more space */
  left: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  /* Adding a subtle gradient for better text readability over image */
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
  padding-top: 10px; /* Padding for the gradient effect */
  padding-bottom: 20px; /* Ensure gradient fades out before image content */
  pointer-events: none; /* Allow clicks to pass through header to image for navigation */
}
.story-header > * {
  pointer-events: auto; /* Re-enable pointer events for children of header */
}


.story-user-info {
  display: flex;
  flex-direction: column; /* Stack name and timestamp */
  align-items: flex-start;
}

.story-user-name {
  font-weight: 600; /* Slightly bolder */
  font-size: 0.95rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
}
.story-timestamp {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
}

.story-controls {
    display: flex;
    align-items: center;
}

.story-control-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px; /* Better touch target */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}
.story-control-button:hover {
    background-color: rgba(255,255,255,0.15);
}

.story-viewer-delete {
  margin-right: 5px; /* Space between delete and close */
}

.story-control-button svg {
  width: 22px; /* Slightly smaller icons */
  height: 22px;
}

.story-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.story-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(30, 30, 30, 0.4); /* Darker, more subtle */
  color: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  width: 44px; /* Slightly larger touch target */
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: background-color 0.2s, opacity 0.2s;
  opacity: 0; /* Hidden by default, show on hover/focus or specific conditions */
}
.story-viewer-overlay:hover .story-nav-button {
    opacity: 1; /* Show on hover over the entire viewer */
}
.story-nav-button:focus-visible { /* Accessibility focus */
    opacity: 1;
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}


.story-nav-button.prev {
  left: 10px;
}

.story-nav-button.next {
  right: 10px;
}

.story-nav-button svg {
  width: 24px; /* Adjusted icon size within button */
  height: 24px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .story-viewer-content {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
  .story-nav-button { /* Always visible on smaller screens, less hover reliance */
    opacity: 0.7;
    background-color: rgba(30, 30, 30, 0.3);
  }
  .story-nav-button:hover {
      opacity: 1;
      background-color: rgba(30, 30, 30, 0.5);
  }
}
