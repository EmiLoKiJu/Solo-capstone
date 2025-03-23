import './style.css';
import getToken from './modules/getkey.js';
import getdata from './modules/getdata.js';
import songelementcounter from './modules/songelementcounter.js';

// Constants
const SPOTIFY_LOGO_URL = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png';
const DEFAULT_ARTIST = 'Linkin Park';

// DOM Elements
const musicContainer = document.querySelector('.musiccontainer');
const seeMoreButtonContainer = document.querySelector('.seeMoreButtonContainer');
const counterContainer = document.querySelector('h2');
const form = document.querySelector('form');
const inputElement = document.querySelector('.textinput');

// Global Variables
let artistName = DEFAULT_ARTIST;

// Utility Functions
const createElement = (tag, classList = [], innerHTML = '', attributes = {}) => {
  const element = document.createElement(tag);
  if (classList.length) element.classList.add(...classList);
  element.innerHTML = innerHTML;
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
  return element;
};

const createLoadingIndicator = () => createElement('div', ['loading-indicator'], `
  <div class="spinner"></div>
  <p>Loading songs...</p>
`);

const removeElement = (element) => element?.parentNode?.removeChild(element);

// Popup Functionality
const showTrackDetails = (item) => {
  const popup = createElement('div', ['popupwindow'], `
    <div class="popuplittle">
      <button class="closepopup">X</button>
      ${item.album.images?.[0]?.url ? `<img class="width450px" src="${item.album.images[0].url}" alt="${item.name} album cover">` : '<p>No image available</p>'}
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
  `);

  document.body.appendChild(popup);
  requestAnimationFrame(() => popup.classList.add('popup-active'));

  const closePopup = () => {
    popup.classList.add('popup-closing');
    setTimeout(() => removeElement(popup), 300);
  };

  popup.querySelector('.closepopup').addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => e.target === popup && closePopup());
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closePopup(), { once: true });
};

// Rendering Logic
const renderTracks = async (url) => {
  const loader = createLoadingIndicator();
  musicContainer.appendChild(loader);

  try {
    const token = await getToken();
    const { tracks } = await getdata(token, url);

    removeElement(loader);

    if (!tracks.items.length) {
      musicContainer.appendChild(createElement('div', ['no-results'], `<p>No songs found for "${artistName}". Try another search.</p>`));
      return;
    }

    tracks.items.forEach((track, index) => {
      const imageUrl = track.album.images?.[1]?.url || track.album.images?.[0]?.url || '';
      const songElement = createElement('div', ['songelementcontainer'], `
        <p class="song-title">${track.name}</p>
        <p class="song-artist">${track.artists[0].name}</p>
        ${track.preview_url
    ? `<audio controls><source src="${track.preview_url}" type="audio/mpeg">Your browser does not support the audio element.</audio>`
    : `<p class="no-preview">Preview not available - <a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>`}
        ${imageUrl ? `<img src="${imageUrl}" alt="${track.name} album cover">` : '<p>No image available</p>'}
        <button class="details-button">View Details</button>
      `);

      songElement.style.animationDelay = `${index * 0.1}s`;
      musicContainer.appendChild(songElement);
      requestAnimationFrame(() => songElement.classList.add('song-element-visible'));

      songElement.querySelector('.details-button').addEventListener('click', () => showTrackDetails(track));
    });

    songelementcounter(counterContainer);

    if (tracks.next) {
      const seeMore = createElement('div', ['seemore'], '<button class="buttonSeeMore">See More Songs</button>');
      seeMoreButtonContainer.appendChild(seeMore);
      seeMore.querySelector('.buttonSeeMore').addEventListener('click', async () => {
        seeMore.remove();
        await renderTracks(tracks.next);
      });
    }
  } catch (error) {
    removeElement(loader);
    musicContainer.appendChild(createElement('div', ['error-message'], `
      <p>Error rendering tracks: ${error.message}. Please try again later.</p>
      <button class="retry-button">Retry</button>
    `));
    musicContainer.querySelector('.retry-button').addEventListener('click', () => renderTracks(url));
  }
};

// Event Listeners
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newArtist = inputElement.value.trim();
  if (!newArtist) return;

  artistName = newArtist;
  musicContainer.innerHTML = '';
  seeMoreButtonContainer.innerHTML = '';
  counterContainer.querySelector('h3')?.remove();
  await renderTracks(`https://api.spotify.com/v1/search?q=${artistName}&type=track`);
  inputElement.value = '';
});

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  document.head.appendChild(createElement('link', [], '', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap' }));

  const header = createElement('div', ['app-header'], `
    <div class="logo-container">
      <img src="${SPOTIFY_LOGO_URL}" alt="Spotify" class="spotify-logo">
      <h1>Music Explorer</h1>
    </div>
  `);
  document.body.prepend(header);

  form.appendChild(createElement('button', ['search-button'], 'Search'));

  const toggle = createElement('button', ['theme-toggle'], '🌓', { 'aria-label': 'Toggle dark mode' });
  document.body.appendChild(toggle);
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-theme'));
  });
  if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-theme');

  document.body.prepend(createElement('a', ['skip-link'], 'Skip to content', { href: '#musiccontainer' }));

  try {
    await getToken();
    await renderTracks(`https://api.spotify.com/v1/search?q=${artistName}&type=track`);
  } catch (error) {
    musicContainer.appendChild(createElement('div', ['api-error'], `
      <h2>Connection Error</h2>
      <p>Unable to connect to Spotify API: ${error.message}. Please check your internet connection and try again.</p>
      <button class="retry-button">Retry Connection</button>
    `));
    musicContainer.querySelector('.retry-button').addEventListener('click', () => window.location.reload());
  }
});