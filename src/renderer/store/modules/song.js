const SET_PLAYLIST = 'SET_PLAYLIST';
const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX';


const state = {
  playlist: [],
  currentIndex: 0
};

const getters = {
  currentSong: state => state.playlist[state.currentIndex] || {}
};

const mutations = {
  [SET_PLAYLIST](state, songs) {
    state.playlist = songs;
  },
  [SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
