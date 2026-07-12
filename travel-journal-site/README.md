# Ying's Little Atlas / 小颖漫游中

这是一个可以直接放到 GitHub Pages 的纯静态旅行网站。

## 上传到 GitHub

把这个文件夹里的内容上传到仓库根目录：

```text
.nojekyll
index.html
trip.html
styles.css
script.js
data/
assets/
```

不要上传 `.DS_Store`。

GitHub Pages 设置：

```text
Settings -> Pages
Source: Deploy from a branch
Branch: main
Folder: /root
```

## 更新旅行内容

打开 `data/trips.js`，照着已有格式增加一段。每一段就是一个国家或城市板块，里面同时包含：

- 地点和日期
- 封面图
- 简短介绍
- 标签
- 路线图位置和景点插画
- 旅行心得
- 照片列表

网站里的旅行路线图、独立详情页、照片放大都会自动读取这里的数据。

每条旅行在路线图上的位置用 `route` 控制：

```js
route: { x: 52, y: 38, landmark: "eiffel" }
```

`x` 是从左到右的位置百分比，`y` 是从上到下的位置百分比。比如：

- `x: 10, y: 20` 靠左上
- `x: 50, y: 50` 在中间
- `x: 80, y: 70` 靠右下

`landmark` 控制旁边的小景点插画，目前有：

- `chinaMountain`
- `tower`
- `burj`
- `eiffel`
- `sun`
- `dome`
- `mountain`

这个路线图不需要联网，也不依赖外部地图服务。点击路线上的景点，会跳转到 `trip.html?id=...` 独立详情页。

## 更换照片

把照片放进：

```text
assets/photos/
```

然后在 `data/trips.js` 里把图片路径改成：

```js
cover: "./assets/photos/your-photo.jpg"
```

照片文件名建议只用英文、数字和连字符，例如：

```text
paris-day-1.jpg
tokyo-cafe.png
```
