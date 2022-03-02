import { useEffect, useState } from "react"
import useSound from "use-sound";
import correct from "../assets/correct.mp3";
import pregunta from "../assets/pregunta.mp3";
import wrong from "../assets/wrong.mp3";
import Result from "./Result";
import App from "../App";
export default function Trivia({ data, setStop, questionNumber, setQuestionNumber, setUsername, boton, setBoton, gano }) {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassname] = useState("answer");
    const [random, setRandom] = useState();
    const [play] = useSound(pregunta);
    const [answercorrect] = useSound(correct);
    const [answerwrong] = useSound(wrong);


    useEffect(() => {

        setQuestion(data[questionNumber - 1]);

        var randomint = parseInt(Math.random() * (3 - 0) + 0);


        var indexCorrect = question?.answers.findIndex(x => x.correct)

        while (randomint === indexCorrect) {
            randomint = parseInt(Math.random() * (3 - 0) + 0);
        }

        setRandom(randomint);

    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);

    };

    const handleClick = (a) => {
        setSelectedAnswer(a)
        setClassname("answer active");
        delay(3000, () =>
            setClassname(a.correct ? "answer correct" : "answer wrong"),

        );
        delay(3000, () => {
            if (a.correct) {
                answercorrect();
                delay(3000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);

                });

            } else {
                answerwrong();
                delay(3000, () => {
                    setStop(true);

                })


            }
            if (boton) {
                setBoton(false)
            }
        }
        );
    };

    return (
        <div className="trivia">

            <div className="question" > {question?.question} </div>
            <div className="answers" >
                {question?.answers.map((a, index) => {


                    if (!boton) {
                        return (
                            <div key={index} className={selectedAnswer === a ? className : "answer"}
                                onClick={() => handleClick(a)}>
                                {a.text} </div>

                        )
                    }
                    else {
                        if (a.correct) {
                            return (
                                <div key={index} className={selectedAnswer === a ? className : "answer"}
                                    onClick={() => handleClick(a)}>
                                    {a.text} </div>

                            )
                        }
                        else if (index === random) {
                            return (
                                <div key={index} className={selectedAnswer === a ? className : "answer"}
                                    onClick={() => handleClick(a)}>
                                    {a.text} </div>

                            )

                        }
                    }
                })
                }


            </div>






        </div>

    )
}
