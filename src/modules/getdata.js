const artistName = 'nothing but thieves';
const token = 'BQDE2NDURN3bZfp_lwxLN9CF6EEpkc0-Fq5PS84AfJJYAyFSitJoHHFlWMyVDQMygzw2Ox5PBFxbwcwpBnzTGfTEUojPWS6FREcrizsGA1K-mvy83OT_5SXZk2oRVWzchPYE1Z65YTHmJWUnOHDMEWR68U26QpnSsAZfHQYt8imyRR4csDkPxef3IGfN_jqJLEa5U8QUm8Fm91qNFEpa4HFSIgkh180eVecPmdcgrp3nrzTsufM5jpfqRsBh2JfTVUy7z09TGhyInTPT0knh';

const getdata = async () => {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export default getdata;