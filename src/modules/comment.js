import { dialogCommentCount } from './comment_counter.js';

export const closeDialog = (dialogDiv, dialogModal) => {
  const divClose = document.createElement('div');
  divClose.setAttribute('id', 'dialogCloseDiv');
  divClose.style.width = '7%';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttribute('fill', 'none');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('class', 'w-6 h-6');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  svg.appendChild(path);

  divClose.appendChild(svg);

  divClose.addEventListener('click', () => {
    dialogDiv.innerHTML = '';
    dialogModal.style.display = 'none';
    dialogModal.close();

    document.body.classList.remove('blur');
  });
  dialogDiv.appendChild(divClose);
};

export const dialogImage = (dialogContentDiv, dialogImg) => {

  const dialogImgDiv = document.createElement('div');
  dialogImgDiv.setAttribute('id', 'dialogImgDiv');
  dialogImgDiv.style.display = 'flex';
  dialogImgDiv.style.justifyContent = 'center';
  dialogImgDiv.style.width = '100%';

  const dialogImgX = document.createElement('img');
  dialogImgX.style.display = 'flex';
  dialogImgX.setAttribute('class', 'dialog-img');
  dialogImgX.src = dialogImg;
  dialogImgX.style.width = '50%';

  dialogImgDiv.appendChild(dialogImgX);

  dialogContentDiv.appendChild(dialogImgDiv);
};

export const dialogDetails = (dialogContentDiv, dgTitle, dgAuthor,
  dgContent, dgDate, dgUrl) => {
  const dialogDetailDiv = document.createElement('div');
  dialogDetailDiv.setAttribute('id', 'dialogDetailDiv');
  dialogDetailDiv.style.display = 'flex';
  dialogDetailDiv.style.flexDirection = 'column';
  dialogDetailDiv.style.justifyContent = 'center';
  dialogDetailDiv.style.width = '100%';
  dialogDetailDiv.style.margin = '1rem';

  const dialogTitle = document.createElement('p');
  dialogTitle.style.display = 'flex';
  dialogTitle.style.justifyContent = 'center';
  dialogTitle.textContent = dgTitle;
  dialogTitle.style.margin = '1rem';
  dialogTitle.setAttribute('class', 'dialog-title');
  dialogTitle.style.width = '100%';

  dialogDetailDiv.appendChild(dialogTitle);

  const dialogDetailDivX = document.createElement('div');
  dialogDetailDivX.setAttribute('id', 'dialogDetailDivX');
  dialogDetailDivX.style.display = 'flex';
  dialogDetailDivX.style.justifyContent = 'center';
  dialogDetailDivX.style.width = '90%';
  dialogDetailDivX.style.margin = '2rem';
  dialogDetailDivX.style.gap = '1rem';
  // dialogDetailDivX.style.height = '20%';

  const dialogDetailDivX1 = document.createElement('div');
  dialogDetailDivX1.setAttribute('id', 'dialogDetailDivX1');
  dialogDetailDivX1.style.display = 'flex';
  dialogDetailDivX1.style.justifyContent = 'center';
  dialogDetailDivX1.style.flexDirection = 'column';
  dialogDetailDivX1.style.width = '100%';
  dialogDetailDivX1.style.gap = '1rem';
  // dialogDetailDivX1.style.height = '20%';

  const dialogAuthor = document.createElement('p');
  dialogAuthor.style.display = 'flex';
  dialogAuthor.style.justifyContent = 'flex-start';
  dialogAuthor.textContent = dgAuthor;
  dialogAuthor.setAttribute('class', 'dialog-author');
  dialogAuthor.style.width = '100%';

  const dialogDate = document.createElement('p');
  dialogDate.style.display = 'flex';
  dialogDate.style.justifyContent = 'flex-start';
  dialogDate.textContent = dgContent;
  dialogDate.setAttribute('class', 'dialog-date');
  dialogDate.style.width = '80%';

  const dialogDetailDivX2 = document.createElement('div');
  dialogDetailDivX2.setAttribute('id', 'dialogDetailDivX2');
  dialogDetailDivX2.style.display = 'flex';
  dialogDetailDivX2.style.flexDirection = 'column';
  dialogDetailDivX2.style.justifyContent = 'center';
  dialogDetailDivX2.style.width = '80%';
  dialogDetailDivX2.style.gap = '1rem';
  // dialogDetailDivX2.style.height = '20%';

  const dialogUrl = document.createElement('p');
  dialogUrl.style.display = 'flex';
  dialogUrl.style.justifyContent = 'flex-start';
  dialogUrl.textContent = dgDate;
  dialogUrl.setAttribute('class', 'dialog-url');
  dialogUrl.style.width = '100%';

  const dialogContent = document.createElement('p');
  dialogContent.style.display = 'flex';
  dialogContent.style.justifyContent = 'flex-start';
  dialogContent.textContent = dgUrl;
  dialogContent.setAttribute('class', 'dialog-content');
  dialogContent.style.width = '100%';

  dialogDetailDivX1.appendChild(dialogAuthor);
  dialogDetailDivX1.appendChild(dialogDate);

  dialogDetailDivX2.appendChild(dialogUrl);
  dialogDetailDivX2.appendChild(dialogContent);

  dialogDetailDivX.appendChild(dialogDetailDivX1);
  dialogDetailDivX.appendChild(dialogDetailDivX2);

  dialogDetailDiv.appendChild(dialogDetailDivX);

  dialogContentDiv.appendChild(dialogDetailDiv);
};

