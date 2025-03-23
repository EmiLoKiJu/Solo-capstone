import axios from 'axios';

const cid = '6d5e99ce50fd43a0838e2fe93563b22b'; // Replace if invalid
const csecret = '46e3d2af5bac42b0a737cb0e31263fee'; // Replace if invalid

const getToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials', // URL-encoded form data
      {
        headers: {
          'Authorization': `Basic ${btoa(`${cid}:${csecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Token retrieval failed:', error.response?.data || error.message);
    throw new Error('Failed to get Spotify token');
  }
};

export default getToken;