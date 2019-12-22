import intervals from "@/components/mixins/intervals";
import {store} from "@/lib/store";

export default {
  data() {
    return {
      type: '',

      x: 0,
      y: 0,

      h: 0,
      w: 0,

      step: 5,
      speed: 30,
    }
  },

  computed: {
    gameOver() {
      return store.gameOver;
    }
  },

  mixins: [intervals],

  props: {
    activated: {
      default: false,
    },
    enemyId: Number,
    positions: Object,
  },

  watch: {
    /**
     * Каждое передвижение по горизонтали отслеживается.
     * @param value
     */
    x() {
      this.$emit('moved', {x: this.x, y: this.y, w: this.w, h: this.h, id: this.enemyId});
    },

    /**
     * Команда об активации врага приходит от родительского компонента.
     * @param value
     */
    activated(value) {
      if (value) {
        this.x = this.positions.start;
        this.addInterval(setInterval(() => {
          if (this.gameOver) {
            return;
          }
          this.move();
        }, this.speed));
      } else {
        this.clearIntervals();
      }
    },
  },

  methods: {
    move() {
      this.x -= this.step;
    },
  },
};
