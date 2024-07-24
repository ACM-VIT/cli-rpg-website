import React from 'react';
import MorphingTextSVG from '../components/MorphingTextSVG';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="svg-container">
                <MorphingTextSVG />
            </div>
            <div className="button-container">
                <button className="landing-button">Download</button>
                <button className="landing-button">Setup</button>
                <button className="landing-button">About</button>
            </div>
        </div>
    );
};

export default Landing;