"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "diet-plan",
  props: {
    planItems: {
      type: Array,
      default: () => []
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.planItems && $props.planItems.length > 0
  }, $props.planItems && $props.planItems.length > 0 ? {
    b: common_vendor.f($props.planItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/diet-plan/diet-plan.js.map
