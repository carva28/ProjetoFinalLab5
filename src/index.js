import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Desktop from './Desktop';
import * as serviceWorker from './serviceWorker';

/* if (window.innerWidth <= 500) { */
    ReactDOM.render(<App />, document.getElementById('root'));
/* } else if (window.innerWidth > 500) {
    ReactDOM.render(<Desktop />, document.getElementById('root'));
} */

serviceWorker.unregister();