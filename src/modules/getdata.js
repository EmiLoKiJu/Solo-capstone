const artistName = 'nothing but thieves';
const token = 'BQCaVsZM4Vq1btIDOfUGmm3QgT-rU6VUolScdYN8J_Czin49iDIZQsYi0Z64ra2OGOoOOZhYvnK-hjN78GhHT-Zm2SJvNL139q0a_5Lfp41njGZCSvlrsOyOCr8aXUW15k98TEknuF5icx4QyAbd8znoEBB7551ra-eaZYNhZDZ_LVpw-JiFK70J3fnQmCT8ySlAhCBHLupYAD5VxCc5upgqJ8udMUT1KIxuaysGQXta4ng6_HHRNEqdCvNmXcW3ou1W9r7ekj7otAToZEey';

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