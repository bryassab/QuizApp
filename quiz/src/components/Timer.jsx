import { useEffect, useState } from "react"


export default function Timer() {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
        // const interval = setInterval(() => {

        // }, 1000)
    });
    return timer;
}
