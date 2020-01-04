import intervals from "@/components/mixins/intervals";
import settings from "@/lib/settings";
import {store} from "@/lib/store";

export default {
  data() {
    return {
      type: '',

      x: 0,
      y: 0,

      h: 0,
      w: 0,

      step: 4,
      speed: 15,

      relative: 12,
    }
  },

  computed: {
    gameOver() {
      return store.gameOver;
    },

    level() {
      return store.level;
    },

    x2() {
      return this.x + this.w - this.relative;
    },

    y2() {
      return this.y + this.h;
    },
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
      this.$emit('moved', {x: this.x, y: this.y, x2: this.x2, y2: this.y2, id: this.enemyId});
    },

    /**
     * Команда об активации врага приходит от родительского компонента.
     * @param value
     */
    activated(value) {
      if (value) {
        this.x = this.positions.start;
        this.move();
      } else {
        this.clearIntervals();
      }
    },

    gameOver(value) {
      if (value) {
        this.speed = settings.scene.enemy.speed;
        this.step = settings.scene.enemy.step;
        this.clearIntervals();
      }
    },

    level() {
      this.speed -= this.speed <= 14 ? 1 : this.speed <= 20 ? 2 : 4;
    },
  },

  methods: {
    move() {
      this.addInterval(setInterval(() => {
        if (this.gameOver) {
          return;
        }
        this.x -= this.step;
      }, this.speed));
    },
  },
};
