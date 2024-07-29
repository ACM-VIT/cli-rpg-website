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
Steps to run the game on Windows:

Step 1: Download the zip folder from the \`cli-rpg.acmvit.in\` website.
Step 2: Extract the contents of the zip file using an extraction tool like WinRAR or 7-Zip.
        Example:
        \`\`\`
        Right-click on the zip file -> Extract Here
        \`\`\`
Step 3: Navigate to the extracted directory in Command Prompt or PowerShell.
        Example:
        \`\`\`
        cd Downloads\\cli-rpg
        dir
        \`\`\`
Step 4: Access System Properties and open Environment Variables.
Step 5: Edit the 'Path' variable under User variables to include the path to your CLI-RPG folder.
Step 6: Apply changes.
Step 7: Use the command \`cli-rpg start\` to run the game.
Step 8: Use the command \`cli-rpg tutorial\` for instructions.

# Ensure that your terminal is run in full-screen mode.
# It is recommended to run the game using the Alacritty terminal.
# Link for installation: https://alacritty.org/

Steps to run the game on macOS:

Step 1: Install the zip folder from the \`cli-rpg.acmvit.in\` website.
Step 2: It is recommended to download Alacritty and use it as the terminal for running the game.
        Link for installation: https://alacritty.org/
Step 3: Use the terminal commands \`cd\` and \`ls\` to navigate to the directory where the game files are located.
        Example:
        \`\`\`
        cd Downloads/cli-rpg
        ls
        \`\`\`
Step 4: Modify your shell's profile script (usually \`.zshrc\` in the root folder, maybe a hidden file, to see hidden files use the key combination - \`Shift+Command+.\`) to include the CLI-RPG folder in your PATH environment variable.
        Example:
        \`\`\`
        echo 'export PATH=\$PATH:/path/to/CLI-RPG' >> ~/.zshrc
        source ~/.zshrc
        \`\`\`
Step 5: Try running the command \`cli-rpg\`. If you do not see the logo, proceed with the following steps:
        a) Failure to grant full disk access may result in the Terminal error "Operation not permitted." To resolve this issue, navigate to System Preferences > Security & Privacy > Privacy panel, and include Terminal in the Full Disk Access list.
        b) If the \`cli-rpg\` command still doesn't work, execute the steps that follow:
           - Check permissions: Use \`ls -l ./cli-rpg\` to view the file's permissions.
           - Add execute permission: If the "x" flag is missing, use \`chmod +x ./cli-rpg\` to grant it.
           - Remove quarantine flag: Use \`xattr -d com.apple.quarantine ./cli-rpg\` to remove the quarantine flag.
Step 6: Apply changes by restarting the terminal.
Step 7: To start the game, use the command \`./cli-rpg start\`.
Step 8: For the instructions, use the command \`./cli-rpg tutorial\`.

# Ensure that your terminal is run in full-screen mode.
# It is recommended to run the game using the Alacritty terminal.
# Link for installation: https://alacritty.org/

Steps to run the game on Linux:

Step 1: Download the zip folder from the \`cli-rpg.acmvit.in\` website.
Step 2: Extract the contents of the zip file using a command like \`unzip\` or a file manager.
        Example:
        \`\`\`
        unzip cli-rpg.zip
        \`\`\`
Step 3: Navigate to the extracted directory using \`cd\`.
        Example:
        \`\`\`
        cd cli-rpg
        \`\`\`
Step 4: Open a terminal and navigate to the CLI-RPG folder.
Step 5: Modify your shell's profile script to include the CLI-RPG folder in your PATH environment variable.
        Example for \`.bashrc\`:
        \`\`\`
        echo 'export PATH=\$PATH:/path/to/CLI-RPG' >> ~/.bashrc
        source ~/.bashrc
        \`\`\`
Step 6: Apply changes by restarting the terminal.
Step 7: Use the command \`cli-rpg start\` to run the game.
Step 8: Use the command \`cli-rpg tutorial\` for instructions.

# Ensure that your terminal is run in full-screen mode.
# It is recommended to run the game using the Alacritty terminal.
# Link for installation: https://alacritty.org/
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
