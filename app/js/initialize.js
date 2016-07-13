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
    id: 'synopsis',
    name: 'Synopsis',
    items: _.shuffle(synopsis)
  }, {
    id: 'rooms',
    name: 'Rooms',
    items: _.shuffle(rooms)
  }, {
    id: 'doors',
    name: 'Doors',
    items: _.shuffle(doors)
  }, {
    id: 'monsters-easy',
    name: 'Monsters (Easy)',
    isCard: true,
    items: _.shuffle(monsterEasy)
  }, {
    id: 'monsters-medium',
    name: 'Monsters (Medium)',
    isCard: true,
    items: _.shuffle(monsterMedium)
  }, {
    id: 'monsters-hard',
    name: 'Monsters (Hard)',
    isCard: true,
    items: _.shuffle(monsterHard)
  }, {
    id: 'traps',
    name: 'Traps',
    items: _.shuffle(traps)
  }, {
    id: 'loot-common',
    name: 'Loot (Common)',
    items: _.shuffle(lootCommon)
  }, {
    id: 'loot-magic',
    name: 'Loot (Magic)',
    items: _.shuffle(lootMagic)
  }, {
    id: 'npcs',
    name: 'NPCs',
    items: _.shuffle(npcs)
  }, {
    id: 'name',
    name: 'Name',
    items: _.shuffle(names)
  }]
};
ReactDOM.render(<App {...props} />, appContainer);
