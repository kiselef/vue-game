import intervals from "@/lib/mixins/intervals";
import {store} from "@/lib/store";

export default {
  data() {
    return {
      type: '',

      startPosition: 250,
      endPosition: -50,

      x: 0,
      y: 0,

      h: 0,
      w: 0,

      step: 5,
      speed: 30,
    }
  },

  computed: {
    started() {
      return store.started;
    },

    gameOver() {
      return store.gameOver;
    }
  },

  mixins: [intervals],

  props: {
    enemyId: {
      type: Number,
    },

    activated: {
      default: false,
    },
  },

  watch: {
    gameOver(value) {
      if (value) {
        this.clearTimeouts();
      }
    },

    /**
     * Каждое передвижение по горизонтали отслеживается.
     * @param value
     */
    y(value) {
      this.$emit('moved', this.y);

      if (value < this.endPosition) {
        this.$emit('changed', this.enemyId, false);
        this.clearTimeouts();
      }
    },

    /**
     * Команда об активации врага приходит от родительского компонента.
     * @param value
     */
    activated(value) {
      if (value) {
        this.y = this.startPosition;
        this.down();
      }
    },
  },

  methods: {
    down() {
      this.smoothIncreaseY()
    },

    smoothIncreaseY() {
      if (this.gameOver) {
        return;
      }

      this.y -= this.step;
      this.addTimeout(setTimeout(() => {this.smoothIncreaseY()}, this.speed));
    },
  },
};
