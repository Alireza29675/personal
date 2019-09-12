import { h, render } from "preact";
import { useState } from 'preact/hooks'

const App = () => {
    const [message] = useState('Alireza Sheikholmolouki Website')

    return <h1>{message}</h1>
}

render(<App />, document.querySelector("#root"));
