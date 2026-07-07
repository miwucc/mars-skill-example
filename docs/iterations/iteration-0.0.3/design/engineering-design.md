---
schema_version: mars.engineering-design/v1
artifact_type: engineering-design
iteration: "iteration-0.0.3"
design_revision: "DESIGN-001"
baseline_revision: "REQ-BASE-001"
approved_by: "miwucc"
approved_at: "2026-07-07T13:48:47Z"
review_status: current
design_ids: [DES-001]
---
# 工程设计

## DES-001

需求: REQ-001

模块:

- StaticSearchPage: 保持单文件静态页面职责，负责搜索框、搜索按钮、欢迎文案和页面加载后的视觉动效。
- CatIntroAnimation: 搜索框上方的本地静态动画区块，负责展示小猫与水平往返动效，不持有业务状态。

接口:

- DOM Interface:
  - 在 `.search-panel` 前添加一个 `cat-stage` 容器。
  - `cat-stage` 内包含一个可装饰的小猫元素，例如 `.walking-cat`。
  - 现有 `searchButton` 点击事件和 `showWelcomeMessage()` 保持不变。
- CSS Interface:
  - `.cat-stage` 定义动画轨道、固定高度和响应式宽度。
  - `.walking-cat` 定义小猫视觉表现。
  - `@keyframes catWalk` 定义小猫在轨道内水平往返。

接缝:

- Presentation seam: 小猫视觉表现封装在 `.walking-cat`，后续可替换为 CSS 图形、emoji 或内联 SVG，而不改变业务交互。
- Animation seam: 运动轨迹封装在 `@keyframes catWalk`，可独立调整速度、距离和方向。
- Interaction seam: 搜索按钮点击仍是欢迎文案唯一触发入口；小猫动画不接入该交互。

数据:

- 不新增业务数据。
- 不读取、不存储、不提交用户输入。
- 不使用 localStorage、sessionStorage、cookie、账号状态或后端状态。

迁移:

- 无数据迁移。
- 仅修改静态 HTML/CSS 结构。

兼容性:

- 页面继续支持直接打开 `index.html` 或通过本地静态服务访问。
- 不依赖后端服务、外部接口、远程图片或包管理器。
- 移动端下动画轨道需保持在搜索框上方，不能挤压输入框与按钮到不可用状态。

失败处理:

- CSS 动画不可用时，静态小猫仍可显示在搜索框上方。
- 页面刷新后动画自然重新开始，不依赖持久化状态。
- 搜索按钮逻辑失败范围不因小猫动画扩大；两者 DOM 和 CSS class 独立。

测试策略:

- 运行 `git diff --check`。
- 人工打开或刷新页面，确认搜索框上方显示小猫动画。
- 确认小猫在搜索框上方水平来回走动。
- 确认刷新页面后动画再次展示。
- 检查源码不包含 localStorage、sessionStorage、cookie 或远程资源引用。
- 点击搜索按钮，确认仍展示 `welcome！good job！`。
- 在窄屏宽度下确认小猫动画不遮挡输入框和按钮。

ADR 引用: None.

## 变更记录

- DESIGN-001: 为 REQ-001 设计静态页面小猫加载动画，保持无外部依赖和无持久化状态。
