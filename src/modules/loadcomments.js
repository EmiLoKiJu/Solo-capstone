const loadcomments = async (popup, commentsforthis) => {
  const commentscontainer = popup.querySelector('.commentscontainer');
  let commentsstr = '';
  for (let i = 0; i < commentsforthis.length; i += 1) {
    commentsstr += `<div class="commentelement">${commentsforthis[i].creation_date} ${commentsforthis[i].username}: ${commentsforthis[i].comment}</div>`;
  }
  const commentselementcontainer = document.createElement('div');
  commentselementcontainer.innerHTML = commentsstr;
  commentscontainer.innerHTML = '';
  commentscontainer.appendChild(commentselementcontainer);
};

export default loadcomments;