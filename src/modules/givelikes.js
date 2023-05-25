const giveLikes = async (itemidd) => {
  console.log(itemidd);
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/N1YfreMOcnHDHjcZrEgf/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `${itemidd}`,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  console.log(response);
};

export default giveLikes;