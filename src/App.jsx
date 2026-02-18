import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id/*" element={<Detail />} />
        </Routes>
      </Router>
  );
}

export default App;
