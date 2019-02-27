class Song {
  constructor({ id, singer, name, album, pic }) {
    this.id = id;
    this.singer = singer;
    this.name = name;
    this.pic = pic;
    this.album = album;
  }
}

function getSingerName(names) {
  let name = [];
  name = names.map(item => item.name);

  return name.join('/');
}

export function createSong(song) {
  return new Song({
    id: song.id,
    name: song.name,
    singer: getSingerName(song.ar),
    album: song.al.name,
    pic: song.al.picUrl
  });
}
