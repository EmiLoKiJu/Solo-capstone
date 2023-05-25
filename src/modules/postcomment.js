const postcommentfunc = async (name, comment, itemid) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/N1YfreMOcnHDHjcZrEgf/comments/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `${itemid}`,
      username: `${name}`,
      comment: `${comment}`,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export default postcommentfunc;