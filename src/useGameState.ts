
import { useState, useEffect } from 'react';
import utils from './mathUtilis';

const useGameState = () => {
 
    const [sum, setSum] = useState(0);
    const [num, setNum] = useState(utils.random(1, 9));
    const [lastNum, setLastNum] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [missedCount, setMissedCount] = useState(0);
  
    const setGameState = (clickedNum: number) => {
      if (clickedNum === sum) {
        setRightCount(rightCount + 1);
      } else {
        setWrongCount(wrongCount + 1)
      }
    };
    useEffect(() => {
      let oldRightCount = rightCount, oldWrongCount = wrongCount
      setSum(lastNum + num);
  
      setTimeout(() => {
        if (lastNum !== 0 && rightCount === oldRightCount && wrongCount === oldWrongCount) setMissedCount(missedCount + 1);
        setLastNum(num)
        let rnd = utils.random(1, 9);
        setNum(rnd === num ? rnd + 1 : rnd)
      }, 3000);
  
    }, [num]);
  
    return { sum, num, lastNum, rightCount, wrongCount, missedCount, setGameState };
  };

  export default useGameState;