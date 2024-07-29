
import React, { useEffect, useState, useRef } from 'react';

const initialText = `  "                                                                            @@@@@@@@@@@@@@                                                          
"                                                                           @@@@@@@@@@@@@@@@@@@@                                                                            
"                                                                         @@@@@@@@@@@@@@@@@@@@@@@@                                                                          
"                                                                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                        
"                                                                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                      
"                                                                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                    
"                                                                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                   
"                                                                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                 
"                                                              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                               
"                                                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                             
"                                                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                           
"                                                         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                          
"                                                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                        
"                                                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                      
"                                                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                    
"                                                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                  
"                                                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                 
"                                             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              
"                                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                             
"                                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                           
"                                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                         
"                                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                       
"                                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                      
"                                    @@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@                                     
"                                   @@@@@@@@@@@@@@@@@@@@@@@           @@@@@@@          @@@   @@         @@         @@@@@@@@@@@@@@@@@@@@@                                    
"                                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@      @@@@@@@@@      @@@        @@@     @@@@@@@@@@@@@@@@@@@@@                                   
"                                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@    @@@@@@@@@@@     @@@@@     @@@@@@    @@@@@@@@@@@@@@@@@@@@@                                   
"                                   @@@@@@@@@@@@@@@@@@@@@@@@             @@     @@@@@@@@@@@    @@@@@@     @@@@@@    @@@@@@@@@@@@@@@@@@@@@                                   
"                                   @@@@@@@@@@@@@@@@@@@@@    @@@@@@@    @@@    @@@@@@@@@@@    @@@@@@     @@@@@@    @@@@@@@@@@@@@@@@@@@@@                                    
"                                   @@@@@@@@@@@@@@@@@@@@@    @@@@@@     @@@     @@@@@@@@@@    @@@@@@     @@@@@@    @@@@@@@@@@@@@@@@@@@@@                                    
"                                   @@@@@@@@@@@@@@@@@@@@@@@              @@@@@          @@@    @@@@@@     @@@@@@    @@@@@@@@@@@@@@@@@@@@@                                   
"                                    @@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                     
"                                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                      
"                                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                       
"                                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                         
"                                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                           
"                                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                             
"                                             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                              
"                                               @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                
"                                                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                  
"                                                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                    
"                                                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                      
"                                                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                       
"                                                         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                          
"                                                          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                           
"                                                            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                             
"                                                              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                               
"                                                                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                 
"                                                                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                   
"                                                                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                    
"                                                                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                      
"                                                                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                        
"                                                                         @@@@@@@@@@@@@@@@@@@@@@@@                                                                          
"                                                                           @@@@@@@@@@@@@@@@@@@@                                                                            
"                                                                              @@@@@@@@@@@@@@                                                                               
`
const smallScreenText = `                    :+#%@@@#+-                   
                  :#@@@@@@@@@@%=                  
                :#@@@@@@@@@@@@@@%=                
              :#@@@@@@@@@@@@@@@@@@%=              
            :#@@@@@@@@@@@@@@@@@@@@@@%=            
          :#@@@@@@@@@@@@@@@@@@@@@@@@@@%=          
        :#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=        
      -%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=      
    :#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=    
  :#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=  
 *@@@@@@@@@%*++*#@@@@#*+*%%**@#++#@%*+*@@@@@@@@@# 
+@@@@@@@@@@+=+=: .@*  .--+*  .:.  ..:  .@@@@@@@@@*
@@@@@@@@@@%-.:-:  %   @@@@*  -@@  :@@=  @@@@@@@@@@
*@@@@@@@@@=  **:  %=  :+***  =@@  -@@=  @@@@@@@@@#
 #@@@@@@@@@+--=#==%@%+=--*%==#@@==*@@#==@@@@@@@@%.
  =%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+  
    =%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+    
      =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*.     
        =%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+.       
          =%@@@@@@@@@@@@@@@@@@@@@@@@@@@+          
            =%@@@@@@@@@@@@@@@@@@@@@@@+            
              =%@@@@@@@@@@@@@@@@@@@+.             
                =%@@@@@@@@@@@@@@@+                
                  =%@@@@@@@@@@@+                  
                    -+#@@@@%*=                    
`;

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

                let newText = initialText;

                if (svgWidth < 768) { // Adjust the width threshold as needed
                    newText = smallScreenText;
                }

                const newFontSize = Math.max(8, Math.min(16, svgWidth / 80));
                setFontSize(newFontSize);

                const cols = Math.ceil(svgWidth / (newFontSize * 0.6));
                const rows = Math.ceil(svgHeight / newFontSize);

                const initialLines = newText.split('\n');
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
                        const isLogoPixel = logoShape[normalizedY] && logoShape[normalizedY][normalizedX] === '#';

                        if (window.innerWidth >= 768) {
                            // Animation logic only for larger screens
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
                        }

                        return char;
                    }).join('')
                );
            });

            // Scroll the page as the text moves down
            window.scrollBy(0, 2);

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

    const startInstructionsAnimation = () => {
        const fullInstructions = `
About the Game

Mystery of the Forgotten is a text-based adventure game that takes you on a journey through a mysterious world filled with secrets, challenges, and intriguing characters. As the player, you will explore various locations, solve puzzles, and uncover the mysteries of the game.

Features
- Immersive storyline with multiple endings
- Diverse characters with unique backstories
- Various puzzles and games to solve
- Inventory management system
- Music Player with interactive Audio Visualiser
- Exceptional ASCII Art

The Technology stack used:
- Rust
- Ratatui
- Cursive
- Crossterm
- Rodio
- Supabase
- PostgreSQL

About ACM-VIT

ACM-VIT, established in 2009, stands as a highly esteemed technical chapter within VIT, Vellore, committed to rewriting the code of excellence ever since. More than just an entity, we consider ourselves a closely-knit family, united by a passion for innovation and a love for all things computing. 🚀💻


ACM-VIT has been working on projects related to graphic designing, web development, machine learning and app development and has been organizing events and workshop for the same. Apart from this, ACM-VIT also boasts of its own research wing, the only chapter in VIT to have that. 🎨🌐
`;

        let currentIndex = 0;
        const animateText = () => {
            if (currentIndex < fullInstructions.length) {
                setInstructionsText(prevText => {
                    const newText = prevText + fullInstructions[currentIndex];
                    // Scroll to the bottom of the text container
                    if (instructionsRef.current) {
                        instructionsRef.current.scrollTop = instructionsRef.current.scrollHeight;
                    }
                    return newText;
                });
                currentIndex++;
                setTimeout(animateText, 5); // Increase typing speed
            }
        };

        animateText();

        // Trigger animation by changing transform property
        setTimeout(() => {
            if (instructionsRef.current) {
                instructionsRef.current.style.transform = 'translateY(0)';
            }
        }, 100);
    };

    useEffect(() => {
        // Show text after 2 seconds
        const textTimerId = setTimeout(() => {
            setShowCenterText(true);
            startInstructionsAnimation();
        }, 2000);

        return () => {
            clearTimeout(textTimerId);
        };
    }, []);

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
                background: 'teal',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                overflow: 'hidden',
            }}
            preserveAspectRatio="none"
        >
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                style={{
                    background: 'teal',
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                }}
                preserveAspectRatio="none"
            >
                {displayText.map((line, index) => (
                    <text
                        key={index}
                        x={window.innerWidth < 768 ? (window.innerWidth / 2) - (line.length * fontSize * 0.3 / 2) : 0}
                        y={window.innerWidth < 768 ? (window.innerHeight / 1) - ((displayText.length * fontSize) / 2) + index * fontSize : index * fontSize}
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
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
                            <h2 style={{ textAlign: 'center' }}>About</h2><br />
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
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
                        <h2 style={{ textAlign: 'center' }}>About</h2><br />
                        <span dangerouslySetInnerHTML={{ __html: instructionsText }} />
                    </div>
                </foreignObject>
            )}
            {/* ... (keep the existing scroll bar SVG content) */}
        </svg>
    );
};

export default AboutMorphing;