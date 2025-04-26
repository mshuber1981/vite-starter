import React from "react";
// Styles
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExampleRoute from "./pages/ExampleRoute";
import NotFound from "./pages/NotFound";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import { useGetUsersQuery } from "./app/apiSlice";
// Util
import { getStoredMode, getPreferredMode } from "./utils";

// #region component
const App = () => {
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
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EmotionThemeProvider theme={{ name: theme.palette.mode }}>
            <Routes>
              <Route
                path="/"
                element={<Home content={content} setModes={setModes} />}
              />
              <Route path="/example-route" element={<ExampleRoute />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </EmotionThemeProvider>
        </ThemeProvider>
      </HashRouter>
    </>
  );
};
// #endregion

export default App;
