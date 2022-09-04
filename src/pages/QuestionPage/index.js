import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from './style.module.scss';
import * as svgs from '../../assets/svgs';
import { Button } from '../../components';
import { useGameData } from '../../Context/data';
import { QuestionGenerate } from '../../assets/utils';

function QuestionPage() {

    const navigate = useNavigate();
    const { process, scores, setScores, setGameData, gameData } = useGameData();
    const [generete, setGenerete] = useState(QuestionGenerate(process))
    const [isLoading, setIsLoading] = useState(false)
    const [userAnswer, setUserAnswer] = useState()
    const [pointPlus, setPointPlus] = useState(0)
    const buttonRef = useRef()
    const answerClass = [
        Style.answersA,
        Style.answersB,
        Style.answersC,
        Style.answersD,
    ];
    useEffect(() => {
        if (process === "toplama") {
            setPointPlus(2)
        }
        else if (process === "cikarma") {
            setPointPlus(3)
        }
        else if (process === "carpma") {
            setPointPlus(4)
        }
        else if (process === "bolme") {
            setPointPlus(5)
        }
        setScores({ point: 0, tour: scores.tour, question: 1, correct: 0, incorrect: 0 })
    }, [])

    const handleClick = async (e) => {

        if (Number(e.target.value) === generete.answer) {
            setUserAnswer(true)
            setGameData([...gameData, { a: generete.randomOne, b: generete.randomTwo, operator: generete.operator, result: generete.answer, userAnswer: "✓" }])
            setScores({ ...scores, point: scores.point + pointPlus, question: scores.question < 10 ? scores.question + 1 : scores.question, correct: scores.correct + 1, incorrect: scores.incorrect });
        }
        else {
            setUserAnswer(false)
            setGameData([...gameData, { a: generete.randomOne, b: generete.randomTwo, operator: generete.operator, result: generete.answer, userAnswer: "x" }])
            setScores({ ...scores, point: scores.point, question: scores.question < 10 ? scores.question + 1 : scores.question, correct: scores.correct, incorrect: scores.incorrect + 1 });
        }
        setIsLoading(true)
        setTimeout(() => {
            if (scores.question < 10) {
                setGenerete(QuestionGenerate(process))
            }
            else {
                navigate('/result', { replace: true });
            }

            setIsLoading(false)
            setUserAnswer()
        }, 1000);

    };
    useEffect(() => {


        buttonRef.current.className = answerClass[Math.floor(Math.random() * 4)]
    }, [generete])

    return (
        <div className={Style.Question_Container} style={{ background: userAnswer ? "#00BF63" : userAnswer === undefined ? "none" : "red" }}>
            <div className={Style.Left}>
                <span className={Style.Question}>{generete.randomOne}  {generete.operator} {generete.randomTwo}</span>
                {
                    userAnswer ? svgs.TrueAnswer : userAnswer === undefined ? svgs.Question : svgs.FalseAnswer
                }
            </div>
            <div className={Style.Right}>
                <div className={Style.Info}>
                    <ul>
                        <li>
                            Puan:
                            {scores.point}
                        </li>
                        <li>
                            Tur:
                            {scores.tour}
                        </li>
                        <li>
                            Soru:
                            {scores.question}
                        </li>
                    </ul>
                </div>
                <div ref={buttonRef} className={Style.answersA} style={{ pointerEvents: isLoading ? "none" : "" }}>
                    <Button
                        btnName="A"
                        click={handleClick}
                        btnValue={generete.answer}
                        title={generete.answer}
                    />
                    <Button
                        btnName="B"
                        click={handleClick}
                        btnValue={generete.fakeAnswer1}
                        title={generete.fakeAnswer1}
                    />
                    <Button
                        btnName="C"
                        click={handleClick}
                        btnValue={generete.fakeAnswer2}
                        title={generete.fakeAnswer2}
                    />
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;
