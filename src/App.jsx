import NavBar from "./components/NavBar";
import Rates from "./components/Rates";
import Conversions from "./components/Conversions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Rates />} />
          <Route exact path="/conversions" element={<Conversions />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
