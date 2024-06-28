import React, { useState } from 'react';

function App() {

  const [player, setPlayer] = useState(0);
  const [clicked, setClicked] = useState(Array(9).fill(null));
  const [winnerCombination, setWinnerCombination] = useState([]);
  const [winner, setwinner] = useState(null)

  const value = (i) => {
    let updatedClicked;
    if (clicked[i] === null) {
      updatedClicked = [...clicked];
      updatedClicked[i] = player === 0 ? 'X' : 'O';
      setClicked(updatedClicked);
      setPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
    } 
    else {
      return
    }

    const winnings = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for (const combination of winnings) {
      const [a, b, c] = combination
      if (updatedClicked[a] === updatedClicked[b] && updatedClicked[a] === updatedClicked[c]) {
        if (updatedClicked[a] === 'X') {
          setWinnerCombination(combination);
          setwinner(1)
          
        }
        else if (updatedClicked[a] === 'O') {
          setWinnerCombination(combination);
          setwinner(2)
      }
    }
    }
  };

  const horizontal = (i) => {
    if (winnerCombination.includes(i)) {
      return <div className='h-2 w-4/6 bg-orange-950 animate-pulse box-decoration-clone grid place-items-center'>
                <div className='absolute'>{clicked[i]}</div>
              </div>
    }
    else {
      return clicked[i]
    }
  }

  const vertical = (i) => {
    if (winnerCombination.includes(i)) {
      return <div className='h-4/6 w-2 bg-orange-950 animate-pulse box-decoration-clone grid place-items-center'>
                <div className='absolute'>{clicked[i]}</div>
              </div>
    }
    else {
      return clicked[i]
    }
  }

  const diagonal = (i, d) => {
    if (winnerCombination.includes(i) && d==='l') {
      return <div className='h-4/6 w-2 bg-orange-950 animate-pulse box-decoration-clone -rotate-45 grid place-items-center'>
                <div className='absolute rotate-45'>{clicked[i]}</div>
              </div>
    }
    else if (winnerCombination.includes(i) && d==='r') {
      return <div className='h-4/6 w-2 bg-orange-950 animate-pulse box-decoration-clone rotate-45 grid place-items-center'>
                <div className='absolute -rotate-45'>{clicked[i]}</div>
              </div>
    }
    else {
      return clicked[i]
    }
  }

  const table = [];

  for (let i = 0; i < 9; i++) {
    table.push(
      <button
        key={i}
        className={`row-span-1 grid place-items-center text-3xl font-bold`}
        onClick={() => value(i)}>
        {console.log(winnerCombination)}
        {winnerCombination.includes(0) ? 
          (winnerCombination.includes(1) ? horizontal(i)
            : (winnerCombination.includes(3) ? vertical(i)
              : (winnerCombination.includes(4) ? diagonal(i, 'l')
              : clicked[i]))) 
          : winnerCombination.includes(8) ? 
            (winnerCombination.includes(7) ? horizontal(i)
            : (winnerCombination.includes(5) ? vertical(i)
            : clicked[i]))
          : winnerCombination.includes(4) ? 
            (winnerCombination.includes(1) ? vertical(i)
            : (winnerCombination.includes(3) ? horizontal(i)
              : winnerCombination.includes(2) ? diagonal(i, 'r')
              : clicked[i]))
            : clicked[i]}
      </button>
    );
  }

  const Reset = () => {
    window.location.reload();
  };

  return (
    <div className="App grid h-screen bg-[url('./Background.png')] bg-center">
        <div className='grid place-items-center'>
          <div className='mt-40'>
            {winner ? <h1 className='font-serif inline-block font-bold text-lg px-3 mr-3 rounded-2xl text-orange-950 border-orange-950 border-4 bg-orange-200'>Player {winner} Wins</h1> : ''}
            <button className='text-orange-950 border-orange-950 border-4 bg-orange-200 rounded-2xl px-3 font-bold font-serif text-lg'
              onClick={Reset}>Reset</button>
          </div>
          <div className='grid grid-cols-3 grid-rows-3 h-80 w-80 mb-10'>{table}</div>
        </div>
    </div>
  );
}

export default App;