const artistName = 'nothing but thieves';
const accessToken = 'BQAdUkTVkhyBdYInR-SQ7BEnMxOr-CVFkkVldl498ajssUNvGsgIF90SZow5KGMveJZheUIPF2a_tyy5GWtQe7f2SidVTuXmBTg6GxyNHdsPyOo_rtgwE-uvelMJqGiJq1n75EkycVgLgWJQK2JrPCWVOjRmH1KOks2tI47unxgCaJgaZQp7XFf96MbhqPcCgqkMpwu6JYvjbskULNaSD5dlzKkWiCXtgF57e4ZHqQgEW26GKqS5ZdV0GM9gvFJFq_UiTrN3mMX97s-JZNmp';
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