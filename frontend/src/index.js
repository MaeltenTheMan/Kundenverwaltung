import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import Dashboard from "./components/dashboard"

ReactDOM.render(<Dashboard />, document.getElementById('root'));

serviceWorker.unregister();
