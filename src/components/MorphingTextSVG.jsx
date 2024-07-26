import React, { useEffect, useState, useRef } from 'react';
import './MorphingTextSVG.css';

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
    "  ====/                          \\===///====///="                                                                                                                    bfakhjsbfakbk,
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
];

struct Position {
    x: usize,
    y: usize,
}

impl Position {
    fn new(x: usize, y: usize) -> Self {
        Position { x, y }
    }
}

fn draw_map<W: Write>(stdout: &mut W, pos: &Position, secret_room_visible: bool, box_visible: bool) {
    execute!(stdout, terminal::Clear(ClearType::All)).unwrap();
    for (y, line) in HOUSE_MAP.iter().enumerate() {
        for (x, ch) in line.chars().enumerate() {
            if (pos.x == x && pos.y == y) {
                print!("Q");
            } else if (y >= 12 && y <= 16 && x >= 5 && x <= 16 && !secret_room_visible) {
                print!(" ");
            } else if (y == 12 && x == 21 && !box_visible) {
                print!(" ");
            } else {
                print!("{}", ch);
            }
        }
        println!();
    }
    stdout.flush().unwrap();
}

fn move_position(pos: &mut Position, dx: isize, dy: isize) {
    let new_x = (pos.x as isize + dx) as usize;
    let new_y = (pos.y as isize + dy) as usize;

    if new_y < HOUSE_MAP.len() && new_x < HOUSE_MAP[new_y].len() {
        let next_char = HOUSE_MAP[new_y].chars().nth(new_x).unwrap();
        if (next_char == ' ' || next_char == '_' || next_char == '.' || next_char == ':'){
            pos.x = new_x;
            pos.y = new_y;
        }
    }
}

