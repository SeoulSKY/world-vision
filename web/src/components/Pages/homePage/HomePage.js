import React from 'react';
import HeroSection from "./HeroSection";
import Cards from "./Cards.js"
import Footer from "./Footer"

function HomePage() {
    return (
        <div>
            <HeroSection/>
            <Cards/>
            <Footer/>
        </div>

    );
}

export default HomePage;