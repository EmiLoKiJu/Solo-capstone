const artistName = 'nothing but thieves';
const token = 'BQBPw54lSFWDUeuPWssiypBXUXo-X9x11OvMuTCpEazvncaV5IhXXBDtlxK5fataXEb5aqprr9nCBK6LvODNdH8vvtbeOF7qZDRz4wGOAZYP5m53cq2E3xjNTi-AhtQFAcnMM-j7jviobJ85nWgZWzw9CeMShUM902QgS56q8ujAohBftPTBPw0hlh4QTsumZuYzxwm-v2OBfDon7A0Q4QSBoclG49sEI023M7Md72UhuWBRqjjGAKeoWK4QL3sCx3KKPHqmihE1dnJ1HueC';

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