import { h, Component } from 'preact'

import Wallpaper from './Wallpaper'
import './style.scss'

interface IProps {}
interface IState {
    width: number,
    height: number
}

export default class extends Component<IProps, IState> {

    state = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    componentDidMount () {
        window.addEventListener('resize', () => this.resize());
    }

    resize () {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render () {
        const { width, height } = this.state;

        const wallpaperSize = {
            width: width / (1.4),
            height: height / (1.3)
        }

        return (
            <div className="App">
                <h1 className="App__title">
                    <span>Alireza</span><span> </span>
                    <span>Sheikholmolouki</span>
                    <strong>Creative coder from middle-east</strong>
                </h1>
                <Wallpaper {...wallpaperSize} />
            </div>
        )
    }
}