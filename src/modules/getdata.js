const artistName = 'nothing but thieves';
const token = 'BQDF8KGdb2IXnsrK2brg2fZrxIujaynynwhgM_Q2N5Ygzun1Kh069kfAoTJmcpeGnML1nBOMSz2ZSkIttJzlIJOFLF_7a23LZQB0HvK-u5agGwolUpd4X0WIh0SRZ7GOuE2fOX3kVMFMKdDflgX0RLqjayuE4UBpneNvaqVN-CTniEwFHyueR2CVbGQqBA9sbx4quTRzXmbGZwWa3lDXrK2WA7eu9Z4J_VfYOhZ61mAMHii5gqH_hfADIHetRyJkEoCeudYkt3kTB8uc_9yi';

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