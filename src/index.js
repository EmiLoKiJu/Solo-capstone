import './style.css';
import getdata from './modules/getdata.js';
import likesforthissearch from './modules/likesforthissearch.js';
import getLikes from './modules/getlikes.js';
import giveLikes from './modules/givelikes.js';
import songelementcounter from './modules/songelementcounter.js';
import postcommentfunc from './modules/postcomment.js';
import getcomments from './modules/getcomments.js';
import loadcomments from './modules/loadcomments.js';
import commentscounter from './modules/commentscounter.js';

const musiccontainer = document.querySelector('.musiccontainer');
const countercontainer = document.querySelector('h2');

const updatelike = async (itemid) => {
  const data = await getdata();
  const updatedLikes = await likesforthissearch(data, getLikes());
  const index = updatedLikes.findIndex((item) => item.item_id === itemid);
  document.getElementById(`${itemid}`).innerHTML = updatedLikes[index].likes;
  // likenumbers[index].nextElementSibling.innerHTML('testing updatelike');
};

const buttonclicklike = (itemid) => {
  giveLikes(itemid);
  updatelike(itemid);
};

const buttonclickcomment = async (item) => {
  const popup = document.createElement('div');
  popup.classList.add('dflex', 'flexcol', 'popupwindow');
  popup.innerHTML = `
  <div class="popuplittle">
    <button class="closepopup">X</button>
    <img class="width450px" src=${item.album.images[0].url}></img>
    <h1>${item.name}</h1>
    <div class="dflex spacebetween">
      <h4>Artist: ${item.artists[0].name}</h4>
      <h4>Album: ${item.album.name}</h4>
    </div>
    <div class="dflex spacebetween">
      <h4>Listen on Spotify: <a href="${item.external_urls.spotify}" target="_blank">Link</a></h4>
      <h4>Release date: ${item.album.release_date}</h4>
    </div>
    <h2 class="commentscounter dflex">
      Comments: 
    </h2>
    <div class="commentscontainer">
    </div>
    <form id="myForm" action="">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="comment">Comment:</label>
        <input type="text" id="comment" name="comment" required>
      </div>
      <button class="postcomment">Comment</button>
    </form>
  </div>
  `;
  document.querySelector('body').appendChild(popup);

  // popup to close

  const closepopup = popup.querySelector('.closepopup');
  closepopup.addEventListener('click', () => {
    document.querySelector('body').removeChild(popup);
  });

  // post comment function

  const postcomment = popup.querySelector('.postcomment');
  postcomment.addEventListener('click', async (event) => {
    event.preventDefault();
    const nameinput = document.getElementById('name');
    const commentinput = document.getElementById('comment');
    if (nameinput.value.trim() !== '' && commentinput.value.trim() !== '') {
      await postcommentfunc(nameinput.value, commentinput.value, item.id);
      nameinput.value = '';
      commentinput.value = '';
      const commentsforthis = await getcomments(item.id);
      loadcomments(popup, commentsforthis);
      await commentscounter();
    }
  });

  // loading comments
  const commentsforthis = await getcomments(item.id);
  const loadedcomments = await loadcomments(popup, commentsforthis);

  // counting comments
  await commentscounter();
};

const render = async () => {
  const data = await getdata();
  const updatedLikes = await likesforthissearch(data, getLikes());
  for (let i = 0; i < data.tracks.items.length; i += 1) {
    const text = document.createElement('div');
    text.classList.add('songelementcontainer', 'dflex', 'flexcol');
    text.innerHTML = `
    <p>${data.tracks.items[i].name}</p>
    <audio controls>
      <source src="${data.tracks.items[i].preview_url}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <img src=${data.tracks.items[i].album.images[1].url}></img>
    <div class="dflex likescontainer">
      <button class="likebutton">like</button>
      <p class="likes" id="${data.tracks.items[i].id}">${updatedLikes[i].likes}</p>
    </div>
    <button class="commentbutton">comment</button>`;
    musiccontainer.appendChild(text);
    const likebutton = text.querySelector('.likebutton');
    likebutton.addEventListener('click', () => {
      buttonclicklike(data.tracks.items[i].id);
    });
    const commentbutton = text.querySelector('.commentbutton');
    commentbutton.addEventListener('click', () => {
      buttonclickcomment(data.tracks.items[i]);
    });
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await render();
  songelementcounter(countercontainer);
});