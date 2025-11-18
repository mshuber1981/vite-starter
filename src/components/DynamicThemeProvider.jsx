import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { Box, CircularProgress } from "@mui/material";

/**
 * Dynamic Theme Provider
 * Creates MUI theme based on user configuration
 */
export default function DynamicThemeProvider({ children }) {
  const { primaryColor, loading } = useThemeConfig();

  // Show loading while theme config is being loaded
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Create dynamic theme with user's primary color
  const theme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: primaryColor,
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: primaryColor,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}