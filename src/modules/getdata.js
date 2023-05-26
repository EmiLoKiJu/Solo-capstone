const artistName = 'nothing but thieves';
const token = 'BQBexttRCM39jPmmbYoEM4bGE4CwEOtJrfEqC_X2FeZogyxRIm5_XFQ0p0-nVz9fDu3Q4Ti7T8acWlC9X2RZgvQep07MWLTICyyDPdnFB_dKOgNBfCaTBqZmlhUu0viqdpVHXga921QRGhHq5qHrFcoX36U9skBRd_msP8QLDa-l_D1_kV3_dS6AXED0YydADxvhXBUvGBOaH10VRH59zVswSWtn0jzACfvUYTaaf_N4UIXRB48lLJCdpjh6D_kJRbG9RN-H-FG_E0djxP6C';

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