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
      this.intervals = [];
    },

    clearTimeouts() {
      this.timeouts.forEach(timeout => clearTimeout(timeout));
      this.timeouts = [];
    },

    addTimeout(timeout) {
      this.timeouts.push(timeout);
    },

    addInterval(interval) {
      this.intervals.push(interval);
    },
  },
};