fn main() {
    let mut stdout = io::stdout();
    terminal::enable_raw_mode().unwrap();
    let mut pos = Position::new(1, 1);

    let mut secret_room_visible = false;
    let mut box_visible = false;

    draw_map(&mut stdout, &pos, secret_room_visible, box_visible);

    loop {
        if event::poll(std::time::Duration::from_millis(50)).unwrap() {
            if let event::Event::Key(key_event) = event::read().unwrap() {
                match key_event.code {
                    KeyCode::Char('q') => break,
                    KeyCode::Up => move_position(&mut pos, 0, -1),
                    KeyCode::Down => move_position(&mut pos, 0, 1),
                    KeyCode::Left => move_position(&mut pos, -1, 0),
                    KeyCode::Right => move_position(&mut pos, 1, 0),
                    _ => {}
                }

                if (pos.y >= 12 && pos.y <= 16 && pos.x >= 5 && pos.x <= 16) {
                    secret_room_visible = true;
                }

                if (pos.y == 12 && pos.x == 21) {
                    box_visible = true;
                }

                draw_map(&mut stdout, &pos, secret_room_visible, box_visible);
            }
        }
    }

    terminal::disable_raw_mode().unwrap();
}`;

const asciiTitle = [
    `  __  __           _                           __   _   _           
 |  \\/  |         | |                         / _| | | | |          
 | \\  / |_   _ ___| |_ ___ _ __ _   _    ___ | |_  | |_| |__   ___  
 | |\\/| | | | / __| __/ _ \\ '__| | | |  / _ \\|  _| | __| '_ \\ / _ \\ 
 | |  | | |_| \\__ \\ ||  __/ |  | |_| | | (_) | |   | |_| | | |  __/ 
 |_|  |_|\\__, |___/\\__\\___|_|   \\__, |  \\___/|_|    \\__|_| |_|\\___| 
          __/ |                  __/ |                              
         |___/__                |___/   _                           
         |  ____|                  | | | |                          
         | |__ ___  _ __ __ _  ___ | |_| |_ ___ _ __                
         |  __/ _ \\| '__/ _\` |/ _ \\| __| __/ _ \\ '_ \\               
         | | | (_) | | | (_| | (_) | |_| ||  __/ | | |              
         |_|  \\___/|_|  \\__, |\\___/ \\__|\\__\\___|_| |_|              
                         __/ |                                      
            |___/                           
    `
];

const MorphingTextSVG = () => {
    const [displayText, setDisplayText] = useState([]);
    const [titleRevealProgress, setTitleRevealProgress] = useState(0);
    const [delayPassed, setDelayPassed] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
    const svgRef = useRef(null);
    const morphProgressRef = useRef(0);
    const animationPhaseRef = useRef(0);
    const circlesRef = useRef([]);

    useEffect(() => {

        const updateTextSize = () => {
            const svgWidth = window.innerWidth;
            const svgHeight = window.innerHeight;
            setSvgDimensions({ width: svgWidth, height: svgHeight });

            // Adjust font size based on screen size
            const newFontSize = Math.max(8, Math.min(16, svgWidth / 80));
            setFontSize(newFontSize);

            const cols = Math.floor(svgWidth / (newFontSize * 0.6));
            const rows = Math.floor(svgHeight / newFontSize);

            const initialLines = initialText.split('\n');
            const paddedInitialText = initialLines.map(line => line.padEnd(cols, ' '));

            while (paddedInitialText.length < rows) {
                paddedInitialText.push(' '.repeat(cols));
            }

            setDisplayText(paddedInitialText);

            // Initialize circles
            const numCircles = 50;
            circlesRef.current = Array(numCircles).fill().map(() => ({
                x: Math.random() * cols,
                y: Math.random() * rows,
                radius: Math.random() * Math.min(cols, rows) / 4 + Math.min(cols, rows) / 8,
                speed: Math.random() * 0.1 + 0.05
            }));
        };

        updateTextSize();
        window.addEventListener('resize', updateTextSize);

        return () => {
            window.removeEventListener('resize', updateTextSize);
        };
    }, []);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setDelayPassed(true);
        }, 1000); // Start animation after 2 seconds

        const intervalId = setInterval(() => {
            if (!delayPassed) return;

            setDisplayText(prevText => {
                return prevText.map((line, y) =>
                    line.split('').map((char, x) => {
                        if (animationPhaseRef.current === 0) {
                            if (Math.random() < 0.01 + morphProgressRef.current / 1000) {
                                return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                            }

                            if (Math.random() < 0.05) {
                                const dx = Math.floor(Math.random() * 3) - 1;
                                const dy = Math.floor(Math.random() * 3) - 1;
                                const newX = Math.max(0, Math.min(line.length - 1, x + dx));
                                const newY = Math.max(0, Math.min(prevText.length - 1, y + dy));
                                return prevText[newY][newX];
                            }
                        } else {
                            for (let circle of circlesRef.current) {
                                const dx = x - circle.x;
                                const dy = y - circle.y;
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                if (Math.abs(distance - circle.radius) < 1) {
                                    const angle = Math.atan2(dy, dx) + circle.speed;
                                    const newX = Math.floor(circle.x + Math.cos(angle) * circle.radius);
                                    const newY = Math.floor(circle.y + Math.sin(angle) * circle.radius);
                                    if (newX >= 0 && newX < line.length && newY >= 0 && newY < prevText.length) {
                                        return prevText[newY][newX];
                                    }
                                }
                            }
                        }

                        return char;
                    }).join('')
                );
            });

            if (delayPassed && animationPhaseRef.current === 0) {
                morphProgressRef.current += 0.1;
                if (morphProgressRef.current >= 100) {
                    animationPhaseRef.current = 1;
                }
            }
        }, 100);

        return () => {
            clearTimeout(delayTimer);
            clearInterval(intervalId);
        };
    }, [delayPassed]);

    useEffect(() => {
        const titleIntervalId = setInterval(() => {
            setTitleRevealProgress(prev => {
                if (prev < asciiTitle.join('').length) {
                    return prev + 16;
                }
                return prev;
            });
        }, 15);

        return () => clearInterval(titleIntervalId);
    }, []);

    const getRevealedTitle = () => {
        const fullTitle = asciiTitle.join('\n');
        return fullTitle.slice(0, titleRevealProgress);
    };

    return (
        <svg
            ref={svgRef}
            id="bannerSVG"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={svgDimensions.width}
            height={svgDimensions.height}
            style={{
                background: '#061434',
                position: 'fixed',
                top: 0,
                left: 0
            }}
            preserveAspectRatio="none"
        >
            {displayText.map((line, index) => (
                <text
                    key={index}
                    x="0"
                    y={index * fontSize}
                    fill="rgba(102, 120, 172, 0.8)"
                    style={{
                        fontSize: `${fontSize}px`,
                        fontFamily: 'monospace',
                        dominantBaseline: 'hanging',
                        whiteSpace: 'pre',
                        transition: 'fill 0.5s'
                    }}
                >
                    {line}
                </text>
            ))}
            <g transform={`translate(${svgDimensions.width / 2}, ${svgDimensions.height / 2})`}>
                {getRevealedTitle().split('\n').map((line, index) => (
                    <text
                        key={index}
                        x="0"
                        y={(index - asciiTitle.length / 2) * fontSize}
                        fill="#00FF00"
                        textAnchor="middle"
                        style={{
                            fontSize: `${fontSize}px`,
                            fontFamily: 'monospace',
                            dominantBaseline: 'middle',
                            whiteSpace: 'pre'
                        }}
                    >
                        {line}
                    </text>
                ))}
            </g>
            <text
                x="50%"
                y="40%"
                fill="#FF0000"
                textAnchor="middle"
                style={{
                    fontSize: `${fontSize + 5}px`,
                    fontFamily: 'monospace',
                    dominantBaseline: 'middle',
                    whiteSpace: 'pre'
                }}
            >
                Made with {'<3'} by ACM-VIT
            </text>
        </svg>
    );
};

export default MorphingTextSVG;