import React, { Fragment } from "react";
import i18next from "i18next";
import { Context } from "./types.ts";

export default function App({ context }: { context: Context }) {
  const [t] = React.useState(() => {
    return i18next.t;
  });

  const calTotalPage = (total: number, perPage: number) => {
    return Math.max(1, Math.floor((total - 1) / context.page_size + 1));
  };

  const [state, setState] = React.useState({
    page: 1,
    total: calTotalPage(context.data_list[0].items.length, context.page_size),
    action: context.data_list[0].action,
    data: context.data_list[0].items.slice(0, context.page_size),
  });

  const render = (action: string, page: number) => {
    const items = context.data_list.filter((item) => item.action === action)[0]
      .items;
    setState({
      page: page,
      total: calTotalPage(items.length, context.page_size),
      action: action,
      data: items.slice(
        (page - 1) * context.page_size,
        page * context.page_size
      ),
    });
  };

  return (
    <Fragment>
      {context.quote && (
        <blockquote>
          <p> {context.quote}</p>
        </blockquote>
      )}
      {context.data_list.length > 1 && (
        <div className="idouban-tabs">
          {context.data_list.map((data) => (
            <a
              className={`idouban-tab ${
                data.action === state.action ? "idouban-tab-active" : ""
              }`}
              key={data.action}
              href="javascript:;"
              onClick={() => render(data.action, 1)}
              rel="external"
            >
              {t(
                context.type +
                  data.action[0].toUpperCase() +
                  data.action.slice(1)
              )}
              ({data.items.length})
            </a>
          ))}
        </div>
      )}
      {state.data.map((item) => (
        <div className="idouban-item" key={item.alt}>
          <div className="idouban-picture">
            <img src={item.image} loading="lazy"></img>
          </div>
          <div className="idouban-info">
            <div>
              <a href={item.alt} target="_blank">
                {item.title}
              </a>
            </div>
            <div
              className="idouban-meta"
              style={{
                WebkitLineClamp: context.max_line,
              }}
            >
              {item.meta}
            </div>
            <div className="idouban-rating">{item.rating}</div>
            <div className="idouban-comment">{item.comment}</div>
          </div>
        </div>
      ))}
      {state.data.length > 0 && (
        <div className="idouban-pagination">
          <a
            className="idouban-button"
            href="javascript:;"
            onClick={() => render(state.action, 1)}
          >
            {t("top")}
          </a>
          <a
            className="idouban-button"
            href="javascript:;"
            onClick={() => render(state.action, Math.max(state.page - 1, 1))}
          >
            {t("prev")}
          </a>
          <span className="idouban-page-num">
            {state.page} / {state.total}
          </span>
          <a
            className="idouban-button"
            onClick={() =>
              render(state.action, Math.min(state.page + 1, state.total))
            }
            href="javascript:;"
          >
            {t("next")}
          </a>
          <a
            className="idouban-button"
            href="javascript:;"
            onClick={() => render(state.action, state.total)}
          >
            {t("end")}
          </a>
        </div>
      )}
    </Fragment>
  );
}
