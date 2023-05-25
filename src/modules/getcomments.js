const getcomments = async (itemid) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/N1YfreMOcnHDHjcZrEgf/comments?item_id=${itemid}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } return false;
};

export default getcomments;