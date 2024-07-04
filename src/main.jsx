import React from "react";
import ReactDOM from "react-dom/client";
// Styles
import { Global, css } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// State
import { Provider } from "react-redux";
import { store } from "./app/store";
// Components
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Global
        styles={css`
          body {
            display: grid;
            place-items: center;
            min-width: 320px;
            min-height: 100vh;
          }

          h1 {
            font-size: 3.2em;
            line-height: 1.1;
          }

          button {
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            cursor: pointer;
            transition: border-color 0.25s;

            &:hover {
              border-color: #646cff;
            }

            &:focus,
            &:focus-visible {
              outline: 4px auto -webkit-focus-ring-color;
            }
          }
        `}
      />
      <App />
    </Provider>
  </React.StrictMode>
);
