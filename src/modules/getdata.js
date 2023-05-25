const artistName = 'nothing but thieves';
const token = 'BQDqmlYc4abtA9aVrK4Z5c1UQwIkmT7yE7zuqKdlxvL7LvcJ2lz_hnI0Wp8LT5NCQseIsGPy2i-np9DdSZPj1mbJVQMthmAD_96QZVwwQABuY8-C1kfY3yPlfWRRjL6dZ33mzQK1pvbzXcDgk-qbK0Aj5Vq8ElVz4sR8uTyQ4vBGRlfvYD7xhPukoXF1NJjvsF4HA3IGnquJV7GE9c7x90taupJ5EmEoYNYL3L80M--rLLMI46O4aSk2gRSA-46fZ5OTQLzkIfh-YJFX3P4T';

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