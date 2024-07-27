import React, { useEffect, useState, useRef } from 'react';
import './DownloadMorphing.css';

const newText = `Welcome to the Future of Web!`;

const DownloadMorphing = () => {
    const [displayText, setDisplayText] = useState('');
    const morphRef = useRef(0);
    const phaseRef = useRef(0);

    useEffect(() => {
        const textArray = newText.split('');
        const morphInterval = setInterval(() => {
            if (phaseRef.current === 0) {
                setDisplayText(prev => {
                    const chars = prev.split('');
                    const randomIndex = Math.floor(Math.random() * chars.length);
                    chars[randomIndex] = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    return chars.join('');
                });

                morphRef.current += 1;
                if (morphRef.current >= 100) {
                    phaseRef.current = 1;
                }
            } else {
                setDisplayText(newText.slice(0, morphRef.current));
                morphRef.current += 1;
                if (morphRef.current >= newText.length) {
                    clearInterval(morphInterval);
                }
            }
        }, 100);

        return () => clearInterval(morphInterval);
    }, []);

    return (
        <div className="morphing-text-container">
            <div className="morphing-text">
                {displayText}
            </div>
        </div>
    );
};

export default DownloadMorphing;
