import eventBus from '@/services/event-bus';

export const refreshMixins = {
  created() {
    eventBus.$on('refresh', () => {
      this.query && this.query();
    });
  }
};
