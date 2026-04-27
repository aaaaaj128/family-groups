"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "missionto",
  props: {
    faph: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const isPress = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.faph.stepNum),
        b: common_vendor.t(__props.faph.stepTotal),
        c: common_vendor.t(__props.faph.sleepNum),
        d: common_vendor.t(__props.faph.sleepTotal),
        e: common_vendor.t(__props.faph.waterNum),
        f: common_vendor.t(__props.faph.waterTotal),
        g: isPress.value ? 1 : "",
        h: common_vendor.o(($event) => isPress.value = true, "98"),
        i: common_vendor.o(($event) => isPress.value = false, "99"),
        j: common_vendor.o(($event) => isPress.value = false, "bd")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36c1ca04"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/missionto/missionto.js.map
