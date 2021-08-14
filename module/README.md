# Module 模組化

模組是黑箱，但不一定要讓所有人知道裡面的內容，只要告訴他怎麼用就好
但使用的人需要知道有哪些參數

### CJS vs ESM

| CJS (CommonJS)        | ESM (ES2015 module)                |
| --------------------- | ---------------------------------- |
| module.exports        | export                             |
| require               | import                             |
| Text                  | JS 內建的模組 (不是每個地方都支援) |
| 同步 (載入可能會阻塞) | 非同步動態載入 (效能可能好一點)    |

如果是要使用 exports，要很小心，不要為 exports 重新宣告一個物件
