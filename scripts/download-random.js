import request from 'request';
import _ from 'lodash';
import Promise from 'bluebird';
import fs from 'fs';
import stringify from 'json-stable-stringify';

let maxParallelCalls = 10;
let types = [
  // Encounters
  {
    name: 'encounters/npcs',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=NPC&race=&gender=&order=&culture=German&n=1000'
  },
  {
    name: 'encounters/dungeon',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Encounter&enc_type=Dungeon&n=1000'
  },
  {
    name: 'encounters/road',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Encounter&enc_type=Road&n=1000'
  },
  // World
  {
    name: 'world/cities',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Town&size=&race=&culture=&n=1000'
  },
  {
    name: 'world/heraldic',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Coat+of+Arms&n=1000'
  },
  // Dungeons
  {
    name: 'dungeons/synopsis',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Castle&size=&race=&culture=&n=1000'
  },
  {
    name: 'dungeons/graffiti',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Dungeon+Graffiti&n=1000'
  },
  {
    name: 'dungeons/secret_doors',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Secret+Door+Detail&n=1000'
  },
  {
    name: 'dungeons/traps_minor',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=CR+1+Room+Trap&n=1000'
  },
  {
    name: 'dungeons/traps_medium',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=CR+3+Room+Trap&n=1000'
  },
  {
    name: 'dungeons/traps_major',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=CR+6+Room+Trap&n=1000'
  },
  // Loot
  {
    name: 'loot/useless',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Giant+Bag&giant_type=Hill+Giant&n=10'
  },
  {
    name: 'loot/small',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Purse&n=1000'
  },
  {
    name: 'loot/grimoire',
    url: 'https://donjon.bin.sh/fantasy/random/rpc.cgi?type=Ancient+Tome&n=1000'
  },
  {
    name: 'loot/magic_minor',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Minor&item_type=Magic+Item&n=1000'
  },
  {
    name: 'loot/magic_medium',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Medium&item_type=Magic+Item&n=1000'
  },
  {
    name: 'loot/magic_major',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Major&item_type=Magic+Item&n=1000'
  },
  {
    name: 'loot/scrolls_minor',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Minor&item_type=Scroll&n=1000'
  },
  {
    name: 'loot/scrolls_medium',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Medium&item_type=Scroll&n=1000'
  },
  {
    name: 'loot/scrolls_major',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Major&item_type=Scroll&n=1000'
  },
  {
    name: 'loot/rings_minor',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Minor&item_type=Ring&n=1000'
  },
  {
    name: 'loot/rings_medium',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Medium&item_type=Ring&n=1000'
  },
  {
    name: 'loot/rings_major',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Major&item_type=Ring&n=1000'
  },
  {
    name: 'loot/potions_minor',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Minor&item_type=Potion&n=1000'
  },
  {
    name: 'loot/potions_medium',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Medium&item_type=Potion&n=1000'
  },
  {
    name: 'loot/potions_major',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Major&item_type=Potion&n=1000'
  },
  {
    name: 'loot/misc_minor',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Minor&item_type=Wondrous+Item&n=1000'
  },
  {
    name: 'loot/misc_medium',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Medium&item_type=Wondrous+Item&n=1000'
  },
  {
    name: 'loot/misc_major',
    url: 'https://donjon.bin.sh/d20/random/rpc.cgi?type=Magic+Item&rank=Major&item_type=Wondrous+Item&n=1000'
  },

  {
    name: 'XXX',
    url: 'XXX'
  },
  {
    name: 'XXX',
    url: 'XXX'
  },



];

saveAll(types);

// Get a list of items and save them on disk
function saveAll(list, index = 0) {
  let listCount = list.length;

  // Out of bounds, we stop
  if (index === listCount) {
    return;
  }

  let name = list[index].name;
  let url = list[index].url;

  console.info(`Fetching ${name}`);
  getItems(url).then((items) => {
    saveOnDisk(name, items).then(() => {
      saveAll(list, index + 1);
    });
  });
}

// Save a specific list on disk
function saveOnDisk(name, data) {
  let filepath = `./data/${name}.json`;
  let promiseWriteFile = Promise.promisify(fs.writeFile);
  let content = stringify(data, {space: '  '});

  return promiseWriteFile(filepath, content)
    .then(() => {
      console.info(`✓ Saved ${name} on disk.`);
      return data;
    })
    .catch((err) => {
      console.info(`Error when saving file ${filepath}`, err);
    });
}

// Get a list of random names for a given type.
// Will do a few parallel calls and merge the results
function getItems(url) {
  let allPromises = [];

  _.times(maxParallelCalls, () => {
    allPromises.push(requestAsPromise(url));
  });

  return Promise.all(allPromises).then((data) => {
    let all = [];
    _.each(data, (items) => {
      all = _.concat(all, JSON.parse(items));
    });
    return _.uniq(all).sort();
  });
}

// The request library works with callbacks.
// We wrap it so it works as promises
function requestAsPromise(url) {
  let deferred = Promise.pending();
  request(url, (err, response, body) => {
    if (err) {
      return deferred.reject(body);
    }
    deferred.resolve(body);
  });

  return deferred.promise;
}
