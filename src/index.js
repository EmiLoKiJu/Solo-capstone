import './style.css';
import getToken from './modules/getkey.js';
import getdata from './modules/getdata.js';
import songelementcounter from './modules/songelementcounter.js';

// Add a link to Google Fonts for Montserrat
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap';
document.head.appendChild(fontLink);

const musiccontainer = document.querySelector('.musiccontainer');
const seeMoreButtonContainer = document.querySelector('.seeMoreButtonContainer');
const countercontainer = document.querySelector('h2');
const formtolookartist = document.querySelector('form');
const inputElement = document.querySelector('.textinput');

// Add loading indicator
const createLoadingIndicator = () => {
  const loader = document.createElement('div');
  loader.classList.add('loading-indicator');
  loader.innerHTML = '<div class="spinner"></div><p>Loading songs...</p>';
  return loader;
};

let artistName = 'Linkin Park';

// Remove this section that adds a button
// if (!document.querySelector('.search-button')) {
//   const searchButton = document.createElement('button');
//   searchButton.textContent = 'Search';
//   searchButton.classList.add('search-button');
//   formtolookartist.appendChild(searchButton);
// }

formtolookartist.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (inputElement.value.trim() !== '') {
    artistName = inputElement.value.trim();
    
    // Remove existing content
    const songcounter = countercontainer.querySelector('h3');
    if (songcounter) songcounter.remove();
    
    // Clear existing loading indicators before adding a new one
    const existingLoaders = document.querySelectorAll('.loading-indicator');
    existingLoaders.forEach(loader => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    });
    
    while (musiccontainer.firstChild) {
      musiccontainer.removeChild(musiccontainer.firstChild);
    }
    
    const seemorebutton = document.querySelector('.seemore');
    if (seemorebutton) seemorebutton.remove();
    
    // Show loading indicator
    const loader = createLoadingIndicator();
    musiccontainer.appendChild(loader);
    
    // Fetch new data
    try {
      await render(`https://api.spotify.com/v1/search?q=${artistName}&type=track`);
    } catch (error) {
      console.error('Error fetching data:', error);
      musiccontainer.innerHTML = `<div class="error-message">Failed to load songs. Please try again.</div>`;
    } finally {
      // Remove loading indicator
      if (musiccontainer.contains(loader)) {
        musiccontainer.removeChild(loader);
      }
    }
    
    inputElement.value = '';
  }
});

const handlenextdata = async (url) => {
  // Show loading indicator
  const loader = createLoadingIndicator();
  seeMoreButtonContainer.appendChild(loader);
  
  try {
    await render(url);
  } finally {
    // Remove loading indicator
    if (seeMoreButtonContainer.contains(loader)) {
      seeMoreButtonContainer.removeChild(loader);
    }
  }
};

const showTrackDetails = async (item) => {
  const popup = document.createElement('div');
  popup.classList.add('dflex', 'flexcol', 'popupwindow');
  
  const albumImages = item.album.images;
  const imageUrl = albumImages && albumImages.length > 0 ? albumImages[0].url : '';
  
  popup.innerHTML = `
  <div class="popuplittle">
    <button class="closepopup">X</button>
    ${imageUrl ? `<img class="width450px" src=${imageUrl} alt="${item.name} album cover"></img>` : '<p>No image available</p>'}
    <h1>${item.name}</h1>
    <div class="dflex spacebetween">
      <h4>Artist: ${item.artists[0].name}</h4>
      <h4>Album: ${item.album.name}</h4>
    </div>
    <div class="dflex spacebetween">
      <h4>Listen on Spotify: <a href="${item.external_urls.spotify}" target="_blank">Link</a></h4>
      <h4>Release date: ${item.album.release_date}</h4>
    </div>
    <div class="track-details">
      <h3>Track Details</h3>
      <p>Duration: ${Math.floor(item.duration_ms / 60000)}:${(((item.duration_ms % 60000) / 1000).toFixed(0)).padStart(2, '0')}</p>
      <p>Popularity: ${item.popularity}/100</p>
      ${item.explicit ? '<p class="explicit-tag">Explicit</p>' : ''}
    </div>
  </div>
  `;
  document.querySelector('body').appendChild(popup);

  // Add animation class after popup is added to DOM
  setTimeout(() => {
    popup.classList.add('popup-active');
  }, 10);

  // popup to close
  const closepopup = popup.querySelector('.closepopup');
  closepopup.addEventListener('click', () => {
    // Add closing animation
    popup.classList.add('popup-closing');
    setTimeout(() => {
      document.querySelector('body').removeChild(popup);
    }, 300);
  });
};

