import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
