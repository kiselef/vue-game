export default {
  data() {
    return {
      intervals: [],
      timeouts:  [],
    }
  },

  methods: {
    clearIntervals() {
      this.intervals.forEach(interval => clearInterval(interval));
    },

    clearTimeouts() {
      this.timeouts.forEach(timeout => clearTimeout(timeout));
    },

    addTimeout(timeout) {
      this.timeouts.push(timeout);
    },

    addInterval(interval) {
      this.intervals.push(interval);
    },
  },
};
