# 朱颖的旅行笔记

这是一个可以直接放到 GitHub Pages 的纯静态旅行网站。

## 上传到 GitHub

把这个文件夹里的内容上传到仓库根目录：

```text
.nojekyll
index.html
styles.css
script.js
data/
assets/
```

GitHub Pages 设置：

```text
Settings -> Pages
Source: Deploy from a branch
Branch: main
Folder: /root
```

## 更新旅行内容

打开 `data/trips.js`，照着已有格式增加一段。

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
