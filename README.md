# qiankun

乾坤微前端

## 根工程 vue-base

- vue create vue-base 使用脚手架生产项目
- yarn add qiankun 安装乾坤
- 修改 src/app.vue 加载 vue 和 react 的容器

  ```
    <template>
      <div id="app">
        <div id="nav">
          <el-menu mode="horizontal" :router="true">
            <el-menu-item index="/">Home</el-menu-item>
            <el-menu-item index="/vue">Vue</el-menu-item>
            <el-menu-item index="/react">react</el-menu-item>
          </el-menu>
        </div>
        <div>
          <router-view />
          <div id="vue"></div>
          <div id="react"></div>
        </div>
      </div>
    </template>
    <style>
    </style>
  ```

- 引入乾坤，改造成微应用

```

  import { registerMicroApps, start } from "qiankun";
  const apps = [
    {
      name: "vueApp",
      entry: "//localhost:10000",
      container: "#vue",
      activeRule: "/vue",
    },
    {
      name: "Reactapp",
      entry: "//localhost:20000",
      container: "#react",
      activeRule: "/react",
    },
  ];
  registerMicroApps(apps);
  start();

```

## vue 子项目 vue-child

- vue create vue-child 使用脚手架生产项目
- 进入 main.js 修改 改造成子微服务的 vue

```

let instance = null;
function render() {
instance = new Vue({
router,
render: (h) => h(App),
}).$mount("#root");
  }
  if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
  if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }
  export async function bootstrap(props) {
    console.log(props);
  }
  export async function mount(props) {
    render(props);
  }
  export async function unmount() {
    console.log(instance);
    instance.$destroy();
}

```

- 修改 vue.config.js 修该打包模式和数据请求，应用的启动端口

```
  module.exports = {
    devServer: {
      port: 10000,
      headers: {
      "Access-Control-Allow-Origin": "\*",
      },
    },
    configureWebpack: {
      output: {
        library: "vue-app",
        libraryTarget: "umd",
      },
    },
  };

```

## react 子应用 react-child

- npx create-react-app react-child 使用脚手架安装 react 应用
- 根目录配置.env

```
  PORT = 20000
  WDS_SOCKET_PORT = 20000
```

- 使用 react-app-rewired 覆盖 react 的 webpack 配置文件
- config-overrides.js 里面修改 react 的 webpack 的文件

```

module.exports = {
  webpack: (config) => {
    config.output.library = "reactApp";
    config.output.libraryTarget = "umd";
    config.output.publicPath = "http://localhost:20000/";
      return config;
    },
    devServer: (configFunction) => {
      return function (proxy, allowedHost) {
        const config = configFunction(proxy, allowedHost);
        config.headers = {
        "Access-Control-Allow-Origin": "\*",
      };
      return config;
    };
  },
};

```

## 先启动子应用，在启动副应用就可以看到，基础应用里面嵌套的子应用
