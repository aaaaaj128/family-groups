// pages/index/index.js
Page({
  data: {
    isLogin: false,
    phone: '',
    password: '',
    userId: '',
    currentUser: {},
    familyGroupName: '',
    familyMembers: [],
    medicalCount: 0,
    showRegisterModal: false,
    regUsername: '',
    regPhone: '',
    regPwd: '',
    greetingText: ''
  },

  onLoad() {
    const userId = wx.getStorageSync('userId');
    if (userId) {
      this.setData({ userId: userId });
      this.loginByCache(userId);
    }
  },

  onShow() {
    if (this.data.isLogin && this.data.userId) {
      this.refreshUserInfo();
      this.loadFamilyData();
      this.setGreeting();
    }
  },

  // 设置问候语
  setGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 6) {
      greeting = '凌晨好';
    } else if (hour < 12) {
      greeting = '上午好';
    } else if (hour < 14) {
      greeting = '中午好';
    } else if (hour < 18) {
      greeting = '下午好';
    } else {
      greeting = '晚上好';
    }
    this.setData({ greetingText: greeting });
  },

  async refreshUserInfo() {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('users').doc(this.data.userId).get();
      const user = res.data;
      this.setData({
        currentUser: user
      });
    } catch (err) {
      console.error('刷新用户信息失败：', err);
    }
  },

  async loginByCache(userId) {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('users').doc(userId).get();
      if (res.data) {
        this.setData({
          currentUser: res.data,
          isLogin: true
        });
        this.setGreeting();
        await this.loadFamilyData();
      }
    } catch (err) {
      console.error('缓存登录失败', err);
      wx.removeStorageSync('userId');
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
        this.setData({ 
          userId: user._id,
          currentUser: user,
          isLogin: true 
        });
        wx.setStorageSync('userId', user._id);
        this.setGreeting();
        await this.loadFamilyData();
        wx.showToast({ title: '登录成功', icon: 'success' });
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

  async loadFamilyData() {
    const { currentUser } = this.data;

    if (!currentUser.familyId) {
      this.setData({
        familyMembers: [{
          _id: currentUser._id,
          username: currentUser.username,
          role: currentUser.role || '本人',
          phone: currentUser.phone
        }],
        familyGroupName: '未加入家庭'
      });
      await this.loadMedicalCount();
      return;
    }

    wx.showLoading({ title: '加载家庭信息...' });

    try {
      const db = wx.cloud.database();
      const _ = db.command;

      const familyRes = await db.collection('family_groups')
        .doc(currentUser.familyId)
        .get();

      const familyGroup = familyRes.data;
      const memberIds = familyGroup.members || [];

      if (memberIds.length > 0) {
        const membersRes = await db.collection('users')
          .where({ _id: _.in(memberIds) })
          .get();

        let members = membersRes.data;
        members.sort((a, b) => {
          if (a._id === currentUser._id) return -1;
          if (b._id === currentUser._id) return 1;
          return 0;
        });

        this.setData({
          familyMembers: members,
          familyGroupName: familyGroup.groupName
        });
      } else {
        this.setData({
          familyMembers: [currentUser],
          familyGroupName: familyGroup.groupName
        });
      }

      await this.loadMedicalCount();
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载家庭数据失败：', err);
      this.setData({
        familyMembers: [{
          _id: currentUser._id,
          username: currentUser.username,
          role: currentUser.role || '本人'
        }],
        familyGroupName: '加载失败'
      });
      await this.loadMedicalCount();
    }
  },

  async loadMedicalCount() {
    const { familyMembers } = this.data;
    const db = wx.cloud.database();
    let totalCount = 0;
    
    for (let member of familyMembers) {
      const res = await db.collection('medical_records')
        .where({ userId: member._id })
        .count();
      totalCount += res.total;
    }
    
    this.setData({ medicalCount: totalCount });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  goToFamily() {
    wx.navigateTo({
      url: '/pages/family/family'
    });
  },

  goToRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  },

  closeModal() {
    this.setData({ showRegisterModal: false });
  },

  stopPropagation() {}
});