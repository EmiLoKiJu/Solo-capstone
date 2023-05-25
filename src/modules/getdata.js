const artistName = 'nothing but thieves';
const token = 'BQBtiy_YL6Wd7qmz4hCTHhqBkcp1iixQEYoc60VuQYJcINzHyiyj0FgvOL75baS7htTbrr_6h5OClop17pYzDwuhzpKIar2I4qKwhbl1yaDZLYE1TYJ80NK1B4EIUfBiTSdyq0yTwii7u9bJjUoZACYltLVOI9zpFHTMdpY9vpBfZg_9S9hZYhGwqP-q6VgMUkcyQzTOBgbcoSbnNPLgCGgA4gOlS2huz2Dt-0tMn8Xxm-YyzMKdpp87WV-7_GbEukFN6ZvbH_-WcDw__T-P';

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