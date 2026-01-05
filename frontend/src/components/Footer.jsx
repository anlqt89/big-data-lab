import './footer.css';

export const Footer = () => {
    return (
        <footer className="container footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>An Lam</h2>
                    <p>Full-Stack Developer specializing in high-performance data architectures.</p>
                </div>

                <div className="footer-section">
                    <h3>Connect</h3>
                    <ul>
                        <li><a href="mailto:anlqt89@gmail.com">anlqt89@gmail.com</a></li>
                        <li><a href="https://linkedin.com/in/anlamttu" target="_blank" rel="noreferrer">LinkedIn: anlamttu</a></li>
                        <li><a href="https://github.com/anlqt89" target="_blank" rel="noreferrer">GitHub: anlqt89</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Projects</h3>
                    <ul>
                        <li>Big Data Search</li>
                        <li>PostgreSQL Indexing</li>
                        <li>API Scalability</li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 An Lam. Built with React.</p>
            </div>
        </footer>
    );
};