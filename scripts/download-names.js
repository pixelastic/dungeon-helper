import request from 'request';
import _ from 'lodash';
import Promise from 'bluebird';
import fs from 'fs';
import stringify from 'json-stable-stringify';

let maxParallelCalls = 10;
let maxNamesPerPage = 1000;
let types = [
  'Human Male',
  'Human Female',
  'Human Town',
  'Dwarvish Male',
  'Dwarvish Female',
  'Dwarvish Town',
  'Elvish Male',
  'Elvish Female',
  'Elvish Town',
  'Orcish Male',
  'Orcish Female',
  'Orcish Town',
  'Draconic Male',
  'Draconic Female',
  'German Male',
  'German Female',
  'German Town'
];

saveAllNames(types);

// Get a list of names for each type, and save them on disk
function saveAllNames(list, index = 0) {
  let listCount = list.length;

  // Out of bounds, we stop
  if (index === listCount) {
    return;
  }

  let type = list[index];

  getNames(type).then((names) => {
    saveOnDisk(type, names).then(() => {
      saveAllNames(list, index + 1);
    });
  });
}

// Save a specific list on disk
function saveOnDisk(name, data) {
  let basename = _.toLower(name.replace(' ', '_'));
  let filepath = `./data/names/${basename}.json`;
  let promiseWriteFile = Promise.promisify(fs.writeFile);
  let content = stringify(data, {space: '  '});

  return promiseWriteFile(filepath, content)
    .then(() => {
      console.info(`✓ Saved ${content.length} names on disk.`);
      return data;
    })
    .catch((err) => {
      console.info(`Error when saving file ${filepath}`, err);
    });
}

// Get a list of random names for a given type.
// Will do a few parallel calls and merge the results
function getNames(type) {
  let allPromises = [];
  let baseUrl = 'https://donjon.bin.sh/name/rpc.cgi';
  let encodedType = type.replace(' ', '+');

  console.info(`Fetching ${type}`);

  _.times(maxParallelCalls, () => {
    let url = `${baseUrl}?type=${encodedType}&n=${maxNamesPerPage}`;
    allPromises.push(requestAsPromise(url));
  });

  return Promise.all(allPromises).then((data) => {
    console.info(`✓ Got all ${type}`);
    let names = [];
    _.each(data, (list) => {
      names = _.concat(names, list.split('\n'));
    });
    return _.uniq(names).sort();
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
