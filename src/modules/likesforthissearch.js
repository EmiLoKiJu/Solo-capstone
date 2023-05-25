const likesforthissearch = async (data, likessaved) => {
  const resolvedlikes = await likessaved;
  const itemMap = new Map();
  resolvedlikes.forEach((item) => {
    itemMap.set(item.item_id, item.likes);
  });
  const updatedLikes = data.tracks.items.map((item) => ({
    item_id: item.id,
    likes: itemMap.get(item.id),
  }));
  return updatedLikes;
};

export default likesforthissearch;