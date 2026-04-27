"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  const _component_head2 = common_vendor.resolveComponent("head2");
  const _component_head3 = common_vendor.resolveComponent("head3");
  (_component_head1 + _component_head2 + _component_head3)();
}
const _sfc_main = {
  __name: "phdata",
  props: {
    faph: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const goto = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/phydetail/phydetail/phydetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.faph.name),
        b: common_vendor.o(goto, "8e"),
        c: common_assets._imports_0$1,
        d: common_vendor.t(__props.faph.xueXing),
        e: common_vendor.t(__props.faph.changJianDu),
        f: __props.faph.xueState == 1 ? "red" : __props.faph.xueState == 2 ? "yellow" : "green",
        g: common_assets._imports_1,
        h: common_vendor.t(__props.faph.jianKang),
        i: common_vendor.t(__props.faph.jiyanZhong),
        j: __props.faph.jiState == 1 ? "red" : __props.faph.jiyanState == 2 ? "yellow" : "green",
        k: common_assets._imports_2,
        l: common_vendor.t(__props.faph.guoMingYuan),
        m: common_vendor.t(__props.faph.yanZhong),
        n: __props.faph.yanState == 1 ? "red" : __props.faph.yantate == 2 ? "yellow" : "green",
        o: common_assets._imports_3,
        p: common_vendor.t(__props.faph.aiJianYi),
        q: common_vendor.t(__props.faph.aiyanZhong),
        r: __props.faph.aiState == 1 ? "red" : __props.faph.aiState == 2 ? "yellow" : "green",
        s: common_vendor.o(($event) => _ctx.isPress = true, "e4"),
        t: common_vendor.o(($event) => _ctx.isPress = false, "84"),
        v: common_vendor.o(($event) => _ctx.isPress = false, "74")
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/phdata/phdata.js.map
