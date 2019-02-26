import Vue from 'vue';

const Constructor = Vue.extend(require('./loading').default);

let instance;

export default {
  open() {
    if (instance === undefined) {
      instance = new Constructor({
        el: document.createElement('div')
      });

      document.body.appendChild(instance.$el);
    }

    if (instance.show) {
      return;
    }

    Vue.nextTick(() => {
      instance.show = true;
    });
  },

  close() {
    if (instance) {
      instance.show = false;
    }
  }
};
