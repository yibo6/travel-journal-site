DELETE FROM cities WHERE id IN ('anhui', 'jiangxi');

INSERT INTO cities
  (id, country_id, name, date, summary, map_label, map_x, map_y, visited, order_index)
VALUES
  ('shanghai', 'china', '上海', '待更新', '高楼、街角、夜色和很城市的光。', '上海', 78, 56, 1, 1),
  ('macau', 'china', '澳门', '待更新', '葡式街道、路牌、蛋挞和很适合散步的下午。', '澳门', 58, 78, 1, 2),
  ('hong-kong', 'china', '香港', '待更新', '高楼、海风、叮叮车和很密的城市光。', '香港', 64, 76, 1, 3),
  ('beijing', 'china', '北京', '待更新', '北方的风、胡同、红墙和很多可以慢慢补上的城市记忆。', '北京', 58, 28, 1, 4),
  ('jingdezhen', 'china', '景德镇', '待更新', '瓷器、老街、窑火和慢慢逛出来的城市质感。', '景德镇', 64, 64, 1, 5),
  ('yanbian', 'china', '延边朝鲜族自治州', '待更新', '边境城市、朝鲜族风味和很有地方感的街道。', '延边', 78, 28, 1, 6),
  ('harbin', 'china', '哈尔滨', '待更新', '', '哈尔滨', 72, 20, 1, 7),
  ('chengdu', 'china', '成都', '待更新', '火锅、茶馆、街边慢悠悠的生活感。', '成都', 43, 58, 1, 8),
  ('western-sichuan', 'china', '川西', '待更新', '雪山、草地、公路和一路变化的天气。', '川西', 35, 55, 1, 9),
  ('chongqing', 'china', '重庆', '待更新', '山城、江边、轻轨穿楼和热辣辣的夜色。', '重庆', 51, 62, 1, 10),
  ('qingdao', 'china', '青岛', '待更新', '海风、红瓦屋顶、坡路和很适合慢慢走的城市。', '青岛', 76, 43, 1, 11),
  ('changsha', 'china', '长沙', '待更新', '夜市、小吃、湘江和热闹的城市节奏。', '长沙', 60, 71, 1, 12),
  ('zhangjiajie', 'china', '张家界', '待更新', '山峰、云雾、玻璃栈道和很有电影感的风景。', '张家界', 54, 68, 1, 13),
  ('wuhan', 'china', '武汉', '待更新', '江边、桥、热干面和很有烟火气的城市。', '武汉', 56, 55, 1, 14),
  ('huangshan', 'china', '黄山', '待更新', '山、水、云海和很适合慢慢走的地方。', '黄山', 67, 57, 1, 15),
  ('hangzhou', 'china', '杭州', '待更新', '湖边、山色、树影和慢慢走的城市节奏。', '杭州', 76, 66, 1, 16)
ON CONFLICT(id) DO UPDATE SET
  country_id = excluded.country_id,
  name = excluded.name,
  map_label = excluded.map_label,
  map_x = excluded.map_x,
  map_y = excluded.map_y,
  visited = excluded.visited,
  order_index = excluded.order_index;
