import './style.css';
import getdata from './modules/getdata.js';
import likesforthissearch from './modules/likesforthissearch.js';
import getLikes from './modules/getlikes.js';
import giveLikes from './modules/givelikes.js';
// import getLikes from "./modules/gettinglikes.js";
const musiccontainer = document.querySelector('.musiccontainer');
const datanames = [];

const render = async () => {
  const data = await getdata();
  const updatedLikes = await likesforthissearch(data, getLikes());
  for (let i = 0; i < data.tracks.items.length; i += 1) {
    const text = document.createElement('div');
    text.classList.add('songelementontainer', 'dflex', 'flexcol');
    text.innerHTML = `<p>${data.tracks.items[i].name}</p><audio controls>
    <source src="${data.tracks.items[i].preview_url}" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><img src=${data.tracks.items[i].album.images[1].url}></img>
    <div class="dflex"><button class='likebutton'>like</button><p>${updatedLikes[i].likes}</p></div>`;
    musiccontainer.appendChild(text);
    const likebutton = text.querySelector('.likebutton');
    likebutton.addEventListener('click', () => {
      giveLikes(data.tracks.items[i].id);
    });
    datanames.push({
      item_id: data.tracks.items[i].id,
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  render();
});