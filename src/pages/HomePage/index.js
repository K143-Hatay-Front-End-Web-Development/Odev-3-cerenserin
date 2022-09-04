import React from 'react'
import Style from './style.module.scss'
import { useGameData } from '../../Context/data'
import { useNavigate } from 'react-router-dom'
import { Button, Radio } from '../../components'
import * as svgs from '../../assets/svgs'


const HomePage = () => {
    let navigate = useNavigate()
    const { process, scores, setScores, setProcess, setGameData, localData } = useGameData()
    

    const inputOnClick = (e) => {
        setProcess(e.target.value)
    }
    const handleclick = () => {
        setGameData([])
        if (process === "") {
            alert("LÜTFEN YAPILACAK İŞLEMİ SEÇİNİZ")
        }
        else {
            navigate("/question", { replace: true });
            setScores({ ...scores, point: 0, tour: scores.tour + 1, question: 1 });
        }
    }

    return (
        <div className={Style.Container}>
            <header>
                <p>Matematik Oyunu</p>
                {svgs.TextBorder}
            </header>
            <section>
                <div className={Style.Score}>
                    <span>Puan: {localData.totalPoint}</span>
                    <span>Çözülen  Sayısı: {localData.totalCorrect + localData.totalIncorrect}</span>
                    <span>Yanlış Cevap: {localData.totalIncorrect}</span>
                    <span>Doğru Cevap: {localData.totalCorrect}</span>
                </div>
                <div className={Style.Process}>
                    <Radio
                        radioName="process"
                        radioId="toplama"
                        title="Toplama"
                        radioChecked={inputOnClick}
                    />
                    <Radio
                        radioName="process"
                        radioId="cikarma"
                        title="Çıkarma"
                        radioChecked={inputOnClick}
                    />
                    <Radio
                        radioName="process"
                        radioId="carpma"
                        title="Çarpma"
                        radioChecked={inputOnClick}
                    />
                    <Radio
                        radioName="process"
                        radioId="bolme"
                        title="Bölme"
                        radioChecked={inputOnClick}
                    />
                </div>
            </section>
            <footer>
                <Button title="Başla" click={handleclick} />
            </footer>
        </div>
    )
}

export default HomePage