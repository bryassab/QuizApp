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
      question: "¿cual es la principal acuasa por la cual la gente no recicla? ",
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
      question: "¿cuales son los principales lugares en los cuales la gente no recicla? ",
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
      question: "¿para que se usan las bolsas blancas de basura ? ",
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
    },
    {
      id: 4,
      question: "¿Cuál de estas acciones no pertenece a la regla de las 3 erres de la sostenibilidad? ",
      answers: [
        {
          text: " Reducir  ",
          correct: false,
        },
        {
          text: "Reutilizar ",
          correct: false,
        },
        {
          text: "Reciclar ",
          correct: false,
        },
        {
          text: "Reorganizar",
          correct: true,
        }

      ]
    },
    {
      id: 5,
      question: "¿Cuál de estos colores no pertenece a un contenedor de reciclaje?",
      answers: [
        {
          text: " Amarillo  ",
          correct: false,
        },
        {
          text: "Verde ",
          correct: false,
        },
        {
          text: "Negro ",
          correct: true,
        },
        {
          text: "Rojo",
          correct: false,
        }

      ]
    },
    {
      id: 6,
      question: "¿Sabes cuánto tarda, de media, en degradarse una botella de plástico? ",
      answers: [
        {
          text: " 20 años  ",
          correct: false,
        },
        {
          text: "700 años ",
          correct: true,
        },
        {
          text: "900 años ",
          correct: false,
        },
        {
          text: "500 años",
          correct: false,
        }

      ]
    },
    {
      id: 7,
      question: "Cuantas bebidas gasesosas se consumieron en 2021 en los pueblos de colombia si en 2020 fue de 13 billones y su venta se incremento un 13% mas en 2021",
      answers: [
        {
          text: " No se  ",
          correct: false,
        },
        {
          text: "nadie sabe ",
          correct: true,
        },
        {
          text: "1690000000000 ",
          correct: false,
        },
        {
          text: "1800000000000",
          correct: false,
        }

      ]
    },
    {
      id: 8,
      question: "¿para que se que se puede utilizar el PET ? ",
      answers: [
        {
          text: "   ",
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
    { id: 4, amount: "$ 400" },
    { id: 5, amount: "$ 500" },
    { id: 6, amount: "$ 600" },
    { id: 7, amount: "$ 700" },
    { id: 8, amount: "$ 800" },



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
