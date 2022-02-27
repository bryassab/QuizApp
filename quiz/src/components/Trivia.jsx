import { useEffect, useState } from "react"

export default function Trivia({ data, setStop, questionNumber, setQuestionNumber, setTimeOut, boton, setBoton }) {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassname] = useState("answer");
    const [random, setRandom] = useState();

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
        delay(6000, () => {
            if (a.correct) {
                setQuestionNumber((prev) => prev + 1);
                setSelectedAnswer(null);
            } else {
                setStop(true);
            }
            if (boton) {
                setBoton(false)
            }
        }
        );
    };

    return (
        <div className="trivia">
            <div className="question"> {question?.question} </div>
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
