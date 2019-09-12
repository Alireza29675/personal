import { h, render } from 'preact'

import './stylesheets/main.scss'
import App from './components/App'

import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

serviceWorker.unregister();
