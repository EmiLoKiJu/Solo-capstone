const artistName = 'nothing but thieves';
const token = 'BQDXVhPdoxZkka7Jpi_wdcbOXFE8SGNv-bF1fn392Z5YSBEnCKkQ-wUHraKDUnOnNCbT86CrUfMFIyZwucWZHg0MyCLmIPoE2qZ9I3U2rFgeAV3wHJosHoVnCV-3Zpl1KrcG5H7-WjfOpxQAd3fxYZzoy8F9yi09tIbYqE5lxpy12CYJcLOfX3pI0WkxckgveAc4yAioE_1ox9Ka2eF1jkO5V_e-yOEpZxZruLmBQqC82ZePUpYFPPZ_BCcS5FWVKm_Sak4XACwv6dKUEtg1';

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