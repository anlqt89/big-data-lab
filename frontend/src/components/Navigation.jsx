import './navigation.css'
import { NavLink } from 'react-router-dom';

const Navigation = () =>{
    return (
        <nav className=" my-navbar navbar navbar-expand-lg container">
                
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/Home">Big Data Lab</NavLink>
                    <NavLink className="nav-link" to="/indexing">Indexing</NavLink>
                    <NavLink className="nav-link" to="/trends">Trends</NavLink>
                    <NavLink className="nav-link" to="/colaborations">Colaborations</NavLink>
                    <NavLink className="nav-link" to="/about">About</NavLink>
                     {/* <NavLink className="nav-link" to="/portfolio">Portfolio</NavLink> */}
                </div>
        </nav>
    )
}

export default Navigation;