// import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"






function App() {


  const [word, setWord] = useState('')
  const [correctLetters, setCorrectLetters] = useState([])
  const [hint, setHint] = useState('')
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
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
    for (let i = 0; i < word.length; i++) {
      correctLetters.push('_')
      setCorrectLetters([...correctLetters])
    }

  }, [word])



  function checkLetter(e) {


    e.target.disabled = true
    const letter = e.target.innerText

    if (!word.includes(letter)) {
      e.target.classList.add('btn-danger')
      setIncorrectGuesses(incorrectGuesses + 1)
    }
    else {
      e.target.classList.add('btn-success')
      word.split('').forEach((item, i) => {
        if (item === letter) {
          correctLetters.splice(i, 1, item)
          setCorrectLetters([...correctLetters])
        }
      }
      )



    }
  }




  useEffect(() => {
    if (correctLetters.join('') === word && correctLetters.length > 0) {
      document.getElementById('letters').classList.add('text-success')
      document.querySelectorAll('.letter').forEach(item => {
        item.disabled = true
      })
      setPlayAgain(true)
    }
    else {
      const canvas = document.getElementById('hangmanCanvas');
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 5;
      switch (incorrectGuesses) {
  
        case 1:
          ctx.beginPath();
          ctx.moveTo(50, 350);
          ctx.lineTo(150, 350);
          ctx.stroke();
          break;
        case 2:
          ctx.beginPath();
          ctx.moveTo(100, 350);
          ctx.lineTo(100, 50);
          ctx.stroke();
          break;
        case 3:
          ctx.beginPath();
          ctx.moveTo(100, 50);
          ctx.lineTo(200, 50);
          ctx.stroke();
          break;
        case 4:
          ctx.beginPath();
          ctx.moveTo(200, 50);
          ctx.lineTo(200, 100);
          ctx.stroke();
          break;
        case 5:
          ctx.beginPath();
          ctx.arc(200, 125, 25, 0, Math.PI * 2, true);
          ctx.stroke();
          break;
        case 6:
          ctx.beginPath();
          ctx.moveTo(200, 150);
          ctx.lineTo(200, 250);
          ctx.stroke();
          break;
        case 7:
          ctx.beginPath();
          ctx.moveTo(200, 250);
          ctx.lineTo(150, 300);
          ctx.stroke();
          break;
        case 8:
          ctx.beginPath();
          ctx.moveTo(200, 250);
          ctx.lineTo(250, 300);
          ctx.stroke();
          break;
        case 9:
          ctx.beginPath();
          ctx.moveTo(200, 175);
          ctx.lineTo(150, 225);
          ctx.stroke();
          break;
        case 10:
          ctx.beginPath();
          ctx.moveTo(200, 175);
          ctx.lineTo(250, 225);
          ctx.stroke();

          document.getElementById('letters').classList.add('text-danger')
          document.querySelectorAll('.letter').forEach(item => {
            item.disabled = true
          })
  
          word.split('').forEach((item, i) => {
  
            correctLetters.splice(i, 1, item)
            setCorrectLetters([...correctLetters])
  
          });
          setPlayAgain(true)
          break;
      }
  
    }
  }, [correctLetters , incorrectGuesses])



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
          <div className='col-5 border text-center'>
            {incorrectGuesses === 10 ? <h2 className='text-danger'>Game Over</h2> : 
            incorrectGuesses < 10 && correctLetters.join('') === word && correctLetters.length > 0 
            ? <h2 className='text-success'> You Win</h2> : <h2>{10 - incorrectGuesses} Guesses Remaining </h2>}

            <canvas id="hangmanCanvas" width="400" height="400"></canvas>
          </div>

          <div className='col-7'>


            <div className='row'>

              <div className='col-12'>

                <div className='d-flex justify-content-center mt-5' id='letters'>

                  {correctLetters.map((letter, index) => {
                    return (
                      <div className=' text-center mx-3' key={index} style={{ "fontSize": "55px" }}>
                        {letter}
                      </div>
                    )
                  })}
                </div>
              </div>


              <div className='col-12 text-center'>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>A</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>B</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>C</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>D</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>E</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>F</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>G</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>H</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>I</button>
                <button className='btn btn-lg  btn-primary m-1 letter' onClick={checkLetter}>J</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>K</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>L</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>M</button>

                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>N</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>O</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>P</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>Q</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>R</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>S</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>T</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>U</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>V</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>W</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>X</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>Y</button>
                <button className='btn btn-lg btn-primary m-1 letter' onClick={checkLetter}>Z</button>

              </div>
              <div className='d-flex justify-content-center'>
                {hint ? <p className='text-center bg-info p-3 rounded fs-5 mt-4'>{hint}</p> : <button className='btn btn-lg btn-info mt-5 text-center w-50 ' onClick={getHint}>Hint</button>}
              </div>
              <div className='d-flex justify-content-center'>
                {playAgain ? <button className='btn btn-lg btn-success text-center w-50 play' onClick={() => window.location.reload()}>Play Again?</button> : null}
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>

  );
}

export default App;
