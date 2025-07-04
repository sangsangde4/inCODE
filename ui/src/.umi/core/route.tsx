// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","parentId":"@@/global-layout","id":"1"},"2":{"path":"/admin/dashboard","parentId":"@@/global-layout","id":"2"},"3":{"path":"/admin/login","parentId":"@@/global-layout","id":"3"},"4":{"path":"/display/about","parentId":"@@/global-layout","id":"4"},"5":{"path":"/display","layout":{"hideMenu":true},"parentId":"@@/global-layout","id":"5"},"@@/global-layout":{"id":"@@/global-layout","path":"/","parentId":"ant-design-pro-layout","isLayout":true},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import(/* webpackChunkName: "p__index" */'@/pages/index.tsx')),
'2': React.lazy(() => import(/* webpackChunkName: "p__admin__Dashboard" */'@/pages/admin/Dashboard.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__admin__Login" */'@/pages/admin/Login.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "p__display__about" */'@/pages/display/about.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__display__index" */'@/pages/display/index.tsx')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'/Users/wulh/WebstormProjects/inCODE/ui/src/layouts/index.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'/Users/wulh/WebstormProjects/inCODE/ui/src/.umi/plugin-layout/Layout.tsx')),
},
  };
}
