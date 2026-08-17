import React from "react"; // 1. React
import Footer from "../components/Footer"; // 2. Footer
import "./Home.css"; // 3. Import CSS

function Home() { // 4. Home component
  return ( // 5. What page renders
    <div className="home"> {/* 6. Page wrapper */}
      <header className="hero"> {/* 7. Hero section with bg image */}
        <div className="hero-overlay"> {/* 8. Dark overlay for text readability */}
          <div className="hero-content"> {/* 9. Centered text */}
            <h1 className="hero-title">Find Your New Best Friend</h1> {/* 10. Big headline */}
            <p className="hero-subtitle"> {/* 11. Subtext */}
              We connect loving families with adoptable dogs in Ruiru and beyond. 
              Every wag deserves a home.
            </p>
          </div> {/* 12. Close content */}
        </div> {/* 13. Close overlay */}
      </header> {/* 14. Close hero */}

      <Footer /> {/* 15. Footer */}
    </div> // 16. Close home
  ); // 17. End return
} // 18. End Home

export default Home; // 19. Export