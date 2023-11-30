
import './index.css';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"





function App() {


const [word, setWord] = useState('')
const [correctLetters, setCorrectLetters] = useState([])
const [hint, setHint] = useState('')
const [playAgain, setPlayAgain] = useState(false)


useEffect(() => {
 
  async function getWord() {

try {
  const response = await fetch('https://random-word-api.vercel.app/api?words=1&alphabetize=true')
  const data = await response.json()
  setWord(data[0].toUpperCase())
  console.log(data)
}
catch (err) {
  console.log(err)
}

}

getWord()

}, [])



useEffect(() => {
for (let i = 0; i < word.length - 1; i++) {
  correctLetters.push('_')
  setCorrectLetters([...correctLetters , '_'])
}

}, [word])



useEffect(() => {
  if (correctLetters.join('') === word && correctLetters.length > 0) {
    document.getElementById('letters').classList.add('text-success')
    document.querySelectorAll('.btn').forEach(item => {
      item.disabled = true
    })
    setPlayAgain(true)
 
   
  }

}, [correctLetters])


function checkLetter(e) {


  e.target.disabled = true
  const letter = e.target.innerText

  if (!word.includes(letter)) {
    e.target.classList.add('btn-danger')
  }
  else {
    e.target.classList.add('btn-success')
  }

  word.split('').forEach((item , i) => {
    if (item === letter) {
      correctLetters.splice(i, 1, item)
      setCorrectLetters([...correctLetters])
    }


  });

}


async function getHint() {
try {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
  const data = await response.json()
 setHint(data[0].meanings[0].definitions[0].definition)
}
catch (err) {
  console.log(err)
}

}




  return (
    <div className="App">
    <h1 className='text-center border-bottom border-primary'>Hang Man</h1>


    <div className='container'>



<div className='row'>
<div className='col-5 border'>
  <img src='https://as2.ftcdn.net/v2/jpg/05/17/38/33/1000_F_517383341_8nWEFfM1KL3K5LNTjUDrne3x0kZiuxuj.jpg' alt='hangman' className='img-fluid' />
  </div>


  <div className='col-7'>

   
    <div className='row'>

    <div className='col-12'>

    <div className='d-flex justify-content-center mt-5' id='letters'>
     
{correctLetters.map((letter, index) => {
  return (
    <div className=' text-center mx-3' key={index} style={{"fontSize" : "75px"}}>
    {letter}
    </div>
  )
})}
</div>
      </div>


      <div className='col-12 text-center'>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>A</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>B</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>C</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>D</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>E</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>F</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>G</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>H</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>I</button>
    <button className='btn btn-lg  btn-primary m-1' onClick={checkLetter }>J</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>K</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>L</button>
    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>M</button>

    <button className='btn btn-lg btn-primary m-1' onClick={checkLetter }>N</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>O</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>P</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>Q</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>R</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>S</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>T</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>U</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>V</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>W</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>X</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>Y</button>
    <button className='btn btn-lg btn-primary m-1'onClick={checkLetter }>Z</button>
    
    </div>
    <div className='d-flex justify-content-center'>
    {hint ?  <p className='text-center bg-info p-3 rounded fs-5 mt-4'>{hint}</p>  : <button className='btn btn-lg btn-info mt-5 text-center w-50 ' onClick={getHint}>Hint</button>}
    </div>
    <div className='d-flex justify-content-center'>
    {playAgain ? <button className='btn btn-lg btn-success text-center w-50 ' onClick={() => window.location.reload()}>Play Again?</button> : null}
    </div>
    </div>
    </div>
    </div>
    
    </div>
    
    
    </div>
  );
}

export default App;
