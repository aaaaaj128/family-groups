App({
  onLaunch: function () {
    // 初始化云开发
    wx.cloud.init({
      env: 'cloud1-d9g6fun1a325ed541',
      traceUser: true
    });

    // 测试云开发连接（可选，确认后再删除）
    setTimeout(() => {
      const db = wx.cloud.database();
      db.collection('users').count().then(res => {
        console.log('✅ 云开发连接成功，用户数：', res.total);
      }).catch(err => {
        console.error('❌ 云开发连接失败：', err);
      });
    }, 2000);
  }
});
