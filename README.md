# Vue-logout-idle

## Dependencies
- Vue-router: 用來導向user頁面或將使用者導回首頁。在UserView元件內，使用router.replace()，而不是router.push()，是為了讓首頁在歷史中取代原本的User頁面，相當於History API中的history.replace()

- Vue-toast-notification: 在強制登出前，跳出一個toast，通知使用者，以改善使用者體驗。

## TODO
目前利用Vue 3 Composition API的composable來封裝和重複使用邏輯，有點像是React的custom hook。但有兩點仍須改善：
- 在需要強制登出的頁面都需要引入和呼叫這個hook。之後再看看能不能找到全局偵測閒置時間並登出的方法。
- 這個hook裡面其實可以不用回傳ref，因為登出的邏輯都已經寫在hook裡了，有點失去composable可以從hook裡面取出變數的用意。
