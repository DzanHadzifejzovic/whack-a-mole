import React from 'react'
import {moleImg} from './data'
import {moleHitedImg} from './data'

const Mole =({id,isUpside,isHited,onHit}) => {
  
  return (
    <div className={`hole`}>
      {
        isUpside &&
       
          <img onClick={!isHited ? ()=> onHit(id) : null}
            src={isHited ? moleHitedImg : moleImg} 
            className='mole' alt='mole' 
          />
    
      }
    </div>
  )
}


export default Mole

/*
const[state,setState] = useState(1);

  let moleClass = isUpside ? 'mole' :'';
  const reference = useRef();

  useEffect(()=>{    
    console.log('random je ' + state)
    if (id===state) {
      console.log('u if-u id je ' + id)
      isUpside=true
    }else{
      isUpside=false
    }
  },[state])

  const handleClick = () =>{
    isUpside=false;
    /*
    reference.current.removeChild(reference.current.children[0])
    const random_number = Math.floor(Math.random() * 9) + 1; //Bettween 1 and 10
    setState(random_number)
  }
*/