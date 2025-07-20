import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('BANGER CONTENT SCRIPT LOADED! Sidebar is ready.');

function injectSidebar() {
  if (document.getElementById('banger-root')) return;
  // Create host div
  const rootDiv = document.createElement('div');
  rootDiv.id = 'banger-root';
  document.body.appendChild(rootDiv);
  // Attach shadow root
  const shadow = rootDiv.attachShadow({ mode: 'open' });
  // Inject CSS into shadow root
  const style = document.createElement('link');
  style.id = 'banger-sidebar-style';
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.runtime.getURL('banger-sidebar.css');
  shadow.appendChild(style);
  // Create sidebar container inside shadow
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'banger-sidebar-container';
  shadow.appendChild(sidebarContainer);
  // Render React app into shadow root container
  ReactDOM.createRoot(sidebarContainer).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Listen for TOGGLE_SIDEBAR messages from background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === 'TOGGLE_SIDEBAR') {
    const sidebar = document.getElementById('banger-root');
    if (sidebar) {
      sidebar.remove();
    } else {
      injectSidebar();
    }
  }
});

// Inject on load (optional: comment out if you only want on click)
// injectSidebar();