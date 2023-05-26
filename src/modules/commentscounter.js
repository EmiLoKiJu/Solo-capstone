const commentscounter = async () => {
  const arrayofcomments = document.querySelectorAll('.commentelement');
  const counterelement = document.querySelector('.commentscounter');
  counterelement.innerText = `Comments: ${arrayofcomments.length}`;
};

export default commentscounter;