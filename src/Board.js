import React, { useState,useEffect, useRef } from 'react'
import Mole from './Mole'
import data from './data'

const Board = () => {
/*
  const[state,setState] = useState(false);

  useEffect(()=>{
    const random_number = Math.floor(Math.random() * 9) + 1; //Bettween 1 and 10
    
    const changes = setInterval(() => {
      if (id===random_number) {
        upisde='mole'
      }
    }, 1500);
    clearInterval(changes);
 

    if (id===random_number) {
      isUpside=true
    }
  },[state])

  const handleClick = (id) =>{
    reference.current.removeChild(reference.current.children[0])
    //setState(true)

  }*/

  const [state,setState] = useState(data);
  const [nextPosition,setNextPosition] = useState(1);
  const [clickedPosition,setClickedPosition] = useState(1);
  const [score,setScore] = useState(0);
  const [startGame,setStartGame] = useState(false);
  const [endGame,setEndGame] = useState(false);
  const [restartGame,setRestartGame] = useState(false);

  const random_generate=()=>{
    let i=  Math.floor(Math.random() * data.length+1);
    while (i===nextPosition) {
      i = Math.floor(Math.random() * data.length+1);
    }
    return i;
  }

  useEffect(()=>{
    if(startGame===true){

      let newMole = setInterval(()=>{
          setNextPosition(random_generate())
          console.log("next position " + nextPosition);
          const temp = resetState()

          temp.map((t)=>{
            if(t.id === nextPosition){
              t.isUpside = true
            }
          })
          setState(temp)
        },1000);
        return ()=>clearInterval(newMole);
    }
  },[nextPosition,startGame])

  const handleButtons=(type)=>{
    if (type==='start') {
      setStartGame(true)  
      setEndGame(true)
      setRestartGame(true)    
    }
    if (type==='end') {
      setStartGame(false)  
      setEndGame(false)
      setRestartGame(false) 
      setState(data);
      setScore(0)
    }
    if (type==='restart') {
      setStartGame(true)  
      setEndGame(true)
      setRestartGame(true)    
      setState(data);
      setScore(0)
    }
  }

  const resetState = () => {
    const temp = data.map((t) => {
      return {...t,isUpside:false}
    })

    return temp
  }

  const updateMoleImg = (id)=>{
      let updatedMole = state.find(m => m.id===id);
      updatedMole.isHited=true;

      let newState = state.map((mole) =>{
        if (mole.id===id) {
          return updatedMole;

        }
        return mole;
      })

      setState(newState);
    }
  const onHitMole = (id) =>{
    setClickedPosition(id);
    updateMoleImg(id)
    let temp =score;
    temp += 5; 
    setScore(temp);
    
  }

  return (
    <>
      <h2>Score : {score} </h2>
      <div className='btn-container'>
        <button className={`custom-btn ${startGame && 'disabled-btn'}`}
            onClick={()=>handleButtons('start')}>START GAME</button>
        
        <button className={`custom-btn ${!endGame && 'disabled-btn'}`}
            onClick={()=>handleButtons('end')}>END GAME</button>
        
        <button className={`custom-btn ${!restartGame && 'disabled-btn'}`}
            onClick={()=>handleButtons('restart')}>RESTART GAME</button>
      </div>

      <div className='container'>
          {
              state.map((mole,index)=>{
                  return <Mole key={index} {...mole}
                           onHit={onHitMole} />
              })
          }
      </div>
    </>
  )
}

export default Board

