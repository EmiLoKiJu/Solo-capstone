const artistName = 'nothing but thieves';
const token = 'BQAhsPzxia1GK8GHsHhrUwx8a-thVkdJNXRoAmDnS8P71uqu8skr_xadUq07tZEkdjcs2NS4RyOfPDFfxq7jjA5NffhkhrUJkaYteFlmuX4QKCayPCRN6LFmOisjsMubBMoUmkJ6iJpfEUzEvQvFWPrkP36NolP2xlSLaMqCeR3gDO51vh7FHCeZnrpnVnJ8Uv_tDJSdN6YM9sE6R6oh67ww-58tnfrDa7zmuSQWhcW4oPPi-ICEr9MLD-NN0REvj0y4lQx48O9PDpV5I26X';

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