const addCommentToItem = async (item_id, username, comment, url) => {
  const data = {
      item_id,
      username,
      comment,
  };
  try {
    const thecomment = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, thecomment);
    const result = await response.json();
    return result;
  } catch (error) { return error; }
};

export const addCommentInterface = async (dialogContentDiv, dialogCommentDiv, itemId) => {

  try {

      const addComment = document.createElement('p');
      addComment.style.display = 'flex';
      addComment.style.justifyContent = 'center';
      addComment.textContent = "Add a comment ";
      addComment.style.margin = '1rem';
      addComment.style.width = '100%';

      const inputDiv = document.createElement('div');
      inputDiv.setAttribute('id', 'input-div');
      inputDiv.style.display = 'flex';
      inputDiv.style.justifyContent = 'center';
      inputDiv.style.flexDirection = 'column';
      inputDiv.style.width = '100%';
      inputDiv.style.gap = '1rem';

      const inputCommentName = document.createElement('input');
      inputCommentName.setAttribute('class', 'commenter-name');
      inputCommentName.setAttribute('id', 'commenter-name-id');
      inputCommentName.style.display = 'flex';
      inputCommentName.style.alignSelf = 'center';
      inputCommentName.type = 'text';
      inputCommentName.placeholder = 'Your name';
      inputCommentName.style.width = '50%';

      const inputYourInsight = document.createElement('input');
      inputYourInsight.setAttribute('class', 'commenter-insight');
      inputYourInsight.setAttribute('id', 'commenter-insight-id');
      inputYourInsight.style.display = 'flex';
      inputYourInsight.style.alignSelf = 'center';
      inputYourInsight.type = 'textarea';
      inputYourInsight.placeholder = 'Your insights';
      inputYourInsight.style.width = '50%';
      inputYourInsight.style.height = '5rem';

      inputDiv.appendChild(addComment);

      inputDiv.appendChild(inputCommentName);
      inputDiv.appendChild(inputYourInsight);

      const commentButton = document.createElement('input');
      commentButton.setAttribute('class', 'commente-button');
      commentButton.style.display = 'flex';
      commentButton.style.alignSelf = 'center';
      commentButton.type = 'button';
      commentButton.value = 'Comment';
      commentButton.style.padding = '0.5rem';
      commentButton.style.margin = '1rem';
      commentButton.addEventListener('click', async () => {
          
          const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/WdJx4eRTz6sSqysQlKxy/comments';
      
          const username = document.getElementById('commenter-name-id').value;
          const comment = document.getElementById('commenter-insight-id').value;

              await addCommentToItem(itemId, username, comment, url);

              document.getElementById('commenter-name-id').value = '';
              document.getElementById('commenter-insight-id').value = '';

              dialogCommentDiv.innerHTML = '';

              await dialogCommentCount(dialogCommentDiv, itemId);

      });

      inputDiv.appendChild(commentButton);

      dialogContentDiv.appendChild(inputDiv);


  } catch (error) { return error; }
};
