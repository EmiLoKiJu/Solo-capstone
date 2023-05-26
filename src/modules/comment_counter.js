const update_Comment_Count = (result, diag_comment_div) => {

        diag_comment_div.innerHTML = '';

        const dialogCommentCount = document.createElement('p');
        dialogCommentCount.style.display = 'flex';
        dialogCommentCount.style.justifyContent = 'center';
        dialogCommentCount.textContent = "Comments ("+Object.keys(result).length+")";
        if (Object.keys(result) == "error") {
            dialogCommentCount.textContent = "Comments (0)";
        }
        dialogCommentCount.style.margin = '1rem';
        dialogCommentCount.style.width = '100%';

        diag_comment_div.appendChild(dialogCommentCount)

        const commentBox = document.createElement('div');
        commentBox.setAttribute('id', 'commentBox');
        commentBox.style.display = 'flex';
        commentBox.style.justifyContent = 'center';
        commentBox.style.flexDirection = 'column';
        commentBox.style.width = '100%';

        for (let i = 0; i < Object.keys(result).length; i += 1) {

            const commentList = document.createElement('div');
            commentList.setAttribute('id', 'commentList');
            commentList.style.display = 'flex';
            commentList.style.justifyContent = 'center';
            commentList.style.width = '100%';
    
            const commentDate = document.createElement('p');
            commentDate.style.display = 'flex';
            commentDate.style.justifyContent = 'center';
            commentDate.style.paddingRight = '0.5rem';
            commentDate.textContent = result[i].creation_date+" ";

            const actualComment = document.createElement('p');
            actualComment.style.display = 'flex';
            actualComment.style.justifyContent = 'center';
            actualComment.style.paddingRight = '0.5rem';
            actualComment.textContent = result[i].comment+" ";

            const commenterName = document.createElement('p');
            commenterName.style.display = 'flex';
            commenterName.style.justifyContent = 'center';
            commenterName.style.paddingRight = '0.5rem';
            commenterName.textContent = result[i].username+": ";
            
            commentList.appendChild(commentDate)
            commentList.appendChild(commenterName)
            commentList.appendChild(actualComment)
            
            commentBox.appendChild(commentList)
        }
        
        diag_comment_div.appendChild(commentBox);

};

export const dialogCommentCount = async (diag_comment_sec, item_id) => {

    try {

        const URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/WdJx4eRTz6sSqysQlKxy/comments?item_id=${item_id}`;
        const data = await fetch(URL, {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                },
              });
        const result = await data.json();

        diag_comment_sec.innerHTML = '';

        return update_Comment_Count(result, diag_comment_sec);

    } catch (error) { return error; }

};


export const dialogCommentCount2 = async (dialog_content_div, item_id) => {

    try {

        dialog_content_div.innerHTML = '';


        const URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/WdJx4eRTz6sSqysQlKxy/comments?item_id=${item_id}`;
        const data = await fetch(URL, {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                },
              });
        const result = await data.json();

        return result;

    } catch (error) { return error; }

};
// export default dialogCommentCount;