import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import "./App.css";

function App() {
  const [isKrw, setIsKrw] = useState(false);
  const toggleCurrency = () =>{
    setIsKrw(!isKrw);
  }
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home isKrw={isKrw} toggleCurrency={toggleCurrency}/>} />
          <Route path="/coin/:id/*" element={<Detail isKrw={isKrw} toggleCurrency={toggleCurrency}/>} />
        </Routes>
      </Router>
  );
}

export default App;
