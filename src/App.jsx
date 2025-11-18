import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Box, Stack, Typography, Button } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    throw new Error("Test error boundary!");
  }

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 4,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <Box>
        <Box
          component="a"
          href="https://vite.dev"
          target="_blank"
          sx={{ display: 'inline-block' }}
        >
          <Box
            component="img"
            src={viteLogo}
            alt="Vite logo"
            sx={{
              height: '6em',
              padding: '1.5em',
              willChange: 'filter',
              transition: 'filter 300ms',
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #646cffaa)'
              }
            }}
          />
        </Box>
        <Box
          component="a"
          href="https://react.dev"
          target="_blank"
          sx={{ display: 'inline-block' }}
        >
          <Box
            component="img"
            src={reactLogo}
            alt="React logo"
            sx={{
              height: '6em',
              padding: '1.5em',
              willChange: 'filter',
              transition: 'filter 300ms',
              '@media (prefers-reduced-motion: no-preference)': {
                animation: 'logo-spin 20s linear infinite'
              },
              '@keyframes logo-spin': {
                from: {
                  transform: 'rotate(0deg)'
                },
                to: {
                  transform: 'rotate(360deg)'
                }
              },
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #61dafbaa)'
              }
            }}
          />
        </Box>
      </Box>
      
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: '3.2em',
          lineHeight: 1.1
        }}
      >
        Vite + React
      </Typography>
      
      <Stack spacing={2} sx={{ padding: 4 }}>
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
          sx={{
            borderRadius: 2,
            border: '1px solid transparent',
            padding: '0.6em 1.2em',
            fontSize: '1em',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'border-color 0.25s'
          }}
        >
          count is {count} (increase to 5 to test error boundary)
        </Button>
        <Typography>
          Edit <Box component="code" sx={{ 
            backgroundColor: 'action.hover', 
            padding: '0.2em 0.4em', 
            borderRadius: 1,
            fontFamily: 'monospace'
          }}>src/App.jsx</Box> and save to test HMR
        </Typography>
      </Stack>
      
      <Typography 
        sx={{ 
          color: theme => theme.palette.mode === 'dark' ? '#888' : '#888'
        }}
      >
        Click on the Vite and React logos to learn more
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "56px",
        }}
      >
        <ThemeToggle />
      </Box>
    </Stack>
  );
}

export default App;
