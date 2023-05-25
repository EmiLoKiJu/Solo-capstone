import './style.css';
import getdata from './modules/getdata.js';
import likesforthissearch from './modules/likesforthissearch.js';
import getLikes from './modules/getlikes.js';
import giveLikes from './modules/givelikes.js';
import songelementcounter from './modules/songelementcounter.js';

import dialogCommentCount from './modules/comment_counter.js';
import { closeDialog, dialogImage, dialogDetails, addCommentInterface } from './modules/comment.js';




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
    commentbutton.style.margin = '1rem';
    commentbutton.addEventListener('click', () => {


      const modalId = document.getElementById('modal-id');
      const dialogContent = document.getElementById('dialog-content-id');
      const dialogComment = document.getElementById('dialog-comment-id');
      const dialogClose = document.getElementById('dialog-close-id');
      const dialogImg = document.getElementById('dialog-img-id');
      const dialogDetail = document.getElementById('dialog-detail-id');
      const dialogInput = document.getElementById('dialog-input-id');

      modalId.style.display = 'flex';

      modalId.style.width = '80%';
      modalId.style.height = '90vh';
      modalId.style.background = '#fff';
      modalId.style.margin = '2rem';
      modalId.style.marginLeft = '3rem';
      modalId.scrollTop = '0';

      dialogContent.style.width = '100%';
      dialogContent.style.top = '0';
      dialogContent.style.background = '#fff';
      dialogContent.style.margin = '1rem';
      dialogContent.style.display = 'flex';
      dialogContent.style.flexDirection = 'column';
      dialogContent.style.overflowX = 'hidden';
      dialogContent.scrollTop = '0';

      dialogComment.innerHTML = '';
      dialogCommentCount(dialogComment, data.tracks.items[i].name);

      closeDialog(dialogClose, modalId);
      dialogImage(dialogImg, data.tracks.items[i].album.images[0].url);
      dialogDetails(dialogDetail, data.tracks.items[i].name, data.tracks.items[i].artists[0].name, 
        data.tracks.items[i].album.name, data.tracks.items[i].external_urls.spotify, data.tracks.items[i].album.release_date);

        dialogInput.innerHTML = '';
        addCommentInterface(dialogInput, dialogComment, data.tracks.items[i].name);

        modalId.showModal();
        modalId.scrollTop = '0';

        document.body.classList.add('blur');

    });
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await render();
  songelementcounter(countercontainer);
});