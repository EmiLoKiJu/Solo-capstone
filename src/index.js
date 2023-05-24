import './style.css';
const artistName = 'nothing but thieves';
const accessToken = 'BQCgx3nrgGhYP2LJQBdYH3JUvVCSIQZrAFQoBQC4FFJZy6Z5vwtHA73-QfbKmrRM3PfvO-Af3IN_UZ7whNTQZbduw6FpKfo_0BnT3sJ5-lREPB_Nc039zUJ6Upn2Fc6e8RamQfJyVvgJe6qdjIH03elYr2DqPWhCUnJqmenFCoZjUzxgVchzS2soX675E1RD9xKiTdBpZx91emsDE8Y3oBvoYAhkptQlBfzETvJXTFM6JgJxrbKqsr6tm-fHQhNTAwBVb2996Y4ddoT8kuYS';
const musiccontainer = document.querySelector('.musiccontainer');

const getArtist = async () => {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  
  // console.log(data.tracks.items[0].name);
  let str = '';

  for (let i = 0; i < data.tracks.items.length; i++) {
    const text = document.createElement('div');
    text.classList.add('songelementontainer', 'dflex', 'flexcol');
    // console.log(data.tracks.items[i]);
    console.log(data.tracks.items[i]);
    // console.log(typeof data.tracks.items[i].name)
    text.innerHTML = `<p>${data.tracks.items[i].name}</p><audio controls>
    <source src="${data.tracks.items[i].preview_url}" type="audio/mpeg">
    Your browser does not support the audio element.
</audio><img src=${data.tracks.items[i].album.images[1].url}></img>`;

    musiccontainer.appendChild(text);

  }


  
}

getArtist();