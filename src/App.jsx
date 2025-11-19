import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ExampleRoute from "./components/ExampleRoute";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // Get basename from Vite's base URL for GitHub Pages deployment
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<ExampleRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
