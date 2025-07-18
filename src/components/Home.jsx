import React from "react";
// Styles
import { styled, keyframes } from "@mui/system";
// State
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../features/counter/counterSlice";
import PropTypes from "prop-types";
// Router
import { Link as RouterLink } from "react-router-dom";
// Components
import { Box, Button, Typography, Link as MuiLink, Stack } from "@mui/material";
import ToggleMode from "./ToggleMode";
import GitHubActivity from "./GitHubActivity";
// Assets
import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";

// #region styled-components
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledLogo = styled("img")(({ theme }) => ({
  height: "10em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",
  "&:hover": {
    filter: `drop-shadow(0 0 2em ${
      theme.palette.mode === "dark" ? "#9c27b0aa" : "#646cffaa"
    })`,
  },
  "&.react:hover": {
    filter: `drop-shadow(0 0 2em ${
      theme.palette.mode === "dark" ? "#bb86fc" : "#61dbfb"
    })`,
  },
  "&.react": {
    "@media (prefers-reduced-motion: no-preference)": {
      animation: `${spin} infinite 20s linear`,
    },
  },
}));
// #endregion

// #region component
const propTypes = {
  content: PropTypes.element.isRequired,
  setModes: PropTypes.func.isRequired,
};
const Home = ({ content, setModes }) => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // Local state to simulate an error
  const [simulateError, setSimulateError] = React.useState(false);

  // Throw error when simulateError is true
  if (simulateError) {
    throw new Error("Simulated error for testing ErrorBoundary!");
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Box sx={{ maxWidth: "90vw", padding: "2rem", textAlign: "center" }}>
        <Box>
          <MuiLink href="https://vitejs.dev" target="_blank">
            <StyledLogo src={viteLogo} alt="Vite logo" />
          </MuiLink>
          <MuiLink href="https://react.dev" target="_blank">
            <StyledLogo src={reactLogo} className="react" alt="React logo" />
          </MuiLink>
          <ToggleMode setMode={setModes} />
        </Box>
        <Typography variant="h1" gutterBottom>
          Vite + React
        </Typography>
        <Box
          sx={{
            padding: "2em",
            textAlign: "center",
            ".read-the-docs": {
              color: "#888",
            },
          }}
        >
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            Edit <code>src/App.jsx</code> and save to test HMR
          </Typography>
          <Typography variant="body2" className="read-the-docs">
            Click on the Vite and React logos to learn more
          </Typography>
          <Typography variant="body1" sx={{ margin: "1rem 0" }}>
            Current count is {count}
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            sx={{ maxWidth: 200, width: "100%", mx: "auto" }}
          >
            <Button
              variant="contained"
              onClick={() => dispatch(increment())}
              fullWidth
            >
              Increment
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(decrement())}
              sx={{ marginLeft: "1rem" }}
              fullWidth
            >
              Decrement
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(reset())}
              sx={{ marginLeft: "1rem" }}
              fullWidth
            >
              Reset
            </Button>
            {/* Simulate Error Button */}
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: "1rem" }}
              onClick={() => setSimulateError(true)}
              fullWidth
            >
              Simulate Error
            </Button>
          </Stack>
        </Box>
        <Button
          component={RouterLink}
          to="/example-route"
          variant="outlined"
          sx={{ marginTop: "1rem", maxWidth: 200, width: "100%" }}
        >
          Go to Example route
        </Button>
        <Typography variant="h2" sx={{ marginTop: "2rem" }}>
          API Info
        </Typography>
        {content}
        <GitHubActivity />
      </Box>
    </Box>
  );
};
Home.propTypes = propTypes;
// #endregion

export default Home;
