import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error("Error Boundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReload = () => {
    // Reset the error state and reload the page
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: 3,
            bgcolor: "background.default",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              textAlign: "center",
              maxWidth: 600,
              width: "100%",
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 64,
                color: "error.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We apologize for the inconvenience. An unexpected error has
              occurred.
            </Typography>

            {import.meta.env.DEV && this.state.error && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="h6" color="error" gutterBottom>
                  Error Details (Development Mode):
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    padding: 2,
                    bgcolor: "grey.50",
                    textAlign: "left",
                    overflow: "auto",
                    maxHeight: 200,
                  }}
                >
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{ fontFamily: "monospace" }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </Typography>
                </Paper>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.handleReload}
              sx={{ mt: 2 }}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
