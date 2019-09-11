import { h, render } from "preact";
import { useState } from 'preact/hooks'

const App = () => {
    const [n] = useState(0)

    return <h1>{n}</h1>
}

render(<App />, document.querySelector("#root"));
