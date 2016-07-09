import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import App from './components/app';
import names from './data/names';
import traps from './data/traps';

let appContainer = document.querySelectorAll('.js-app')[0];
let props = {
  randomizers: [{
    name: 'Name',
    items: _.shuffle(names)
  }, {
    name: 'Traps',
    items: _.shuffle(traps)
  }]
};
ReactDOM.render(<App {...props} />, appContainer);
