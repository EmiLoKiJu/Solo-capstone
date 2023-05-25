const songelementcounter = (cont) => {
  const arrayofsongs = document.querySelectorAll('.songelementcontainer');
  const counter = document.createElement('h3');
  counter.innerText = arrayofsongs.length;
  cont.appendChild(counter);
  return arrayofsongs.length;
};

export default songelementcounter;