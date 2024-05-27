import i18next from "i18next";

const zh_cn_dict = {
  movieWish: "想看",
  movieDo: "在看",
  movieCollect: "已看",
  bookWish: "想读",
  bookDo: "在读",
  bookCollect: "已读",
  gameWish: "想玩",
  gameDo: "在玩",
  gameCollect: "已玩",
  songWish: "想听",
  songDo: "在听",
  songCollect: "已听",
  prev: "上一页",
  next: "下一页",
  top: "首页",
  end: "尾页",
  poor: "★☆☆☆☆ 很差",
  fair: "★★☆☆☆ 较差",
  good: "★★★☆☆ 还行",
  great: "★★★★☆ 推荐",
  best: "★★★★★ 力荐",
};
const zh_tw_dict = {
  movieWish: "想看",
  movieDo: "在看",
  movieCollect: "已看",
  bookWish: "想讀",
  bookDo: "在讀",
  bookCollect: "已讀",
  gameWish: "想玩",
  gameDo: "在玩",
  gameCollect: "已玩",
  songWish: "想聽",
  songDo: "在聽",
  songCollect: "已聽",
  prev: "上一頁",
  next: "下一頁",
  top: "首頁",
  end: "尾頁",
  poor: "★☆☆☆☆ 極差",
  fair: "★★☆☆☆ 較差",
  good: "★★★☆☆ 平均",
  great: "★★★★☆ 優質",
  best: "★★★★★ 極佳",
};
const en_dict = {
  movieWish: "Wish",
  movieDo: "Watching",
  movieCollect: "Watched",
  bookWish: "Wish",
  bookDo: "Reading",
  bookCollect: "Read",
  gameWish: "Wish",
  gameDo: "Playing",
  gameCollect: "Played",
  songWish: "Wish",
  songDo: "Listening",
  songCollect: "Listened",
  prev: "Prev",
  next: "Next",
  top: "Top",
  end: "End",
  poor: "★☆☆☆☆ Poor",
  fair: "★★☆☆☆ Fair",
  good: "★★★☆☆ Good",
  great: "★★★★☆ Great",
  best: "★★★★★ Best",
};

i18next.init({
  lng: "zh",
  fallbackLng: "zh",
  debug: false,
  lowerCaseLng: true,
  resources: {
    en: {
      translation: en_dict,
    },
    zh: {
      translation: zh_cn_dict,
    },
    "zh-tw": {
      translation: zh_tw_dict,
    },
    "zh-cn": {
      translation: zh_cn_dict,
    },
    "zh-hans": {
      translation: zh_cn_dict,
    },
  },
});

export const init_lang = (lang: string) => {
  i18next.changeLanguage(lang);
};
