const commentscounter = async (cont) => {
    const arrayofcomments = document.querySelectorAll('.commentelement');
    const counterelement = document.querySelector('.commentscounter');
    console.log(counterelement);
    counterelement.innerText = 'Comments: ' + arrayofcomments.length;
  };
  
  export default commentscounter;