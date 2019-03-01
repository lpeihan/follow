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

db.play.ensureIndex({ fieldName: 'listen_time' });
db.love.ensureIndex({ fieldName: 'create_time' });

export default db;
