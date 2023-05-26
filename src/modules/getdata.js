const artistName = 'nothing but thieves';
const token = 'BQBZTRmx5sOu0e2_jx1bFYBp3-eHurSMapG-UFHG6yIilx2crY9k1smQaVx9AM8UWMx6xI8_EiYGKhU4kch_Dk4uoEpQ-cdtsacmrwa5bC9Vo4mfgsWEtskjEcLR8dbtrjPlZBI-4ShvbW4XM_wCUK7MWx44kaDX03eqR4DvvGU9JWJMguXY_83eE6iPqBe_Qw6EADf1R2VWBO05x6cpzGNflEnzlM_scaqhIbGHQBq0jEZA-1jZoUl2tGJ3DJJVozlrVnB2ykVbhnyirZE4';

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