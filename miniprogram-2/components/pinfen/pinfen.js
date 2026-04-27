"use strict";
const common_vendor = require("../../common/vendor.js");
const dietPlan = () => "../diet-plan/diet-plan.js";
const exercisePlan = () => "../exercise-plan/exercise-plan.js";
const lifePlan = () => "../life-plan/life-plan.js";
const _sfc_main = {
  name: "pinfen",
  components: {
    dietPlan,
    exercisePlan,
    lifePlan
  },
  props: {
    title: {
      type: String,
      default: "本周健康评分"
    },
    categories: {
      type: Array,
      default: () => ["睡眠", "运动", "饮食", "心率", "饮水"]
    },
    scoreData: {
      type: Array,
      default: () => [83, 78, 82, 90, 87]
    },
    dietPlan: {
      type: Array,
      default: () => []
    },
    exercisePlan: {
      type: Array,
      default: () => []
    },
    lifePlan: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    totalScore() {
      if (this.scoreData && this.scoreData.length > 0) {
        const sum = this.scoreData.reduce((acc, val) => acc + val, 0);
        return Math.round(sum / this.scoreData.length);
      }
      return 0;
    },
    radarData() {
      return this.categories.map((category, index) => ({
        label: category,
        value: this.scoreData[index] || 0,
        ratio: (this.scoreData[index] || 0) / 100
      }));
    }
  },
  methods: {
    getLineStyle(index) {
      const angle = index * 72 * Math.PI / 180 - Math.PI / 2 - 50;
      return {
        transform: `rotate(${angle}rad)`
      };
    },
    getPolygonPath() {
      const points = this.radarData.map((item, index) => {
        const angle = index * 72 * Math.PI / 180 - Math.PI / 2;
        const radius = 180 * item.ratio;
        const x = 50 + Math.cos(angle) * radius / 360 * 100;
        const y = 50 + Math.sin(angle) * radius / 360 * 100;
        return `${x}% ${y}%`;
      });
      return `polygon(${points.join(", ")})`;
    }
  }
};
if (!Array) {
  const _easycom_diet_plan2 = common_vendor.resolveComponent("diet-plan");
  const _easycom_exercise_plan2 = common_vendor.resolveComponent("exercise-plan");
  const _easycom_life_plan2 = common_vendor.resolveComponent("life-plan");
  (_easycom_diet_plan2 + _easycom_exercise_plan2 + _easycom_life_plan2)();
}
const _easycom_diet_plan = () => "../diet-plan/diet-plan.js";
const _easycom_exercise_plan = () => "../exercise-plan/exercise-plan.js";
const _easycom_life_plan = () => "../life-plan/life-plan.js";
if (!Math) {
  (_easycom_diet_plan + _easycom_exercise_plan + _easycom_life_plan)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.t($options.totalScore),
    c: common_vendor.f(3, (level, k0, i0) => {
      return {
        a: level,
        b: `scale(${level * 0.33})`
      };
    }),
    d: common_vendor.t($options.radarData[0].label),
    e: common_vendor.t($options.radarData[0].value),
    f: common_vendor.t($options.radarData[1].label),
    g: common_vendor.t($options.radarData[1].value),
    h: common_vendor.t($options.radarData[2].label),
    i: common_vendor.t($options.radarData[2].value),
    j: common_vendor.t($options.radarData[3].label),
    k: common_vendor.t($options.radarData[3].value),
    l: common_vendor.t($options.radarData[4].label),
    m: common_vendor.t($options.radarData[4].value),
    n: $options.getPolygonPath(),
    o: common_vendor.f($options.radarData, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.s($options.getLineStyle(index))
      };
    }),
    p: common_vendor.p({
      planItems: $props.dietPlan
    }),
    q: common_vendor.p({
      planItems: $props.exercisePlan
    }),
    r: common_vendor.p({
      planItems: $props.lifePlan
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/pinfen/pinfen.js.map
