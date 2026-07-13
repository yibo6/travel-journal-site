window.TRIPS = [
  {
    title: "中国",
    place: "China",
    date: "Start",
    route: { x: 13, y: 59, landmark: "chinaMountain" },
    cover: "./assets/photos/china-gate.svg",
    summary: "从熟悉的地方开始，也把不同城市里的日常、风景和小记忆慢慢放进来。",
    tags: ["城市", "日常", "山河"],
    notes: [
      "这里可以慢慢放不同城市的记录，比如北京、上海、广州、杭州，或者某一次短途旅行。",
      "每个城市都可以写日期、简单记忆，再配上照片。"
    ],
    diary: [
      { date: "中国", memory: "这里先作为中国城市记录的入口，之后可以一点点加上去过的城市。" },
      { date: "待更新", memory: "北京、上海、杭州、广州，或者任何一座留下过记忆的城市，都可以放在这里。" }
    ],
    footprintMap: {
      title: "中国旅游足迹",
      note: "地图上亮起来的地方，点开就能抵达。",
      places: [
        { name: "哈尔滨", id: "harbin", x: 72, y: 20, visited: true },
        { name: "延边", id: "yanbian", x: 78, y: 28, visited: true },
        { name: "北京", id: "beijing", x: 58, y: 28, visited: true },
        { name: "青岛", id: "qingdao", x: 76, y: 43, visited: true },
        { name: "上海", id: "shanghai", x: 78, y: 56, visited: true },
        { name: "杭州", id: "hangzhou", x: 74, y: 61, visited: true },
        { name: "安徽", id: "anhui", x: 65, y: 57, visited: true },
        { name: "武汉", id: "wuhan", x: 55, y: 60, visited: true },
        { name: "川西", id: "western-sichuan", x: 35, y: 55, visited: true },
        { name: "成都", id: "chengdu", x: 43, y: 58, visited: true },
        { name: "江西", id: "jiangxi", x: 62, y: 62, visited: true },
        { name: "长沙", id: "changsha", x: 58, y: 66, visited: true },
        { name: "香港", id: "hong-kong", x: 64, y: 76, visited: true },
        { name: "澳门", id: "macau", x: 58, y: 78, visited: true }
      ]
    },
    cities: [
      {
        id: "harbin",
        name: "哈尔滨",
        date: "待更新",
        summary: "冰雪、中央大街和带着东北气息的城市记忆。",
        diary: [
          { date: "待更新", memory: "这里可以写哈尔滨那一站最想留下来的一个瞬间。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "yanbian",
        name: "延边朝鲜族自治州",
        date: "待更新",
        summary: "边境城市、朝鲜族风味和很有地方感的街道。",
        diary: [
          { date: "待更新", memory: "这里可以写延边的食物、街道，或者某一段很特别的路上记忆。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "qingdao",
        name: "青岛",
        date: "待更新",
        summary: "海风、红瓦屋顶、坡路和很适合慢慢走的城市。",
        diary: [
          { date: "待更新", memory: "这里可以写青岛的海边、街道，或者一张最喜欢的风景照。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "shanghai",
        name: "上海",
        date: "待更新",
        summary: "高楼、街角、夜色和很城市的光。",
        diary: [
          { date: "待更新", memory: "这里可以写上海的某个街角、夜景，或者一次很适合散步的下午。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "hangzhou",
        name: "杭州",
        date: "待更新",
        summary: "湖边、山色、树影和慢慢走的城市节奏。",
        diary: [
          { date: "待更新", memory: "这里可以写杭州的湖边、山里，或者某个突然安静下来的瞬间。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "anhui",
        name: "安徽",
        date: "待更新",
        summary: "山水、古村和很适合慢慢走的地方。",
        diary: [
          { date: "待更新", memory: "这里可以写安徽的山、水、古村，或者某段安静的路上记忆。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "wuhan",
        name: "武汉",
        date: "待更新",
        summary: "江边、桥、热干面和很有烟火气的城市。",
        diary: [
          { date: "待更新", memory: "这里可以写武汉的江边、街道，或者吃到热干面的那一天。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "western-sichuan",
        name: "川西",
        date: "待更新",
        summary: "雪山、草地、公路和一路变化的天气。",
        diary: [
          { date: "待更新", memory: "这里可以写川西路上的风景、海拔、天气，或者某个停下来的瞬间。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "chengdu",
        name: "成都",
        date: "待更新",
        summary: "火锅、茶馆、街边慢悠悠的生活感。",
        diary: [
          { date: "待更新", memory: "这里可以写成都那一站吃到的、看到的，或者很松弛的一天。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "changsha",
        name: "长沙",
        date: "待更新",
        summary: "夜市、小吃、湘江和热闹的城市节奏。",
        diary: [
          { date: "待更新", memory: "这里可以写长沙的夜晚、吃到的东西，或者某条很热闹的街。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "hong-kong",
        name: "香港",
        date: "待更新",
        summary: "高楼、海风、叮叮车和很密的城市光。",
        diary: [
          { date: "待更新", memory: "这里可以写香港那一站最想留下来的一个瞬间。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "macau",
        name: "澳门",
        date: "待更新",
        summary: "葡式街道、路牌、蛋挞和很适合散步的下午。",
        diary: [
          { date: "待更新", memory: "这里可以写澳门那一站的街道、食物或某张照片背后的记忆。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "beijing",
        name: "北京",
        date: "待更新",
        summary: "北方的风、胡同、红墙和很多可以慢慢补上的城市记忆。",
        diary: [
          { date: "待更新", memory: "这里可以写北京的某一天，或者某一次突然觉得好看的路口。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      },
      {
        id: "jiangxi",
        name: "江西",
        date: "待更新",
        summary: "山、水、老街和很多更安静的路上片段。",
        diary: [
          { date: "待更新", memory: "这里可以写江西的一段短途、一次回忆，或者一张很喜欢的风景照。" }
        ],
        photoGroups: { scenery: [], me: [], food: [] }
      }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/china-gate.svg", caption: "中国的第一格" }
      ]
    },
    photos: [
      { src: "./assets/photos/china-gate.svg", caption: "中国的第一格" }
    ]
  },
  {
    title: "迪拜",
    place: "Dubai",
    date: "Stop 01",
    route: { x: 25, y: 34, landmark: "burj" },
    cover: "./assets/photos/dubai-tower.svg",
    summary: "从亚洲到中东，城市突然变得明亮、热烈，高楼、沙漠和海风都很有记忆点。",
    tags: ["城市天际线", "沙漠", "夜景"],
    notes: [
      "迪拜这一站可以记录城市天际线、沙漠体验、海边和夜景。",
      "这里的光很强，适合拍建筑轮廓、黄昏和晚上亮起来的城市。"
    ],
    diary: [
      { date: "Stop 01", memory: "高楼、日光和很热的空气，一下子把旅行切换到了另一个频道。" },
      { date: "记忆碎片", memory: "这里适合把建筑轮廓、沙漠和夜景都存下来。" }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/dubai-tower.svg", caption: "迪拜的高楼和日光" }
      ]
    },
    photos: [
      { src: "./assets/photos/dubai-tower.svg", caption: "迪拜的高楼和日光" }
    ]
  },
  {
    title: "英国",
    place: "United Kingdom",
    date: "Stop 02",
    route: { x: 38, y: 51, landmark: "tower" },
    cover: "./assets/photos/london-walk.svg",
    summary: "阴天、红色巴士、街角咖啡和博物馆，是进入欧洲后的第一段日常感。",
    tags: ["城市散步", "博物馆", "咖啡"],
    notes: [
      "英国这一站可以记录伦敦街区、博物馆、公园、书店和阴天里的城市光线。",
      "适合多拍路上的小细节，比如窗户、门牌、地铁站和街角咖啡。"
    ],
    diary: [
      { date: "Stop 02", memory: "阴天、街角咖啡和慢慢走的路，是很英国的日常感。" },
      { date: "记忆碎片", memory: "喜欢那些不太像景点的小细节：窗户、门牌、地铁站和旧书店。" }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/london-walk.svg", caption: "伦敦街角" },
        { src: "./assets/photos/bookshop.svg", caption: "旧书店和窗边" }
      ]
    },
    photos: [
      { src: "./assets/photos/london-walk.svg", caption: "伦敦街角" },
      { src: "./assets/photos/bookshop.svg", caption: "旧书店和窗边" }
    ]
  },
  {
    title: "法国",
    place: "France",
    date: "Stop 03",
    route: { x: 50, y: 35, landmark: "eiffel" },
    cover: "./assets/photos/france-eiffel.svg",
    summary: "街边咖啡、博物馆、河岸和慢慢走的下午，是进入欧洲后的第一段记忆。",
    tags: ["博物馆", "咖啡", "城市漫步"],
    notes: [
      "法国这一站可以按街区记录：住在哪里、最喜欢哪条街、哪个下午最舒服。",
      "拍照可以多留一些街角、招牌、窗户和咖啡杯，这些比打卡照更容易带回当时的气氛。"
    ],
    diary: [
      { date: "Stop 03", memory: "街边咖啡、博物馆和河岸，适合慢慢走，不太适合赶路。" },
      { date: "记忆碎片", memory: "比起打卡照，更想留下窗户、招牌和某个下午的光。" }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/france-eiffel.svg", caption: "巴黎和铁塔" }
      ]
    },
    photos: [
      { src: "./assets/photos/france-eiffel.svg", caption: "巴黎和铁塔" }
    ]
  },
  {
    title: "西班牙",
    place: "Spain",
    date: "Stop 04",
    route: { x: 62, y: 56, landmark: "sun" },
    cover: "./assets/photos/spain-sun.svg",
    summary: "阳光、广场、橙色屋顶和很晚才开始热闹起来的街道。",
    tags: ["阳光", "广场", "慢节奏"],
    notes: [
      "西班牙适合把时间放松一点，午后不要急着赶路。",
      "可以记录吃到的东西、喜欢的广场、黄昏时分的街道声音。"
    ],
    diary: [
      { date: "Stop 04", memory: "阳光很亮，节奏很慢，午后好像天然适合发呆。" },
      { date: "记忆碎片", memory: "想记录吃到的东西、喜欢的广场和黄昏时分的街道声音。" }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/spain-sun.svg", caption: "阳光下的广场" }
      ]
    },
    photos: [
      { src: "./assets/photos/spain-sun.svg", caption: "阳光下的广场" }
    ]
  },
  {
    title: "意大利",
    place: "Italy",
    date: "Stop 05",
    route: { x: 74, y: 36, landmark: "dome" },
    cover: "./assets/photos/italy-dome.svg",
    summary: "教堂、石板路、冰淇淋和突然出现在转角的漂亮建筑。",
    tags: ["建筑", "美食", "古城"],
    notes: [
      "意大利这一站可以多记录城市之间的差异，比如罗马、佛罗伦萨、威尼斯的不同气质。",
      "适合拍建筑细节、门窗、石板路和晚餐。"
    ],
    diary: [
      { date: "Stop 05", memory: "教堂、石板路和转角突然出现的漂亮建筑，很适合边走边抬头。" },
      { date: "记忆碎片", memory: "想把不同城市的气质分开记下来：建筑、门窗、晚餐和路上的声音。" }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/italy-dome.svg", caption: "圆顶和街巷" }
      ]
    },
    photos: [
      { src: "./assets/photos/italy-dome.svg", caption: "圆顶和街巷" }
    ]
  },
  {
    title: "冰岛",
    place: "Iceland",
    date: "Stop 06",
    route: { x: 86, y: 50, landmark: "mountain" },
    cover: "./assets/photos/iceland-mountain.svg",
    summary: "风、瀑布、黑沙滩和很辽阔的自然景观，像路线最后突然安静下来。",
    tags: ["自然", "瀑布", "公路旅行"],
    notes: [
      "冰岛适合按天气和路线记录，因为风景和天气变化会很大。",
      "可以记录自驾路线、住宿位置、看过的瀑布、黑沙滩和极光可能性。"
    ],
    diary: [
      { date: "Stop 06", memory: "风、瀑布、黑沙滩和很辽阔的自然景观，像路线最后突然安静下来。" },
      { date: "记忆碎片", memory: "这里适合按天气和路线记录，因为风景会随着光线和风一起变。" }
    ],
    photoGroups: {
      food: [],
      me: [],
      scenery: [
        { src: "./assets/photos/iceland-mountain.svg", caption: "冰岛的山和风" }
      ]
    },
    photos: [
      { src: "./assets/photos/iceland-mountain.svg", caption: "冰岛的山和风" }
    ]
  }
];
