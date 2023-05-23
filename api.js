const artistName = 'muse';
const accessToken = 'BQCifS59WprHkKiR7yyxoVy9fmuazGMEjhIeCYP4NBryJcSlVfYwImmmaST-85C4O60WDaXlhNu6Ev8cHRVjo4eRHxEHnctZCTsci0c2vD9rw_nxcCFKQcTOsde4QVPqYQsJsc1stGf7Ry0Wu5QL-elM6taa1jiFm6rQ8ia-LJOC9YzoPFgsHxYzyUfmAddjZZvXWejpLbUKRmAM7O29hpdYBkk4XsTwCTR6gjYuc6NMk5XtPzOQ16XFdsokr9ox9YJ-TN5giOvkiGNR4LdZ';

const getArtist = async () => {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  const text = document.createElement('p');
  // console.log(data.tracks.items[0].name);
  let str = '';

  for (let i = 0; i < data.tracks.items.length; i++) {
    // console.log(data.tracks.items[i]);
    console.log(data.tracks.items[i].album.images[0].url);
    // console.log(typeof data.tracks.items[i].name)
    str += `<img src=${data.tracks.items[i].album.images[0].url}></img>` + '<br>';

  }
  text.innerHTML = str;

  const body = document.querySelector('body');
  body.appendChild(text);
}

getArtist();