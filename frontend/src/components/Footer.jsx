import './footer.css';

export const Footer = () => {
    return (
        <footer className="container footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>An Lam</h2>
                    <p>Software Engineer specializing in Big Data, RISC-V, and Full-Stack Development.</p>
                </div>

                <div className="footer-section">
                    <h3>Connect</h3>
                    <ul>
                        <li><a href="mailto:anlqt89@gmail.com">anlqt89@gmail.com</a></li>
                        <li><a href="https://linkedin.com/in/anlamtech" target="_blank" rel="noreferrer">LinkedIn: anlamtech</a></li>
                        <li><a href="https://github.com/anlqt89" target="_blank" rel="noreferrer">GitHub: anlqt89</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Navigation</h3>
                    <ul>
                    <li>
                        <a href="https://anlam.app">Portfolio Home</a>
                    </li>
                    <li>
                        {/* This link usually points to your visual demo section */}
                        <a href="https://anlam.app#projects">Project Demonstrations</a>
                    </li>
                    <li>
                        {/* Corrected spelling and pointed to your actual GitHub code list */}
                        <a href="https://github.com/anlqt89?tab=repositories" target="_blank" rel="noreferrer">
                            GitHub Repositories
                        </a>
                    </li>
                </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 An Lam. MS in CS @ UT Arlington • BS in CS @ Texas Tech</p>
            </div>
        </footer>
    );
};