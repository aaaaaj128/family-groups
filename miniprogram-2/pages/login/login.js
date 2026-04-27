// pages/login/login.js
Page({
  data: {
    phone: '',
    password: '',
    showRegisterModal: false,
    regUsername: '',
    regPhone: '',
    regPwd: ''
  },

  onLoad() {
    // 检查是否已登录
    const userId = wx.getStorageSync('userId');
    if (userId) {
      // 已登录，直接跳转首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },
  onPwdInput(e) {
    this.setData({ password: e.detail.value });
  },

  async doLogin() {
    const { phone, password } = this.data;
    
    if (!phone || !password) {
      wx.showToast({ title: '请填写手机号和密码', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '登录中...' });

    try {
      const db = wx.cloud.database();
      const res = await db.collection('users').where({
        phone: phone,
        password: password
      }).get();

      wx.hideLoading();

      if (res.data.length > 0) {
        const user = res.data[0];
        wx.setStorageSync('userId', user._id);
        wx.setStorageSync('userInfo', user);
        
        wx.showToast({ title: '登录成功', icon: 'success' });
        
        // 跳转到 TabBar 首页
        wx.switchTab({
          url: '/pages/index/index'
        });
      } else {
        wx.showToast({ title: '账号或密码错误', icon: 'none' });
      }
    } catch (err) {
      wx.hideLoading();
      console.error('登录失败：', err);
      wx.showToast({ title: '网络错误，请重试', icon: 'none' });
    }
  },

  showRegister() {
    this.setData({ showRegisterModal: true });
  },
  onRegUsername(e) {
    this.setData({ regUsername: e.detail.value });
  },
  onRegPhone(e) {
    this.setData({ regPhone: e.detail.value });
  },
  onRegPwd(e) {
    this.setData({ regPwd: e.detail.value });
  },
  async doRegister() {
    const { regUsername, regPhone, regPwd } = this.data;

    if (!regUsername || !regPhone || !regPwd) {
      wx.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '注册中...' });

    try {
      const db = wx.cloud.database();

      const existRes = await db.collection('users').where({ phone: regPhone }).get();
      if (existRes.data.length > 0) {
        wx.hideLoading();
        wx.showToast({ title: '手机号已注册', icon: 'none' });
        return;
      }

      await db.collection('users').add({
        data: {
          username: regUsername,
          password: regPwd,
          phone: regPhone,
          createTime: new Date().toISOString().split('T')[0],
          role: '家长'
        }
      });

      wx.hideLoading();
      this.setData({ showRegisterModal: false });
      wx.showToast({ title: '注册成功，请登录', icon: 'success' });

      this.setData({
        phone: regPhone,
        password: regPwd
      });
    } catch (err) {
      wx.hideLoading();
      console.error('注册失败：', err);
      wx.showToast({ title: '注册失败', icon: 'none' });
    }
  },

  closeModal() {
    this.setData({ showRegisterModal: false });
  },
  stopPropagation() {}
});