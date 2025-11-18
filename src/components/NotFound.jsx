import { Link } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Home as HomeIcon, SearchOff, ArrowBack } from "@mui/icons-material";

function NotFound() {
  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 4,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        width: "100%",
      }}
    >
      <Box>
        <SearchOff
          sx={{
            fontSize: "8rem",
            color: "text.secondary",
            opacity: 0.7,
          }}
        />
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: "4rem",
          fontWeight: "bold",
          background: "linear-gradient(45deg, #ff6b6b, #ffa726)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontSize: "2rem",
          fontWeight: 500,
          color: "text.primary",
          mb: 1,
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 500, lineHeight: 1.6 }}
      >
        Oops! The page you're looking for doesn't exist. It might have been
        moved, deleted, or you entered the wrong URL.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          variant="contained"
          size="large"
        >
          Go Home
        </Button>

        <Button
          onClick={() => window.history.back()}
          startIcon={<ArrowBack />}
          variant="outlined"
          size="large"
        >
          Go Back
        </Button>
      </Stack>

      <Box
        sx={{
          mt: 6,
          p: 3,
          borderRadius: 2,
          backgroundColor: "action.hover",
          border: "1px solid",
          borderColor: "divider",
          maxWidth: 500,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          What you can do:
        </Typography>
        <Stack spacing={1} sx={{ textAlign: "left" }}>
          <Typography variant="body2">• Check the URL for typos</Typography>
          <Typography variant="body2">
            • Use the navigation menu to find what you're looking for
          </Typography>
          <Typography variant="body2">
            • Go back to the homepage and start over
          </Typography>
          <Typography variant="body2">
            • Use your browser's back button
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default NotFound;
