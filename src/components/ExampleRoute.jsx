import { Link } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowBack, Code, Lightbulb, Speed } from "@mui/icons-material";

function ExampleRoute() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: 1024,
        margin: "0 auto",
        padding: 4,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBack />}
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      >
        Back to Home
      </Button>

      <Typography
        variant="h2"
        sx={{
          fontSize: "2.5em",
          lineHeight: 1.2,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${
            isDarkMode ? "#ffffff" : "#000000"
          })`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          mb: 2,
        }}
      >
        Example Route Page
      </Typography>

      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        Welcome to the example route! This demonstrates React Router navigation.
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: "100%", maxWidth: 800 }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Speed color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Fast Development</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Vite provides lightning-fast development with instant HMR and
              optimized builds.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Code color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Modern React</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Built with React 19 and modern hooks for the best developer
              experience.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Lightbulb color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">MUI Components</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Beautiful Material-UI components with theme support and responsive
              design.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
          backgroundColor: "action.hover",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          React Router Features
        </Typography>
        <Stack spacing={1} sx={{ textAlign: "left" }}>
          <Typography variant="body2">
            • Declarative routing with components
          </Typography>
          <Typography variant="body2">• Nested routes and layouts</Typography>
          <Typography variant="body2">• Programmatic navigation</Typography>
          <Typography variant="body2">
            • Query parameters and route parameters
          </Typography>
          <Typography variant="body2">• Automatic 404 handling</Typography>
        </Stack>
      </Box>

      <Button
        component={Link}
        to="/nonexistent"
        variant="outlined"
        color="warning"
        sx={{ mt: 2 }}
      >
        Test 404 Page
      </Button>
    </Stack>
  );
}

export default ExampleRoute;
