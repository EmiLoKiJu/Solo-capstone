const artistName = 'Nothing But Thieves';
const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`;

const getArtist = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

getArtist();