import Nedb from 'nedb';
import path from 'path';
import { remote } from 'electron';

export function createDB(name) {
  return new Nedb({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), `/${name}.db`)
  });
}

const db = {};

db.play = createDB('play');
db.love = createDB('love');

export default db;
