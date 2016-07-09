import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import App from './components/app';
import names from './data/names';

let appContainer = document.querySelectorAll('.js-app')[0];
let props = {
  randomizers: [{
    name: 'Name',
    items: _.shuffle(names)
  }]
};
ReactDOM.render(<App {...props} />, appContainer);
