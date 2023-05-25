const artistName = 'nothing but thieves';
const token = 'BQAtG2SdMfOUjD50HKClztBvuFnMxK5R1QDiD8vbKIJO2dETuF36PalxU0MOCqcpORJCCzn02Qr5sxAiuzw5T5DXUgrDsC91bHp5y5ZWgKQGarM8kb661z06FJkOTbTFMcVHNg9iGajO7_B6vxgvTV6SwrU9ArUCoQTvYoUB6_s0v_D4tSCIEk7kP6xDnNFGrInXnyNfq7Vix6N1O0GIVCSoShqw8Y-53sxWfmUPQxXVtWX78qQNH1jgk6HkJPbYHPuvjuZc9qN6cHE4OODx';

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