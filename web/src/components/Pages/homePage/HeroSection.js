import React from 'react';
import '../../../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src='/videos/video.mp4' autoPlay loop muted />
            <h1>Together we can protect vulnerable children</h1>
            <p>Lets make a difference!</p>
            <div className='hero-btns'>

                <Link to="/signIn">
                    <Button
                        className='btns'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    >
                        Donate Now
                    </Button>

                </Link>

                <Link to="/signUpSelect">
                <Button
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    onClick={console.log('hi')}
                >
                    SignUp
                </Button>
                </Link>

            </div>
        </div>
    );
}

export default HeroSection;