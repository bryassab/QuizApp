import { useEffect, useState } from "react";
import "./app.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import useSound from "use-sound";
import Result from "./components/Result";
import pregunta from "./assets/pregunta.mp3";


function App({ question, setPrueba, prueba }) {
  const [username, setUsername] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [stop, setStop] = useState(false);
  const [gano, setGano] = useState(" $ 0");
  const [boton, setBoton] = useState("")
  const [play] = useSound(pregunta);


  const data = [
    {
      id: 1,
      question: "cual es la principal acuasa por la cual la gente no recicla? ",
      answers: [
        {
          text: "falta de informacion ",
          correct: false,
        },
        {
          text: "desinteres del gobierno",
          correct: true,
        },
        {
          text: "bajos incentivos",
          correct: false,
        },
        {
          text: "cultura ciudadana",
          correct: false,
        }
      ]
    },
    {
      id: 2,
      question: "cuales son los principales lugares en los cuales la gente no recicla? ",
      answers: [
        {
          text: "Ciudades ",
          correct: false,
        },
        {
          text: "Pueblos",
          correct: false,
        },
        {
          text: "El campo",
          correct: true,
        },
        {
          text: "Islas",
          correct: false,
        }
      ]
    },
    {
      id: 3,
      question: "para que se usan las bolsas blancas de basura ? ",
      answers: [
        {
          text: " residuos aprovechables  ",
          correct: true,
        },
        {
          text: "residuos cantaminantes ",
          correct: false,
        },
        {
          text: "residuos organicos ",
          correct: false,
        },
        {
          text: "ninguna de las anteriores",
          correct: false,
        }

      ]
    }


  ]

  const moneyPyramid = [
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 200" },
    { id: 3, amount: "$ 300" },


  ].reverse();

  useEffect(() => {
    questionNumber > 1 && setGano(moneyPyramid.find((m) => m.id === questionNumber - 1).amount)
  }, [questionNumber])

  const Click = () => {
    if (boton === "") {
      setBoton(true);
      play();

    }

  }

  return (
    <div className="app" >

      {username ? (
        <>
          <div className="main">
            {stop ? <h1 className="finaltext" >  Total Acumulado : {gano}</h1> : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStop={setStop}
                      questionNumber={questionNumber} /></div>
                  <button className="media" onClick={() => Click()}>50/50</button>
                </div>
                <div className="bottom">
                  <Trivia data={data}
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                    setBoton={setBoton}
                    boton={boton}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">

            <ul className="moneyList" >
              {moneyPyramid.map((m, index) => (

                <li li key={index} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}  >
                  <span className="moneyListItemNumber" > {m.id} </span>
                  <span className="moneyListItemAmount" > {m.amount} </span>


                </li>

              ))}
            </ul>

          </div>


        </>
      ) : <Result setUsername={setUsername} />}


    </div >
  );
}

export default App;
