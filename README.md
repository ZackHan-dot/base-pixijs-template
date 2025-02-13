# Pixi-Web Template Project

欢迎来到 **Pixi-Web** 模板项目！这是一个基于 Monorepo 架构的全栈项目，旨在快速搭建包含前端和后端的 Web 应用程序。项目结合了现代前端框架和强大的后端工具，适用于需要实时交互（如游戏、数据可视化等）的应用场景。

---

## 目录

1. [项目概述](#项目概述)
2. [项目结构](#项目结构)
3. [技术栈](#技术栈)
4. [安装与运行](#安装与运行)
5. [开发指南](#开发指南)
6. [贡献](#贡献)
7. [许可证](#许可证)

---

### 项目概述

本项目是一个完整的前后端模板，适合用于构建基于 **Pixi.js** 的实时互动应用。通过使用现代化的工具链和技术栈，开发者可以快速启动项目并专注于核心功能的实现。

-   **Monorepo 架构**：采用单存储库多包的形式，便于管理前后端代码。
-   **实时通信**：通过 **Socket.IO** 实现高效的客户端与服务器之间的实时通信。
-   **模块化设计**：清晰划分 `client` 和 `server` 部分，方便独立开发和维护。

---

### 项目结构

```
pixi-web/
├── README.md
├── package.json
├── packages
│   ├── client
│   │   ├── components.json
│   │   ├── eslint.config.mjs
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── public
│   │   ├── raw-assets
│   │   ├── scripts
│   │   │   ├── assetpack-vite-plugin.ts
│   │   │   └── proxy.sh
│   │   ├── src
│   │   │   ├── api
│   │   │   ├── app.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── game
│   │   │   │   ├── app
│   │   │   │   │   ├── getEngine.ts
│   │   │   │   │   ├── popups
│   │   │   │   │   │   ├── PausePopup.ts
│   │   │   │   │   │   └── SettingsPopup.ts
│   │   │   │   │   ├── screens
│   │   │   │   │   │   ├── LoadScreen.ts
│   │   │   │   │   │   ├── RoomScreen.ts
│   │   │   │   │   │   └── main
│   │   │   │   │   │       └── MainScreen.ts
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── Button.ts
│   │   │   │   │   │   ├── Label.ts
│   │   │   │   │   │   ├── RoundedBox.ts
│   │   │   │   │   │   └── VolumeSlider.ts
│   │   │   │   │   └── utils
│   │   │   │   │       └── userSettings.ts
│   │   │   │   ├── engine
│   │   │   │   │   ├── audio
│   │   │   │   │   │   ├── AudioPlugin.ts
│   │   │   │   │   │   └── audio.ts
│   │   │   │   │   ├── engine.ts
│   │   │   │   │   ├── navigation
│   │   │   │   │   │   ├── NavigationPlugin.ts
│   │   │   │   │   │   └── navigation.ts
│   │   │   │   │   ├── resize
│   │   │   │   │   │   ├── ResizePlugin.ts
│   │   │   │   │   │   └── resize.ts
│   │   │   │   │   └── utils
│   │   │   │   │       ├── getResolution.ts
│   │   │   │   │       ├── maths.ts
│   │   │   │   │       ├── random.ts
│   │   │   │   │       ├── storage.ts
│   │   │   │   │       └── waitFor.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── manifest.json
│   │   │   ├── hooks
│   │   │   │   ├── use-mobile.tsx
│   │   │   │   └── use-toast.ts
│   │   │   ├── layout
│   │   │   │   └── index.tsx
│   │   │   ├── lib
│   │   │   │   ├── http.ts
│   │   │   │   └── utils.ts
│   │   │   ├── main.tsx
│   │   │   ├── pixi-mixins.d.ts
│   │   │   ├── routes
│   │   │   │   └── index.tsx
│   │   │   ├── views
│   │   │   │   ├── community
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── gamehall
│   │   │   │   │   ├── detail
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── uno.tsx
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── home
│   │   │   │   │   └── index.tsx
│   │   │   │   └── login.tsx
│   │   │   └── vite-env.d.ts
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── server
│       ├── package.json
│       ├── src
│       │   ├── config
│       │   │   ├── index.ts
│       │   │   └── passport-config.ts
│       │   ├── connection
│       │   │   ├── index.ts
│       │   │   └── redis.ts
│       │   ├── controllers
│       │   │   ├── app-controller.ts
│       │   │   ├── auth-controller.ts
│       │   │   └── user-controller.ts
│       │   ├── helpers
│       │   │   └── auth.ts
│       │   ├── index.ts
│       │   ├── interceptors
│       │   ├── middlewares
│       │   ├── models
│       │   │   └── user-entity.ts
│       │   ├── routes
│       │   │   └── index.ts
│       │   ├── services
│       │   │   └── user-service.ts
│       │   ├── socket
│       │   │   └── index.ts
│       │   └── utils
│       │       ├── index.ts
│       │       └── mail.ts
│       └── tsconfig.json
└── yarn.lock
```

---

### 技术栈

#### 客户端 (`client`)

-   **框架**：React + TypeScript
-   **构建工具**：Vite
-   **图形渲染**：Pixi.js
-   **UI 组件库**：shadcn/ui
-   **实时通信**：Socket.IO
-   **状态管理**：Context API 或 Redux（可选）
-   **样式**：Tailwind CSS（通过 shadcn/ui）

#### 服务器 (`server`)

-   **框架**：Koa
-   **依赖注入**：Typedi
-   **ORM**：TypeORM
-   **认证与授权**：Passport.js
-   **实时通信**：Socket.IO
-   **配置管理**：ct/cv（Configuration Toolkit）
-   **语言**：TypeScript

---

### 安装与运行

#### 前提条件

确保已安装以下工具：

-   Node.js (>=16.0.0)
-   npm 或 yarn

#### 安装依赖

在项目根目录下运行以下命令以安装所有依赖：

```bash
npm install
# 或者
yarn install
```

#### 运行项目

1. **启动客户端**
   在 `client` 目录下运行：

    ```bash
    cd client
    npm run dev
    ```

    默认访问地址：`http://localhost:5173`

2. **启动服务器**
   在 `server` 目录下运行：
    ```bash
    cd server
    npm run start
    ```
    默认访问地址：`http://localhost:3000`

#### 环境变量

在 `server` 目录下创建 `.env` 文件，并根据需要配置数据库连接、JWT 密钥等参数。例如：

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_NAME=mydb
PORT=3000
SECRET_KEY=mysecretkey
```

---

### 开发指南

#### 客户端开发

-   使用 Vite 提供的热更新功能快速迭代前端代码。
-   利用 Pixi.js 实现复杂的图形渲染和动画效果。
-   使用 shadcn/ui 快速构建美观且一致的用户界面。

#### 服务器开发

-   使用 Koa 和 Typedi 实现模块化的路由和服务逻辑。
-   使用 TypeORM 管理数据库模型和迁移。
-   使用 Passport.js 实现用户认证和授权。
-   使用 Socket.IO 实现实时通信功能。

---

### 贡献

欢迎任何开发者为本项目贡献代码或提出改进建议！请遵循以下步骤：

1. Fork 本仓库。
2. 创建一个新的分支：`git checkout -b feature/your-feature-name`。
3. 提交更改：`git commit -m "Add some feature"`。
4. 推送更改：`git push origin feature/your-feature-name`。
5. 提交 Pull Request。

### 许可证

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
