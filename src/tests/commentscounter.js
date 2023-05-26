const commentscounter = () => {
    const arrayofcomments = document.querySelectorAll('.commentelement');
    const counterelement = document.querySelector('.commentscounter');
    counterelement.innerText = 'Comments: ' + arrayofcomments.length;
    return arrayofcomments.length;
  };
  
  export default commentscounter;