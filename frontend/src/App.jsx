import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';

import { Colaborations } from './pages/Colaborations';
import { Trends } from './pages/Trends';
import NavigationBar from "./components/Navigation";
import { Footer } from "./components/Footer";
import About from "./pages/About";
import { Indexes } from "./pages/Indexes";
import { TitleMetaDataProvider } from "./context/TitleMetaDataProvider";

function App() {
    return(
       <TitleMetaDataProvider>
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
         
          <Route path="/Indexes" element={<Indexes />} />
          <Route path="/Colaborations" element={<Colaborations />} />
          <Route path="/Trends" element={<Trends />} />
        </Routes>
        <Footer> </Footer>
      </Router>
      </TitleMetaDataProvider>
    )

}

export default App