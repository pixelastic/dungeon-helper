import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import App from './components/app';
import storyDungeons from './data/story/dungeons';
import storyPlots from './data/story/plots';
import dungeonRooms from './data/dungeon/rooms';
import dungeonDoors from './data/dungeon/doors';
import dungeonTraps from './data/dungeon/traps';
import monsterTrappings from './data/monsters/trappings';
import monsterReactions from './data/monsters/reactions';
import lootCommon from './data/loot/common';
import lootCommonLarge from './data/loot/common_large';
import lootMagic from './data/loot/magic';
import lootBoss from './data/loot/boss';
import lootPotionTrappings from './data/loot/potion_trappings';
import npcNames from './data/npcs/names';
import npcTraits from './data/npcs/traits';
import npcMotivations from './data/npcs/motivations';

function render(name, tiles) {
  let container = document.querySelectorAll(`.js-${name}`)[0];
  let props = {
    randomizers: _.map(tiles, (tile) => {
      return {...tile, items: _.shuffle(tile.items)};
    })
  };
  ReactDOM.render(<App {...props} />, container);
}

// See a11y.md for list of all accessible color combinations
// Story
render('story', [{
  name: 'Dungeons',
  classNames: 'bg-black aqua',
  items: storyDungeons
}, {
  name: 'Plots',
  classNames: 'bg-black maroon',
  items: storyPlots
}]);

// Dungeon
render('dungeon', [{
  name: 'Rooms',
  classNames: 'bg-navy green',
  items: dungeonRooms
}, {
  name: 'Doors',
  classNames: 'bg-navy white',
  items: dungeonDoors
}, {
  name: 'Traps',
  classNames: 'bg-navy yellow',
  items: dungeonTraps
}]);

// Monsters
render('monsters', [{
  name: 'Monster Trappings',
  classNames: 'bg-teal navy',
  items: monsterTrappings
}, {
  name: 'Monster Reactions',
  classNames: 'bg-teal maroon',
  items: monsterReactions
}]);

// Loot
render('loot', [{
  name: 'Loot (Common)',
  classNames: 'bg-maroon silver',
  items: lootCommon
}, {
  name: 'Loot (Common Large)',
  classNames: 'bg-maroon white',
  items: lootCommonLarge
}, {
  name: 'Potion Trappings',
  classNames: 'bg-maroon aqua',
  items: lootPotionTrappings
}, {
  name: 'Loot (Magic)',
  classNames: 'bg-maroon lime',
  items: lootMagic
}, {
  name: 'Boss',
  classNames: 'bg-maroon yellow',
  items: lootBoss
}]);

// NPCS
render('npcs', [{
  name: 'Name',
  classNames: 'bg-green navy',
  items: npcNames
}, {
  name: 'Traits',
  classNames: 'bg-green yellow',
  items: npcTraits
}, {
  name: 'Motivations',
  classNames: 'bg-green black',
  items: npcMotivations
}]);
