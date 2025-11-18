import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@mui/material/styles";

function Home() {
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  if (count === 5) {
    throw new Error("Test error boundary!");
  }

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: 4,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box>
        <Box
          component="a"
          href="https://vite.dev"
          target="_blank"
          sx={{ display: "inline-block" }}
        >
          <Box
            component="img"
            src={viteLogo}
            alt="Vite logo"
            sx={{
              height: "6em",
              padding: "1.5em",
              willChange: "filter",
              transition: "filter 300ms",
              "&:hover": {
                filter: "drop-shadow(0 0 2em #646cffaa)",
              },
            }}
          />
        </Box>
        <Box
          component="a"
          href="https://react.dev"
          target="_blank"
          sx={{ display: "inline-block" }}
        >
          <Box
            component="img"
            src={reactLogo}
            alt="React logo"
            sx={{
              height: "6em",
              padding: "1.5em",
              willChange: "filter",
              transition: "filter 300ms",
              animation: "logo-spin infinite 20s linear",
              "&:hover": {
                filter: "drop-shadow(0 0 2em #61dafbaa)",
              },
              "@keyframes logo-spin": {
                from: {
                  transform: "rotate(0deg)",
                },
                to: {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: "3.2em",
          lineHeight: 1.1,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${
            isDarkMode ? "#ffffff" : "#000000"
          })`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Vite + React + MUI
      </Typography>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>

        <Button component={Link} to="/example" variant="contained" size="large">
          Go to Example
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ maxWidth: 600, textAlign: "left" }}>
        <Typography variant="body1" color="text.secondary">
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Click on the Vite and React logos to learn more
        </Typography>
      </Stack>

      <ThemeToggle />
    </Stack>
  );
}

export default Home;
