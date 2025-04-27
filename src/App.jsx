import React from "react";
// Styles
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, CssBaseline } from "@mui/material";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import { useGetUserQuery } from "./features/github/githubApiSlice";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
// Components
import Home from "./components/Home";
import ExampleRoute from "./components/ExampleRoute";
import NotFound from "./components/NotFound";

export const getStoredMode = () => localStorage.getItem("mode");

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
  } = useGetUserQuery();
  let content;

  if (isLoading) {
    content = <CircularProgress />;
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

  const getPreferredMode = () => {
    const storedMode = getStoredMode();
    if (storedMode) {
      return storedMode;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
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
  // Listen for changes in the user's preferred color scheme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedMode = getStoredMode();
      if (storedMode !== "light" && storedMode !== "dark") {
        setModes();
      }
    });
  // Create a theme based on the current mode (light or dark)
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={<Home content={content} setModes={setModes} />}
            />
            <Route path="/example-route" element={<ExampleRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </>
  );
};
// #endregion

export default App;
