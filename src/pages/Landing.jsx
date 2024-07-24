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
                <button className="landing-button">Button 1</button>
                <button className="landing-button">Button 2</button>
                <button className="landing-button">Button 3</button>
            </div>
        </div>
    );
};

export default Landing;