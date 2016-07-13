import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import App from './components/app';
import names from './data/names';
import traps from './data/traps';
import synopsis from './data/synopsis';
import rooms from './data/rooms';
import doors from './data/doors';
import npcs from './data/npcs';
import lootCommon from './data/loot/common';
import lootMagic from './data/loot/magic';
import monsterEasy from './data/monsters/easy';
import monsterMedium from './data/monsters/medium';
import monsterHard from './data/monsters/hard';

let appContainer = document.querySelectorAll('.js-app')[0];
// --dark-red: #f00008;
//   --red: #ff3223;
//   --orange: #f3a801;
//   --gold: #f2c800;
//   --yellow: #ffde37;
//   --purple: #7d5da9;
//   --light-purple: #8d4f92;
//   --hot-pink: #d62288;
//   --dark-pink: #c64774;
//   --pink: #f49cc8;
//   --dark-green: #006C71;
//   --green: #41D69F;
//   --navy: #001b44;
//   --dark-blue: #00449e;
//   --blue: #357edd;
//   --light-blue: #96ccff;
//   --lightest-blue: #cdecff;
//   --washed-blue: #f6fffe;
//   --washed-green: #e8fdf5;
//   --washed-yellow: #fff8d5;
//   --light-pink: #efa4b8;
//   --light-yellow: #f3dd70;
//   --light-red: #ffd3c0;
let props = {
  randomizers: [{
    name: 'Synopsis',
    color: 'gray',
    items: _.shuffle(synopsis)
  }, {
    name: 'Rooms',
    color: 'orange',
    items: _.shuffle(rooms)
  }, {
    name: 'Doors',
    color: 'dark-pink',
    items: _.shuffle(doors)
  }, {
    name: 'Monsters (Easy)',
    color: 'green',
    items: _.shuffle(monsterEasy)
  }, {
    name: 'Monsters (Medium)',
    color: 'blue',
    items: _.shuffle(monsterMedium)
  }, {
    name: 'Monsters (Hard)',
    color: 'dark-red',
    items: _.shuffle(monsterHard)
  }, {
    name: 'Traps',
    color: 'gold',
    items: _.shuffle(traps)
  }, {
    name: 'Loot (Common)',
    color: 'washed-green',
    items: _.shuffle(lootCommon)
  }, {
    name: 'Loot (Magic)',
    color: 'purple',
    items: _.shuffle(lootMagic)
  }, {
    name: 'NPCs',
    color: 'light-blue',
    items: _.shuffle(npcs)
  }, {
    name: 'Name',
    color: 'pink',
    items: _.shuffle(names)
  }]
};
ReactDOM.render(<App {...props} />, appContainer);
