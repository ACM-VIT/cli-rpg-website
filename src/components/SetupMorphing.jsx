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

const SetupMorphing = () => {
    const [displayText, setDisplayText] = useState([]);
    const [fontSize, setFontSize] = useState(16);
    const [showCenterText, setShowCenterText] = useState(false);
    const [instructionsText, setInstructionsText] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const svgRef = useRef(null);
    const instructionsRef = useRef(null);
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
                            if (Math.random() < 0.05 + morphProgressRef.current / 500) {
                                return isLogoPixel ? ' ' : String.fromCharCode(33 + Math.floor(Math.random() * 94));
                            }
                        } else if (animationPhaseRef.current === 1) {
                            if (isLogoPixel) {
                                return Math.random() < morphProgressRef.current / 50 ? ' ' : char;
                            } else {
                                return Math.random() < morphProgressRef.current / 50 ?
                                    String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char;
                            }
                        }
                        return char;
                    }).join('')
                );
            });

            if (animationPhaseRef.current === 0) {
                morphProgressRef.current += 0.5;
                if (morphProgressRef.current >= 100) {
                    animationPhaseRef.current = 1;
                    morphProgressRef.current = 0;
                }
            } else if (animationPhaseRef.current === 1) {
                morphProgressRef.current += 1;
            }
        }, 50);

        // Show text after 2 seconds
        const textTimerId = setTimeout(() => {
            setShowCenterText(true);
            startInstructionsAnimation();
        }, 2000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(textTimerId);
        };
    }, []);

    const startInstructionsAnimation = () => {
        const fullInstructions = `
For All Operating Systems
1. Download the appropriate CLI-RPG file for your operating system.

2. Create a dedicated folder for the CLI-RPG tool, such as C:\\Users\\[username]\\cli-rpg on Windows, or a similar location on Linux/MacOS.

3. Move the downloaded file to the created folder.

<span style="color:green">Windows</span>

Downloading the Game
- Download the Executable File:
  - Download the cli-rpg.exe file from the site to your desired location.

Installation Guide
1. Run the Installer:
   - Double-click on the cli-rpg.exe file to start the installation process.
   - If prompted by Windows Defender or another security system, click on "More info" and then "Run anyway" to trust the file and continue with the installation.
   - Follow the on-screen instructions to complete the installation.

Running the Game

Method 1: Double-click the File
- Simply double-click the cli-rpg.exe file to start the game.

Method 2: Using Terminal/Command Prompt
1. Open a Terminal/Command Prompt:
   - Navigate to the directory where cli-rpg.exe is located.
2. Execute the Game:
   - Type: cli-rpg.exe
3. Follow On-Screen Instructions:
   - After launching, follow the prompts to create your character and begin your adventure.

<span style="color:green">Linux</span>

Downloading the Game
- Download the appropriate CLI-RPG file for your system.

Installation Guide
1. Open a terminal and navigate to the CLI-RPG folder.
2. Modify your shell's profile script to include the CLI-RPG folder in your PATH environment variable.
3. Apply changes by restarting the terminal.

Running the Game
1. Navigate to the CLI-RPG folder in the terminal.
2. Make the file executable if necessary:
   - Check permissions: Use ls -l ./cli-rpg to view the file's permissions.
   - Add execute permission: If the "x" flag is missing, use chmod +x ./cli-rpg to grant it.
3. Execute the Game:
   - Type: ./cli-rpg
4. Follow On-Screen Instructions:
   - After launching, follow the prompts to create your character and begin your adventure.

<span style="color:green">MacOS</span>

Downloading the Game
- Download the appropriate CLI-RPG file for your system.

Installation Guide
1. Open a terminal and navigate to the CLI-RPG folder.
2. Modify your shell's profile script (usually .zshrc in the root folder, maybe a hidden file) to include the CLI-RPG folder in your PATH environment variable.
3. Apply changes by restarting the terminal.

Running the Game
1. Navigate to the CLI-RPG folder in the terminal.
2. Make the file executable if necessary:
   - Check permissions: Use ls -l ./cli-rpg to view the file's permissions.
   - Add execute permission: If the "x" flag is missing, use chmod +x ./cli-rpg to grant it.
   - Remove quarantine flag: Use xattr -d com.apple.quarantine ./cli-rpg to remove the quarantine flag.
3. Execute the Game:
   - Type: ./cli-rpg
4. Follow On-Screen Instructions:
   - After launching, follow the prompts to create your character and begin your adventure.

Verify the installation by running cli-rpg in your command line or terminal. The tool should launch successfully. Enjoy your adventure in the world of CLI-RPG!


`;

        let currentIndex = 0;
        const animateText = () => {
            if (currentIndex < fullInstructions.length) {
                setInstructionsText(prevText => prevText + fullInstructions[currentIndex]);
                currentIndex++;
                setTimeout(animateText, 0.5); // Increase typing speed
            }
        };

        animateText();


        setTimeout(() => {
            if (instructionsRef.current) {
                instructionsRef.current.style.transform = 'translateY(0)';
            }
        }, 100);
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
        setScrollPosition(scrollPercentage);
    };

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
            {showCenterText && (
                <foreignObject x="10%" y="5%" width="80%" height="90%">
                    <div
                        ref={instructionsRef}
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            color: '#FFFFFF',
                            fontFamily: 'monospace',
                            textAlign: 'left',
                            height: '100%',
                            overflowY: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            scrollbarWidth: 'auto',
                            msOverflowStyle: 'auto',
                            padding: '15px',
                            backgroundColor: 'rgba(0, 0, 0, 1)',
                            margin: 'auto',
                            fontSize: '18px',
                            transform: 'translateY(100%)',
                            transition: 'transform 1s ease-in-out',
                        }}
                        onScroll={handleScroll}
                    >
                        <style>
                            {`
                            div::-webkit-scrollbar {
                                display: block;
                            }
                            `}
                        </style>
                        <h2 style={{ textAlign: 'center' }}>Setup Instructions</h2>
                        <span dangerouslySetInnerHTML={{ __html: instructionsText }} />
                    </div>
                </foreignObject>
            )}
            {showCenterText && (
                <g>
                    <rect
                        x="90%"
                        y="5%"
                        width="0.5%"
                        height="90%"
                        fill="#000000"
                        opacity="0.3"
                    />
                    <rect
                        x="90%"
                        y={`${5 + scrollPosition * 90}%`}
                        width="0.5%"
                        height="5%"
                        fill="#000000"
                        rx="1"
                        ry="1"
                    />
                </g>
            )}
        </svg>
    );
};

export default SetupMorphing;
