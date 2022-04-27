import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the our newsletter to learn about our daily impacts
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/about'>Learn About Child Sponsorship</Link>
            <Link to='/about'>How it works</Link>
            <Link to='/about'>Our Impact</Link>
            <Link to='/about'>Careers</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/contact-us'>Contact Us</Link>
            <Link to='/contact-us'>Customer Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>

          <div class='footer-link-items'>
            <h2>Socials</h2>
            <Link to='//www.instagram.com/'>Instagram</Link>
            <Link to='//www.facebook.com/'>Facebook</Link>
            <Link to='//www.youtube.com'>Youtube</Link>
            <Link to='//twitter.com/?lang=en'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/home' className='social-logo'>
              World Vision
            </Link>
          </div>
          <small class='website-rights'>World Vision © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='//www.facebook.com/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='//www.instagram.com/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='//www.youtube.com'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='//twitter.com/?lang=en'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
