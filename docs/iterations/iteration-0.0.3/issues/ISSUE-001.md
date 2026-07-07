---
schema_version: mars.issue/v1
artifact_type: issue
id: ISSUE-001
iteration: "iteration-0.0.3"
status: ready-for-acceptance
review_status: current
baseline_revision: "REQ-BASE-001"
design_revision: "DESIGN-001"
external_tracker:
  provider: github
  issue_id: "external:github:3"
  locator: "https://github.com/miwucc/mars-skill-example/issues/3"
  revision: "I_kwDOTMJqWM8AAAABH9ehkQ:2026-07-07T13:55:29Z"
  operation_id: "mars:issue001:a17598ba3839ee218293f37b597ff68814e647418189a1a6c54f4a6a39f28c09"
traceability:
  - requirement_ref: REQ-001
    design_disposition: "design: DES-001"
    design_ref: DES-001
    adr_refs: []
acceptance_case_refs: [AC-001]
evidence_refs: [evidence:manual-acceptance:ISSUE-001:AC-001, evidence:static-check:ISSUE-001:git-diff-check]
---
# Issue ISSUE-001

## 当前行为

- 主页面加载后只显示搜索框和搜索按钮。
- 页面不会在搜索框上方展示小猫动画。
- 点击搜索按钮后会展示 `welcome！good job！` 动态文案。

## 期望行为

- 页面每次加载成功后，在搜索框上方自动展示一个动态小猫特效。
- 小猫在搜索框上方水平来回走动。
- 不引入 `localStorage`、后端状态、账号状态或其他持久化状态。
- 不依赖外部图片、远程资源、后端服务或包管理器。
- 原搜索按钮点击后展示 `welcome！good job！` 的行为保持可用。

## 追溯

- 需求：REQ-001
- 设计：DES-001
- 版本：REQ-BASE-001 / DESIGN-001

## 依赖

无。

## 验收标准

- AC-001: 打开页面后，可以看到搜索框和搜索按钮。
- AC-002: 页面每次加载成功后，搜索框上方展示一个小猫动态特效。
- AC-003: 小猫在搜索框上方来回走动。
- AC-004: 刷新页面后，小猫动画再次展示，不依赖任何“已看过”状态。
- AC-005: 源码不使用 `localStorage`、`sessionStorage`、cookie、账号状态或后端状态记录首次访问。
- AC-006: 小猫动画不遮挡搜索框输入、搜索按钮点击或 `welcome！good job！` 展示区域。
- AC-007: 点击搜索按钮后，页面仍展示原有动态大字 `welcome！good job！`。
- AC-008: 功能不需要后端服务、外部接口或远程资源。

## 测试接缝

- 人工打开或刷新 `index.html`。
- 视觉确认小猫动画在搜索框上方水平往返。
- 点击搜索按钮验证原欢迎文案仍展示。
- 检查源码没有持久化状态和远程资源引用。
- 运行 `git diff --check`。

## 不在范围内

- 真实搜索功能。
- 后端状态或服务端首次访问判断。
- 用户账号、访问历史、浏览器持久化记录。
- 只在某台设备首次访问时展示一次。
- 搜索结果列表或复杂路由。

## 验收用例

### AC-001

Steps:

1. 打开页面。
2. 确认搜索框和搜索按钮可见。
3. 确认搜索框上方显示小猫动画。
4. 观察小猫在搜索框上方水平来回走动。
5. 刷新页面，确认小猫动画再次展示。
6. 在搜索框输入任意文本并点击搜索按钮。
7. 确认 `welcome！good job！` 动态文案仍正常展示。
8. 检查页面没有依赖后端、远程资源或持久化首次访问状态。

Expected Result:

页面满足 REQ-001 的全部验收条件。

Evidence Ref:

evidence:manual-acceptance:ISSUE-001:AC-001

## 实现记录

Revision: `fe97427` (branch `issue/ISSUE-001-iteration-0.0.3`)

### TDD 循环

**Behavior 1: 小猫动画在搜索框上方水平来回走动 (AC-002, AC-003)**

- RED: `node scripts/verify-issue-001-iter-003.mjs` → exit 1, AC-002 (cat element missing), AC-003 (horizontal animation missing)
- GREEN: 添加 `.cat-container` + `.cat` span (🐱 emoji) 在搜索框上方; CSS `@keyframes catWalk` 使用 `translateX` 水平动画 + `scaleX` 翻转; 所有 8 个 AC 通过
- REFACTOR: 移除冗余的 `alternate` 关键字（关键帧已处理完整往返）; 将 `left` 属性替换为 `transform: translateX()` + `container-type: inline-size` + `100cqi` 容器查询单位，避免布局抖动

### 验证

- `scripts/verify-issue-001-iter-003.mjs`: PASS (8/8 AC)
- `scripts/verify-issue-001.mjs`: PASS (回归, iteration-0.0.1 行为不变)
- `git diff --check`: PASS (无空白问题)

### Standards Review (revision `fe97427`)

无阻塞项。猫动画专用 `transform: translateX()` + `scaleX()`（仅合成器属性），遵循现有 `buoyantScale` 模式。`container-type: inline-size` + `100cqi` 实现响应式水平移动。`will-change: transform` 提示浏览器优化。无 ID 选择器用于样式，HTML 有效，可访问性正确（猫元素使用 `aria-hidden="true"`）。

### Spec Review (revision `fe97427`)

无阻塞项。全部 8 个验收标准（AC-001 至 AC-008）满足。REQ-001 全部行为规则、例外情况和非功能要求满足。无范围蔓延，无错误实现。

### 已知限制

- 猫水平移动距离使用容器查询单位 `cqi`（[支持情况](https://caniuse.com/css-container-queries): Chrome 105+, Safari 16+, Firefox 110+）
- 在容器宽度小于约 88px 时动画两端折返效果减弱（正常桌面/移动端宽度下不受影响）

## 验收记录

状态: pending
验收人: 待验收阶段补充。
验收时间: 待验收阶段补充。
验收 Revision: 待验收阶段补充。
证据: 待验收阶段补充。
