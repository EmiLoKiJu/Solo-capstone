const songelementcounter = (cont) => {
  const arrayofsongs = document.querySelectorAll('.songelementcontainer');
  const counter = document.createElement('h3');
  console.log(arrayofsongs.length);
  counter.innerText = arrayofsongs.length;
  cont.appendChild(counter);
};

export default songelementcounter;