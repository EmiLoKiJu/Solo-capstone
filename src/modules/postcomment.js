const postcommentfunc = async (name, comment, itemid) => {
  console.log('calling postcomment widh: ', name, ' ',comment, ' ', itemid);
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/N1YfreMOcnHDHjcZrEgf/comments/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `${itemid}`,
      username: `${name}`,
      comment: `${comment}`
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  console.log(response.ok);
}

export default postcommentfunc;