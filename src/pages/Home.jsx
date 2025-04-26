import React from "react";
// MUI Components
import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import { styled, keyframes } from "@mui/system";
// Assets
import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";
// State
import PropTypes from "prop-types";
// Components
import ToggleMode from "../components/ToggleMode";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

// #region styled-components
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLogo = styled("img")(() => ({
  height: "10em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",
  "&:hover": {
    filter: "drop-shadow(0 0 2em #646cffaa)",
  },
  "&.react:hover": {
    filter: "drop-shadow(0 0 2em #61dbfb)",
  },
  "&.react": {
    "@media (prefers-reduced-motion: no-preference)": {
      animation: `${spin} infinite 20s linear`,
    },
  },
}));

const StyledCard = styled(Box)({
  padding: "2em",
  textAlign: "center",
  ".read-the-docs": {
    color: "#888",
  },
});
// #endregion

// #region component
const propTypes = {
  content: PropTypes.element.isRequired,
  setModes: PropTypes.func.isRequired,
};

const Home = ({ content, setModes }) => {
  const [count, setCount] = React.useState(0);

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
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
      <StyledCard>
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <Typography variant="body1" sx={{ marginTop: "1rem" }}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>
        <Typography variant="body2" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
      </StyledCard>
      <Button
        component={RouterLink}
        to="/example-route"
        variant="outlined"
        sx={{ marginTop: "1rem" }}
      >
        Go to Example route
      </Button>
      <Typography variant="h2" sx={{ marginTop: "2rem" }}>
        API Info
      </Typography>
      {content}
    </Box>
  );
};

Home.propTypes = propTypes;
// #endregion

export default Home;
