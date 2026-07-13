CREATE TABLE IF NOT EXISTS countries (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  place TEXT NOT NULL,
  date TEXT DEFAULT '',
  route_x REAL,
  route_y REAL,
  landmark TEXT,
  cover_url TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  tags TEXT DEFAULT '[]',
  map_title TEXT,
  map_note TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  country_id TEXT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date TEXT DEFAULT '待更新',
  summary TEXT DEFAULT '',
  map_label TEXT,
  map_x REAL DEFAULT 50,
  map_y REAL DEFAULT 50,
  visited INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS diary_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_id TEXT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  date TEXT DEFAULT '待更新',
  memory TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_id TEXT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'scenery',
  src TEXT DEFAULT '',
  r2_key TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO countries
  (id, title, place, date, route_x, route_y, landmark, cover_url, summary, tags, map_title, map_note, order_index)
VALUES
  ('china', '中国', 'China', 'Start', 13, 59, 'chinaMountain', './assets/photos/china-gate.svg', '从熟悉的地方开始，也把不同城市里的日常、风景和小记忆慢慢放进来。', '["城市","日常","山河"]', '中国旅游足迹', '地图上亮起来的地方，点开就能抵达。', 1),
  ('dubai', '迪拜', 'Dubai', 'Stop 01', 25, 34, 'burj', './assets/photos/dubai-tower.svg', '从亚洲到中东，城市突然变得明亮、热烈，高楼、沙漠和海风都很有记忆点。', '["城市天际线","沙漠","夜景"]', NULL, NULL, 2),
  ('united-kingdom', '英国', 'United Kingdom', 'Stop 02', 38, 51, 'tower', './assets/photos/london-walk.svg', '阴天、红色巴士、街角咖啡和博物馆，是进入欧洲后的第一段日常感。', '["城市散步","博物馆","咖啡"]', NULL, NULL, 3),
  ('france', '法国', 'France', 'Stop 03', 50, 35, 'eiffel', './assets/photos/france-eiffel.svg', '街边咖啡、博物馆、河岸和慢慢走的下午，是进入欧洲后的第一段记忆。', '["博物馆","咖啡","城市漫步"]', NULL, NULL, 4),
  ('spain', '西班牙', 'Spain', 'Stop 04', 62, 56, 'sun', './assets/photos/spain-sun.svg', '阳光、广场、橙色屋顶和很晚才开始热闹起来的街道。', '["阳光","广场","慢节奏"]', NULL, NULL, 5),
  ('italy', '意大利', 'Italy', 'Stop 05', 74, 36, 'dome', './assets/photos/italy-dome.svg', '教堂、石板路、冰淇淋和突然出现在转角的漂亮建筑。', '["建筑","美食","古城"]', NULL, NULL, 6),
  ('iceland', '冰岛', 'Iceland', 'Stop 06', 86, 50, 'mountain', './assets/photos/iceland-mountain.svg', '风、瀑布、黑沙滩和很辽阔的自然景观，像路线最后突然安静下来。', '["自然","瀑布","公路旅行"]', NULL, NULL, 7)
ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  place = excluded.place,
  date = excluded.date,
  route_x = excluded.route_x,
  route_y = excluded.route_y,
  landmark = excluded.landmark,
  cover_url = excluded.cover_url,
  summary = excluded.summary,
  tags = excluded.tags,
  map_title = excluded.map_title,
  map_note = excluded.map_note,
  order_index = excluded.order_index;

INSERT INTO cities
  (id, country_id, name, date, summary, map_label, map_x, map_y, visited, order_index)
VALUES
  ('harbin', 'china', '哈尔滨', '待更新', '冰雪、中央大街和带着东北气息的城市记忆。', '哈尔滨', 72, 20, 1, 1),
  ('yanbian', 'china', '延边朝鲜族自治州', '待更新', '边境城市、朝鲜族风味和很有地方感的街道。', '延边', 78, 28, 1, 2),
  ('beijing', 'china', '北京', '待更新', '北方的风、胡同、红墙和很多可以慢慢补上的城市记忆。', '北京', 58, 28, 1, 3),
  ('qingdao', 'china', '青岛', '待更新', '海风、红瓦屋顶、坡路和很适合慢慢走的城市。', '青岛', 76, 43, 1, 4),
  ('shanghai', 'china', '上海', '待更新', '高楼、街角、夜色和很城市的光。', '上海', 78, 56, 1, 5),
  ('hangzhou', 'china', '杭州', '待更新', '湖边、山色、树影和慢慢走的城市节奏。', '杭州', 74, 61, 1, 6),
  ('anhui', 'china', '安徽', '待更新', '山水、古村和很适合慢慢走的地方。', '安徽', 65, 57, 1, 7),
  ('wuhan', 'china', '武汉', '待更新', '江边、桥、热干面和很有烟火气的城市。', '武汉', 55, 60, 1, 8),
  ('western-sichuan', 'china', '川西', '待更新', '雪山、草地、公路和一路变化的天气。', '川西', 35, 55, 1, 9),
  ('chengdu', 'china', '成都', '待更新', '火锅、茶馆、街边慢悠悠的生活感。', '成都', 43, 58, 1, 10),
  ('jiangxi', 'china', '江西', '待更新', '山、水、老街和很多更安静的路上片段。', '江西', 62, 62, 1, 11),
  ('changsha', 'china', '长沙', '待更新', '夜市、小吃、湘江和热闹的城市节奏。', '长沙', 58, 66, 1, 12),
  ('hong-kong', 'china', '香港', '待更新', '高楼、海风、叮叮车和很密的城市光。', '香港', 64, 76, 1, 13),
  ('macau', 'china', '澳门', '待更新', '葡式街道、路牌、蛋挞和很适合散步的下午。', '澳门', 58, 78, 1, 14)
ON CONFLICT(id) DO UPDATE SET
  country_id = excluded.country_id,
  name = excluded.name,
  date = excluded.date,
  summary = excluded.summary,
  map_label = excluded.map_label,
  map_x = excluded.map_x,
  map_y = excluded.map_y,
  visited = excluded.visited,
  order_index = excluded.order_index;

INSERT INTO diary_entries (country_id, city_id, date, memory, order_index)
SELECT 'dubai', NULL, 'Stop 01', '高楼、日光和很热的空气，一下子把旅行切换到了另一个频道。', 1
WHERE NOT EXISTS (SELECT 1 FROM diary_entries WHERE country_id = 'dubai');

INSERT INTO diary_entries (country_id, city_id, date, memory, order_index)
SELECT 'united-kingdom', NULL, 'Stop 02', '阴天、街角咖啡和慢慢走的路，是很英国的日常感。', 1
WHERE NOT EXISTS (SELECT 1 FROM diary_entries WHERE country_id = 'united-kingdom');

INSERT INTO diary_entries (country_id, city_id, date, memory, order_index)
SELECT 'france', NULL, 'Stop 03', '街边咖啡、博物馆和河岸，适合慢慢走，不太适合赶路。', 1
WHERE NOT EXISTS (SELECT 1 FROM diary_entries WHERE country_id = 'france');

INSERT INTO diary_entries (country_id, city_id, date, memory, order_index)
SELECT 'spain', NULL, 'Stop 04', '阳光很亮，节奏很慢，午后好像天然适合发呆。', 1
WHERE NOT EXISTS (SELECT 1 FROM diary_entries WHERE country_id = 'spain');

INSERT INTO diary_entries (country_id, city_id, date, memory, order_index)
SELECT 'italy', NULL, 'Stop 05', '教堂、石板路和转角突然出现的漂亮建筑，很适合边走边抬头。', 1
WHERE NOT EXISTS (SELECT 1 FROM diary_entries WHERE country_id = 'italy');

INSERT INTO diary_entries (country_id, city_id, date, memory, order_index)
SELECT 'iceland', NULL, 'Stop 06', '风、瀑布、黑沙滩和很辽阔的自然景观，像路线最后突然安静下来。', 1
WHERE NOT EXISTS (SELECT 1 FROM diary_entries WHERE country_id = 'iceland');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'china', NULL, 'scenery', './assets/photos/china-gate.svg', '中国的第一格', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'china');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'dubai', NULL, 'scenery', './assets/photos/dubai-tower.svg', '迪拜的高楼和日光', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'dubai');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'united-kingdom', NULL, 'scenery', './assets/photos/london-walk.svg', '伦敦街角', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'united-kingdom');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'france', NULL, 'scenery', './assets/photos/france-eiffel.svg', '巴黎和铁塔', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'france');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'spain', NULL, 'scenery', './assets/photos/spain-sun.svg', '阳光下的广场', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'spain');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'italy', NULL, 'scenery', './assets/photos/italy-dome.svg', '圆顶和街巷', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'italy');

INSERT INTO photos (country_id, city_id, category, src, caption, order_index)
SELECT 'iceland', NULL, 'scenery', './assets/photos/iceland-mountain.svg', '冰岛的山和风', 1
WHERE NOT EXISTS (SELECT 1 FROM photos WHERE country_id = 'iceland');
