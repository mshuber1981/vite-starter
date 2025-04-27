import { Link } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";

// #region component
const ExampleRoute = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Test
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ marginTop: "1rem" }}
      >
        Back to Home
      </Button>
    </Stack>
  );
};
// #endregion

export default ExampleRoute;
