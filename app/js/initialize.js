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
let props = {
  randomizers: [{
    name: 'Synopsis',
    items: _.shuffle(synopsis)
  }, {
    name: 'Rooms',
    items: _.shuffle(rooms)
  }, {
    name: 'Doors',
    items: _.shuffle(doors)
  }, {
    name: 'Monsters (Easy)',
    items: _.shuffle(monsterEasy)
  }, {
    name: 'Monsters (Medium)',
    items: _.shuffle(monsterMedium)
  }, {
    name: 'Monsters (Hard)',
    items: _.shuffle(monsterHard)
  }, {
    name: 'Traps',
    items: _.shuffle(traps)
  }, {
    name: 'Loot (Common)',
    items: _.shuffle(lootCommon)
  }, {
    name: 'Loot (Magic)',
    items: _.shuffle(lootMagic)
  }, {
    name: 'NPCs',
    items: _.shuffle(npcs)
  }, {
    name: 'Name',
    items: _.shuffle(names)
  }]
};
ReactDOM.render(<App {...props} />, appContainer);
