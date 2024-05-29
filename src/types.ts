export interface Context {
  data_list: {
    action: string;
    items: ShowItem[];
  }[];
  quote: string;
  page_size: number;
  max_line: number;
  type: string;
}

export interface IDoubanConfig {
  selector: string;
  lang: string;
  douban_id: string;
  referer: string;
  type: string;
  actions: string[];
  quote: string;
  page_size: number;
  max_line: number;
  data_list: {
    action: string;
    items: ShowItem[];
  }[];
}

export interface User {
  id: number;
  domain: string;
  name: string;
  thumbnail: string;
  book_wish: number;
  book_do: number;
  book_collect: number;
  game_wish: number;
  game_do: number;
  game_collect: number;
  movie_wish: number;
  movie_do: number;
  movie_collect: number;
  song_wish: number;
  song_do: number;
  song_collect: number;
  publish_at: number;
  sync_at: number;
  check_at: number;
}

export interface Comment {
  rate: number;
  label: string;
  comment: string;
  action: number;
  mark_date: string;
}

export interface BookComment extends Comment {
  item: {
    douban_id: number;
    title: string;
    subtitle: string;
    orititle: string;
    author: string;
    translator: string;
    press: string;
    producer: string;
    publish_date: string;
    thumbnail: string;
  };
}

export interface MovieComment extends Comment {
  item: {
    douban_id: number;
    title: string;
    style: string;
    director: string;
    writer: string;
    actor: string;
    publish_date: string;
    alias: string;
    thumbnail: string;
  };
}

export interface GameComment extends Comment {
  item: {
    douban_id: number;
    title: string;
    platform: string;
    genre: string;
    alias: string;
    developer: string;
    publisher: string;
    publish_date: string;
    thumbnail: string;
  };
}

export interface SongComment extends Comment {
  item: {
    douban_id: number;
    title: string;
    alias: string;
    musician: string;
    thumbnail: string;
    album_type: string;
    genre: string;
    media: string;
    publisher: string;
    publish_date: string;
  };
}

export interface ShowItem {
  title: string;
  alt: string;
  image: string;
  meta: string;
  mark: string;
  rate: string;
  comment: string;
}
