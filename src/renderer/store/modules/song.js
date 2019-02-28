const SET_PLAYLIST = 'SET_PLAYLIST';
const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX';
const SET_PLAYING = 'SET_PLAYING';

const state = {
  playlist: [],
  currentIndex: 0,
  playing: false
};

const getters = {
  playlist: state => state.playlist,
  currentIndex: state => state.currentIndex,
  playing: state => state.playing,
  currentSong: state => state.playlist[state.currentIndex] || {}
};

const mutations = {
  [SET_PLAYLIST](state, songs) {
    state.playlist = songs;
  },
  [SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [SET_PLAYING](state, status) {
    state.playing = status;
  }
};

const actions = {
  selectPlay({ commit }, { songs, index }) {
    commit(SET_PLAYLIST, songs);
    commit(SET_CURRENT_INDEX, index);
    commit(SET_PLAYING, true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
