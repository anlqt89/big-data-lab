import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import { Movies } from './pages/Movies';
import { Colaborations } from './pages/Colaborations';
import { Trends } from './pages/Trends';
import NavigationBar from "./components/Navigation";
import { Footer } from "./components/Footer";
import About from "./pages/About";
import { Portfolio } from "./pages/Porfolio";

function App() {
    return(
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/Colaborations" element={<Colaborations />} />
          <Route path="/Trends" element={<Trends />} />
          <Route path="/Porfolio" element={<Portfolio/>}></Route>
        </Routes>
        <Footer> </Footer>
      </Router>
    )
}

export default App