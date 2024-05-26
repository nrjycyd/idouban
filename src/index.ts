"use strict";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { init_lang } from "./i18n.ts";
import { fetchData } from "./http.ts";
import "./index.css";
import { IDoubanConfig } from "./types.ts";

const init_config = (config: IDoubanConfig) => {
  if (!config.lang) {
    config.lang = "zh";
  }
  if (!config.page_size) {
    config.page_size = 10;
  }
  if (!config.max_line) {
    config.max_line = 4;
  }

  const available_actions = ["do", "wish", "collect"];

  if (config.actions && config.actions.length !== 0) {
    config.actions = config.actions.filter((action) =>
      available_actions.includes(action)
    );
    if (config.actions.length === 0) {
      config.actions = available_actions;
    }
  } else {
    config.actions = available_actions;
  }
};

export const idouban = {
  init: async (config: IDoubanConfig) => {
    init_config(config);

    init_lang(config.lang);

    if (!config.data_list) {
      const startTime = new Date().getTime();

      config.data_list = await fetchData(
        config.douban_id,
        config.referer,
        config.type,
        config.actions
      );

      const endTime = new Date().getTime();

      console.log(
        `${config.data_list.map(
          (data) => data.action + "(" + data.items.length + ")"
        )} book loaded in ${endTime - startTime} ms`
      );
    }

    const div = document.querySelector(config.selector);
    if (div) {
      const root = createRoot(div);
      root.render(
        React.createElement(App, {
          context: {
            data_list: config.data_list,
            quote: config.quote,
            page_size: config.page_size,
            max_line: config.max_line,
            type: config.type,
          },
        })
      );
    } else {
      console.warn("idouban selector not found");
    }
  },
};

declare global {
  interface Window {
    idouban: any;
  }
}

if (window) {
  window.idouban = idouban;
}
