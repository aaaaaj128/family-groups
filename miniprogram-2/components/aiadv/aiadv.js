"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "aiavi",
  data() {
    return {};
  }
};
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  const _component_head2 = common_vendor.resolveComponent("head2");
  (_component_head1 + _component_head2)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$2,
    b: _ctx.isPress ? 1 : "",
    c: common_vendor.o(($event) => _ctx.isPress = true, "72"),
    d: common_vendor.o(($event) => _ctx.isPress = false, "ce"),
    e: common_vendor.o(($event) => _ctx.isPress = false, "72")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/aiadv/aiadv.js.map
