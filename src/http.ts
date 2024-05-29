import {
  User,
  BookComment,
  GameComment,
  SongComment,
  MovieComment,
  ShowItem,
} from "./types.ts";
import { name, version } from "../package.json";

const getRate = (num: number): string => {
  switch (num) {
    case 1:
      return "poor";
    case 2:
      return "fair";
    case 3:
      return "good";
    case 4:
      return "great";
    case 5:
      return "best";
    default:
      return "";
  }
};

export const syncFetch = async (url: string, referer: string) => {
  try {
    const headers = {
      "User-Agent": `${name}@${version}`,
    };

    if (referer) {
      headers["Referer"] = referer;
    }
    const data = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    return data.json();
  } catch (err) {
    console.error(err);
    return "OFFLINE";
  }
};
export const fetchAction = async (
  id: string,
  action: string,
  referer: string,
  type: string
) => {
  switch (type) {
    case "book":
      return fetchBook(id, action, referer);
    case "movie":
      return fetchMovie(id, action, referer);
    case "game":
      return fetchGame(id, action, referer);
    case "song":
      return fetchSong(id, action, referer);
    default:
      throw new Error(`${type} type not found`);
  }
};

export const fetchBook = async (
  id: string,
  action: string,
  referer: string
): Promise<ShowItem[]> => {
  const book: ShowItem[] = [];
  const response = await syncFetch(
    "https://mouban.mythsman.com/guest/user_book?action=" +
      action +
      "&id=" +
      id,
    referer
  );
  if (response === "OFFLINE") {
    console.warn("Cannot connect to server");
    return book;
  }

  const bookResult = response.result as {
    user: User;
    comment: BookComment[];
  };

  for (const comment of bookResult.comment) {
    const metas: string[] = [];
    if (comment.item.author) {
      metas.push(comment.item.author);
    }
    if (comment.item.translator) {
      metas.push(comment.item.translator);
    }
    if (comment.item.press) {
      metas.push(comment.item.press);
    }
    if (comment.item.producer) {
      metas.push(comment.item.producer);
    }

    const marks: string[] = [];
    if (comment.mark_date) {
      marks.push(comment.mark_date);
    }
    if (comment.label) {
      marks.push(comment.label);
    }
    book.push({
      title: comment.item.title,
      alt: "https://book.douban.com/subject/" + comment.item.douban_id + "/",
      image: comment.item.thumbnail,
      meta: metas.join(" / "),
      mark: marks.join(" / "),
      rate: getRate(comment.rate),
      comment: comment.comment,
    });
  }
  return book;
};

export const fetchGame = async (
  id: string,
  action: string,
  referer: string
): Promise<ShowItem[]> => {
  const game: ShowItem[] = [];
  const response = await syncFetch(
    "https://mouban.mythsman.com/guest/user_game?action=" +
      action +
      "&id=" +
      id,
    referer
  );
  if (response === "OFFLINE") {
    console.warn("Cannot connect to server");
    return game;
  }

  const gameResult = response.result as {
    user: User;
    comment: GameComment[];
  };
  for (const comment of gameResult.comment) {
    const metas: string[] = [];
    if (comment.item.platform) {
      metas.push(comment.item.platform);
    }
    if (comment.item.genre) {
      metas.push(comment.item.genre);
    }
    if (comment.item.developer) {
      metas.push(comment.item.developer);
    }
    if (comment.item.publisher) {
      metas.push(comment.item.publisher);
    }
    const marks: string[] = [];
    if (comment.mark_date) {
      marks.push(comment.mark_date);
    }
    if (comment.label) {
      marks.push(comment.label);
    }
    game.push({
      title: comment.item.title,
      alt: "https://www.douban.com/game/" + comment.item.douban_id + "/",
      image: comment.item.thumbnail,
      meta: metas.join(" / "),
      mark: marks.join(" / "),
      rate: getRate(comment.rate),
      comment: comment.comment,
    });
  }
  return game;
};

