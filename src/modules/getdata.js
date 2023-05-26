const artistName = 'nothing but thieves';
const token = 'BQAbhClMin4-Vdd2Gcw83wXL8xsoc0EVeVh_e8fhPs8E4Oatttcu7oG0D1EkIX2dO9dfFTVAglkUwXuJx8DYp8Mdx8xlIDulEStihqBjpZxy2cf1ygRqdo2Xyy2Aq_8br6KCwdCpeJZX6mU-pdwB_2kwBknbPD2VOzBqJSpcdTvwg8cx8ykpMnq_IN855GYdB8yy9LGZ7HurtI79zogrdQ2QM-PwpkTbqqZ165KRHf97ZF0kVcxT3XW5XVYsv7b-LnbfdXOPVnzkZD1E3Xq6';

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