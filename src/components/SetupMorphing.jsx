import React, { useEffect, useState, useRef } from 'react';

const initialText = `use crossterm::{
    cursor,
    event::{self, KeyCode},
    execute,
    terminal::{self, ClearType},
};
use std::io::{self, Write};

const HOUSE_MAP: [&str; 32] = [
    "        /////==============/////",
    "       /                        \\",
    "  ====/                          \\===///====///=",
    "  ||--|                           :_||  Garden //",
    "  ||c :       Master              |__|   Tub   |",
    "  ||l :        Bedroom            :  \\________///",
    "  ||o :                           :__        |O|",
    "  ||s :                           |  |       | |",
    "  ||e :                           |__|_      |O|",
    "  ||t :                           |Show|    ===|",
    "  ||--|                           | er |   ( )||",
    "  |======================.... ....|============|_____",
    "  |                                  front _\\ # | | |",
    "  /   Secret Room                    door  / # | | |",
    "  /    _______                       =======# | | |",
    "  /   |       |                             \\| | |",
    "  /   |_______|  Living room                \\|---- ________",
    "  |                                               |",
    "  |                                     Dining    | 2 - Car",
    "  |                                      Room     | Garage",
    "  /                                               |",
    "  /                                               |",
    "  |=====================                          |",
    "  | T  |---|_0_|___|            ==================|_____",
    "  | u  |( )        :           ||wash & dry |__|0|| | |",
    "  | b  |           :           ||____|(__)|       : | |",
    "  |====|============|....|     :                  :_|_|___",
    "  |                      |     ===================|___   laundry",
    "  |                      |                    ||  |\\",
    "  /       Guest          |      ---------     || _ \\  <<== double",
    "                                                                  ",
    "                                                                  "
];`;

const logoShape = [


    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",
    "  #####################################  ",



];


const AboutMorphing = () => {
    const [displayText, setDisplayText] = useState([]);
    const [fontSize, setFontSize] = useState(16);
    const svgRef = useRef(null);
    const animationPhaseRef = useRef(0);
    const morphProgressRef = useRef(0);

    useEffect(() => {
        const updateTextSize = () => {
            if (svgRef.current) {
                const svgWidth = window.innerWidth;
                const svgHeight = window.innerHeight;

                const newFontSize = Math.max(8, Math.min(16, svgWidth / 80));
                setFontSize(newFontSize);

                const cols = Math.ceil(svgWidth / (newFontSize * 0.6));
                const rows = Math.ceil(svgHeight / newFontSize);

                const initialLines = initialText.split('\n');
                const paddedInitialText = initialLines.map(line => line.padEnd(cols, ' '));

                while (paddedInitialText.length < rows) {
                    paddedInitialText.push(' '.repeat(cols));
                }

                setDisplayText(paddedInitialText);
            }
        };

        updateTextSize();
        window.addEventListener('resize', updateTextSize);

        return () => {
            window.removeEventListener('resize', updateTextSize);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayText(prevText => {
                const rows = prevText.length;
                const cols = prevText[0].length;

                return prevText.map((line, y) =>
                    line.split('').map((char, x) => {
                        const normalizedX = Math.floor((x / cols) * logoShape[0].length);
                        const normalizedY = Math.floor((y / rows) * logoShape.length);
                        const isLogoPixel = logoShape[normalizedY][normalizedX] === '#';

                        if (animationPhaseRef.current === 0) {
                            if (Math.random() < 0.01 + morphProgressRef.current / 1000) {
                                return isLogoPixel ? ' ' : String.fromCharCode(33 + Math.floor(Math.random() * 94));
                            }
                        } else if (animationPhaseRef.current === 1) {
                            if (isLogoPixel) {
                                return Math.random() < morphProgressRef.current / 100 ? ' ' : char;
                            } else {
                                return Math.random() < morphProgressRef.current / 100 ?
                                    String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char;
                            }
                        }
                        return char;
                    }).join('')
                );
            });

            if (animationPhaseRef.current === 0) {
                morphProgressRef.current += 0.1;
                if (morphProgressRef.current >= 100) {
                    animationPhaseRef.current = 1;
                    morphProgressRef.current = 0;
                }
            } else if (animationPhaseRef.current === 1) {
                morphProgressRef.current += 0.5;
                if (morphProgressRef.current >= 100) {
                    clearInterval(intervalId);
                }
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{
                background: '#A020F0',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                overflow: 'hidden'
            }}
            preserveAspectRatio="none"
        >
            {displayText.map((line, index) => (
                <text
                    key={index}
                    x="0"
                    y={index * fontSize}
                    fill="#FFFFFF"
                    style={{
                        fontSize: `${fontSize}px`,
                        fontFamily: 'monospace',
                        dominantBaseline: 'hanging',
                        whiteSpace: 'pre',
                    }}
                >
                    {line}
                </text>
            ))}
        </svg>
    );
};

export default AboutMorphing;
