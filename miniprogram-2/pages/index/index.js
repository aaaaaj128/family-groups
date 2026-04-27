"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  const _component_head2 = common_vendor.resolveComponent("head2");
  const _easycom_phdata2 = common_vendor.resolveComponent("phdata");
  const _easycom_aiadv2 = common_vendor.resolveComponent("aiadv");
  const _easycom_missionto2 = common_vendor.resolveComponent("missionto");
  const _easycom_adshow2 = common_vendor.resolveComponent("adshow");
  (_component_head1 + _component_head2 + _easycom_phdata2 + _easycom_aiadv2 + _easycom_missionto2 + _easycom_adshow2)();
}
const _easycom_phdata = () => "../../components/phdata/phdata.js";
const _easycom_aiadv = () => "../../components/aiadv/aiadv.js";
const _easycom_missionto = () => "../../components/missionto/missionto.js";
const _easycom_adshow = () => "../../components/adshow/adshow.js";
if (!Math) {
  (_easycom_phdata + _easycom_aiadv + _easycom_missionto + _easycom_adshow)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const faphlist = [
      {
        name: "董宇航",
        xueXing: "A",
        changJianDu: "常见",
        changState: "3",
        guoMingYuan: "没有钱",
        yanZhong: "严重",
        yanState: "1",
        jianKang: "无疾病",
        jiyanZhong: "健康",
        jiState: "3",
        aiJianYi: "少吃饭",
        aiyanZhong: "适中",
        aiState: "2",
        waterNum: 5,
        // 当前喝水
        waterTotal: 8,
        // 目标喝水
        stepNum: 6800,
        // 当前步数
        stepTotal: 1e4,
        // 目标步数
        sleepNum: 7.5,
        // 当前睡眠
        sleepTotal: 8
        // 目标睡眠,
      },
      {
        name: "董宇航",
        xueXing: "A",
        changJianDu: "常见",
        changState: "3",
        guoMingYuan: "没有钱",
        yanZhong: "严重",
        yanState: "1",
        jianKang: "无疾病",
        jiyanZhong: "健康",
        jiState: "3",
        aiJianYi: "少吃饭",
        aiyanZhong: "适中",
        aiState: "2",
        waterNum: 5,
        // 当前喝水
        waterTotal: 8,
        // 目标喝水
        stepNum: 6800,
        // 当前步数
        stepTotal: 1e4,
        // 目标步数
        sleepNum: 7.5,
        // 当前睡眠
        sleepTotal: 8
        // 目标睡眠,
      },
      {
        name: "董宇航",
        xueXing: "A",
        changJianDu: "常见",
        changState: "3",
        guoMingYuan: "没有钱",
        yanZhong: "严重",
        yanState: "1",
        jianKang: "无疾病",
        jiyanZhong: "健康",
        jiState: "3",
        aiJianYi: "少吃饭",
        aiyanZhong: "适中",
        aiState: "2",
        waterNum: 5,
        // 当前喝水
        waterTotal: 8,
        // 目标喝水
        stepNum: 6800,
        // 当前步数
        stepTotal: 1e4,
        // 目标步数
        sleepNum: 7.5,
        // 当前睡眠
        sleepTotal: 8
        // 目标睡眠,
      }
    ];
    const adData = [
      {
        adname: "a1",
        url: "/static/tubiao/ad1.png"
      },
      {
        adname: "a2",
        url: "/static/tubiao/ad2.png"
      },
      {
        adname: "a3",
        url: "/static/tubiao/ad3.png"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(faphlist, (i, index, i0) => {
          return {
            a: index,
            b: "3584e1d9-2-" + i0,
            c: common_vendor.p({
              faph: i
            })
          };
        }),
        b: common_vendor.f(faphlist, (item, index, i0) => {
          return {
            a: index,
            b: "3584e1d9-4-" + i0,
            c: common_vendor.p({
              faph: item
            })
          };
        }),
        c: common_vendor.p({
          adshow: adData
        })
      };
    };
  }
};
wx.createPage(_sfc_main);