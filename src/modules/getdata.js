const artistName = 'nothing but thieves';
const token = 'BQDOXCpTa6EmrHvqRzpRozbsay06Zb7NlEscx8wJJRKC0l9CRx696KGue7Wjwy13BPqToBgf7QPPQdOhCiHrcqgIqzPGFZgCQVyW7eDl7dk7VDyh8J7ZOfzq7v68Tn-W7Ousy_-7SXTuigqXFTJsY57bAvo8Oc0UhkriWKqPFn2TNz7vYkBvorUMj3C3U3oDqgHH0O1oJg3NB9zIsG3d8rbQzstlGj9xNSQhEasWJfmApBcPsR0wH0pw1M50rryrHaBgS-Kg1k39qGUhGPBM';

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