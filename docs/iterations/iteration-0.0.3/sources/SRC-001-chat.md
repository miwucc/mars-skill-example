---
schema_version: mars.source/v2
artifact_type: source
id: "SRC-001"
iteration: "iteration-0.0.3"
origin: "chat"
authorship: ai-summarized-user-confirmed
origin_refs: ["current-conversation"]
revision: "chat:2026-07-07T12:31:15Z"
captured_at: "2026-07-07T12:31:15Z"
supersedes: []
---
# 来源 SRC-001

## 精炼摘要

以下内容由 AI 根据澄清净结果整理，并经用户确认；不是逐字聊天记录。

用户希望在主页面增加一个加载后的视觉动效：每次页面加载成功后，在搜索框上方展示一个动态小猫特效，小猫在搜索框上方来回走动。该效果不需要记录用户是否看过，也不引入 localStorage、账号状态、后端状态或其他隐性持久化状态。现有页面是静态单文件页面，因此该需求应通过前端静态结构与 CSS/少量本地 JavaScript 实现，并保持页面无需后端或外部网络资源。

## 来源定位

- 当前对话中用户提出：“我希望在主页面上增加一个动画，第一次打开界面的时候，就展示一个动态特效，一个小猫，在搜索框上方来回走动”
- 用户澄清：“每次页面加载成功后展示，不用引入隐性状态”
- 用户确认摘要准确：“准确”
