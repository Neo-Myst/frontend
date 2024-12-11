import '../assets/css/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">LOGO</div>
            <div className="module-title">Module 1: Basics of Machine Learning</div>
            <div className="navigation">
                <button className="submit-btn">Submit</button>
                <button className="next-btn">Next</button>
            </div>
        </header>
    );
};

export default Header;
