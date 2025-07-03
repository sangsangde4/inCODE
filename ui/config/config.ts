export default {

    // 基本配置
    antd: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'inCODE',
        // 隐藏所有页面的侧边栏
        hideMenu: true,
    },

    // fast refresh 热更新
    fastRefresh: true,

    // 路由
    routes: [
      { path: '/', component: 'index' },
      { path: '/admin/dashboard', component: 'admin/Dashboard' },
      { path: '/admin/login', component: 'admin/Login' },
      { path: '/display/about', component: 'display/about' },
      { path: '/display', component: 'display/index',layout: {hideMenu: true} },
    ],

    // 构建配置
    npmClient: 'npm', // or npm/yarn
};
