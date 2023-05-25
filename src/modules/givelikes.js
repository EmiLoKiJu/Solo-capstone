const giveLikes = async (itemidd) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vYlIBG65vRC15spE8sZd/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `${itemidd}`,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export default giveLikes;