export const fetchSong = async (
  id: string,
  action: string,
  referer: string
): Promise<ShowItem[]> => {
  const song: ShowItem[] = [];
  const response = await syncFetch(
    "https://mouban.mythsman.com/guest/user_song?action=" +
      action +
      "&id=" +
      id,
    referer
  );
  if (response === "OFFLINE") {
    console.warn("Cannot connect to server");
    return song;
  }

  const songResult = response.result as {
    user: User;
    comment: SongComment[];
  };

  for (const comment of songResult.comment) {
    const metas: string[] = [];
    if (comment.item.alias) {
      metas.push(comment.item.alias);
    }
    if (comment.item.musician) {
      metas.push(comment.item.musician);
    }
    if (comment.item.album_type) {
      metas.push(comment.item.album_type);
    }
    if (comment.item.genre) {
      metas.push(comment.item.genre);
    }
    if (comment.item.media) {
      metas.push(comment.item.media);
    }
    if (comment.item.publisher) {
      metas.push(comment.item.publisher);
    }
    if (comment.item.publish_date) {
      metas.push(comment.item.publish_date);
    }
    const marks: string[] = [];
    if (comment.mark_date) {
      marks.push(comment.mark_date);
    }
    if (comment.label) {
      marks.push(comment.label);
    }
    song.push({
      title: comment.item.title,
      alt: "https://music.douban.com/subject/" + comment.item.douban_id + "/",
      image: comment.item.thumbnail,
      meta: metas.join(" / "),
      mark: marks.join(" / "),
      rate: getRate(comment.rate),
      comment: comment.comment,
    });
  }
  return song;
};

export const fetchMovie = async (
  id: string,
  action: string,
  referer: string
): Promise<ShowItem[]> => {
  const movie: ShowItem[] = [];
  const response = await syncFetch(
    "https://mouban.mythsman.com/guest/user_movie?action=" +
      action +
      "&id=" +
      id,
    referer
  );
  if (response === "OFFLINE") {
    console.warn("Cannot connect to server");
    return movie;
  }

  const movieResult = response.result as {
    user: User;
    comment: MovieComment[];
  };
  for (const comment of movieResult.comment) {
    const metas: string[] = [];
    if (comment.item.style) {
      metas.push(comment.item.style);
    }
    if (comment.item.director) {
      metas.push(comment.item.director);
    }
    if (comment.item.writer) {
      metas.push(comment.item.writer);
    }
    if (comment.item.actor) {
      metas.push(comment.item.actor);
    }
    if (comment.item.publish_date) {
      metas.push(comment.item.publish_date);
    }
    const marks: string[] = [];
    if (comment.mark_date) {
      marks.push(comment.mark_date);
    }
    if (comment.label) {
      marks.push(comment.label);
    }
    movie.push({
      title: comment.item.title,
      alt: "https://movie.douban.com/subject/" + comment.item.douban_id + "/",
      image: comment.item.thumbnail,
      meta: metas.join(" / "),
      mark: marks.join(" / "),
      rate: getRate(comment.rate),
      comment: comment.comment,
    });
  }
  return movie;
};

export const fetchData = async (
  id: string,
  referer: string,
  type: string,
  action_list: string[]
) => {
  const userResult = await syncFetch(
    "https://mouban.mythsman.com/guest/check_user?id=" + id,
    referer
  );
  if (userResult === "OFFLINE") {
    console.warn("Cannot connect to server");
    return action_list.map((action) => {
      return {
        action: action,
        items: [],
      };
    });
  }
  if (!userResult.success) {
    console.warn(userResult.msg);
    return action_list.map((action) => {
      return {
        action: action,
        items: [],
      };
    });
  }

  const result: {
    action: string;
    items: ShowItem[];
  }[] = [];

  for (const action of action_list) {
    const items = await fetchAction(id, action, referer, type);
    result.push({
      action: action,
      items: items,
    });
  }

  return result;
};