const render = async (url) => {
  // Clear existing loading indicators before adding a new one
  const existingLoaders = document.querySelectorAll('.loading-indicator');
  existingLoaders.forEach(loader => {
    if (loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  });
  
  // Show loading state
  const loadingIndicator = createLoadingIndicator();
  musiccontainer.appendChild(loadingIndicator);
  
  try {
    const token = await getToken();
    const data = await getdata(token, url);
    
    // Remove loading indicator once data is fetched
    if (loadingIndicator.parentNode) {
      loadingIndicator.parentNode.removeChild(loadingIndicator);
    }
    
    // Check if there are results
    if (data.tracks.items.length === 0) {
      const noResults = document.createElement('div');
      noResults.classList.add('no-results');
      noResults.innerHTML = `<p>No songs found for "${artistName}". Try another search.</p>`;
      musiccontainer.appendChild(noResults);
      return;
    }
    
    for (let i = 0; i < data.tracks.items.length; i += 1) {
      const previewUrl = data.tracks.items[i].preview_url;
      const spotifyUrl = data.tracks.items[i].external_urls.spotify;
      const albumImages = data.tracks.items[i].album.images;
      const imageUrl = albumImages && albumImages.length > 1 ? albumImages[1].url : 
                      (albumImages && albumImages.length > 0 ? albumImages[0].url : '');
      
      const text = document.createElement('div');
      text.classList.add('songelementcontainer', 'dflex', 'flexcol');
      
      // Add animation delay based on index
      text.style.animationDelay = `${i * 0.1}s`;
      
      text.innerHTML = `
      <p class="song-title">${data.tracks.items[i].name}</p>
      <p class="song-artist">${data.tracks.items[i].artists[0].name}</p>
      ${previewUrl ? 
        `<audio controls>
          <source src="${previewUrl}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>` : 
        `<p class="no-preview">Preview not available - <a href="${spotifyUrl}" target="_blank">Listen on Spotify</a></p>`
      }
      ${imageUrl ? `<img src="${imageUrl}" alt="${data.tracks.items[i].name} album cover"></img>` : '<p>No image available</p>'}
      <button class="details-button">View Details</button>`;
      
      musiccontainer.appendChild(text);
      
      // Add fade-in animation class after element is added to DOM
      setTimeout(() => {
        text.classList.add('song-element-visible');
      }, 10);
      
      const detailsButton = text.querySelector('.details-button');
      detailsButton.addEventListener('click', () => {
        showTrackDetails(data.tracks.items[i]);
      });
    }
    
    songelementcounter(countercontainer);
    
    // Only show See More button if there's a next page
    if (data.tracks.next) {
      const divSeeMore = document.createElement('div');
      divSeeMore.classList.add('seemore');
      divSeeMore.innerHTML = `
      <button class="buttonSeeMore">See More Songs</button>`;
      seeMoreButtonContainer.appendChild(divSeeMore);
      
      const buttonSeeMore = divSeeMore.querySelector('.buttonSeeMore');
      buttonSeeMore.addEventListener('click', () => {
        // Show loading state
        buttonSeeMore.disabled = true;
        buttonSeeMore.innerHTML = '<span class="loading-spinner"></span> Loading more songs...';
        buttonSeeMore.style.width = buttonSeeMore.offsetWidth + 'px'; // Prevent button width from changing
        
        handlenextdata(data.tracks.next);
        const songcounter = countercontainer.querySelector('h3');
        if (songcounter) songcounter.remove();
        divSeeMore.remove();
      });
    }
  } catch (error) {
    console.error('Error rendering data:', error);
    
    // Remove loading indicator if it exists
    if (loadingIndicator.parentNode) {
      loadingIndicator.parentNode.removeChild(loadingIndicator);
    }
    
    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerHTML = `<p>Failed to load songs. Please try again later.</p>
                             <button class="retry-button">Retry</button>`;
    musiccontainer.appendChild(errorMessage);
    
    // Add retry functionality
    const retryButton = errorMessage.querySelector('.retry-button');
    retryButton.addEventListener('click', () => {
      errorMessage.remove();
      render(url);
    });
  }
};

// Add a function to check if the Spotify API token is valid
const checkApiConnection = async () => {
  try {
    await getToken();
    return true;
  } catch (error) {
    console.error('API connection check failed:', error);
    return false;
  }
};

// Add dark mode toggle functionality
const addDarkModeToggle = () => {
  const toggle = document.createElement('button');
  toggle.classList.add('theme-toggle');
  toggle.innerHTML = '🌓';
  toggle.setAttribute('aria-label', 'Toggle dark mode');
  document.body.appendChild(toggle);
  
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-theme'));
  });
  
  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-theme');
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  // Add a header with logo if it doesn't exist
  if (!document.querySelector('.app-header')) {
    const header = document.createElement('div');
    header.classList.add('app-header');
    header.innerHTML = `
      <div class="logo-container">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify" class="spotify-logo">
        <h1>Music Explorer</h1>
      </div>
    `;
    document.body.prepend(header);
  }
  
  // Add search button (simplified - no need to check for existing buttons)
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.classList.add('search-button');
  formtolookartist.appendChild(searchButton);
  
  // Add dark mode toggle
  addDarkModeToggle();
  
  // Add accessibility skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#musiccontainer';
  skipLink.classList.add('skip-link');
  skipLink.textContent = 'Skip to content';
  document.body.prepend(skipLink);
  
  // Check API connection before rendering
  const isConnected = await checkApiConnection();
  
  if (isConnected) {
    await render(`https://api.spotify.com/v1/search?q=${artistName}&type=track`);
  } else {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('api-error');
    errorMessage.innerHTML = `
      <h2>Connection Error</h2>
      <p>Unable to connect to Spotify API. Please check your internet connection and try again.</p>
      <button class="retry-button">Retry Connection</button>
    `;
    musiccontainer.appendChild(errorMessage);
    
    const retryButton = errorMessage.querySelector('.retry-button');
    retryButton.addEventListener('click', async () => {
      errorMessage.remove();
      const retryConnection = await checkApiConnection();
      if (retryConnection) {
        await render(`https://api.spotify.com/v1/search?q=${artistName}&type=track`);
      } else {
        musiccontainer.appendChild(errorMessage);
      }
    });
  }
});