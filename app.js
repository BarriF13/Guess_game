const wordD = document.getElementById('word');
const incorrectLetterD = document.getElementById('incorrectLetters');
const tryAgain = document.getElementById('play-btn');
const pu = document.getElementById('pu-container');
const alert = document.getElementById('alert-container');
const resultMsg = document.getElementById('result');

const adamParts = document.querySelectorAll('.adam-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random()* words.length)];
// console.log(selectedWord);

const correctLetters = [];
const incorrectLetters = [];


//show the hidden word
function viewWord(){
wordD.innerHTML = `
${selectedWord
.split('')
.map(letter =>`
<span class="letter">
${correctLetters.includes(letter) ? letter : ''}
</span>
`).join('')
}

`;
const innerWord = wordD.innerText.replace(/\n/g,'');
  if(innerWord === selectedWord){
    resultMsg.innerText = 'Congratssss! You Won😊';
    pu.style.display= 'flex';
  }
}

// Update incorrect letters 
  function updateIncorrectLetters(){
    incorrectLetterD.innerHTML = `${incorrectLetters.length > 0 ?'<p>Wrong</p>':''}
    ${incorrectLetters.map(letter => `<span>${letter}</span>`)}
    `;
    //show adam's body part
    adamParts.forEach((part, index) => {
      const errors = incorrectLetters.length;

      if(index < errors){
        part.style.display = 'block';
      } else {
        part.style.display = 'none'
      };
    });
    //check if lost or win
    if(incorrectLetters.length === adamParts.length) {
      resultMsg.innerText= 'OMG...You have lost😵';
      pu.style.display= 'flex';
    }
  }
 
// show alert 
function showAlert(){
alert.classList.add('show');
setTimeout(() => {
  alert.classList.remove('show');
}, 1000); 


}

// keydown letter press 
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if(e.keyCode >=65 && e.keyCode <= 90 ){
    const letter = e.key;
  
    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        viewWord();
      }else {
        showAlert();
      }
    } else {
      if(!incorrectLetters.includes(letter)) {
        incorrectLetters.push(letter);
        // console.log(incorrectLetters)
        updateIncorrectLetters();
      } else {
        showAlert();
      }
    }
  }
});
// reset
tryAgain.addEventListener('click' , () => {
// empty arrays
correctLetters.splice(0);
incorrectLetters.splice(0);

selectedWord = words[Math.floor(Math.random()* words.length)];

viewWord();
updateIncorrectLetters();
pu.style.display = 'none';
});
viewWord();