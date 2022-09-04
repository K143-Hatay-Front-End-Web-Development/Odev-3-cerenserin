
import React, { createContext, useContext, useEffect, useState } from 'react'

export const DataContext = createContext()
export const useGameData = () => useContext(DataContext)


const Provider = ({children}) => {
    const [process, setProcess] = useState("")
    const [gameData, setGameData] = useState([])
    const [scores, setScores] = useState({ point: 0, tour: 0, question: 1, correct:0, incorrect:0 });
    const [localData, setLocalData] = useState({totalPoint:0, totalCorrect:0, totalIncorrect:0})
    
    const getData = async ()=>{
      const data = await JSON.parse(localStorage.getItem("mathgame"))!== null ? true:false
      if(data){
        setLocalData(JSON.parse(localStorage.getItem("mathgame")))
      }
      else{
        localStorage.setItem("mathgame", JSON.stringify(localData))
      }
    }
    
    useEffect( ()=>{
      getData()
    },[])
    
  return (
    <DataContext.Provider value={{process, setProcess, gameData, setGameData, scores, setScores, localData, setLocalData}}>
        {children}
    </DataContext.Provider>
  )
}

export default Provider