// eslint-disable-next-line
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Style from './style.module.scss'
import { useGameData } from '../../Context/data'
import { Button } from '../../components'
import * as svgs from '../../assets/svgs'


const ResultPage = () => {
    let navigate = useNavigate()
    const { gameData, scores, localData, setLocalData } = useGameData()

    useEffect(() => {
        setLocalData(x => ({ ...x, totalPoint: localData.totalPoint + scores.point, totalCorrect: localData.totalCorrect + scores.correct, totalIncorrect: localData.totalIncorrect + scores.incorrect }))

    }, [])
    useEffect(() => {
        localStorage.setItem("mathgame", JSON.stringify(localData))
    }, [localData])

    return (
        <div className={Style.Container}>
            <div className={Style.Left}>
                <div className={Style.Header}>
                    <h1>Sonuç</h1>
                    <span>
                        {svgs.TextBorder}
                    </span>
                </div>
                <div className={Style.Score}>
                    <span>Puan: {scores.point}</span>
                    <span>Doğru Cevap: {scores.correct}</span>
                    <span>Yanlış Cevap: {scores.incorrect}</span>
                </div>
                <Button title="Başa Dön" click={() => navigate("/", { replace: true })} />
            </div>
            <div className={Style.Right}>
                <div className={Style.Header}>
                    <h1>Sorular</h1>
                    <span>
                        {svgs.TextBorder}
                    </span>
                </div>
                <div className={Style.Questions}>
                    <ul>
                        {gameData.map((item, index) => (
                            <li key={"data_" + index}>{item.a} {item.operator} {item.b} = {item.result} {item.userAnswer}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ResultPage