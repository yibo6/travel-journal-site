# Ying's Little Atlas / 小颖漫游中

这是一个旅行记录网站。它可以先当静态网站用，也可以接 Cloudflare 免费档的 D1 + R2，变成可以登录后台更新的动态网站。

## 现在包含什么

- 首页旅行路线：`中国 -> 迪拜 -> 英国 -> 法国 -> 西班牙 -> 意大利 -> 冰岛`
- 国家/城市详情页
- 中国旅游足迹地图
- 照片分类：`我拍的 / 我本人 / 我吃的`
- 后台页面：`/admin.html`
- 首页小纸条留言板
- Cloudflare Pages Functions API：`/api/...`
- D1 初始化脚本：`cloudflare-d1-schema.sql`

如果 Cloudflare D1/R2 还没配置，网站会继续读取 `data/trips.js`，所以不会白屏。

## 上传到 GitHub

把这个文件夹里的内容上传到仓库根目录，不要把外层文件夹套进去。

需要包含：

```text
index.html
trip.html
admin.html
styles.css
admin.css
script.js
admin.js
data/
assets/
functions/
cloudflare-d1-schema.sql
message-board-migration.sql
china-city-order-migration.sql
wrangler.toml.example
.nojekyll
```

不要上传 `.DS_Store`。

## Cloudflare 免费动态版设置

在 Cloudflare 里继续使用你的 Pages 项目。

### 1. 创建 D1 数据库

Cloudflare 左侧找到：

```text
Storage & Databases -> D1 SQL Database
```

新建一个数据库，比如：

```text
travel-journal-db
```

进入这个数据库的 Console，把 `cloudflare-d1-schema.sql` 里面的内容全部复制进去运行。

如果你之前已经运行过旧版 schema，只需要额外运行：

```text
message-board-migration.sql
```

### 2. 创建 R2 存照片

Cloudflare 左侧找到：

```text
R2 Object Storage
```

新建一个 bucket，比如：

```text
travel-journal-photos
```

### 3. 给 Pages 项目绑定 D1/R2

进入你的 Pages 项目：

```text
Workers & Pages -> travel-journal-site -> Settings -> Bindings
```

添加 D1 binding：

```text
Variable name: DB
D1 database: travel-journal-db
```

添加 R2 binding：

```text
Variable name: PHOTOS
R2 bucket: travel-journal-photos
```

### 4. 设置后台密码

还是在 Pages 项目 Settings 里，找到 Environment variables，添加：

```text
ADMIN_PASSWORD = 你自己设置的后台密码
```

保存后重新部署一次。

## 以后怎么更新内容

部署成功后打开：

```text
https://travel-journal-site.pages.dev/admin.html
```

你可以在后台做这些事：

- 新增城市
- 设置城市在中国足迹地图上的 x/y 位置
- 添加旅游日记
- 上传照片
- 选择照片分类：`我拍的 / 我本人 / 我吃的`

前台会自动读取数据库，不需要再手改 `data/trips.js`。

## 如果还没配置 Cloudflare

也可以继续手动改 `data/trips.js`。这份本地数据是备用数据，用来保证 D1 还没连上时网站也能显示。

照片文件名建议只用英文、数字和连字符，例如：

```text
chengdu-street-01.jpg
paris-dessert.png
```

## 本地说明

直接双击 `index.html` 可以看静态备用数据。

Cloudflare API 和后台上传照片需要部署到 Cloudflare Pages 后才会真正工作。
