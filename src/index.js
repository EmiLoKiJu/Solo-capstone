import './style.css';
// import getLikes from "./modules/gettinglikes.js";
const artistName = 'nothing but thieves';
const token = 'BQDqmlYc4abtA9aVrK4Z5c1UQwIkmT7yE7zuqKdlxvL7LvcJ2lz_hnI0Wp8LT5NCQseIsGPy2i-np9DdSZPj1mbJVQMthmAD_96QZVwwQABuY8-C1kfY3yPlfWRRjL6dZ33mzQK1pvbzXcDgk-qbK0Aj5Vq8ElVz4sR8uTyQ4vBGRlfvYD7xhPukoXF1NJjvsF4HA3IGnquJV7GE9c7x90taupJ5EmEoYNYL3L80M--rLLMI46O4aSk2gRSA-46fZ5OTQLzkIfh-YJFX3P4T';
const musiccontainer = document.querySelector('.musiccontainer');
const datanames = [];
let updatedLikes = [];

const likesforthissearch = async (data, likessaved) => {
  const resolvedlikes = await likessaved;
  const itemMap = new Map();
  resolvedlikes.forEach(item => {
    itemMap.set(item.item_id, item.likes);
  });
  updatedLikes = data.tracks.items.map(item => ({
    item_id: item.id,
    likes: itemMap.get(item.id)
  }));
}

const getLikes = async () => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/N1YfreMOcnHDHjcZrEgf/likes/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

const giveLikes = async (itemidd) => {
  const response2 = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vYlIBG65vRC15spE8sZd/likes/`, {
  method: 'POST',
  body: JSON.stringify({
    "item_id": `${itemidd}`,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data2 = await response2;
}

const getArtist = async () => {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  await likesforthissearch(data, getLikes());
  let str = '';

  for (let i = 0; i < data.tracks.items.length; i++) {
    const text = document.createElement('div');
    text.classList.add('songelementontainer', 'dflex', 'flexcol');
    text.innerHTML = `<p>${data.tracks.items[i].name}</p><audio controls>
    <source src="${data.tracks.items[i].preview_url}" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><img src=${data.tracks.items[i].album.images[1].url}></img>
    <div class="dflex"><button class='likebutton'>like</button><p>${updatedLikes[i].likes}</p></div>`;
    musiccontainer.appendChild(text);
    const likebutton = text.querySelector('.likebutton');
    likebutton.addEventListener('click', () => {
      giveLikes(data.tracks.items[i].id);
    });
    datanames.push({
      item_id: data.tracks.items[i].id
    });
  }
}

getArtist();