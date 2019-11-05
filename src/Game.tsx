import React from 'react';
import useGameState from './useGameState';
import utils from './mathUtilis';

const SumDisplay = (props: any) => <div className="star">{props.num}</div>

const PlayNumber = (props: any) => {
  return  <button
    className="number"
    onClick={(e) => { 
      let btn:any = e.target;
      btn.classList.add(props.status);
      setTimeout(() => { btn.className='number' }, 1000);
      props.onClick(props.number)}}
  >
    {props.number}
  </button>
};

const PlayAgain = (props: any) => (
  <div className="game-done">
    <div
      className="message"
      style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
    >
      {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);


const Game = (props: any) => {
  const {
    sum,
    num,
    lastNum,
    rightCount,
    wrongCount,
    missedCount,
    setGameState
  } = useGameState();

  const gameStatus = 'active'

  const numberStatus = (number: number) => {
    if (sum === number) {
      return 'right';
    }
    return 'wrong'
  };

  const onNumberClick = (number: number) => {
    setGameState(number);
  };

  return (
    <div className="game">
      <h1 className="header">Serial Addition Test</h1>
      <div className="help">click the number that is the sum of the last two numbers</div>
      <div className="score"><span>right: {rightCount}</span><span>wrong: {wrongCount}</span><span>missed: {missedCount}</span></div>
      {gameStatus !== 'active' ? <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} /> :
        <SumDisplay sum={sum} num={num} lastNum={lastNum} />
      }
      <div className="numpad">
        {utils.range(1, 20).map(number => <PlayNumber key={number} number={number} status={numberStatus(number)} onClick={onNumberClick}/>)}
      </div>
    </div>
  );
};




export default Game;
