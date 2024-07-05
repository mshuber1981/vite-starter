import React from "react";
// Styles
import styled from "@emotion/styled";
import {
  keyframes,
  ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Assets
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import { useGetUsersQuery } from "./app/apiSlice";
// Components
import ToggleMode from "./components/ToggleMode";
// Util
import { getStoredMode, getPreferredMode } from "./utils";

// #region styled-components
const spin = keyframes`
  from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;
const StyledDiv = styled.div`
  padding: 2rem;
  text-align: center;

  .logo {
    height: ${({ theme }) => (theme.name === "light" ? "10em" : "15em")};
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
  }

  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dbfb);
  }

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: ${spin} infinite 20s linear;
    }
  }

  .card {
    padding: 2em;

    .read-the-docs {
      color: #888;
    }
  }
`;
// #endregion

// #region component
const App = () => {
  const [count, setCount] = React.useState(0);
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let content;

  const setModes = React.useCallback(
    (mode) => {
      if (mode) {
        dispatch(setMode(mode));
      } else {
        dispatch(setMode(getPreferredMode()));
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    setModes();
  }, [setModes]);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedMode = getStoredMode();
      if (storedMode !== "light" && storedMode !== "dark") {
        setModes();
      }
    });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <p>{`My name is ${userData.name} and I have ${userData.public_repos} public GitHub repos.`}</p>
    );
  } else if (isError) {
    if (error.status !== "FETCH_ERROR") {
      content = <p>{`${error.status}: ${error.data.message}`}</p>;
    } else {
      content = <p>{error.status}</p>;
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EmotionThemeProvider theme={{ name: theme.palette.mode }}>
          <StyledDiv>
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <ToggleMode setMode={setModes} />
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
            <h2>API Info</h2>
            {content}
          </StyledDiv>
        </EmotionThemeProvider>
      </ThemeProvider>
    </>
  );
};
// #endregion

export default App;
