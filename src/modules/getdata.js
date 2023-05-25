const artistName = 'nothing but thieves';
const token = 'BQBlWfZhJ8LrZ7bH7KW22hAsbz3AskHI3nrzNU8ZvYx7VvP2EtJkEjzxHGOTuh4YUGBM_HnKSoWfftmYYT45af7_0Iu4fkrynPLYB_zHDDx5hDsVbiz5wkVvXe1YqeTRAD7qIcRKc6I8vlye3OojodKn0_m_hVuBNot5lsjLIRCnX9eYs5l0H_pBgUHaUJPTIMzsIV6jFfRVRmqBHhoIvdLWRhqMUvERTQIEBAXCvqKBeRJE4I2CqEP_Jnmfq_EIJqt5NDGETJ-ERX7aKAa1';

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