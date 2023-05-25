const artistName = 'nothing but thieves';
const token = 'BQD7k_98y6qQftm2TDcnD8aYq24U_2H0ZytykktfJTQNVMeGemmehVeX9slynBxoR3tsufgsCNdrzTw48tsRZSlJ5yfRLm5sgF7UDLpurOK6nLo8k8EEHEYm8p2chUsEndmS8GUjkmQdMs9Nk174m1nHJb6B1vfLz6EmDm7G7T7fXsA-MqsPo7xMtlfurSJxljk6MaGr8lsG09NSG3UXBOhm3KlCqXzOLARcEqbduQ1-Sb4GK4oauYgBAOs_kH0qIVyPjeaUuizDDYMZToek';

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