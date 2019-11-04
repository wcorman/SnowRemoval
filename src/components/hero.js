import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import LazyHero from 'react-lazy-hero';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

function Hero() {
  return (
 <div>
            <LazyHero opacity={0.2} minHeight="30vh" parallaxOffset={60} imageSrc="https://unsplash.it/2000/1000">
                <h1>Generic Startup Hype Headline</h1>
            </LazyHero>

            {/* ... */}
        </div>
  );
}

export default Hero;
