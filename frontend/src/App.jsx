import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import { Indexing } from './pages/Indexing';
import { Colaborations } from './pages/Colaborations';
import { Trends } from './pages/Trends';
import NavigationBar from "./components/Navigation";
import { Footer } from "./components/Footer";
import About from "./pages/About";

function App() {
    return(
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/indexing" element={<Indexing />} />
          <Route path="/Colaborations" element={<Colaborations />} />
          <Route path="/Trends" element={<Trends />} />
        </Routes>
        <Footer> </Footer>
      </Router>
    )
}

export default App