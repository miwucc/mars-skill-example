---
schema_version: mars.release-notes/v1
artifact_type: release-notes
iteration: "iteration-0.0.3"
revision: 7eb1902
requirement_refs: ["REQ-001"]
known_limitations: []
---
# Release Notes

## Delivered

### REQ-001: 搜索框上方小猫加载动画

- 页面每次加载时，搜索框上方展示内联 SVG 小猫动画
- 小猫水平来回走动，走到边缘时自动转身
- 四组 CSS 动画叠加：腿部摆动、身体起伏、尾巴甩动、眨眼
- 纯 CSS/HTML 实现，零外部依赖
- 不影响原有搜索框、按钮和欢迎文案功能

## Compatibility and Migration

- 单文件 `index.html`，直接在浏览器中打开即可
- 不引入新依赖，无破坏性变更
- 新增 `scripts/verify-issue-001-iter-003.mjs` 用于自动化验收检查

## Known Limitations
[]
