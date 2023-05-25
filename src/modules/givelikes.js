const giveLikes = async (itemidd) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/N1YfreMOcnHDHjcZrEgf/likes/', {
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