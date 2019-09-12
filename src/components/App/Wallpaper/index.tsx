import React, { RefObject } from 'react'
import { Application, Sprite, filters } from 'pixi.js'
import chaser from 'chaser'

import './style.scss'

interface IProps {
    width: number,
    height: number
}
interface IState {}

export default class extends React.Component<IProps, IState> {

    mouse: {x: number, y: number} = { x: 0, y: 0}
    target: {x: Chaser, y: Chaser} = {
        x: chaser(-100, 3000, 'ease-out'),
        y: chaser(-1000, 3000, 'ease-out')
    }
    time = 0;

    app: Application = new Application({ width: window.innerWidth, height: window.innerHeight });
    container:RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()

    image: Sprite = Sprite.from("/images/photo.jpg")
    depthMap: Sprite = Sprite.from("/images/diffuse-map.jpg")

    noiseFilter: filters.NoiseFilter = new filters.NoiseFilter(0.2);
    displacementFilter: filters.DisplacementFilter = new filters.DisplacementFilter(this.depthMap);

    componentDidMount () {
        if (this.container.current) {
            this.app.resizeTo = this.container.current;
            this.container.current.appendChild(this.app.view);
            this.init()
        }
    }

    init () {
        if (!this.app) return;
        
        this.app.stage.addChild(this.image);
        this.app.stage.addChild(this.depthMap);

        this.resize();
        this.loop();
        
        this.app.stage.filters = [this.displacementFilter, this.noiseFilter];

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 2;
            this.mouse.y = ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 2;
        })
        this.target.x.target = 0;
        this.target.y.target = 0;
    }

    loop () {
        requestAnimationFrame(() => this.loop())
        this.time++;
        const sinTime = Math.sin(this.time / 100);
        const cosTime = Math.cos(this.time / 100);

        this.noiseFilter.seed = Math.random() + (sinTime * 10);
        this.displacementFilter.scale.x = (sinTime * 10) + (this.mouse.x * 15) + this.target.x.value;
        this.displacementFilter.scale.y = (cosTime * 10) + (this.mouse.y * 15) + this.target.y.value;
    }

    resize () {
        const { width, height } = this.props;

        if (!this.container.current) return;

        const W = width;
        const H = height;

        this.app.view.width = W;
        this.app.view.height = H;

        const ratio = 1.5;
        const windowRatio = W / H;

        if (windowRatio >= ratio) {
            this.image.width = this.depthMap.width = W;
            this.image.height = this.depthMap.height = W / ratio;
        } else {
            this.image.height = this.depthMap.height = H;
            this.image.width = this.depthMap.width = H * ratio;
        }

        this.image.position.x = this.depthMap.position.x = (W - this.image.width) / 2;
        this.image.position.y = this.depthMap.position.y = (H - this.image.height) / 3;
    }

    render () {
        const { width, height } = this.props;

        const style = { width, height }
        this.resize()

        return (
            <div className="wallpaper" style={style} ref={this.container}></div>
        )
    }

}