import { useRef, useState } from "react"


export default function Result({ setUsername, gano }) {
    const inputref = useRef();
    const Boton = () => {
        setUsername(inputref.current.value);
        console.log(inputref)
    };

    return (
        <div className="result" >
            <div className="all">{gano}</div>
            <input placeholder="Nombre" className="input" ref={inputref} />
            <button className="start" onClick={Boton} >INICIAR</button>
        </div>



    )
}
