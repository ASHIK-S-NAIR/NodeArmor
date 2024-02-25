import heroImg from "../../assets/heroImg.png";

const HomePage = () => {
  return (
    <section className="homePage">
      <nav className="homePage-nav">
        <div className="homePage-nav-wrap wrap">
          <h2 className="homePage-nav-logo">Node Armor</h2>
          <p className="homePage-nav-link">Documentation</p>
          <button className="cta-btn homePage-nav-signIn-btn">Sign In</button>
        </div>
      </nav>
      <div className="homePage-hero-sec">
        <div className="homePage-hero-wrap wrap">
          <h1 className="homePage-hero-header">Keeping Your Servers Sharp</h1>
          <div className="homePage-hero-subSec">
            <div className="homePage-hero-subSec-left">
              <h3 className="homePage-hero-subHeader">
                Real-time Node.js server monitoring for smooth operations. Take
                control of your Node.js servers with advanced monitoring
                features.
              </h3>
              <button className="homePage-hero-try-btn cta-btn">
                Try for free
              </button>
            </div>
            <div className="homePage-hero-subSec-right">
              <img src={heroImg} alt="" className="homePage-hero-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
