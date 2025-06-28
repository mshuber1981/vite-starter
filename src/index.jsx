import React from "react";
import ReactDOM from "react-dom/client";
// Styles
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// State
import { Provider } from "react-redux";
import { store } from "./app/store";
// Components
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";

// Simple fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: 32, textAlign: "center" }}>
      <h2>Something went wrong.</h2>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
