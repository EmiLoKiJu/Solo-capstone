import axios from 'axios';

const cid = '6d5e99ce50fd43a0838e2fe93563b22b';
const csecret = '46e3d2af5bac42b0a737cb0e31263fee';

const getToken = async () => new Promise((resolve, reject) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${btoa(`${cid}:${csecret}`)}`,
    },
    form: {
      grant_type: 'client_credentials',
    },
    json: true,
  };

  axios.post(authOptions.url, null, {
    headers: authOptions.headers,
    params: authOptions.form,
  })
    .then((response) => {
      resolve(response.data.access_token);
    })
    .catch((error) => {
      reject(error.response.data.error || error);
    });
});

export default getToken;