import React, { useState, useEffect } from 'react';
import { ChakraProvider, Button, HStack } from '@chakra-ui/react';
import { DownloadIcon, SettingsIcon, InfoIcon } from '@chakra-ui/icons';
import MorphingTextSVG from '../components/MorphingTextSVG';
import theme from '../../theme';
import './Landing.css';

const Landing = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 2000); // Adjust the timing as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <div className={`landing-container ${isAnimated ? 'animated' : ''}`}>
                <div className={`svg-container ${isAnimated ? 'svg-animated' : ''}`}>
                    <MorphingTextSVG isAnimated={isAnimated} />
                </div>
                <div className="button-section">
                    <HStack spacing={4} className="button-container">
                        <Button
                            leftIcon={<DownloadIcon />}
                            className="landing-button"
                            bg="rgba(255, 153, 0, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(255, 153, 0, 0.2)' }}
                            _active={{ bg: 'rgba(255, 153, 0, 0.3)' }}
                        >
                            Download
                        </Button>
                        <Button
                            leftIcon={<SettingsIcon />}
                            className="landing-button"
                            bg="rgba(153, 50, 204, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(153, 50, 204, 0, 0.2)' }}
                            _active={{ bg: 'rgba(153, 50, 204, 0, 0.3)' }}
                        >
                            Setup
                        </Button>
                        <Button
                            leftIcon={<InfoIcon />}
                            className="landing-button"
                            bg="rgba(0, 128, 128, 0.3)"
                            color="white"
                            _hover={{ bg: 'rgba(0, 128, 128, 0.2)' }}
                            _active={{ bg: 'rgba(0, 128, 128, 0.3)' }}
                        >
                            About
                        </Button>
                    </HStack>
                </div>
            </div>
        </ChakraProvider>
    );
};

export default Landing;
