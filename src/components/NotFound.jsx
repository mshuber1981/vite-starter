// Router
import { Link } from "react-router-dom";
// Components
import { Typography, Button, Stack } from "@mui/material";

// #region component
const NotFound = () => {
  return (
    <Stack
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Not Found...
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

export default NotFound;
